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
    let result = "f(x) = ";
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

        // 버튼 텍스트 갱신
        let label = n === 0 ? "Upgrade num" : "Upgrade X" + toSuperscript(n);
        let temp = `<b>${label}</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(data.price)}</span>`;
        $("#" + n + "_x_upgrade_bt").html(temp);
    }
}

function other_upgrade_buttons(n) {
    if (n === 1) { // max_x 업그레이드
        let data = upgrade_button_data["max_x"];
        if (first_var.fv.gte(data.price)) {
            first_var.fv = first_var.fv.minus(data.price);
            first_var.max_x = first_var.max_x.plus(1);
            data.count++;
            data.price = data.price.times(2.5);
            $("#max_x_upgrade_bt").text("Price: " + formatNum(data.price));
        }
    }
    if (n === 2) { // x_increase 업그레이드
        let data = upgrade_button_data["x_increase"];
        if (first_var.fv.gte(data.price)) {
            first_var.fv = first_var.fv.minus(data.price);
            first_var.x_increase = first_var.x_increase.plus(0.01);
            data.count++;
            data.price = data.price.times(1.5);
            $("#x_increase_upgrade_bt").text("Price: " + formatNum(data.price));
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
        let gain = equation_calc(first_var.fx, first_var.max_x).plus(second_var.differentiate_bonus);
        first_var.fv = first_var.fv.plus(gain);
        first_var.current_x = new Decimal(0);
    }
    setTimeout(calc_fv_loop, 100);
}



requestAnimationFrame(coreGameLoop);
// setInterval(calc_fv_loop, 1000);
calc_fv_loop();

// todo 미분 탭 완성