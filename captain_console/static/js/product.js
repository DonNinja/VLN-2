let product_true_list = [];


loadList = () => {
    // Gets all products on the current page
    product_true_list = [];
    let product_list = $('#product_list');

    product_list.find(".productObject").each(function(){
        // saves the objects to a list, also saves the name and price
        let namePrice = this.id.split(";")
        product_true_list.push([namePrice[0], Number(namePrice[1]), this])
    })

    return product_true_list
    
}

divSort = (sortType, reversed=false) =>{
    product_true_list = loadList()

    if (sortType === "price"){
        // sorts the list by price
        $("#orderDrop").html("Order by: Price (Ascending)");
        product_true_list.sort((a,b) =>{

            return a[1]-b[1]
        })
    }

    if (sortType === "name"){
        product_true_list.sort((a,b) =>{
            // sorts the list by name
            $("#orderDrop").html("Order by: Name (Ascending)");
            let nameA = a[0].toUpperCase(); // ignore upper and lowercase
            let nameB = b[0].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
        }) 

    }

    if (reversed){
        // if the user requested a reverse sort, reverse it
        if (sortType === "name") {
            $("#orderDrop").html("Order by: Name (Descending)");
        }
        else if (sortType === "price") {
            $("#orderDrop").html("Order by: Price (Descending)");
        }
        product_true_list.reverse()
    }

    let product_list = $('#product_list')
    product_list.html("") // clear the product list

    for (let i=0; i<product_true_list.length; i++){
        // add the sorted products
        product_list.append(product_true_list[i][2])
    }

    addToCartButtons()

}


function addToCartButtons() {
    $(".buttonAddToCart").on("click", function (e) {
        // console.log(search_req)
        $.ajax({
            url: '/cart/add_to_cart/' + this.id,
            type: 'GET',

            success: function (resp) {
                theSuccessStory();
            },
            error: function (xhr, status, error) {
                window.location.href = location.origin + "/account/login";  // user is not logged in redirect him
            }
        })
    });
}

$(document).ready(function() {
    addToCartButtons()
})

