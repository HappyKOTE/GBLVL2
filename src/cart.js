import CartItem from './cartitem'
import Button from './button'

export default class Cart {
    _items = []

    add(GoodItemInstance, count = 1) {
        const FoundItem = this._items.find((CartItem) => {
            return CartItem._name === GoodItemInstance._name
        })
        if (FoundItem) {
            FoundItem.counter += count
        } else {
            this._items.push(new CartItem({
                name: GoodItemInstance._name,
                price: GoodItemInstance._price,
                img: GoodItemInstance._img,
            }, this))
        }
        this.render()
    }

    remove() {
        const itemIndex = this._items.findIndex(item => item._name == this._items._name)
        this._items.splice(itemIndex, 1)
        if (this._items.length == 0) {
            this.resetCart()
        } else {
            this.render()
        }
    }

    render() {
        const placeToRender = document.querySelector('.cart-list')
        if (placeToRender) {
            placeToRender.innerHTML = ''
        }

        this._items.forEach(CartItemInstance => {
            CartItemInstance.render(placeToRender)
        })

        const btn = new Button('Сбросить корзину', this.resetCart.bind(this))
        btn.render(placeToRender)

        let summ = 0
        for (let i = 0; i < this._items.length; i++) {
            summ += this._items[i]._price * this._items[i].counter
        }
        const summBlock = document.createElement('div')
        summBlock.innerHTML = `
        <div class="card bg-success text-white mb-4 mt-4 shadow-sm">
            <div class="card-header">Общая сумма заказа</div>
            <div class="card-body fs-3">${summ} руб.</div>
        </div>
        `
        placeToRender.appendChild(summBlock)
        renderTruncate()
    }

    resetCart() {
        this._items = []
        this.render()
        document.querySelector('.cart-list').innerHTML = 'Эй майнер, твоя корзина пуста 😪'
    }
}