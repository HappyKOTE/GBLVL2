import Button from './button'

class RemoveCartButton extends Button {
    getTemplate() {
        const btn = document.createElement('button')
        btn.classList.add('position-absolute', 'top-0', 'end-0', 'btn-close', 'mt-2', 'me-2')
        return btn
    }
}

class CartCountButton extends Button {
    getTemplate() {
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-outline-secondary')
        return btn
    }
}

export default class CartItem {
    _name = ''
    _price = 0
    counter = 1
    _img = ''
    _CartInstance = null

    constructor({ name, price, img }, CartInstance) {
        this._name = name
        this._price = price
        this._img = img
        this._CartInstance = CartInstance
    }

    removeFromCart() {
        this._CartInstance.remove()
    }

    countMinus() {
        this._CartInstance.add(this, -1)
    }

    countPlus() {
        this._CartInstance.add(this)
    }

    render(placeToRender) {
        const block = document.createElement('div')
        block.classList.add('card', 'position-relative', 'mb-4', 'shadow-sm')
        block.innerHTML = `
            <div class="card-body cart-items">
                <div class="row">
                    <div class="col-3"><div class="good-img h-100" style="background-image: url(${this._img});"></div></div>
                    <div class="col-8">
                        <div class="fw-bold truncate" title="${this._name}">${this._name}</div>
                        <div class="text-primary fw-bold mt-2 mb-2">${this._price} руб.</div>
                        <div class="input-group input-group-sm"></div>
                    </div>
                </div>
            </div>
        `
        const btn = new RemoveCartButton('', this.removeFromCart.bind(this))
        btn.render(block)

        const addBtnBlock = block.querySelector('.input-group');
        const btnMinus = new CartCountButton('➖', this.countMinus.bind(this))
        btnMinus.render(addBtnBlock)

        const countBlock = document.createElement('div')
        countBlock.classList.add('input-group-text')
        countBlock.innerHTML = `${this.counter}`
        addBtnBlock.appendChild(countBlock)

        const btnPlus = new CartCountButton('➕', this.countPlus.bind(this))
        btnPlus.render(addBtnBlock)

        placeToRender.appendChild(block)
    }
}