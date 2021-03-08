<template>
  <div class="cart-list">
    <div
      v-for="item in items"
      :key="item.id"
      class="card position-relative mb-4 shadow-sm"
    >
      <div class="card-body">
        <button
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
              <button class="btn btn-outline-secondary">➖</button>
              <div class="input-group-text">{{ item.count }}</div>
              <button class="btn btn-outline-secondary">➕</button>
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
    return {
      items: [],
    };
  },
  props: {
    items: Array,
  },
  methods: {
    cartRemove() {},
    itemPlus() {},
    itemMinus() {},
  },
};
</script>

<style module>
</style>