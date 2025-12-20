first_var = {
    fx : [1,0,0,0,0,0,0,0,0,0,0,0,0],// 0번째 인덱스 : 상수항, 1번째 인덱스 : x의 1제곱 계수, 2번째 인덱스 : x의 2제곱 계수 ...
    fv : 0, // 게임내 기초 통화
    current_x : 0, // 현재 x값
    max_x : 1, // 최대 x값
    x_increase : 0.01
};
second_var = {
    differentiate_bonus : 0, // 미분 보너스
};

upgrade_button_data = {
    0: {price: 10, count: 1},
    1: {price: 100, count: 0},
    2: {price: 1000, count: 0},
    3: {price: 1e4, count: 0},
    4: {price: 1e5, count: 0},
    5: {price: 1e6, count: 0},
    6: {price: 1e7, count: 0},
    7: {price: 1e8, count: 0},
    8: {price: 1e9, count: 0},
    9: {price: 1e10, count: 0},
    10: {price: 1e11, count: 0},
    11: {price: 1e12, count: 0},
    12: {price: 1e13, count: 0},
    13: {price: 1e14, count: 0},
    14: {price: 1e15, count: 0},
    15: {price: 1e16, count: 0},
    max_x: {price: 1e3, count: 0},
    x_increase: {price: 10, count: 0},
}

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
    if (num === 0) return '';
    if (num === 1) return '';
    const numStr = String(num);
    let superscript = '';
    for (const digit of numStr) {
        superscript += SUPERSCRIPT_MAP[digit] || digit;
    }
    return superscript;
}

function make_view_function(fx){
    if(typeof fx !== 'object'){
        return;
    }
    let result = "f(x) = ";
    if (fx.length===0){
        result += "";
        return result;
    }
    for (let i = fx.length; i>0; i--) {
        if (fx[i-1]===0){
            continue;
        }
        if (i===1){
            result += ""+((fx[i-1]).toFixed(0)).toString();
            break;
        }
        else{
            let num = toSuperscript(i-1);
            result += ((fx[i-1]).toFixed(0)).toString()+"x"+num+" + ";
        }
    }
    return result;
}
function change_cluster(n){
    for (let i = 1; i <=6 ; i++) {
        if (i===n){
            $("#"+i.toString()+"_cluster").css("display","block");
            $("#"+i.toString()+"_cluster_change").addClass("tab-button active");

        }
        else {
            $("#"+i.toString()+"_cluster").css("display","none");
            $("#"+i.toString()+"_cluster_change").removeClass("tab-button active");
            $("#"+i.toString()+"_cluster_change").addClass("tab-button");
        }
    }
}


function make_view_fv(fv) {
    fv = formatNum(fv);
    // const temp = new Decimal(fv);
    return "fv = " + fv.toString();
}
function updateUI(){
    $("#fv_view").html(make_view_fv(first_var.fv));
    $("#function_view").html(make_view_function(first_var.fx));
    $("#x_progress").html("max x: "+((first_var.max_x).toFixed(1)).toString()+" | current x: "+((first_var.current_x).toFixed(2)).toString()+" | increase x: "+((first_var.x_increase).toFixed(2)).toString());
}

function upgrade_buttons(n){
    function bt_ui_update(n){
        if (n===0){
            let temp = '<b>Upgrade num</b><br><span style="font-size:0.8em; color:#888">Price: '+formatNum(upgrade_button_data[n].price)+'</span>'
            $("#"+n+"_x_upgrade_bt").html(temp);
        }
        else {
            let temp = '<b>Upgrade X'+toSuperscript(n)+'</b><br><span style="font-size:0.8em; color:#888">Price: '+formatNum(upgrade_button_data[n].price)+'</span>'
            $("#"+n+"_x_upgrade_bt").html(temp);
        }

    }
    if (first_var.fv >= upgrade_button_data[n].price){
        first_var.fv -= upgrade_button_data[n].price;
        upgrade_button_data[n].count++;
        if(upgrade_button_data[n].count===10){
            $("#"+(n+1)+"_x_upgrade_bt").css("display","inline-block");
        }
        if (upgrade_button_data[n].count%10===0){
            first_var.fx[n] += 1;
            first_var.fx[n] *=1.5;
            // first_var.fx[n] = (first_var.fx[n]).toFixed(1);
            upgrade_button_data[n].count++;
            upgrade_button_data[n].price *=100;
            bt_ui_update(n)
            return
        }
        first_var.fx[n] += 1;
        bt_ui_update(n)
    }
}

function other_upgrade_buttons(n) {
    if (n === 1) {
        if (first_var.fv >= upgrade_button_data["max_x"].price) {
            first_var.fv -= upgrade_button_data["max_x"].price;
            first_var.max_x += 1;
            upgrade_button_data["max_x"].count++;
            upgrade_button_data["max_x"].price *= 3.5;
            let temp = (upgrade_button_data["max_x"].price).toFixed(1);
            temp = formatNum(temp);
            $("#max_x_upgrade_bt").text("Price: " + temp);
        }
    }
    if (n === 2) {
        if (first_var.fv >= upgrade_button_data["x_increase"].price) {
            first_var.fv -= upgrade_button_data["x_increase"].price;
            first_var.x_increase += 0.01;
            upgrade_button_data["x_increase"].count++;
            upgrade_button_data["x_increase"].price *= 1.5;
            let temp = (upgrade_button_data["x_increase"].price).toFixed(1);
            temp = formatNum(temp);
            $("#x_increase_upgrade_bt").text("Price: " + temp);
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
    if (first_var.current_x < first_var.max_x) {
        first_var.current_x += first_var.x_increase;
    }
    if (first_var.current_x >= first_var.max_x) {
        first_var.fv += equation_calc(first_var.fx, first_var.max_x) + second_var.differentiate_bonus;
        first_var.current_x = 0;
    }
    setTimeout(calc_fv_loop, 100);
}



requestAnimationFrame(coreGameLoop);
// setInterval(calc_fv_loop, 1000);
calc_fv_loop();

// todo 미분 탭 완성