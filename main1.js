const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btns = $$('.btn')
const inputScreen = $('.screen')

const calculator = {
    autoAddParenthesis(stringHandle) {
        let closingParenthesis = 0
        let openingParenthesis = 0
        for (let i = 0; i < stringHandle.length; i++) {
            if (stringHandle[i] === ')') closingParenthesis++
            else if (stringHandle[i] === '(') openingParenthesis++
        }

        if (openingParenthesis > closingParenthesis) {
            for (let i = 0; i < openingParenthesis-closingParenthesis; i++) {
                stringHandle += ')' 
            }
        } else if (openingParenthesis < closingParenthesis) {
            for (let i = 0; i < closingParenthesis-openingParenthesis; i++) {
                stringHandle = '(' + stringHandle
            }
        }
        return stringHandle
    },
    autoAddMultiplicationSignToSquareRoot(element,btn) {
        if (
            (!isNaN(btn.value) || 
            btn.value[btn.value.length - 1] === ')') 
            ) {
                element.value = '*Math.sqrt('
            }
        else {element.value = 'Math.sqrt('}
    },
    handleEvent() {
        const _this = this
        let arrayHandle = [], arrayUser = []
        let total = 0

        btns.forEach(btn => {
            btn.onclick = function() {
                _this.autoAddMultiplicationSignToSquareRoot($('.squareRoot'),btn)
                if (btn.value !== '') {
                    arrayHandle.push(btn.value)
                    arrayUser.push(btn.name)
                }

                if (btn.name === 'Del') {
                    arrayHandle = []
                    arrayUser = []
                    inputScreen.value = ''
                }
                else if (btn.name === 'C') {
                    arrayUser.pop()
                    arrayHandle.pop()
                } else if (btn.name === '=') {
                    if ( 
                        arrayHandle[arrayHandle.length-1] === '+'| 
                        arrayHandle[arrayHandle.length-1] === '-'|
                        arrayHandle[arrayHandle.length-1] === '*'|
                        arrayHandle[arrayHandle.length-1] === '/'|
                        arrayHandle[arrayHandle.length-1] === '**'|
                        arrayHandle[arrayHandle.length-1] === 'Math.sqrt(' | 
                        !arrayHandle[0]
                        ) {
                        // không làm gì cả
                    } else {
                        total = eval(_this.autoAddParenthesis(arrayHandle.join(''))) 
                        arrayUser = [total.toString()]
                        arrayHandle = [total.toString()]
                        inputScreen.value = total
                        $('.Ans').value = `(${total})`
                    }
                } 
                
                inputScreen.value = arrayUser.join('')
            }
        })
    }
}
calculator.handleEvent()


   