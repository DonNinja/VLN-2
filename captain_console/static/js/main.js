
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});



function fixPos() {
    let fix_to_bottom = $(document).height() - ($('#header').height()) - $('#footer').height() - 38
    // $(document).height(): Height of the start of the page from the bottom
    // $('#header').height(): Height of the element with id 'header' from the bottom
    // $('#footer').height(): Height of the element with id 'footer' from the bottom
    // 38: Additional height from padding, margin and border of footer
    // fix_to_bottom checks if the container and the footer are next to each other (meaning the footer is either at the bottom of the page or you need to scroll to see it) and if it isn't, it adds a padding to container to push the footer to the bottom
    $('#container').css('height', fix_to_bottom);
}


//  + $("#container").height()
// $('#container').height(): Height of the element with id 'container' from the bottom

function navigateTo(site) {
    location.href = site
}

$(document).ready(function () {
    $("#buttonSearch").on("click", function (e) {
        var search_req = $("#barSearch").val();
        var loc = $(location).attr('pathname')
        e.preventDefault();
        if (loc !== '/product/') {      // if user is not on products page
            window.location.href = '/product/?search=' + search_req;    // go to products page before searching
            return
        }
        // console.log(search_req)
        let results = [];
        let newHTML = [];
        newHTML.push(`
        <h1 class="card-title">Results for: '${search_req}'</h1>
        <hr>
        <div class="row row-cols-3 row-cols-sm-2 row-cols-md-4">
        `);
        $.ajax({
            url: '/product?search_filter=' + search_req,
            type: 'GET',
            success: function (resp) {
                results = resp.data.map(d => {
                    // return html to inject into product page
                    return `
                        <div class="col mb-4">
                            <div class="card h-100">
                                <a href="${ d.id }">
                                    <img src="${ d.image }" class="card-img-top manImg" alt="${ d.name }">
                                </a>
                                <div class="card-body">
                                    <a href="${ d.id }" class="text-dark">
                                        <h5 class="card-title">${ d.name }</h5>
                                    </a>
                                    <p class="card-text">${ d.description }</p>
                                    <p>${ d.price } Kr</p>
                                    <div class="test">
                                        <button id="${ d.id }" type="button" class="buttonAddToCart miscBtn">Add to cart</button>
                                        <button onclick="window.location.href='../reviews/product/${ d.id }'" type="button" class="miscBtn">Reviews</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                });
                newHTML = newHTML.concat(results);
                newHTML.push(`</div>
                    <script>
                        shortenDesc();
                        searchButtons();
                    </script>`);
                $('#prodList').html(newHTML.join(''));

            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        })
    });
});

$(document).ready(function () {
    var search = document.getElementById("barSearch");

    search.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#buttonSearch").click();
        }
    });

    var param_value = getParameterByName('search');     // get search parameter
    if (param_value) {       // only runs if user is attempting to search from another page than product
        $("#barSearch").val(param_value);
        $("#buttonSearch").click();
    }
});

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

function searchButtons() {
    $(document).ready(function () {
        $(".buttonAddToCart").on("click", function (e) {
            // console.log(search_req)
            $.ajax({
                url: '/cart/add_to_cart/' + this.id,
                type: 'GET',
                // TODO: REMOVE CONSOLE LOG
                success: function (resp) {
                    console.log(resp)
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

                object.css("display", "none");
                removeFromCart();
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        })
    });
});

function theSuccessStory() {
    $("#cartConfirm")
        .animate({top: '5%'}, /*Seconds*/1000, /*Easing*/"swing")
        .delay(1200)
        .animate({top: '-6%'}, /*Seconds*/1000, /*Easing*/"swing");
}

function removeFromCart() {
    $("#cartRemove")
        .animate({top: '5%'}, /*Seconds*/1000, /*Easing*/"swing")
        .delay(1200)
        .animate({top: '-6%'}, /*Seconds*/1000, /*Easing*/"swing");
}

function dropFilter() {
    $("#filter")
        .animate({top: '75%'}, 1000, "swing");
    let filtButt = document.getElementById("filtButt");
    filtButt.onclick = function () { raiseFilter() }; // Changes the onclick function to raiseFilter
}

function raiseFilter() {
    $("#filter")
        .animate({top: '-320px'}, 1000, "swing");
    let filtButt = document.getElementById("filtButt");
    filtButt.onclick = function () { dropFilter() }; // Changes the onclick function to dropFilter
}