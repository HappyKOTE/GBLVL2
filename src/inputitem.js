export default class InputItem {
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