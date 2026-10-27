<template>
  <div class="stats-grid">
    <!-- Total Asset -->
    <div class="stat-card">
      <div class="stat-icon total">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-label">Total Jenis Aset</span>
        <span class="stat-value">{{ totalAssets }}</span>
      </div>
    </div>

    <!-- Consumable Asset -->
    <div class="stat-card">
      <div class="stat-icon consumable">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20"/>
          <path d="m17 5-5-3-5 3"/>
          <path d="m17 19-5 3-5-3"/>
          <path d="M2 12h20"/>
          <path d="m5 7-3 5 3 5"/>
          <path d="m19 7 3 5-3 5"/>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-label">Aset Consumable</span>
        <span class="stat-value">{{ consumableCount }}</span>
      </div>
    </div>

    <!-- Non-Consumable Asset -->
    <div class="stat-card">
      <div class="stat-icon non-consumable">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M7 7h10"/>
          <path d="M7 12h10"/>
          <path d="M7 17h10"/>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-label">Aset Non-Consumable</span>
        <span class="stat-value">{{ nonConsumableCount }}</span>
      </div>
    </div>

    <!-- Total Stock Quantity -->
    <div class="stat-card">
      <div class="stat-icon stock">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m7.5 4.27 9 5.15"/>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5"/>
          <path d="M12 22V12"/>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-label">Total Unit Stok</span>
        <span class="stat-value">{{ totalStock }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  assets: {
    type: Array,
    default: () => [],
  },
});

// Perhitungan metrik ringkasan inventaris
const totalAssets = computed(() => props.assets.length);

const consumableCount = computed(() =>
  props.assets.filter((a) => a.category === 'Consumable').length
);

const nonConsumableCount = computed(() =>
  props.assets.filter((a) => a.category === 'Non-Consumable').length
);

const totalStock = computed(() =>
  props.assets.reduce((sum, a) => sum + (Number(a.stock_quantity) || 0), 0)
);
</script>
