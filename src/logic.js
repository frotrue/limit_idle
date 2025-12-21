first_var = {
    fx : [new Decimal(1),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],// 0번째 인덱스 : 상수항, 1번째 인덱스 : x의 1제곱 계수, 2번째 인덱스 : x의 2제곱 계수 ...
    fv : new Decimal(0), // 게임내 기초 통화
    current_x : new Decimal(0), // 현재 x값
    max_x : new Decimal(1), // 최대 x값
    x_increase : new Decimal(0.05)
};

upgrade_button_data = {
    0: {price: new Decimal(10), count: 1},
    1: {price: new Decimal(100), count: 0},
    2: {price: new Decimal(1000), count: 0},
    3: {price: new Decimal("1e4"), count: 0},
    4: {price: new Decimal("1e5"), count: 0},
    5: {price: new Decimal("1e6"), count: 0},
    6: {price: new Decimal("1e7"), count: 0},
    7: {price: new Decimal("1e8"), count: 0},
    8: {price: new Decimal("1e9"), count: 0},
    9: {price: new Decimal("1e10"), count: 0},
    10: {price: new Decimal("1e11"), count: 0},
    11: {price: new Decimal("1e12"), count: 0},
    12: {price: new Decimal("1e13"), count: 0},
    // 13: {price: 1e14, count: 0},
    // 14: {price: 1e15, count: 0},
    // 15: {price: 1e16, count: 0},
    max_x: {price: new Decimal("1e3"), count: 0},
    x_increase: {price: new Decimal(10), count: 0},
}

function resetFirstVar() {
    first_var.fv = new Decimal(0);
    first_var.current_x = new Decimal(0);
    first_var.max_x = new Decimal(1);
    first_var.x_increase = new Decimal(0.01);
    first_var.fx = [new Decimal(1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(v => new Decimal(v));
}
function resetUpgradeButtonDataVar() {
        upgrade_button_data[0] = {price: new Decimal(10), count: 1};
        upgrade_button_data[1]= {price: new Decimal(100), count: 0};
        upgrade_button_data[2]= {price: new Decimal(1000), count: 0};
        upgrade_button_data[3]= {price: new Decimal("1e4"), count: 0};
        upgrade_button_data[4]= {price: new Decimal("1e5"), count: 0};
        upgrade_button_data[5]= {price: new Decimal("1e6"), count: 0};
        upgrade_button_data[6]= {price: new Decimal("1e7"), count: 0};
        upgrade_button_data[7]= {price: new Decimal("1e8"), count: 0};
        upgrade_button_data[8]= {price: new Decimal("1e9"), count: 0};
        upgrade_button_data[9]= {price: new Decimal("1e10"), count: 0};
        upgrade_button_data[10]= {price: new Decimal("1e11"), count: 0};
        upgrade_button_data[11]= {price: new Decimal("1e12"), count: 0};
        upgrade_button_data[12]= {price: new Decimal("1e13"), count: 0};
        upgrade_button_data["max_x"]= {price: new Decimal("1e3"), count: 0};
        upgrade_button_data["x_increase"]= {price: new Decimal(10), count: 0};
}

second_var = {
    fb : new Decimal(0), // 미분 보너스
    differentiate_num : new Decimal(0.1)
};


const SUPERSCRIPT_MAP = {
    0: '⁰',
    1: '¹',
    2: '²',
    3: '³',
    4: '⁴',
    5: '⁵',
    6: '⁶',
    7: '⁷',
    8: '⁸',
    9: '⁹',
};

function toSuperscript(num) {
    if (num === 0 || num === 1) return '';
    return String(num).split('').map(d => SUPERSCRIPT_MAP[d] || d).join('');
}

function make_view_function(fx) {
    let result = "";
    let terms = [];
    for (let i = fx.length - 1; i >= 0; i--) {
        if (fx[i].eq(0)) continue;

        let coeff = fx[i].toFixed(0);
        if (i === 0) terms.push(coeff);
        else terms.push(coeff + "x" + toSuperscript(i));
    }
    return result + (terms.join(" + ") || "0");
}

function upgrade_buttons(n) {
    let data = upgrade_button_data[n];

    if (first_var.fv.gte(data.price)) {
        first_var.fv = first_var.fv.minus(data.price);
        data.count++;

        if (data.count === 10) {
            $("#" + (n + 1) + "_x_upgrade_bt").css("display", "inline-block");
        }

        if (data.count % 10 === 0) {
            first_var.fx[n] = first_var.fx[n].plus(1).times(1.5);
            data.price = data.price.times(100);
        } else {
            first_var.fx[n] = first_var.fx[n].plus(1);
        }

        let label = n === 0 ? "Upgrade num" : "Upgrade X" + toSuperscript(n);
        let temp = `<b>${label}</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(data.price)}</span>`;
        $("#" + n + "_x_upgrade_bt").html(temp);
    }
}

function other_upgrade_buttons(n) {
    if (n === 1) { // max_x
        let data = upgrade_button_data["max_x"];
        if (first_var.fv.gte(data.price)) {
            first_var.fv = first_var.fv.minus(data.price);
            first_var.max_x = first_var.max_x.plus(new Decimal(1));
            data.count++;
            data.price = data.price.times(new Decimal(2.5));
            $("#max_x_upgrade_bt").text("Price: " + formatNum(data.price));
        }
    }
    if (n === 2) { // x_increase
        let data = upgrade_button_data["x_increase"];
        if (first_var.fv.gte(data.price)) {
            first_var.fv = first_var.fv.minus(data.price);
            first_var.x_increase = first_var.x_increase.plus(new Decimal(0.01));
            data.count++;
            data.price = data.price.times(new Decimal(1.5));
            $("#x_increase_upgrade_bt").text("Price: " + formatNum(data.price));
        }
    }
}

function differentiate_bt() {
    let data = second_var.fb
    // let cost = first_var.fv
    if (first_var.fv.gte(new Decimal("1e10"))) {
        let diff_value = differentiate(first_var.fx, second_var.differentiate_num);
        second_var.fb = second_var.fb.plus(diff_value);
        resetFirstVar();
        resetUpgradeButtonDataVar();
        $("#max_x_upgrade_bt").text("Price: " + formatNum(upgrade_button_data.max_x.price));
        $("#x_increase_upgrade_bt").text("Price: " + formatNum(upgrade_button_data.x_increase.price));
        for (let i = 0; i <= 12; i++) {
            let label = i === 0 ? "Upgrade num" : "Upgrade X" + toSuperscript(i);
            let data = upgrade_button_data[i];

            // 버튼 텍스트 갱신
            let temp = `<b>${label}</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(data.price)}</span>`;
            $("#" + i + "_x_upgrade_bt").html(temp);

            // 0번(상수항) 빼고 모두 숨김 (조건에 따라 다시 오픈하게 함)
            if (i > 0) {
                $("#" + i + "_x_upgrade_bt").css("display", "none");
            }
        }
    }
}
const gameData = {
    lastUpdateTime: performance.now()
};

function coreGameLoop(currentTime) {
    const deltaTime = (currentTime - gameData.lastUpdateTime) / 1000;
    updateUI();
    gameData.lastUpdateTime = currentTime;
    requestAnimationFrame(coreGameLoop);
}

function calc_fv_loop() {
    if (first_var.current_x.lt(first_var.max_x)) {
        first_var.current_x = first_var.current_x.plus(first_var.x_increase);
    }

    if (first_var.current_x.gte(first_var.max_x)) {
        let gain = equation_calc(first_var.fx, first_var.max_x).plus(second_var.fb);
        first_var.fv = first_var.fv.plus(gain);
        first_var.current_x = new Decimal(0);
    }
    setTimeout(calc_fv_loop, 100);
}

requestAnimationFrame(coreGameLoop);
// setInterval(calc_fv_loop, 1000);
calc_fv_loop();