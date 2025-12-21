first_var = {
    fx : [new Decimal(1),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],// 0번째 인덱스 : 상수항, 1번째 인덱스 : x의 1제곱 계수, 2번째 인덱스 : x의 2제곱 계수 ...
    fv : new Decimal(0), // 게임내 기초 통화
    current_x : new Decimal(0), // 현재 x값
    max_x : new Decimal(1), // 최대 x값
    x_increase : new Decimal(0.05)
};
second_var = {
    differentiate_bonus : new Decimal(0), // 미분 보너스
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