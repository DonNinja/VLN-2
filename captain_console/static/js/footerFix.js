function fixPos() {
    console.log($(document).height());
    console.log($('#header').height());
    console.log($('#container').height());
    console.log($('#footer').height());
    $('#container').css('padding-bottom', $(document).height() - ($('#header').height() + $('#container').height()) - $('#footer').height() - 38);
}