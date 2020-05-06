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