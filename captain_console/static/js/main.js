function fixPos() {
    let fix_to_bottom = $(document).height() - ($('#header').height() + $("#container").height()) - $('#footer').height() - 38
    // $(document).height(): Height of the start of the page from the bottom
    // $('#header').height(): Height of the element with id 'header' from the bottom
    // $('#container').height(): Height of the element with id 'container' from the bottom
    // $('#footer').height(): Height of the element with id 'footer' from the bottom
    // 38: Additional height from padding, margin and border of footer
    // fix_to_bottom checks if the container and the footer are next to each other (meaning the footer is either at the bottom of the page or you need to scroll to see it) and if it isn't, it adds a padding to container to push the footer to the bottom
    if (fix_to_bottom !== 0) {
        $('#container').css('padding-bottom', fix_to_bottom);
        $('#goUp').hide();
    }
}

function navigateTo(site) {
    location.href=site
}

$(document).ready(function(){
    $("#buttonSearch").on("click",function(e){
        e.preventDefault();
        var search_req = $("#barSearch").val();
        console.log(search_req)
        $.ajax({
            url: '/product?search_filter=' + search_req,
            type: 'GET',
            success: function(resp) {
                var newHTML = resp.data.map(d => {
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
                //$('#barSearch').val('')
                
            },
            error: function(xhr, status, error) {
                // TODO SHOW toastr??
                console.log(error);
            }
        })
    });
});

$(document).ready(function(){
$("#barSearch").keydown(function(event) {
    if (event.keyCode === 13) {
        $("#buttonSearch").click();         // grrr this no workings
    }
});
});