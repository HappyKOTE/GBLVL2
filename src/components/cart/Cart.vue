<template>
  <section>
    <div class="cart-list">
      <CartItem v-for="id in getItemsInCart" :id="id" :key="id" />
    </div>
    <button
      v-if="getItemsInCart.length > 0"
      class="btn btn-outline-danger w-100"
      @click="cartReset"
    >
      Удалить всё из корзины
    </button>
    <div
      v-if="getItemsInCart.length > 0"
      class="card bg-success text-white mb-4 mt-4 shadow-sm"
    >
      <div class="card-header">Общая сумма заказа</div>
      <div class="card-body fs-3">
        <span class="v-price">{{ getFullPrice }}</span> <small>&#8381;</small>
      </div>
    </div>
    <div v-if="getItemsInCart.length === 0">
      Эй майнер, твоя корзина пуста 😪
    </div>
  </section>
</template>

<script>
import CartItem from "./CartItem.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: { CartItem },
  methods: {
    ...mapMutations(["setData"]),
    ...mapActions(["requestData", "cartReset"]),
  },
  computed: {
    ...mapGetters(["getData", "getFullPrice", "getItemsInCart"]),
  },
};
</script>

<style module>
</style>