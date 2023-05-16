<template>
  <!-- eslint-disable -->
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === 1 }" @click.prevent="previosPage"
        aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNum in countPages" :key="pageNum">
      <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNum === currentPage }"
        @click.prevent="paginate(pageNum)">
        {{ pageNum }}
      </a>
    </li>
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === countPages }" @click.prevent="nextPage"
        aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['currentPage', 'countAllItems', 'itemsPerPage'],
  computed: {
    countPages() {
      return Math.ceil(this.countAllItems / this.itemsPerPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    nextPage() {
      if (this.currentPage < this.countPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
    previosPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
  },
};
</script>
