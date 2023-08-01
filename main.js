const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btns = $$('.btn')
const input = $('.screen')

const calculator = {
    handleEvent() {
        let arrayValue = [];
        let allValueOfBtn
        btns.forEach(btn => {
            btn.onclick = function() {
                if (btn.value === '=') {
                    allValueOfBtn = arrayValue.join('')
                    if (Number.isInteger(eval(allValueOfBtn))) {
                        input.value = eval(allValueOfBtn)
                    } else {
                        if (eval(allValueOfBtn)) {
                            input.value = eval(allValueOfBtn).toFixed(5)
                        }
                    }
                    arrayValue = []
                    arrayValue.push(input.value)
                    if (btn.value === 'C' | 'Del') {
                        allValueOfBtn = ''
                    }
                } else if (btn.value === 'Del') {
                    arrayValue = []
                    input.value = arrayValue
                } else if (btn.value === 'C') {
                    arrayValue.pop()
                    allValueOfBtn = arrayValue.join('')
                    input.value = allValueOfBtn
                    if (!allValueOfBtn) {
                        arrayValue = []
                        input.value = arrayValue
                    }
                } else {
                    input.value += btn.value
                    arrayValue.push(btn.value)
                }
            }
        });
    },
    start() {
        this.handleEvent()
    }
}

calculator.start()

