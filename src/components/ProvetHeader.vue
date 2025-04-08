<style>
.menu-item:hover {
  color: var(--n-color-accent);
  background-color: var(--n-color-surface);
}

.menu-item {
  text-align: center;
  padding: var(--n-space-s);
  border-radius: var(--n-border-radius);
  font-family: var(--n-font-family);
  font-feature-settings: var(--n-font-features);
  font-size: var(--_n-button-font-size);
  font-weight: var(--_n-button-font-weight);
  line-height: var(--n-line-height-form);
}

.header {
  border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
}

@media (max-width: 768px) {
  .header-logo {
    width: 25px;
    overflow: hidden;
  }
}
</style>
<template>
  <section class="n-grid-4 n-color-accent n-color-text-on-accent n-padding-xl header">
    <div class="n-padding-bs-s header-logo">
      <a href="/"><img src="../assets/logo.svg" alt="home" /></a>
    </div>
    <div class="menu-item">Hyaloral</div>
    <div class="menu-item">Hyalo Plus</div>
    <div class="menu-item">Condrovet Force HA</div>
  </section>
</template>
