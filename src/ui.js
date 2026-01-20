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
function updateUI() {
    $("#fv_view").html("fv = " + formatNum(first_var.fv));
    $("#function_view").html("f(x) = "+make_view_function(first_var.fx)+" + fb");
    // $("#fv_view_differentiate").html("fv = " + formatNum(first_var.fv));
    $("#x_progress").html(
        `max x: ${first_var.max_x.toFixed(1)} | ` +
        `current x: ${first_var.current_x.toFixed(2)} | ` +
        `increase x: ${first_var.x_increase.toFixed(2)}`
    );
    $("#fb_view").html("fb = " + formatNum(second_var.fb));
    $("#dv_view").html("dv = " + formatNum(second_var.dv));
    $("#differentiate_value_view").html("f'("+second_var.differentiate_num.toFixed(1)+") = " + formatNum(differentiate(first_var.fx, second_var.differentiate_num)));
    $("#differentiate_cnt_view").html("Number of differentiations: " + second_var.difference_cnt);

}

function make_view_fv(fv) {
    fv = formatNum(fv);
    // const temp = new Decimal(fv);
    return "fv = " + fv.toString();
}


function button_reset() {
    for (let i = 0; i <= 12; i++) {
        let label = i === 0 ? "X⁰" : "X" + toSuperscript(i);
        let data = upgrade_button_data[i];
        let progress = data.count % 10;
        let temp = `<span style="color:#4CAF50; font-size:0.9em;">[ ${progress} / 10 ]</span><br>` +
            `<b>Upgrade ${label}</b><br>` +
            `<span style="font-size:0.8em; color:#888">Price: ${formatNum(data.price)}</span>`;
        $("#" + i + "_x_upgrade_bt").html(temp);
        if (i > 0) {
            $("#" + i + "_x_upgrade_bt").css("display", upgrade_button_data[i-1].count >= 10 ? "inline-block" : "none");
        }
    }

    // Max X 초기화
    let mx = upgrade_button_data["max_x"];
    $("#max_x_upgrade").html(`<span style="color:#4CAF50; font-size:0.9em;">[ ${mx.count % 10} / 10 ]</span><br><b>Upgrade Max X</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(mx.price)}</span>`);

    // X Increase 초기화
    let xi = upgrade_button_data["x_increase"];
    $("#x_increase_upgrade").html(`<span style="color:#4CAF50; font-size:0.9em;">[ ${xi.count % 10} / 10 ]</span><br><b>Upgrade X Increase</b><br><span style="font-size:0.8em; color:#888">Price: ${formatNum(xi.price)}</span>`);
    let diffData = second_var.differentiate_upgrade_data;
    $("#differentiate_bt").html(
        `<span style="color:#4CAF50; font-size:0.85em;">[ ${diffData.count % 10} / 10 ]</span><br>` +
        `<b>Input Variable Upgrade</b><br>` +
        `<span style="font-size:0.8em; color:#888">Price: ${formatNum(diffData.price)} dv</span>`
    );
}