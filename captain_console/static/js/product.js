product_true_list = []


loadList = () => {
    // Gets all products on the current page
    var product_list = $('#product_list');

    product_list.find(".productObject").each(function(){
        // saves the objects to a list, also saves the name and price
        var namePrice = this.id.split("-")
        product_true_list.push([namePrice[0], Number(namePrice[1]), this])
    })
    
}

divSort = (sortType, reversed=false) =>{
    loadList()

    if (sortType == "price"){
        // sorts the list by price
        product_true_list.sort((a,b) =>{
            return a[1]-b[1]
        })
    }

    if (sortType == "name"){
        product_true_list.sort((a,b) =>{
            // sorts the list by name
            var nameA = a[0].toUpperCase(); // ignore upper and lowercase
            var nameB = b[0].toUpperCase(); // ignore upper and lowercase
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
        product_true_list.reverse()
    }

    var product_list = $('#product_list')
    product_list.empty() // clear the product list

    for (var i=0; i<product_true_list.length; i++){
        // add the sorted products
        product_list.append(product_true_list[i][2])
    }

    addToCartButtons()

}


function addToCartButtons() {
    $(document).ready(function () {
        $(".buttonAddToCart").on("click", function (e) {
            // console.log(search_req)
            $.ajax({
                url: '/cart/add_to_cart/' + this.id,
                type: 'GET',
                // TODO: REMOVE CONSOLE LOG
                success: function (resp) {
                    // alert(resp.status)
                    theSuccessStory()
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            })
        });
    });
}



