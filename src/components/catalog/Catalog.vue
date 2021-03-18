<template>
  <section>
    <div class="row">
      <CatalogItem v-for="id in getItemsOnPage" :id="id" :key="id" />
    </div>
    <button
      v-if="loadMoreVisible"
      class="btn btn-outline-primary w-100"
      @click="loadMoreData"
    >
      Загрузить ещё
    </button>
  </section>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    CatalogItem,
  },
  data() {
    return {
      page: 0,
      lastPage: 3,
      loadMoreVisible: true,
    };
  },
  methods: {
    ...mapMutations(["setData"]),
    ...mapActions(["requestData"]),
    loadMoreData() {
      this.page++;
      if (this.page === this.lastPage) {
        this.loadMoreVisible = false;
      }
      this.requestData(this.page);
    },
  },
  computed: {
    ...mapGetters(["getData", "getItemsOnPage"]),
  },
  created() {
    this.loadMoreData();
  },
};
</script>

<style module>
</style>