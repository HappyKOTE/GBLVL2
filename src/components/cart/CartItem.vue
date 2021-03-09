<template>
  <div class="cart-list">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="card position-relative mb-4 shadow-sm"
    >
      <div class="card-body">
        <button
          @click="itemRemove(index)"
          class="position-absolute top-0 end-0 btn-close mt-2 me-2"
        ></button>
        <div class="row">
          <div class="col-3">
            <div
              class="good-img h-100"
              :style="{ backgroundImage: 'url(' + item.img + ')' }"
            ></div>
          </div>
          <div class="col-8">
            <div class="fw-bold truncate" :title="item.name">
              {{ item.name }}
            </div>
            <div class="text-primary fw-bold mt-2 mb-2">
              {{ item.price }} руб.
            </div>
            <div class="input-group input-group-sm">
              <button
                class="btn btn-outline-secondary"
                @click="itemMinus(index)"
              >
                <i class="fas fa-minus fa-fw"></i>
              </button>
              <div class="input-group-text">{{ item.count }}</div>
              <button
                class="btn btn-outline-secondary"
                @click="itemPlus(index)"
              >
                <i class="fas fa-plus fa-fw"></i>
              </button>
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