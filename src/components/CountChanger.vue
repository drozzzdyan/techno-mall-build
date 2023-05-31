<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decrement">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" :value="counter" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="increment">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['counter'],

  methods: {
    increment() {
      this.$emit('update:counter', this.counter + 1);
    },

    decrement() {
      if (this.counter > 1) {
        this.$emit('update:counter', this.counter - 1);
      }
    },
  },
};
</script>
