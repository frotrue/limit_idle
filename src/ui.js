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
    $("#function_view").html("f(x) = "+make_view_function(first_var.fx)+"+ fb");
    $("#fv_view_differentiate").html("fv = " + formatNum(first_var.fv));
    $("#x_progress").html(
        `max x: ${first_var.max_x.toFixed(1)} | ` +
        `current x: ${first_var.current_x.toFixed(2)} | ` +
        `increase x: ${first_var.x_increase.toFixed(2)}`
    );
    $("#fb_view").html("fb = " + formatNum(second_var.fb));
    $("#differentiate_value_view").html("f'("+second_var.differentiate_num.toFixed(1)+") = " + formatNum(differentiate(first_var.fx, second_var.differentiate_num)));
    $("#differentiate_cnt_view").html("Number of differentiations: " + second_var.difference_cnt);
}

function make_view_fv(fv) {
    fv = formatNum(fv);
    // const temp = new Decimal(fv);
    return "fv = " + fv.toString();
}
