const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btns = $$('.btn')
const input = $('.screen')

const calculator = {
    isError: false,
    squareRootOfTwo(newArrayValue) {  // hàm xử lý căn bậc 2
        let squareRootOfTwoIndexArray = []
        // lấy ra index của dấu căn và cho vào mảng
        for (let i = 0; i < newArrayValue.length; i++) {
            if (newArrayValue[i] === 'Math.sqrt(') {
                squareRootOfTwoIndexArray.push(i)
            } 
        }
        // tự động thêm dấu "*" khi trước dấu căn là 1 số
        for (let i of squareRootOfTwoIndexArray) {
            if (i != 0) {
                newArrayValue.splice(i, 0, '*')
            }
        }
    },
    characterConversion(arrayValue,newArrayValue) {  
        // hàm chuyển đổi các kí tự không hợp lệ thành hợp lệ và đẩy vào mảng newArrayValue
        arrayValue.forEach(valueInArray => {
            if (valueInArray === '^'){
                valueInArray = '**'
            }
            if (valueInArray === '√('){
                valueInArray = 'Math.sqrt('
            } 
            if (valueInArray === '÷') {
                valueInArray = '/'
            }
            if (valueInArray === '×') {
                valueInArray = '*'
            }
            newArrayValue.push(valueInArray)
        })
    },
    handleNumber(allValueOfBtn,num) {
        // nếu là số nguyên thì để nguyên
        // nếu là số thập phân thì làm tròn tới chữ số thứ 5
        let closingParenthesis = 0
        let openingParenthesis = 0

        for (let i of allValueOfBtn) {
            if (i == '(') openingParenthesis++
            if (i == ')') closingParenthesis++
        }

        if (closingParenthesis < openingParenthesis) {
            for (let i = 0; i < (openingParenthesis-closingParenthesis); i++) {
                allValueOfBtn+=(')')
            }
        } 
        if (closingParenthesis > openingParenthesis) {
            for (let i = 0; i < (closingParenthesis - openingParenthesis); i++) {
                allValueOfBtn ='(' + allValueOfBtn
            }
        }
        
        if (Number.isInteger(eval(allValueOfBtn))) {
            input.value = eval(allValueOfBtn)
        } else {
            if (eval(allValueOfBtn)) {
                input.value = eval(allValueOfBtn).toFixed(num)
            }
        }
    },
    deleteFirstCharacter(arrayValue,newArrayValue) {
        // nếu có dấu cách là phần tử đầu tiên thì xóa bỏ
        if (arrayValue[0] === '' | newArrayValue[0] === '') {
            arrayValue.shift()
            newArrayValue.shift()
        }
    },
    handleEvent() {
        /** chú ý
         *  - arrayValue chứa icon user nhìn thấy
         *  - newArrayValue chứa kí tự hợp lệ của hàm eval()
         * */ 
        const _this = this
        let arrayValue = []; // mảng chứa tất cả các giá trị là icon của button như (1,2,3,^,√(,÷,×)
        let newArrayValue = []; // mảng chứa tất cả các giá trị hợp lệ trong hàm eval() như (1,2,3,**,Math.srt(),/,*)
        let allValueOfBtn // chuỗi chứa tất cả giá trị của mảng newArrayValue (dùng hàm join())
        let index = 0 // index hiện tại của mỗi giá trị trong mảng

        // lặp qua tất cả các nút
        btns.forEach(btn => {
            btn.onclick = function() {
                function resetArray() {
                    arrayValue = []
                    newArrayValue = []
                }
                _this.deleteFirstCharacter(arrayValue,newArrayValue)

                if (btn.value === '=') {
                    _this.characterConversion(arrayValue,newArrayValue)
                    _this.squareRootOfTwo(newArrayValue)
                    allValueOfBtn = newArrayValue.join('')
                    
                    if (
                        allValueOfBtn.charAt(allValueOfBtn.length-1) === '+' |
                        allValueOfBtn.charAt(allValueOfBtn.length-1) === '-' |
                        allValueOfBtn.charAt(allValueOfBtn.length-1) === '*' |
                        allValueOfBtn.charAt(allValueOfBtn.length-1) === '/' |
                        allValueOfBtn.charAt(allValueOfBtn.length-11) === 'M' 
                        
                        ) {
                        _this.isError = true
                        arrayValue,newArrayValue = []
                    } else if (isNaN(Number.parseFloat(allValueOfBtn)) === 'false') {
                        _this.isError = true
                        arrayValue = []
                        newArrayValue = []
                    } else {
                        _this.isError = false
                    }
                    
                    _this.handleNumber(allValueOfBtn,5)
                    
                    // mỗi khi ấn dấu '=' thì thay thế kết quả cho tất cả các phần tử của mảng
                    console.log(allValueOfBtn)
                    console.log(!isNaN(Number.parseFloat(allValueOfBtn)))
                    resetArray()
                    arrayValue.push(input.value)
                    newArrayValue.push(input.value)
                } 
                else if (btn.value === 'Del') {
                    resetArray()
                    input.value = []
                } 
                else if (btn.value === 'C') {
                    index--
                    if (index <= 0) index = 0

                    // xóa phần tử cuối của 2 mảng
                    arrayValue.pop()
                    newArrayValue.pop()

                    allValueOfBtn = arrayValue.join('')

                    // đẩy arrayValue lên màn hình 
                    input.value = allValueOfBtn
                    
                    if (!allValueOfBtn) {
                        resetArray()
                        input.value = []
                    }
                } 
                else if ( 
                // không cho phép ấn dấu tại vị trí đầu tiên, trừ dấu '√(' và '(' 
                    (btn.value === '-' |
                    btn.value === '+' | 
                    btn.value === '×' | 
                    btn.value === '/100' | 
                    btn.value === '^' | 
                    btn.value === ')' |
                    btn.value === '÷' |
                    btn.value === '/') && 
                    (arrayValue[0] === '' || arrayValue[0] === undefined) |
                    // không cho phép ấn các dấu liên tục
                    ( arrayValue[index-1] === '+' | 
                    arrayValue[index-1] === '-' | 
                    arrayValue[index-1] === '×' | 
                    arrayValue[index-1] === '÷' | 
                    arrayValue[index-1] === '^' | 
                    arrayValue[index-1] === '√(' |
                    arrayValue[index-1] === '/100' ) ) 
                    {
                    // không làm gì cả
                } 
                else {
                        index++
                        input.value += btn.value
                        arrayValue.push(btn.value)
                }
            }
        });
    }
}

calculator.handleEvent()

