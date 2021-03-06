
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

                let prod = $(remove_id);

                
                var price = $("#price" + curr_id).html()

                var total_price_obj = $('#cartPrice');
                var total_price = total_price_obj.html()

                var new_total_price = calcCart(Number(price), total_price)
                total_price_obj.html(new_total_price)
                prod.css("display", "none");

                removeFromCart();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    });
});

$(document).ready(function(){
    fillTables()
    $("#cardCVC").keypress(preventMore3)
    $("#cardCVC").keydown(preventE)
    // $("#cardNumber").change(creditCheck)
    $("#cardCheckButton").click(creditCheck)
    $("#cartContinue").click(cartContinueCheck)
    $("#submitCard").click(cardValidation)
    checkIfReady()
})

function cardValidation() {
    let invalidForms = [];
    var isValid = true;
    var cardName = $("#cardName").val()
    var card = $("#cardNumber").val()
    var type = $("#CardType").val()
    var cardCVC = $("#cardCVC").val()
    var cardExpMonth = $("#cardExpMonth").val()
    var cardExpYear = $("#cardExpYear").val()
    var expDate = new Date(Number(cardExpYear), Number(cardExpMonth), -0)

    if (expDate <= new Date()) {
        invalidForms.push("cardExpMonth")
        invalidForms.push("cardExpYear")
        isValid = false;
    }

    if (cardName.length === 0) {
        invalidForms.push("cardName")
        isValid = false;
    }
    if (!(checkCreditCard(card, type))) {
        invalidForms.push("CardType")
        invalidForms.push("cardNumber")
        isValid = false
    }
    if ((cardCVC.length !== 3)) {
        invalidForms.push("cardCVC")
        isValid = false
    }
    if (isValid) {
        localStorage.setItem("cardname", cardName)
        localStorage.setItem("cardnum", card)
        localStorage.setItem("cardtype", type)
        localStorage.setItem("cardcvc", cardCVC)
        localStorage.setItem("cardexp", cardExpMonth + "/" + cardExpYear)
        navigateTo('../overview');
    }
    else {
        document.getElementById("paymentAlert").innerHTML = "Your card is invalid. Error fields have been marked. <p class='mb-0'>" + ccErrors[ccErrorNo] + "</p>";
        $("#paymentAlert").show();
        for (let i = 0; i < invalidForms.length; i++) {
            // This outlines all error forms
            $("#" + invalidForms[i]).css('outline', 'none');
            $("#" + invalidForms[i]).css('border-color', 'red');
            $("#" + invalidForms[i]).css('box-shadow', '0 0 .25rem red');
        }
        
    }
}

function cartContinueCheck() {
    if ($("#cartPrice").html() == 0) {
        $("#cartAlert").show();
        return
    }
    else {
        navigateTo('contact_info')
    }
}

function creditCheck(){
    var card = $("#cardNumber").val()
    var type = $("#CardType").val()
    if (!checkCreditCard(card, type)){
        document.getElementById("paymentAlert").innerHTML = "Your card is invalid.";
        $("#paymentAlert").show();
    }
    else{
        $("#cardNumber").css("border-color", "green");
    }
}

function preventE (event) {
    console.log(event.which)
    if (event.which == 69) return false;
}

function preventMore3() {
    if (this.value.length==3) return false;
}


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

function cartConfirmation() {
    let overlay = jQuery('<div id="overlay"></div>');
    overlay.appendTo($("#overviewMain"));
    $("#overlay").fadeIn(300);
    $("#confirmCard").fadeIn(300);
    emptyCart();
    localStorage.clear()
}


function emptyCart(){
    $.ajax({
        url: '/cart/empty_cart',
        type: 'DELETE',
        // TODO: REMOVE CONSOLE LOG
        success: function(resp) {
            console.log(resp)
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
};

function fillTables() {
    $(document).ready(function(){
        $("#tableName").html(localStorage.getItem("fullname"));
        $("#tableCity").html(localStorage.getItem("city"));
        $("#tableStreet").html(localStorage.getItem("streetname"));
        $("#tableHouse").html(localStorage.getItem("housenumber"));
        $("#tableCountry").html(localStorage.getItem("country"));
        $("#tablePost").html(localStorage.getItem("postcode"));
        $("#tableCardName").html(localStorage.getItem("cardname"));
        $("#tableCardType").html(localStorage.getItem("cardtype"));
        $("#tableCardNumber").html(localStorage.getItem("cardnum"));
        $("#tableCardExpDate").html(localStorage.getItem("cardexp"));
        $("#tableCardCVC").html(localStorage.getItem("cardcvc"));
    });
}

function checkIfReady() {
    var completeList = [
        localStorage.getItem("fullname"),
        localStorage.getItem("city"),
        localStorage.getItem("streetname"),
        localStorage.getItem("housenumber"),
        localStorage.getItem("country"),
        localStorage.getItem("postcode"),
        localStorage.getItem("cardname"),
        localStorage.getItem("cardtype"),
        localStorage.getItem("cardnum"),
        localStorage.getItem("cardexp"),
        localStorage.getItem("cardcvc")
    ]
    // console.log('inb4 tests')
    var cartValid = $("#priceTotal").html()
    
    if (completeList.every(Boolean) && Number(cartValid) !== 0) {
        $('#confirmButton').click(cartConfirmation)
        // console.log('in if tests')
    }
    else {
        // console.log('in else tests')
        if (!(Number(cartValid) !== 0)) {
            msg = "You need to have an item in the cart to be able to complete a purchase"
        }
        else {
            msg = "You need to fill in all of the required information  to complete your purchase"
        }
        $("#confirmButton").click(function (){
            document.getElementById("overviewAlert").innerHTML = msg;
            $("#overviewAlert").show();
        })
    }
}

