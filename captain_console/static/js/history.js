

function emptySearch(){
    
    $.ajax({
        url: '/histories/empty_search',
        type: 'DELETE',
        // TODO: REMOVE CONSOLE LOG
        success: function(resp) {
            console.log(resp)
            $("#SHcontainer").html('')
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    })
};
