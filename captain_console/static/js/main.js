
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


function initializePage() {
    fixPos();
    let sidebar = document.getElementById("sidebar");
    if (sidebar != null) {
        showOrHide();
    }
    if ($(window).height() >= $(document).height()) {
        $("#goUp").hide();
    }
}


function fixPos() {
    let fix_to_bottom = $(document).height() - ($('#header').height()) - $('#footer').height() - 38
    // $(document).height(): Height of the start of the page from the bottom
    // $('#header').height(): Height of the element with id 'header' from the bottom
    // $('#footer').height(): Height of the element with id 'footer' from the bottom
    // 38: Additional height from padding, margin and border of footer
    // fix_to_bottom sets the height of container to fix the footer to the bottom, while also keeping his background going all the way there
    $('#container').css('min-height', fix_to_bottom);
}


//  + $("#container").height()
// $('#container').height(): Height of the element with id 'container' from the bottom

function showOrHide() {
    if (window.innerWidth < 1189) {
        document.getElementById("sidebar").classList.remove("show");
    }
}

function navigateTo(site) {
    location.href = site
}


$(document).ready(function() {
    getTheJson(location.origin + "/manufacturer/get_manufacturer_json", "#prodComp")
    getTheJson(location.origin + "/filterer/get_categories_json", "#prodType")
    shortenDesc()
})

function getTheJson(url, select_id) {       // fills the filter for type and manufacturer
    var dropdown = $(select_id)
    dropdown.append($('<option></option>').attr('value','').text('Any'))    // add any options
    $.getJSON(url, function (data) {
        
        for (var i=0; i < data.data.length; i++) {
            dropdown.append($('<option></option>').attr('value', data.data[i]).text(data.data[i]))  // add options from database
        }
    })
}

$(document).ready(function () {
    $("#filterSearch").on("click", function(event) {
        event.preventDefault()
        var name_filter = $("#prodName").val();
        var type_filter = $("#prodType").val();
        var company_filter = $("#prodComp").val();
        window.location.href = location.origin + '/product/filtered/?name_filter=' + name_filter + '&type_filter=' + type_filter + '&company_filter=' + company_filter
    })
})

function clickSearch(searchQuery) {
    $("#barSearch").val(searchQuery)
    $("#buttonSearch").click()
}

$(document).ready(function () {
    $("#buttonSearch").on("click", function (e) {
        var search_req = $("#barSearch").val(); // get search from search bar
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
        <div class="dropdown ml-3"}>
                <button id="orderDrop" class="btn miscBtn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Order by: Name (Ascending)
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" onclick="divSort('name')" type="button">Name (Ascending)</button>
                    <button class="dropdown-item" onclick="divSort('name', true)" type="button">Name (Descending)</button>
                    <button class="dropdown-item" onclick="divSort('price')" type="button">Price (Ascending)</button>
                    <button class="dropdown-item" onclick="divSort('price', true)" type="button">Price (Descending)</button>
                </div>
            </div>
        <br>
        <div id="product_list" class="row row-cols-3 row-cols-sm-2 row-cols-md-4">
        `);
        $.ajax({
            url: '/product?search_filter=' + search_req,
            type: 'GET',
            success: function (resp) {
                results = resp.data.map(d => {
                    // return html to inject into product page
                    return `
                        <div id='${ d.name };${ d.price }' class="col mb-4 productObject">
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
                                    <div>
                                        <button id="${ d.id }" type="button" class="buttonAddToCart mb-2 miscBtn w-100">Add to cart</button>
                                        <button onclick="window.location.href='../reviews/product/${ d.id }'" type="button" class="miscBtn w-100">Reviews</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                });
                newHTML = newHTML.concat(results);

                $('#prodList').html(newHTML.join(''));
                shortenDesc()
                addToCartButtons()
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
        if (!prod_descs[i].classList.contains("overwriteDesc")) { // Check if we want to overwrite this order
            let words = prod_descs[i].textContent.split(" ");
            if (words.length > 9) {
                let new_text = words.slice(0, 9).join(" ");
                prod_descs[i].textContent = new_text + "...";
            }
        }
    }
}



function theSuccessStory() {
    if (window.innerWidth > 1180) {
        $("#cartConfirm")
            .animate({top: '5%'}, /*Seconds*/1000, /*Easing*/"swing")
            .delay(1200)
            .animate({top: '-8%'}, /*Seconds*/1000, /*Easing*/"swing");
    }
    else {
        $("#cartConfirm")
            .animate({top: '7%'}, /*Seconds*/1000, /*Easing*/"swing")
            .delay(1200)
            .animate({top: '-8%'}, /*Seconds*/1000, /*Easing*/"swing");
    }
}

function dropFilter() {
    // This drops the filter down to the appropriate height from off-screen
    if (window.innerWidth > 1180) {
        $("#filter")
            .animate({top: '75%'}, 1000, "swing");
    }
    else {
        $("#filter")
            .animate({top: '65%'}, 1000, "swing");
    }
    let filtButt = document.getElementById("filtButt");
    filtButt.onclick = function () { raiseFilter() }; // Changes the onclick function to raiseFilter
}

function raiseFilter() {
    // This raises the filter off-screen
    $("#filter")
        .animate({top: '-400px'}, 1000, "swing");
    let filtButt = document.getElementById("filtButt");
    filtButt.onclick = function () { dropFilter() }; // Changes the onclick function to dropFilter
}

function resetCSS(el) {
    // This removes the inline css we put in for error fields
    $(el).removeAttr("style");
}