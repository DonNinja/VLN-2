function fixPos() {
    let fix_to_bottom = $(document).height() - ($('#header').height() + $("#container").height()) - $('#footer').height() - 38
    // $(document).height(): Height of the start of the page from the bottom
    // $('#header').height(): Height of the element with id 'header' from the bottom
    // $('#container').height(): Height of the element with id 'container' from the bottom
    // $('#footer').height(): Height of the element with id 'footer' from the bottom
    // 38: Additional height from padding, margin and border of footer
    $('#container').css('padding-bottom', fix_to_bottom);
    if (fix_to_bottom !== 0) {
        $('#goUp').hide();
    }
}

function navigateTo(site) {
    location.href=site
}