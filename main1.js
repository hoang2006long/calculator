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
    autoAddMultiplicationSignToSquareRoot(arrayHandle,element,btn) {
        if (btn.name === "Ans" && btn.value != '') {
            element.value = 'addMultiplication'
        } else {
            if (
                (!isNaN(arrayHandle[arrayHandle.length-1]) |
                btn.value === 'addMultiplication') 
                ) {
                    element.value = '*Math.sqrt('
                }
            else element.value = 'Math.sqrt('
        }
    },
    handleNotToSpamSign(btn, arrayHandle, arrayUser) {
        if (
            btn.value === '+' |
            btn.value === '-' |
            btn.value === '*' |
            btn.value === '/' |
            btn.value === '**' 
            ) {
                if (
                arrayHandle[arrayHandle.length-2] === '+'| 
                arrayHandle[arrayHandle.length-2] === '-'|
                arrayHandle[arrayHandle.length-2] === '*'|
                arrayHandle[arrayHandle.length-2] === '/'|
                arrayHandle[arrayHandle.length-2] === '**'
            ) {
             arrayUser.pop()
             arrayHandle.pop()
            }
        }
    },
    blockTypingSignWhenStart(btn, arrayHandle, arrayUser) {
        if ( (btn.value === '+'|
            btn.value === '-'|
            btn.value === '*'|
            btn.value === '/'|
            btn.value === '/100'|
            btn.value === ')'|
            btn.value === '**') 
        ) { 
            if (!arrayHandle[1]) {
                arrayHandle.pop()
                arrayUser.pop()
              
            }
        }
        
    },
    handleEvent() {
        const _this = this
        let arrayHandle = [], arrayUser = []
        let total = 0

        btns.forEach(btn => {
            btn.onclick = function() {
                _this.autoAddMultiplicationSignToSquareRoot(arrayHandle,$('.squareRoot'),btn)

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
                        arrayHandle[arrayHandle.length-1] === 'Math.sqrt(' | 
                        !arrayHandle[0]
                    ) {
                        
                    } 
                    else {
                        total = eval(_this.autoAddParenthesis(arrayHandle.join(''))) 
                        arrayUser = [total.toString()]
                        arrayHandle = [total.toString()]
                        inputScreen.value = total
                        $('.Ans').value = `(${total})`
                    }
                } 

                _this.handleNotToSpamSign(btn, arrayHandle, arrayUser)
                _this.blockTypingSignWhenStart(btn, arrayHandle, arrayUser)
                
                inputScreen.value = arrayUser.join('')
            }
        })
    }
}
calculator.handleEvent()