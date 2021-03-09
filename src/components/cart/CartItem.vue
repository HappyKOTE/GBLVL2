<template>
  <div class="cart-list">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="card mb-4 shadow-sm border-0"
    >
      <div class="card-body">
        <div class="row">
          <div class="col-3 d-none d-lg-block">
            <div
              class="good-img h-100"
              :style="{ backgroundImage: 'url(' + item.img + ')' }"
            ></div>
          </div>
          <div class="col-12 col-lg-9">
            <div class="fw-bold truncate mb-2" :title="item.name">
              {{ item.name }}
            </div>
            <div class="row align-items-center">
              <div class="col">
                <div class="text-primary fw-bold mt-2 mb-2 text-nowrap">
                  <span class="v-price">{{ item.price }}</span>
                  <small>&#8381;/шт.</small>
                </div>
              </div>
              <div class="col text-center">
                <div class="d-inline-block">
                  <div
                    class="d-flex flex-row align-items-center border rounded"
                  >
                    <div>
                      <button
                        class="btn btn-link link-secondary btn-sm align-self-center"
                        @click="itemMinus(index)"
                      >
                        <i class="fas fa-minus fa-fw"></i>
                      </button>
                    </div>
                    <div class="align-self-center">{{ item.count }}</div>
                    <div>
                      <button
                        class="btn btn-link link-secondary btn-sm align-self-center"
                        @click="itemPlus(index)"
                      >
                        <i class="fas fa-plus fa-fw"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col text-end">
                <button
                  class="btn btn-link link-secondary btn-sm align-self-center"
                  @click="itemRemove(index)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    items: Array,
  },
  methods: {
    itemRemove(index) {
      this.items.splice(index, 1);
      this.$emit("changeCartSumm");
      if (this.items.length == 0) {
        this.$emit("emptyCart");
      }
    },
    itemPlus(index) {
      this.items[index].count++;
      this.$emit("changeCartSumm");
    },
    itemMinus(index) {
      this.items[index].count--;
      if (this.items[index].count < 1) {
        this.itemRemove(index);
      }
      this.$emit("changeCartSumm");
    },
  },
};
</script>

<style module>
</style>