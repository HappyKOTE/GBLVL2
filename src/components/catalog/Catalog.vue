<template>
  <section>
    <CatalogItem :items="this.items" />
    <button
      class="btn btn-outline-primary w-100"
      @click="showMore"
      v-if="showMoreVisible"
    >
      Показать ещё
    </button>
  </section>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";

export default {
  data() {
    return {
      items: [],
      page: 1,
      totalPages: 3,
      showMoreVisible: true,
    };
  },
  components: { CatalogItem },
  methods: {
    fetchCatalog(page) {
      fetch(`./api/items${page}.json`)
        .then((response) => response.json())
        .then((data) => (this.items = data))
        .catch((error) => console.log(error));
    },
    showMore() {
      this.page++;
      this.fetchCatalog(this.page);
      if (this.page == this.totalPages) {
        this.showMoreVisible = false;
      }
    },
  },
  created() {
    this.fetchCatalog(1);
  },
};
</script>

<style module>
</style>