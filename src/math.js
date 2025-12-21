/**
 * 2차원 배열로 되어있는 함수에 X값을 대입한 값을 반환해줌
 * @param equation 방정식
 * @param x x값
 * @returns 방정식에 x값을 대입한 결과값
 */
function equation_calc(equation, x) {
    let total = new Decimal(0);
    for (let i = 0; i < equation.length; i++) {
        let term = equation[i].times(x.pow(i));
        total = total.plus(term);
    }
    return total;
}

/**
    * 방정식을 미분하여 반환해줌
 * @param equation 방정식
 * @param x x값
 * @returns
 */
function differentiate(equation, x) {
    let temp_arr = [];
    for (let i = 1; i < equation.length; i++) {
        temp_arr[i - 1] = equation[i].mul(i);
    }
    while (temp_arr.length < equation.length) {
        temp_arr.push(new Decimal(0));
    }

    if (x !== undefined) {
        return equation_calc(temp_arr, x);
    }
    return temp_arr;
}

function formatNum(decimal) {
    const d = new Decimal(decimal);

    if (d.lt(1e6)) {
        return Math.floor(d.toNumber()).toLocaleString();
    }
    return d.toExponential(2).replace("+", "");
}