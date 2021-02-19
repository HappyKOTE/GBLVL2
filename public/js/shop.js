let itemsInPage = [
    { name: 'Видеокарта ASUS TUF Gaming GeForce GTX 1650 OC 4 GB (TUF-GTX1650-O4GD6-P-GAMING)', price: 17500, img: 'img/good-1.jpg', id: 'aaa' },
    { name: 'Видеокарта GIGABYTE GeForce GTX 1660 SUPER OC 6G (GV-N166SOC-6GD)', price: 49990, img: 'img/good-2.jpg', id: 'bbb' },
    { name: 'Видеокарта MSI GeForce GTX 1660 VENTUS XS 6G OC', price: 40598, img: 'img/good-3.jpg', id: 'ccc' },
    { name: 'Видеокарта ASUS Cerberus GeForce GTX 1050 Ti Advanced 4GB (CERBERUS-GTX1050TI-A4G)', price: 17390, img: 'img/good-4.jpg', id: 'ddd' },
]

let itemsInCart = [
    { name: 'Видеокарта ASUS TUF Gaming GeForce GTX 1650 OC 4 GB (TUF-GTX1650-O4GD6-P-GAMING)', price: 17500, img: 'img/good-1.jpg', id: 'aaa', count: 1 },
    //{ name: 'Видеокарта GIGABYTE GeForce GTX 1660 SUPER OC 6G (GV-N166SOC-6GD)', price: 49990, img: 'img/good-2.jpg', id: 'bbb', count: 1 },
]

class CartSumm {
    constructor() {
        this.render()
    }
    render() {
        if (itemsInCart.length > 0) {
            const placeToRender = document.querySelector('.cart-price')
            if (placeToRender) {
                let summ = null
                for (let i = 0; i < itemsInCart.length; i++) {
                    summ += (itemsInCart[i].price * itemsInCart[i].count)
                }
                placeToRender.innerHTML = `
            <div class="card bg-success text-white mb-4">
                <div class="card-header">Общая сумма заказа</div>
                <div id="cart-summ" class="card-body fs-3">${summ} руб.</div>
            </div>`
            }
        }
    }
}

if (itemsInCart.length > 0) {
    document.getElementById('cart-reset').innerHTML = '<button type="reset" id="reset-cart-btn" class="float-end btn btn-outline-secondary">Очистить корзину</button>'
    document.getElementById('reset-cart-btn').addEventListener('click', resetCart)
} else {
    document.querySelector('.cart-price').innerHTML = 'Эй майнер, твоя корзина пуста 😪'
}
function resetCart() {
    itemsInCart.length = 0;
}

class ItemList {
    _items = []
    constructor(CartInstane) {
        let goods = this.fetchGoods()
        goods = goods.map(item => {
            return new CatalogItem(item, CartInstane)
        })
        this._items = goods
        this.render()
    }
    fetchGoods() {
        return itemsInPage
    }
    render() {
        this._items.forEach(Good => {
            Good.render()
        })
    }

}

class CartList {
    _items = []
    constructor(CartInstane) {
        let goods = this.fetchGoods()
        goods = goods.map(item => {
            return new CartItem(item, CartInstane)
        })
        this._items = goods
        this.render()
    }
    fetchGoods() {
        return itemsInCart
    }
    render() {
        this._items.forEach(Good => {
            Good.render()
        })
    }
}

class CatalogItem {
    _name = ''
    _price = 0
    _img = 0
    _CartInstane = null
    constructor({ name, price, img }, CartInstane) {
        this._name = name
        this._price = price
        this._img = img
        this._CartInstane = CartInstane
    }
    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.classList.add('col-6', 'mb-4')
            const button = '<a href="#" class="btn btn-primary d-block">Добавить корзину</a>'
            block.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <div class="good-img" style="background-image: url(${this._img});"></div>
                    <h5 class="card-title" title="${this._name}">${this._name}</h5>
                    <p class="card-text text-primary fw-bold">${this._price} руб.</p>
                    ${button}
                </div>
            </div>`
            placeToRender.appendChild(block)
        }
    }
    addToCart() {
        console.log('Added!')
    }
}

class CartItem {
    _name = ''
    _price = 0
    _img = 0
    _CartInstane = null
    _count = 0
    constructor({ name, price, img }, CartInstane, count) {
        this._name = name
        this._price = price
        this._img = img
        this._CartInstane = CartInstane
        this._count = count
    }
    render() {
        const placeToRender = document.querySelector('.cart-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.classList.add('card', 'position-relative', 'mb-4')
            block.innerHTML = `
            <div class="card-body">
                <button class="position-absolute top-0 end-0 btn-close mt-2 me-2" type="button"></button>
                <div class="row">
                    <div class="col-3"><div class="good-img h-100" style="background-image: url(${this._img});"></div></div>
                    <div class="col-8">
                        <div class="fw-bold">${this._name}</div>
                        <div class="text-primary fw-bold mt-2 mb-2">${this._price} руб.</div>
                        <input type="number" value="1" class="form-control item-count">
                    </div>
                </div>
            </div>`
            placeToRender.appendChild(block)
        }
    }
}

new ItemList()
new CartList()
new CartSumm()