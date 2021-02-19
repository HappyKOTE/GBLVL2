let itemsInPage = [
    { name: 'Видеокарта ASUS TUF Gaming GeForce GTX 1650 OC 4 GB (TUF-GTX1650-O4GD6-P-GAMING)', price: 17500, img: 'img/good-1.jpg', id: 'aaa', count: 1 },
    { name: 'Видеокарта GIGABYTE GeForce GTX 1660 SUPER OC 6G (GV-N166SOC-6GD)', price: 49990, img: 'img/good-2.jpg', id: 'bbb', count: 1 },
    { name: 'Видеокарта MSI GeForce GTX 1660 VENTUS XS 6G OC', price: 40598, img: 'img/good-3.jpg', id: 'ccc', count: 1 },
    { name: 'Видеокарта ASUS Cerberus GeForce GTX 1050 Ti Advanced 4GB (CERBERUS-GTX1050TI-A4G)', price: 17390, img: 'img/good-4.jpg', id: 'ddd', count: 1 },
]

let itemsInCart = []

// класс для суммы в корзине
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

class CatalogItem {
    _name = ''
    _price = 0
    _img = 0
    _CartInstane = null
    _dataId = undefined
    constructor({ name, price, img, id }, CartInstane) {
        this._name = name
        this._price = price
        this._img = img
        this._CartInstane = CartInstane
        this._dataId = id
    }
    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.classList.add('col-6', 'mb-4')
            block.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <div class="good-img" style="background-image: url(${this._img});"></div>
                    <h5 class="card-title" title="${this._name}">${this._name}</h5>
                    <p class="card-text text-primary fw-bold">${this._price} руб.</p>
                    <a href="#" class="btn btn-primary d-block" onclick="addToCart('${this._dataId}')">Добавить корзину</a>
                </div>
            </div>`
            placeToRender.appendChild(block)
        }
    }
}

// иной способ рендеринга списка товаров в корзине. можно и через класс, но помучавшись упростил функцию
function renderCartList() {
    const placeToRender = document.querySelector('.cart-list')
    if (itemsInCart.length > 0 && placeToRender) {
        placeToRender.innerHTML = ''
        for (let i = 0; i < itemsInCart.length; i++) {
            const block = document.createElement('div')
            block.classList.add('card', 'position-relative', 'mb-4')
            block.innerHTML = `
            <div class="card-body cart-items">
                <button class="position-absolute top-0 end-0 btn-close mt-2 me-2" type="button" onclick="removeFromCart('${itemsInCart[i].id}')"></button>
                <div class="row">
                    <div class="col-3"><div class="good-img h-100" style="background-image: url(${itemsInCart[i].img});"></div></div>
                    <div class="col-8">
                        <div class="fw-bold">${itemsInCart[i].name}</div>
                        <div class="text-primary fw-bold mt-2 mb-2">${itemsInCart[i].price} руб.</div>
                        <input type="number" value="${itemsInCart[i].count}" class="form-control item-count" data-id="${itemsInCart[i].id}" onchange="changeCount('${itemsInCart[i].id}')">
                    </div>
                </div>
            </div>`
            placeToRender.appendChild(block)
        }
    }
}

new ItemList()
renderReset()

// по id ищем айтем в массиве каталога и сравниваем с айтемами в массиве корзины
// если находим, что в корзине уже есть такой элемент, увеличиваем его количество и обновляем корзину на странице
function addToCart(a) {
    let addItem = itemsInPage.find(item => item.id == a)
    let existItem = itemsInCart.find(item => item.id == a)
    if (addItem == existItem) {
        let itemIndex = itemsInCart.findIndex(item => item.id == a)
        itemsInCart[itemIndex].count += 1
    } else {
        itemsInCart.unshift(addItem)
    }
    renderCartList()
    new CartSumm()
    renderReset()
}

// по id ищем айтем в массиве корзины и найдя удаляем из массива корзины
// так же есть проверка, если мы удалили все айтемы из корзины, принудительно обнуляем корзину до первоначального вида
function removeFromCart(a) {
    let itemIndex = itemsInCart.findIndex(item => item.id == a)
    itemsInCart.splice(itemIndex, 1)
    if (itemsInCart.length == 0) {
        fullClearCart()
    }
    renderCartList()
    new CartSumm()
    renderReset()
}

// по id ищем айтем в массиве корзины и ищем значение input которое ввёл пользователь
// затем вносим пользовательское значение в массив и обновляем корзину
function changeCount(a) {
    let itemIndex = itemsInCart.findIndex(item => item.id == a)
    let input = document.querySelector('[data-id="' + a + '"]')
    itemsInCart[itemIndex].count = input.value
    renderCartList()
    new CartSumm()
}

// отображаем кнопку с очисткой корзины, если в ней что-то есть или выводим надпись о том что корзина пуста
function renderReset() {
    if (itemsInCart.length > 0) {
        document.getElementById('cart-reset').innerHTML = '<button type="reset" id="reset-cart-btn" class="float-end btn btn-outline-secondary">Очистить корзину</button>'
        document.getElementById('reset-cart-btn').addEventListener('click', fullClearCart)
    } else {
        document.querySelector('.cart-price').innerHTML = 'Эй майнер, твоя корзина пуста 😪'
    }
}

// принудительное обнуление содержимого корзины при отрисовке
function fullClearCart() {
    itemsInCart = []
    document.querySelector('.cart-list').innerHTML = ''
    document.getElementById('cart-reset').innerHTML = ''
    document.querySelector('.cart-price').innerHTML = ''
    renderReset()
}