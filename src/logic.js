first_var = {
    fx : [1],// 0번째 인덱스 : 상수항, 1번째 인덱스 : x의 1제곱 계수, 2번째 인덱스 : x의 2제곱 계수 ...
    fv : 0, // 게임내 기초 통화
    current_x : 0, // 현재 x값
    max_x : 10 // 최대 x값
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
    if (fx.length==0){
        result += "";
        return
    }
    for (let i = fx.length; i>0; i--) {
        if (i==1){
            result += ""+fx[i-1].toString();
            break;
        }
        else{
            let num = toSuperscript(fx[i-2]);
            result += fx[i-1].toString()+"x"+num+" + ";
        }
    }
    return result;
};

function make_view_fv(fv) {
    fv = formatNum(fv);
    // const temp = new Decimal(fv);
    return "fv = " + fv.toString();
}
function updateUI(){
    $("#fv_view").html(make_view_fv(first_var.fv));
    $("#function_view").html(make_view_function(first_var.fx));
    $("#x_progress").html("max x: "+first_var.max_x.toString()+" | current x: "+first_var.current_x.toString());
};







const gameData = {
    lastUpdateTime: performance.now()
};

function coreGameLoop(currentTime) {
    // 1. 경과 시간 계산 (델타 타임)
    const deltaTime = (currentTime - gameData.lastUpdateTime) / 1000;

    // 2. 자원 계산 (시간 기반 증가)
    // ... 로직 ...

    // 3. UI 업데이트
    updateUI();

    // 4. 다음 루프를 위해 시간 업데이트
    gameData.lastUpdateTime = currentTime;
    // console.log(i);

    // 5. 다음 프레임 요청
    requestAnimationFrame(coreGameLoop);
}
function calc_fv_loop() {
    if (first_var.current_x < first_var.max_x) {
        first_var.current_x += 1;
    }
    if (first_var.current_x == first_var.max_x) {
        first_var.fv += equation_calc(first_var.fx, first_var.current_x);
        first_var.current_x = 0;
    }
    setTimeout(calc_fv_loop, 100);
}

// 게임 시작 시 코어 루프 시작
requestAnimationFrame(coreGameLoop);
// fv 계산 루프 시작
calc_fv_loop();
