import Button from './button'
import './style.css'

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
        renderTruncate()
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

class Cart {
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

class CartItem {
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

class FeedbackInputs {
    _inputs = []

    fetchInputs() {
        return [
            { placeholder: "Имя содержит только буквы", type: "name", text: "имя", id: "floatingName", },
            { placeholder: "Телефон в формате +7(000)000-0000", type: "tel", text: "телефон", id: "floatingPhone", },
            { placeholder: "name@example.com", type: "email", text: "email", id: "floatingEmail", },
            { placeholder: "без проверки", type: "text", text: "пишите что хотите", id: "floatingOthers", }
        ]
    }

    constructor() {
        let inputs = this.fetchInputs()
        inputs = inputs.map(item => {
            return new InputItem(item)
        })
        this._inputs = inputs
        this.render()
    }

    render() {
        this._inputs.forEach(input => {
            input.render()
            input.validate()
        })
    }
}

class InputItem {
    _placeholder = ''
    _type = ''
    _text = ''
    _id = ''

    constructor({ placeholder, type, text, id }) {
        this._placeholder = placeholder
        this._type = type
        this._text = text
        this._id = id
    }

    validate() {
        const validInput = document.getElementById(this._id)
        validInput.addEventListener('change', () => {
            const text = validInput.value
            let re = /./
            if (this._type === 'name') {
                re = /^[A-ZА-Я]{1,32}$/i
            } else if (this._type === 'tel') {
                re = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
            } else if (this._type === 'email') {
                re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
            } else {
                re = false
            }
            if (re) {
                const result = text.match(re);
                if (!result) {
                    validInput.classList.remove('is-valid')
                    validInput.classList.add('is-invalid')
                    console.warn('некорректно заполнено поле: ' + this._text)
                } else {
                    validInput.classList.remove('is-invalid')
                    validInput.classList.add('is-valid')
                    console.log('корректно заполнено поле: ' + this._text)
                }
            }
        });
    }

    render() {
        const placeToRender = document.querySelector('.modal-body')
        if (placeToRender) {
            const block = document.createElement('form')
            block.classList.add('needs-validation')
            block.innerHTML = `
            <div class="form-floating mb-3">
                <input type="${this._type}" class="form-control" id="${this._id}" placeholder="${this._placeholder}">
                <label for="${this._id}">${this._text}</label>
            </div>
        `
            placeToRender.appendChild(block)
        }
    }
}

const CartInstane = new Cart()
new List(CartInstane)
new FeedbackInputs()

function createStyledWhiteSpaceNoWrapSpan(content) {
    const tempSpanElement = document.createElement("span");

    tempSpanElement.style.whiteSpace = "nowrap";
    tempSpanElement.className = "temp";
    tempSpanElement.innerHTML = content;

    return tempSpanElement;
}

function getContentWidth(pre_space, contentString, appendElement) {
    const pre = pre_space ? "&nbsp;" : "";
    const tempSpanElement = createStyledWhiteSpaceNoWrapSpan(
        `${pre}${contentString}`
    );

    appendElement.appendChild(tempSpanElement);

    const width = tempSpanElement.getBoundingClientRect().width;

    appendElement.removeChild(tempSpanElement);

    return width;
}

function debugging(on, values) {
    if (on) {
        console.log("=====================");
        console.log("current_line: ", values.current_line);
        console.log("word: ", values.word);
        console.log("line_width: ", values.line_width);
        console.log("width: ", values.element.getBoundingClientRect().width);
        console.log(
            "line_width >= width: ",
            values.line_width >= values.element.getBoundingClientRect().width
        );
        console.log("=====================");
    }
}

function detectOriginalTextAsDataAttribute(element) {
    return element.dataset.thellipsisOriginalText !== undefined;
}

function getOriginalText(element) {
    if (detectOriginalTextAsDataAttribute(element))
        return element.dataset.thellipsisOriginalText;
    else return element.innerText;
}

function applyMultilineEllipsisWithMaxLines(lines, max_lines, max_line_width) {
    const end_index = lines.length - 1;
    const line_index = max_lines - 1;

    if (lines.length > max_lines) {
        lines[line_index] =
            '<span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: ' +
            parseInt(max_line_width) +
            'px; display: inline-block;">' +
            lines[line_index];
        lines[end_index] += "</span>";
    }
}

function calculateLinesContentWordByWordToFitIntoWidth(
    text,
    element,
    max_lines,
    debug
) {
    const words = text.split(" ");
    let lines = [];
    let line_width = 0;
    let current_line = "";

    words.forEach(function (word, index) {
        if (lines.length > max_lines) {
            lines[lines.length - 1] += ` ${word}`;
            return; // continue
        }

        if (line_width == 0) {
            line_width += getContentWidth(false, word, element);
        } else {
            line_width += getContentWidth(true, word, element);
        }

        debugging(debug, {
            line_width,
            current_line,
            word,
            element
        });

        if (line_width >= element.getBoundingClientRect().width) {
            lines.push(current_line);

            line_width = getContentWidth(false, word, element); // new line
            current_line = "";
        }
        current_line += (current_line != "" ? " " : "") + word;

        if (index == words.length - 1) {
            lines.push(current_line);
        }
    });

    return lines;
}

function thellipsis(element, max_lines, debug) {
    const text = getOriginalText(element);
    const lines = calculateLinesContentWordByWordToFitIntoWidth(
        text,
        element,
        max_lines,
        debug
    );

    applyMultilineEllipsisWithMaxLines(lines, max_lines, element.offsetWidth);

    if (!detectOriginalTextAsDataAttribute(element))
        element.dataset.thellipsisOriginalText = text;

    element.innerHTML = lines.join(" ");
}

window.onresize = () => {
    renderTruncate()
}

window.renderTruncate = () => {
    let elementsThatShouldEllipsis = document.querySelectorAll('.truncate');
    Array.prototype.forEach.call(elementsThatShouldEllipsis, (element) => {
        thellipsis(element, 3, false);
    });
}

window.dispatchEvent(new Event("resize"));