<template>
  <div class="col-md-12 col-lg-6 mb-4">
    <div class="card h-100 shadow-sm border-0">
      <div class="card-body">
        <div
          class="good-img"
          :style="{ backgroundImage: 'url(' + getItemImg + ')' }"
        ></div>
        <h5 class="card-title truncate" :title="getItemName">
          {{ getItemName }}
        </h5>
        <p class="card-text text-primary fw-bold">
          <span class="v-price">{{ getItemPrice }}</span> <small>&#8381;</small>
        </p>
        <button class="btn btn-primary w-100" @click="addToCart(id)">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    id: String,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["addCart"]),
    ...mapActions(["addToCart"]),
  },
  computed: {
    ...mapGetters(["getData", "getItemsOnPage"]),
    getItemName() {
      return this.getData[this.id].name;
    },
    getItemPrice() {
      return this.getData[this.id].price;
    },
    getItemImg() {
      return this.getData[this.id].img;
    },
  },
};
</script>

<style module>
</style>