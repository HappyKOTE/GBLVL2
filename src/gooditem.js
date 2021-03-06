import Button from './button'

export default class GoodItem {
    _name = ''
    _price = 0
    _img = ''
    _CartInstane = null

    constructor({ name, price, img }, CartInstane) {
        this._name = name
        this._price = price
        this._img = img
        this._CartInstane = CartInstane
    }

    addToCart() {
        this._CartInstane.add(this)
    }

    render(placeToRender) {
        const block = document.createElement('div')
        block.classList.add('col-md-12', 'col-lg-6', 'mb-4')
        block.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="good-img" style="background-image: url(${this._img});"></div>
                    <h5 class="card-title truncate" title="${this._name}">${this._name}</h5>
                    <p class="card-text text-primary fw-bold">${this._price} руб.</p>
                </div>
            </div>
            `
        let addBtn = block.querySelector('.card-body');
        const btn = new Button('Добавить в корзину', this.addToCart.bind(this))
        btn.render(addBtn)
        placeToRender.appendChild(block)
    }
}