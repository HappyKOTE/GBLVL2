<template>
  <div class="card mb-4 shadow-sm border-0">
    <div class="card-body">
      <div class="row">
        <div class="col-3 d-none d-lg-block">
          <div
            class="good-img h-100"
            :style="{ backgroundImage: 'url(' + getItemImg + ')' }"
          ></div>
        </div>
        <div class="col-12 col-lg-9">
          <div class="fw-bold truncate mb-2" :title="getItemName">
            {{ getItemName }}
          </div>
          <div class="row align-items-center">
            <div class="col-12 col-md-4">
              <div class="text-primary fw-bold mt-2 mb-2 text-nowrap">
                <span class="v-price">{{ getItemPrice }}</span>
                <small>&#8381;</small>
              </div>
            </div>
            <div class="col-6 col-md-4 text-left text-md-center">
              <div class="d-inline-block">
                <div class="d-flex flex-row align-items-center border rounded">
                  <div>
                    <button
                      class="btn btn-link link-secondary btn-sm align-self-center"
                      @click="removeFromCart(id)"
                    >
                      <i class="fas fa-minus fa-fw"></i>
                    </button>
                  </div>
                  <div class="align-self-center">{{ getItemCount }}</div>
                  <div>
                    <button
                      class="btn btn-link link-secondary btn-sm align-self-center"
                      @click="addToCart(id)"
                    >
                      <i class="fas fa-plus fa-fw"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 text-end">
              <button
                class="btn btn-link link-secondary btn-sm align-self-center"
                @click="resetItemInCart(id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
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
    ...mapMutations(["addCart", "removeCart", "resetItemCart"]),
    ...mapActions(["addToCart", "removeFromCart", "resetItemInCart"]),
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
    getItemCount() {
      return this.getData[this.id].count;
    },
  },
};
</script>

<style module>
</style>