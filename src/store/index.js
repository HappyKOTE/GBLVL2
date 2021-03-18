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
            state.data = { ...state.data, ...payload.newData }
            state.itemsOnPage.push(...Object.keys(payload.newData))
        },
        setCart(state, payload) {
            state.itemsInCart.push(...payload)
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
                state.itemsInCart.splice(state.itemsInCart.indexOf(id), 1);
            }
        },
        resetItemCart(state, id) {
            state.itemsInCart.splice(state.itemsInCart.indexOf(id), 1);
        },
        fullCartReset(state) {
            state.itemsInCart = []
        },
    },
    getters: {
        getData: state => state.data,
        getCart: state => state.itemsInCart,
        getItemsOnPage: state => state.itemsOnPage,
        getItemsInCart: state => state.itemsInCart,
        getFullPrice: state => {
            return state.itemsInCart.reduce((result, current) => result + state.data[current].price * state.data[current].count, 0)
        },
    },
    actions: {
        requestData({ commit }, page) {
            fetch(`/itemslist/${page}`, {
                method: 'GET',
            })
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    commit('setData', { newData: res })
                })
        },
        requestCart({ commit }) {
            fetch(`/cartlist`, {
                method: 'GET',
            })
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    commit('setCart', res)
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
        addItem({ }, data) {
            fetch('/itemslist', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    return res.json()
                })
        },
    },
});