<style>
.menu-item:hover {
  color: var(--n-color-accent);
  background-color: var(--n-color-surface);
}

.menu-item {
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  font-family: var(--n-font-family);
  font-feature-settings: var(--n-font-features);
  font-size: var(--_n-button-font-size);
  font-weight: var(--_n-button-font-weight);
  line-height: var(--n-line-height-form);
}

.header {
  border-radius: 4px 4px 0 0;
}
</style>
<template>
  <section class="n-grid-4 n-color-accent n-color-text-on-accent n-padding-xl header">
    <div class="n-padding-bs-s">
      <a href="/"><img src="../assets/logo.svg" alt="home" /></a>
    </div>
    <div class="menu-item">Hyaloral</div>
    <div class="menu-item">Hyalo Plus</div>
    <div class="menu-item">Condrovet Force HA</div>
  </section>
</template>
