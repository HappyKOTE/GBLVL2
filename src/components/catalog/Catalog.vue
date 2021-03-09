<template>
  <section>
    <CatalogItem :items="this.items" />
  </section>
</template>

<script>
import CatalogItem from "./CatalogItem.vue";

export default {
  data() {
    return {
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
  components: { CatalogItem },
  methods: {},
};
</script>

<style module>
</style>