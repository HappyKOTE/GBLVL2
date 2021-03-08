<template>
  <div class="row">
    <div v-for="item in items" :key="item.id" class="col-md-12 col-lg-6 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <div
            class="good-img"
            :style="{ backgroundImage: 'url(' + item.img + ')' }"
          ></div>
          <h5 class="card-title truncate" :title="item.name">
            {{ item.name }}
          </h5>
          <p class="card-text text-primary fw-bold">{{ item.price }} руб.</p>
          <button class="btn btn-primary w-100">Добавить в корзину</button>
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
    addToCart() {},
  },
};
</script>

<style module>
</style>