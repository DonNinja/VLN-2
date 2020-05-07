function fixPos() {
    let fix_to_bottom = $(document).height() - ($('#header').height()) - $('#footer').height() - 38
    // $(document).height(): Height of the start of the page from the bottom
    // $('#header').height(): Height of the element with id 'header' from the bottom
    // $('#footer').height(): Height of the element with id 'footer' from the bottom
    // 38: Additional height from padding, margin and border of footer
    // fix_to_bottom checks if the container and the footer are next to each other (meaning the footer is either at the bottom of the page or you need to scroll to see it) and if it isn't, it adds a padding to container to push the footer to the bottom
    if (fix_to_bottom !== 0) {
        $('#container').css('height', fix_to_bottom);
        $('#goUp').hide();
    }
}


//  + $("#container").height()
// $('#container').height(): Height of the element with id 'container' from the bottom

function navigateTo(site) {
    location.href=site
}

$(document).ready(function(){
    $("#buttonSearch").on("click", function(e){
        var search_req = $("#barSearch").val();
        var loc = $(location).attr('pathname')
        e.preventDefault();
        if (loc !== '/product/') {      // if user is not on products page
            window.location.href = '/product/?search=' + search_req;    // go to products page before searching
            return
        }
        // console.log(search_req)
        $.ajax({
            url: '/product?search_filter=' + search_req,
            type: 'GET',
            success: function(resp) {
                var newHTML = resp.data.map(d => {
                    // return html to inject into product page
                    return `<div class="flex_class">
                    <div class="leftHalf">
                    <h4>${d.name}</h4>
                    <a href="/product/${d.id}">
                    <img class="manImg" src="${d.image}"/>
                    <h3 class="price_tag"><u>${d.price} Kr</u></h3>
                    </a>
                    </div>
                    </div>`
                });
                $('.list_container').html(newHTML.join(''));
                
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    });
});


$(document).ready(function(){
$("#searchForm").submit(function(event) {
    event.preventDefault();
    $("#buttonSearch").click();
})
});

$(document).ready(function(){
    var param_value = getParameterByName('search');     // get search parameter
    if (param_value){       // only runs if user is attempting to search from another page than product
        $("#barSearch").val(param_value);
        $("#buttonSearch").click()
    }
})

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);    // use regex magic to get users search query
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function shortenDesc() {
    let prod_descs = document.getElementsByClassName("card-text");
    for (let i = 0; i < prod_descs.length; i++) {
        // console.log(prodDescs[i].textContent);
        let words = prod_descs[i].textContent.split(" ");
        if (words.length > 9) {
            let new_text = words.slice(0, 9).join(" ");
            prod_descs[i].textContent = new_text + "...";
        }
    }
}