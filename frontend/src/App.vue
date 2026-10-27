<template>
  <div class="app-container">
    <!-- 1. Header Navbar -->
    <Navbar />

    <!-- 2. Main Content Area -->
    <main class="main-content">
      <!-- Metrik Ringkasan Aset -->
      <StatsCards :assets="assets" />

      <!-- Toolbar Aksi & Filter Pencarian -->
      <div class="toolbar-card">
        <div class="toolbar-flex">
          <div class="toolbar-filters">
            <!-- Search Box -->
            <div class="search-input-wrapper">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                class="search-input"
                placeholder="Cari nama aset..."
                @input="handleSearchInput"
              />
            </div>

            <!-- Filter Category -->
            <select v-model="selectedCategory" class="select-filter" @change="fetchAssets">
              <option value="">Semua Kategori</option>
              <option value="Consumable">Consumable</option>
              <option value="Non-Consumable">Non-Consumable</option>
            </select>

            <!-- Refresh Button -->
            <button class="btn-refresh" @click="fetchAssets" title="Muat Ulang Data">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'spin-icon': isLoading }">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                <path d="M16 16h5v5"/>
              </svg>
            </button>
          </div>

          <!-- Tombol Tambah Aset Baru -->
          <button class="btn-primary" @click="openAddModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Tambah Aset</span>
          </button>
        </div>
      </div>

      <!-- Tabel Daftar Aset -->
      <div class="table-card">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 100px;">Asset ID</th>
                <th>Nama Aset</th>
                <th style="width: 200px;">Kategori</th>
                <th style="width: 160px;">Jumlah Stok</th>
                <th style="width: 130px; text-align: center;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loading State -->
              <tr v-if="isLoading">
                <td colspan="5" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                  <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
                    <div class="spinner"></div>
                    <span>Memuat data dari PostgreSQL...</span>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-else-if="assets.length === 0">
                <td colspan="5">
                  <div class="empty-state">
                    <div class="empty-icon-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                    </div>
                    <h3>Tidak ada data aset</h3>
                    <p>Belum ada data yang sesuai dengan pencarian atau filter yang Anda pilih.</p>
                  </div>
                </td>
              </tr>

              <!-- Data Rows -->
              <tr v-else v-for="item in assets" :key="item.asset_id">
                <td>
                  <span class="asset-id-cell">#{{ item.asset_id }}</span>
                </td>
                <td>
                  <div class="asset-name-cell">{{ item.asset_name }}</div>
                </td>
                <td>
                  <span
                    class="badge"
                    :class="item.category === 'Consumable' ? 'badge-consumable' : 'badge-non-consumable'"
                  >
                    <span style="font-size: 1.1em; line-height: 0;">&bull;</span>
                    {{ item.category }}
                  </span>
                </td>
                <td>
                  <div class="stock-tag">
                    <span>{{ item.stock_quantity }} unit</span>
                    <span
                      class="stock-pill"
                      :class="item.stock_quantity <= 5 ? 'low' : 'normal'"
                    >
                      {{ item.stock_quantity <= 5 ? 'Stok Rendah' : 'Tersedia' }}
                    </span>
                  </div>
                </td>
                <td style="text-align: center;">
                  <div class="action-buttons" style="justify-content: center;">
                    <!-- Edit Button -->
                    <button
                      class="btn-icon edit"
                      @click="openEditModal(item)"
                      title="Edit Data"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>

                    <!-- Delete Button -->
                    <button
                      class="btn-icon delete"
                      @click="openDeleteModal(item)"
                      title="Hapus Data"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal Form (Create & Update) -->
    <AssetModal
      :is-open="isAssetModalOpen"
      :asset-data="selectedAsset"
      :is-submitting="isSubmitting"
      @close="closeAssetModal"
      @save="handleSaveAsset"
    />

    <!-- Modal Konfirmasi Hapus -->
    <DeleteModal
      :is-open="isDeleteModalOpen"
      :asset="selectedAsset"
      :is-deleting="isDeleting"
      @close="closeDeleteModal"
      @confirm="handleConfirmDelete"
    />

    <!-- Toast Notifikasi -->
    <Toast :toasts="toasts" @dismiss="dismissToast" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import StatsCards from './components/StatsCards.vue';
import AssetModal from './components/AssetModal.vue';
import DeleteModal from './components/DeleteModal.vue';
import Toast from './components/Toast.vue';
import assetService from './services/assetService.js';

// State Utama
const assets = ref([]);
const isLoading = ref(false);
const isSubmitting = ref(false);
const isDeleting = ref(false);

// Filter State
const searchQuery = ref('');
const selectedCategory = ref('');
let searchDebounceTimeout = null;

// Modal State
const isAssetModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedAsset = ref(null);

// Toast Notifikasi State
const toasts = ref([]);

// 1. Ambil data aset dari backend NestJS
async function fetchAssets() {
  isLoading.value = true;
  try {
    const params = {};
    if (searchQuery.value.trim() !== '') {
      params.search = searchQuery.value.trim();
    }
    if (selectedCategory.value !== '') {
      params.category = selectedCategory.value;
    }

    const res = await assetService.getAssets(params);
    assets.value = res.data || [];
  } catch (error) {
    showToast(
      error.response?.data?.message || 'Gagal memuat data aset dari server',
      'error'
    );
  } finally {
    isLoading.value = false;
  }
}

// Debounce pencarian agar tidak memanggil API terlalu sering saat mengetik
function handleSearchInput() {
  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    fetchAssets();
  }, 350);
}

// 2. Tambah Aset
function openAddModal() {
  selectedAsset.value = null;
  isAssetModalOpen.value = true;
}

// 3. Edit Aset
function openEditModal(asset) {
  selectedAsset.value = { ...asset };
  isAssetModalOpen.value = true;
}

function closeAssetModal() {
  isAssetModalOpen.value = false;
  selectedAsset.value = null;
}

// Handler Simpan (Create / Update)
async function handleSaveAsset(formData) {
  isSubmitting.value = true;
  try {
    if (selectedAsset.value && selectedAsset.value.asset_id) {
      // Operasi UPDATE (PUT)
      await assetService.updateAsset(selectedAsset.value.asset_id, formData);
      showToast('Data aset berhasil diperbarui', 'success');
    } else {
      // Operasi CREATE (POST)
      await assetService.createAsset(formData);
      showToast('Aset baru berhasil ditambahkan', 'success');
    }
    closeAssetModal();
    await fetchAssets();
  } catch (error) {
    const msg = error.response?.data?.message || 'Gagal menyimpan data aset';
    const displayMsg = Array.isArray(msg) ? msg.join(', ') : msg;
    showToast(displayMsg, 'error');
  } finally {
    isSubmitting.value = false;
  }
}

// 4. Hapus Aset (DELETE)
function openDeleteModal(asset) {
  selectedAsset.value = asset;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  selectedAsset.value = null;
}

async function handleConfirmDelete(assetId) {
  isDeleting.value = true;
  try {
    await assetService.deleteAsset(assetId);
    showToast('Aset berhasil dihapus', 'success');
    closeDeleteModal();
    await fetchAssets();
  } catch (error) {
    showToast(
      error.response?.data?.message || 'Gagal menghapus aset',
      'error'
    );
  } finally {
    isDeleting.value = false;
  }
}

// 5. Toast Notification Helper
function showToast(message, type = 'success') {
  const id = Date.now();
  toasts.value.push({ id, message, type });

  // Auto dismiss setelah 3.5 detik
  setTimeout(() => {
    dismissToast(id);
  }, 3500);
}

function dismissToast(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

// Inisialisasi data saat komponen terpasang
onMounted(() => {
  fetchAssets();
});
</script>

<style>
/* Spinner animasi loading */
.spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid #e2e8f0;
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spin-icon {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
