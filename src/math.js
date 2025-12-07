/**
 * 2차원 배열로 되어있는 함수에 X값을 대입한 값을 반환해줌
 * @param equation 방정식
 * @param x x값
 * @returns 방정식에 x값을 대입한 결과값
 */
function equation_calc(equation, x) {
    let temp = 0;
    for (let i = 1; i < equation.length; i++) {
        temp += equation[i] * Math.pow(x, i);
    }
    return temp;
}

/**
    * 방정식을 미분하여 반환해줌
 * @param equation 방정식
 * @param x x값
 * @returns
 */
function differentiate(equation, x){
    let temp_arr = [];
    for (let i = 0; i <equation.length-1; i++) {
        temp_arr[i] = equation[i] * (i+1);
    }
    if(x!==undefined){
        return equation_calc(temp_arr, x);
    }
    return temp_arr;
}
