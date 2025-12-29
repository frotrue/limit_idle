
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
second_var = {
    fb : new Decimal(0),
    differentiate_num : new Decimal(0.1),
    difference_cnt : new Decimal(0)
};

game_data = {
    auto: {
        "auto_show" : false,
        0: {
            active: false,
            interval: 10000,
            condition: 2
        },
        1: {
            active: false,
            interval: 10000,
            condition: 3
        },
        2: {
            active: false,
            interval: 10000,
            condition: 5
        },
        3: {
            active: false,
            interval: 10000,
            condition: 10
        },
        4: {
            active: false,
            interval: 10000,
            condition: 15
        },
        5: {
            active: false,
            interval: 10000,
            condition: 20
        },
        6: {
            active: false,
            interval: 10000,
            condition: 30
        },
        7: {
            active: false,
            interval: 10000,
            condition: 40
        },
        8: {
            active: false,
            interval: 10000,
            condition: 50
        },
        9: {
            active: false,
            interval: 10000,
            condition: 65
        },
        10: {
            active: false,
            interval: 10000,
            condition: 80
        },
        11: {
            active: false,
            interval: 10000,
            condition: 100
        },
        // 12 : {
        //     active: false,
        //     interval: 10000,
        //     condition: 150
        // }
        101:{
            active: false,
            interval: 10000,
            condition: 20
        },
        102:{
            active: false,
            interval: 10000,
            condition: 20
        }
    }
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

function resetFirstVar() {
    first_var.fv = new Decimal(0);
    first_var.current_x = new Decimal(0);
    first_var.max_x = new Decimal(1);
    first_var.x_increase = new Decimal(0.05);
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

function resetgamedata(){
    game_data.auto.auto_show = false;
}
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
            if (data.count % 10 === 0) {
                first_var.x_increase = first_var.x_increase.mul(new Decimal(1.3));
            }
            data.price = data.price.times(new Decimal(1.5));
            $("#x_increase_upgrade_bt").text("Price: " + formatNum(data.price));
        }
    }
}

function differentiate_bt() {
    let data = second_var.fb
    // let cost = first_var.fv
    if (first_var.fv.gte(new Decimal("1e6"))) {
        if (second_var.difference_cnt.gte(new Decimal(1))) {
            $("auto_upgrade_container").css("display", "inline-block");
            game_data.auto.auto_show = true;
            save()
        }
        let diff_value = differentiate(first_var.fx, second_var.differentiate_num);
        second_var.fb = second_var.fb.plus(diff_value);
        second_var.difference_cnt = second_var.difference_cnt.plus(1);
        resetFirstVar();
        resetUpgradeButtonDataVar();
        $("#max_x_upgrade_bt").text("Price: " + formatNum(upgrade_button_data.max_x.price));
        $("#x_increase_upgrade_bt").text("Price: " + formatNum(upgrade_button_data.x_increase.price));
        for (let i = 0; i <= 12; i++) {
            let label = i === 0 ? "Upgrade num" : "Upgrade X" + toSuperscript(i);
            let data = upgrade_button_data[i];

            let temp = `<b>${label}</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(data.price)}</span>`;
            $("#" + i + "_x_upgrade_bt").html(temp);

            if (i > 0) {
                $("#" + i + "_x_upgrade_bt").css("display", "none");
            }
        }
    }
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
    // setTimeout(calc_fv_loop, 100);
}

function save_function(var_name){
    localStorage.setItem(var_name.toString(), JSON.stringify(var_name));
}

function save() {
    localStorage.setItem("first_var", JSON.stringify(first_var));
    localStorage.setItem("upgrade_button_data", JSON.stringify(upgrade_button_data));
    localStorage.setItem("second_var", JSON.stringify(second_var));
    localStorage.setItem("game_data", JSON.stringify(game_data));
    console.log("게임이 저장되었습니다.");
}
function load(){ // made by gemini 3.0 pro
        // 1. LocalStorage에서 데이터 가져오기
        const savedFirstVar = localStorage.getItem("first_var");
        const savedUpgradeData = localStorage.getItem("upgrade_button_data");
        const savedSecondVar = localStorage.getItem("second_var");
        const savedGameData = localStorage.getItem("game_data");

        if (savedFirstVar && savedUpgradeData && savedSecondVar) {

            const parsedFirst = JSON.parse(savedFirstVar);
            first_var.fv = new Decimal(parsedFirst.fv);
            first_var.current_x = new Decimal(parsedFirst.current_x);
            first_var.max_x = new Decimal(parsedFirst.max_x);
            first_var.x_increase = new Decimal(parsedFirst.x_increase);
            first_var.fx = parsedFirst.fx.map(val => new Decimal(val));

            const parsedUpgrade = JSON.parse(savedUpgradeData);
            for (let key in parsedUpgrade) {
                upgrade_button_data[key] = {
                    price: new Decimal(parsedUpgrade[key].price),
                    count: Number(parsedUpgrade[key].count)
                };
            }

            const parsedSecond = JSON.parse(savedSecondVar);
            second_var.fb = new Decimal(parsedSecond.fb);
            second_var.differentiate_num = new Decimal(parsedSecond.differentiate_num);
            second_var.difference_cnt = new Decimal(parsedSecond.difference_cnt);

            const parsedGame = JSON.parse(savedGameData);
            game_data.auto.auto_show = parsedGame.auto.auto_show;
            Object.keys(parsedGame.auto).forEach(key => {
                if (game_data.auto[key]) {
                    game_data.auto[key].active = parsedGame.auto[key].active;
                    game_data.auto[key].interval = parsedGame.auto[key].interval;
                    game_data.auto[key].condition = parsedGame.auto[key].condition;

                    game_data.auto[key].lastRun = Date.now();
                }
            });


            $(document).ready(function() {
                refreshUIAfterLoad();
            });
            console.log("게임 데이터를 불러왔습니다.");
        } else {
            console.log("저장된 데이터가 없습니다.");
    }
}
function refreshUIAfterLoad() {
    if (game_data.auto.auto_show === true){
        $("#auto_upgrade_container").css("display", "grid");
        $("#auto_need").css("display", "none");
    }
    else{
        $("#auto_upgrade_container").css("display", "none");
        $("#auto_need").css("display", "inline-block");
    }
    for (let i = 0; i <= 12; i++) {
        let data = upgrade_button_data[i];
        let label = i === 0 ? "Upgrade num" : "Upgrade X" + toSuperscript(i);
        let temp = `<b>${label}</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(data.price)}</span>`;
        $("#" + i + "_x_upgrade_bt").html(temp);

        if (upgrade_button_data[i].count >= 10) {
            $("#" + (i + 1) + "_x_upgrade_bt").css("display", "inline-block");
        }
    }
    $("#max_x_upgrade_bt").text("Price: " + formatNum(upgrade_button_data.max_x.price));
    $("#x_increase_upgrade_bt").text("Price: " + formatNum(upgrade_button_data.x_increase.price));
    updateAutoUpgradeUI();
}
function updateAutoUpgradeUI() {
    Object.keys(game_data.auto).forEach(i => {
        const isActive = game_data.auto[i].active;
        $(`#auto_toggle_${i}`).prop("checked", isActive);

        const $card = $(`#auto_toggle_${i}`).closest('.auto_card');
        if (isActive) {
            $card.find('.auto_status').text("Active").css("color", "green");
        } else {
            $card.find('.auto_status').text("Waiting").css("color", "gray");
        }
    });
}
const gameData = {
    lastUpdateTime: performance.now()
};

function autoupgrade_toggle(index) {
    if (game_data.auto[index].condition <= second_var.difference_cnt){
        const isChecked = $(`#auto_toggle_${index}`).is(":checked");
        game_data.auto[index].active = isChecked;
        updateAutoUpgradeUI();
    }
    else {
        return 0;
    }
}
function autoupgrade_all_on(){
    for (let i = 0; i <= 11; i++) {
        autoupgrade_toggle(i);
    }
}


Object.values(game_data.auto).forEach(item => {
    item.lastRun = Date.now();
});

function autoupgrade() { // made by gemini 3.0 flash
    const now = Date.now();

    // Object.keys를 사용하여 0부터 15까지(또는 그 이상) 모든 키를 순회
    Object.keys(game_data.auto).forEach(key => {
        const item = game_data.auto[key];

        if (item.active && (now - item.lastRun >= item.interval)&&$("#"+key+"_x_upgrade_bt").css("display")!=="none") {
            if (key == 101 || key == 102) {
                other_upgrade_buttons(key-100);
            }
            else{
                upgrade_buttons(key);
            }
            item.lastRun = now;
        }
    });
}

function coreGameLoop(currentTime) {
    const deltaTime = (currentTime - gameData.lastUpdateTime) / 1000;
    updateUI();
    gameData.lastUpdateTime = currentTime;
    requestAnimationFrame(coreGameLoop);
}

// coreGameLoop()
load();
// refreshUIAfterLoad()

requestAnimationFrame(coreGameLoop);
let auto_upgrade = setInterval(autoupgrade, 100);
let loop = setInterval(calc_fv_loop,100);
let autosave = setInterval(save,60000)
