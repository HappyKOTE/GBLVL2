<template>
  <form
    class="p-3 bg-white rounded shadow-sm"
    @submit.prevent="addItemToServer"
  >
    <div class="mb-3">
      <label for="floatingInputName" class="form-label">Название</label>
      <input
        type="text"
        class="form-control"
        id="floatingInputName"
        v-model="name"
      />
    </div>
    <div class="mb-3">
      <label for="floatingInputPrice" class="form-label">Цена</label>
      <input
        type="number"
        class="form-control"
        id="floatingInputPrice"
        v-model.number="price"
      />
    </div>
    <input type="submit" value="Добавить" class="btn btn-primary" />
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      price: 0,
    };
  },
  methods: {
    ...mapActions(["addItem"]),
    addItemToServer() {
      const itemToAdd = {
        name: this.name,
        price: this.price,
        count: 1,
        img: "img/no_photo.png",
      };
      this.addItem(itemToAdd);
    },
  },
};
</script>

<style module>
</style>