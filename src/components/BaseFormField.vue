<template>
  <!-- eslint-disable-next-line -->
  <label class="form__label">
    <!-- на место слота можно подставлять разметку, когда используем компонент -->
    <slot />
    <span class="form__value">{{ title }}</span>
    <span v-if="error" class="form__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: ['title', 'error'],
};
</script>
