class List {
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
    }
}

class GoodItem {
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
            <div class="card h-100">
                <div class="card-body">
                    <div class="good-img" style="background-image: url(${this._img});"></div>
                    <h5 class="card-title" title="${this._name}">${this._name}</h5>
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

class Cart {
    _items = []

    add(GoodItemInstance) {
        const FoundItem = this._items.find((CartItem) => {
            return CartItem._name === GoodItemInstance._name
        })
        if (FoundItem) {
            FoundItem.counter++
        } else {
            this._items.push(new CartItem({
                name: GoodItemInstance._name,
                price: GoodItemInstance._price,
                img: GoodItemInstance._img,
            }))
        }
        this.render()
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
        <div class="card bg-success text-white mb-4 mt-4">
            <div class="card-header">Общая сумма заказа</div>
            <div class="card-body fs-3">${summ} руб.</div>
        </div>
        `
        placeToRender.appendChild(summBlock)
    }

    resetCart() {
        this._items = []
        this.render()
        document.querySelector('.cart-list').innerHTML = 'Эй майнер, твоя корзина пуста 😪'
    }
}

class CartItem {
    _name = ''
    _price = 0
    counter = 1
    _img = ''

    constructor({ name, price, img }, CartInstane) {
        this._name = name
        this._price = price
        this._img = img
    }

    removeFromCart() {
        console.log('remove')
    }

    countMinus() {
        console.log('minus')
    }

    countPlus() {
        console.log('plus')
    }

    render(placeToRender) {
        const block = document.createElement('div')
        block.classList.add('card', 'position-relative', 'mb-4')
        block.innerHTML = `
            <div class="card-body cart-items">
                <div class="row">
                    <div class="col-3"><div class="good-img h-100" style="background-image: url(${this._img});"></div></div>
                    <div class="col-8">
                        <div class="fw-bold">${this._name}</div>
                        <div class="text-primary fw-bold mt-2 mb-2">${this._price} руб.</div>
                        <div class="input-group input-group-sm"></div>
                    </div>
                </div>
            </div>
        `
        const btn = new RemoveCartButton('', this.removeFromCart.bind(this))
        btn.render(block)

        const addBtnBlock = block.querySelector('.input-group');
        const btnMinus = new CartCountButton('<i class="bi bi-dash"></i>', this.countMinus.bind(this))
        btnMinus.render(addBtnBlock)

        const countBlock = document.createElement('div')
        countBlock.classList.add('input-group-text')
        countBlock.innerHTML = `${this.counter}`
        addBtnBlock.appendChild(countBlock)

        const btnPlus = new CartCountButton('<i class="bi bi-plus"></i>', this.countPlus.bind(this))
        btnPlus.render(addBtnBlock)

        placeToRender.appendChild(block)
    }
}

const CartInstane = new Cart()
new List(CartInstane)