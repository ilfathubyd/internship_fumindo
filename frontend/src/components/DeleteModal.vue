<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-dialog confirm">
      <div class="modal-header">
        <h2>Konfirmasi Hapus</h2>
        <button class="btn-close" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body" style="text-align: center; padding: 2rem 1.5rem;">
        <div style="width: 56px; height: 56px; background: #ffe4e6; color: #e11d48; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            <line x1="10" x2="10" y1="11" y2="17"/>
            <line x1="14" x2="14" y1="11" y2="17"/>
          </svg>
        </div>

        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-main);">
          Hapus Aset Ini?
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
          Apakah Anda yakin ingin menghapus <strong>"{{ asset?.asset_name }}"</strong> (ID: {{ asset?.asset_id }})? Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>

      <div class="modal-footer" style="justify-content: center; gap: 1rem;">
        <button type="button" class="btn-secondary" @click="$emit('close')">
          Batal
        </button>
        <button type="button" class="btn-danger" :disabled="isDeleting" @click="$emit('confirm', asset.asset_id)">
          <span v-if="isDeleting">Menghapus...</span>
          <span v-else>Ya, Hapus Aset</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  asset: {
    type: Object,
    default: null,
  },
  isDeleting: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close', 'confirm']);
</script>
