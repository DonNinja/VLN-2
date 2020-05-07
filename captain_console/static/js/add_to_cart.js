$(document).ready(function(){
    $(".buttonAddToCart").on("click", function(e){
        // console.log(search_req)
        $.ajax({
            url: '/cart/add_to_cart/' + this.id,
            type: 'GET',
            // TODO: REMOVE CONSOLE LOG
            success: function(resp) {
                console.log(resp)
                alert(resp.status)
            
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    });
});
