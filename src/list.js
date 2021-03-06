import GoodItem from './gooditem'

export default class List {
    _items = []
    _page = 1
    _CartInstane = null

    constructor(CartInstane) {
        this._CartInstane = CartInstane
        this.initShowMoreButton()
        this.fetchGoods()
    }

    initShowMoreButton() {
        const showMoreBtn = document.querySelector('#showmore')
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                this._page++
                this.fetchGoods()
            })
        }
    }

    fetchGoods() {
        const url = `./api/items${this._page}.json`;
        return fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const goods = data.data.map(item => {
                    return new GoodItem(item, this._CartInstane)
                })
                this._items = [...this._items, ...goods]
                return this._items
            })
            .then(this.render.bind(this))
            .catch((err) => {
                alert('Больше страниц нет')
                const showMoreBtn = document.querySelector('#showmore')
                showMoreBtn.classList.add('invisible')
            });
    }

    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            placeToRender.innerHTML = ''
            this._items.forEach(Good => {
                Good.render(placeToRender)
            })
        }
        renderTruncate()
    }
}