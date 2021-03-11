<template>
  <section>
    <div class="row">
      <CatalogItem v-for="id in getItemsOnPage" :id="id" :key="id" />
    </div>
  </section>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: { CatalogItem },
  methods: {
    ...mapMutations(["setData"]),
    ...mapActions(["requestData"]),
  },
  computed: {
    ...mapGetters(["getData", "getItemsOnPage"]),
  },
  created() {
    this.requestData(1);
  },
};
</script>

<style module>
</style>