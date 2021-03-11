import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: {},
        itemsOnPage: [],
        itemsInCart: [],
    },
    mutations: {
        setData(state, payload) {
            state.data = payload.newData
            state.itemsOnPage = Object.keys(payload.newData)
        },
        addCart(state, id) {
            if (!state.itemsInCart.includes(id)) {
                state.data[id].count = 1
                state.itemsInCart.push(id)
            } else {
                state.data[id].count++
            }
        },
        removeCart(state, id) {
            if (state.data[id].count > 1) {
                state.data[id].count--
            } else {
                state.itemsInCart.splice(id, 1)
            }
        },
        resetItemCart(state, id) {
            state.data[id].count = 1
            state.itemsInCart.splice(id, 1)
        },
        fullCartReset(state) {
            state.itemsInCart = []
        },
    },
    getters: {
        getData: state => state.data,
        getItemsOnPage: state => state.itemsOnPage,
        getItemsInCart: state => state.itemsInCart,
        getFullPrice: state => {
            return state.itemsInCart.reduce((result, current) => result + state.data[current].price * state.data[current].count, 0)
        },
    },
    actions: {
        requestData({ commit }, page) {
            fetch(`./api/items${page}.json`)
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    commit('setData', { newData: response })
                })
        },
        addToCart({ commit }, id) {
            commit('addCart', id)
        },
        removeFromCart({ commit }, id) {
            commit('removeCart', id)
        },
        resetItemInCart({ commit }, id) {
            commit('resetItemCart', id)
        },
        cartReset({ commit }) {
            commit('fullCartReset')
        },
    },
});