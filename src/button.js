export default class Button {
    _text = ''
    _callback = null

    constructor(text, callback) {
        this._text = text
        this._callback = callback
    }

    onBtnClick() {
        const callback = this._callback
        if (typeof callback === 'function') {
            callback()
        }
    }

    getTemplate() {
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-primary', 'w-100')
        return btn
    }

    render(placeToRender) {
        if (placeToRender) {
            const btn = this.getTemplate()
            btn.innerHTML = this._text
            placeToRender.appendChild(btn)

            btn.addEventListener('click', () => {
                this.onBtnClick()
            })
        }
    }
}