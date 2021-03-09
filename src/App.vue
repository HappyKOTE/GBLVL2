<template>
  <div class="mt-5 mb-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <h3 class="mb-4">Каталог</h3>
          <Catalog />
        </div>
        <div class="col">
          <h3 class="mb-4">Корзина</h3>
          <Cart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Catalog from "./components/catalog/Catalog.vue";
import Cart from "./components/cart/Cart.vue";

export default {
  data() {
    return {};
  },
  components: { Catalog, Cart },
  methods: {},
};
</script>

<style module>
</style>