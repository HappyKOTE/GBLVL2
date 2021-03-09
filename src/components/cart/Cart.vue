<template>
  <section>
    <CartItem
      :items="this.items"
      @emptyCart="cartReset"
      @changeCartSumm="getCartSumm"
    />
    <a
      href="#"
      v-if="cartVisible"
      @click="cartReset"
      class="btn btn-outline-danger w-100"
      >Удалить всё из корзины</a
    >
    <div
      v-if="cartVisible"
      class="card bg-success text-white mb-4 mt-4 shadow-sm"
    >
      <div class="card-header">Общая сумма заказа</div>
      <div class="card-body fs-3">
        <span class="v-price">{{ cartSumm }}</span> <small>&#8381;</small>
      </div>
    </div>
  </section>
</template>

<script>
import CartItem from "./CartItem.vue";

export default {
  data() {
    return {
      cartVisible: true,
      cartSumm: 0,
      items: [
        {
          name: "Видеокарта ASUS TUF Gaming GeForce GTX 1650 OC 4 GB",
          price: 17500,
          img: "img/good-1.jpg",
          id: "aaa",
          count: 1,
        },
        {
          name: "Видеокарта GIGABYTE GeForce GTX 1660 SUPER OC 6G",
          price: 49990,
          img: "img/good-2.jpg",
          id: "bbb",
          count: 1,
        },
        {
          name: "Видеокарта MSI GeForce GTX 1660 VENTUS XS 6G OC",
          price: 40598,
          img: "img/good-3.jpg",
          id: "ccc",
          count: 1,
        },
        {
          name: "Видеокарта ASUS Cerberus GeForce GTX 1050 Ti Advanced 4GB",
          price: 17390,
          img: "img/good-4.jpg",
          id: "ddd",
          count: 1,
        },
      ],
    };
  },
  components: { CartItem },
  methods: {
    cartReset() {
      this.items = [];
      document.querySelector(".cart-list").innerHTML =
        "Эй майнер, твоя корзина пуста 😪";
      this.cartVisible = false;
    },
    getCartSumm() {
      this.cartSumm = 0;
      for (let i = 0; i < this.items.length; i++) {
        this.cartSumm += this.items[i].price * this.items[i].count;
      }
    },
  },
  mounted() {
    this.getCartSumm();
  },
};
</script>

<style module>
</style>