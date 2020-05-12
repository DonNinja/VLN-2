product_true_list = []


loadList = () => {
    var product_list = $('#product_list');

    product_list.find(".productObject").each(function(){

        var namePrice = this.id.split("-")
        product_true_list.push([namePrice[0], Number(namePrice[1]), this])
    })
    
}

divSort = (sortType, reversed=false) =>{
    loadList()

    if (sortType == "price"){
        product_true_list.sort((a,b) =>{
            return a[1]-b[1]
        })
    }

    if (sortType == "name"){
        product_true_list.sort((a,b) =>{
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
        product_true_list.reverse()
    }

    var product_list = $('#product_list')
    product_list.html("")
    for (var i=0; i<product_true_list.length; i++){
        console.log("what")
        product_list.append(product_true_list[i][2])
    }
    console.log(product_true_list.length)
    console.log(product_true_list)

}

