<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-dialog">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2>{{ isEditing ? 'Edit Data Aset' : 'Tambah Aset Baru' }}</h2>
        <button class="btn-close" @click="$emit('close')" title="Tutup">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit">
        <div class="modal-body">
          <!-- Asset Name -->
          <div class="form-group">
            <label class="form-label" for="asset_name">Nama Aset <span style="color: var(--danger)">*</span></label>
            <input
              id="asset_name"
              v-model="form.asset_name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.asset_name }"
              placeholder="Contoh: Laptop Dell Latitude / Kertas HVS"
              maxlength="150"
              autofocus
            />
            <span v-if="errors.asset_name" class="error-message">{{ errors.asset_name }}</span>
          </div>

          <!-- Stock Quantity -->
          <div class="form-group">
            <label class="form-label" for="stock_quantity">Jumlah Stok <span style="color: var(--danger)">*</span></label>
            <input
              id="stock_quantity"
              v-model.number="form.stock_quantity"
              type="number"
              min="0"
              class="form-control"
              :class="{ 'is-invalid': errors.stock_quantity }"
              placeholder="0"
            />
            <span v-if="errors.stock_quantity" class="error-message">{{ errors.stock_quantity }}</span>
          </div>

          <!-- Category Selection -->
          <div class="form-group">
            <label class="form-label">Kategori <span style="color: var(--danger)">*</span></label>
            <div class="category-radio-group">
              <label
                class="radio-card"
                :class="{ active: form.category === 'Consumable' }"
              >
                <input
                  type="radio"
                  name="category"
                  value="Consumable"
                  v-model="form.category"
                />
                <div>
                  <strong>Consumable</strong>
                  <div style="font-size: 0.74rem; opacity: 0.85">Habis pakai (atk, cairan, masker)</div>
                </div>
              </label>

              <label
                class="radio-card"
                :class="{ active: form.category === 'Non-Consumable' }"
              >
                <input
                  type="radio"
                  name="category"
                  value="Non-Consumable"
                  v-model="form.category"
                />
                <div>
                  <strong>Non-Consumable</strong>
                  <div style="font-size: 0.74rem; opacity: 0.85">Aset tetap (laptop, kursi, alat)</div>
                </div>
              </label>
            </div>
            <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Batal
          </button>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Menyimpan...</span>
            <span v-else>{{ isEditing ? 'Simpan Perubahan' : 'Tambah Aset' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  assetData: {
    type: Object,
    default: null,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'save']);

const isEditing = computed(() => !!props.assetData);

const form = reactive({
  asset_name: '',
  stock_quantity: 0,
  category: 'Consumable',
});

const errors = reactive({
  asset_name: '',
  stock_quantity: '',
  category: '',
});

// Watch ketika modal dibuka atau assetData berubah
watch(
  () => props.assetData,
  (newData) => {
    if (newData) {
      form.asset_name = newData.asset_name;
      form.stock_quantity = newData.stock_quantity;
      form.category = newData.category;
    } else {
      form.asset_name = '';
      form.stock_quantity = 0;
      form.category = 'Consumable';
    }
    clearErrors();
  },
  { immediate: true }
);

function clearErrors() {
  errors.asset_name = '';
  errors.stock_quantity = '';
  errors.category = '';
}

function validate() {
  clearErrors();
  let isValid = true;

  if (!form.asset_name || form.asset_name.trim() === '') {
    errors.asset_name = 'Nama aset wajib diisi';
    isValid = false;
  } else if (form.asset_name.length > 150) {
    errors.asset_name = 'Nama aset maksimal 150 karakter';
    isValid = false;
  }

  if (form.stock_quantity === '' || form.stock_quantity === null || isNaN(form.stock_quantity)) {
    errors.stock_quantity = 'Jumlah stok wajib diisi';
    isValid = false;
  } else if (form.stock_quantity < 0) {
    errors.stock_quantity = 'Jumlah stok tidak boleh minus';
    isValid = false;
  }

  if (!['Consumable', 'Non-Consumable'].includes(form.category)) {
    errors.category = 'Pilih kategori yang valid';
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (!validate()) return;

  emit('save', {
    asset_name: form.asset_name.trim(),
    stock_quantity: Number(form.stock_quantity),
    category: form.category,
  });
}
</script>
