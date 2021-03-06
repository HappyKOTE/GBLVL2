import InputItem from './inputitem'

export default class FeedbackInputs {
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