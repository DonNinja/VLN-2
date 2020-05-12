
$(document).ready(function(){
    $(".cartDelete").on("click", function(e){
        var curr_id = this.id;
        // console.log(search_req)
        $.ajax({
            url: '/cart/remove_from_cart',
            type: 'DELETE',
            data: {'remove': curr_id},
            // TODO: REMOVE CONSOLE LOG
            success: function(resp) {

                var remove_id = "#" + curr_id + "mv";

                object = $(remove_id);

                
                var price = $("#price" + curr_id).html()

                var total_price_obj = $('#cartPrice');
                var total_price = total_price_obj.html()

                var new_total_price = calcCart(Number(price), total_price)
                total_price_obj.html(new_total_price)
                object.css("display", "none");


                removeFromCart();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    });
});


function calcCart(reduction, total_price) {

    total_price = total_price.replace(',', '');

    total_price = total_price - reduction;

    // Use regex magic to format out string
    // total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$1,');o
    return total_price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function removeFromCart() {
    $("#cartRemove")
        .animate({top: '5%'}, /*Seconds*/1000, /*Easing*/"swing")
        .delay(1200)
        .animate({top: '-8%'}, /*Seconds*/1000, /*Easing*/"swing");
}