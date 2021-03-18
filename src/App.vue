<template>
  <div class="mt-5 mb-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-2">
          <h3 class="mb-4">Добавить товар</h3>
          <AddItem />
        </div>
        <div class="col-5">
          <h3 class="mb-4">Каталог</h3>
          <Catalog />
        </div>
        <div class="col-5">
          <h3 class="mb-4">Корзина</h3>
          <Cart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddItem from "./components/catalog/AddItem.vue";
import Catalog from "./components/catalog/Catalog.vue";
import Cart from "./components/cart/Cart.vue";

export default {
  data() {
    return {};
  },
  components: { AddItem, Catalog, Cart },
  methods: {},
};
</script>

<style module>
</style>