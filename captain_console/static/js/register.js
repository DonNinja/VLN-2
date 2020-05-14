// $(
//     function(){
//         $("#registerSubmit").click(function(event) {
//             event.preventDefault()
//             register()
//         })
//     }
// )


// function register () {

//     $.ajax({
//         url: '',
//         type: 'POST',
//         // TODO: REMOVE CONSOLE LOG
//         success: function(resp) {
//             var errorStr = "Please check the following fields: </br>"
//             var errResp
//             for (errResp in resp){
//                 if (errResp == 'username') {
//                     errResp = 'Username'
//                 }
//                 else if (errResp == 'password1') {
//                     errResp = 'Password'
//                 }
//                 else if (errResp == 'password2') {
//                     errResp = 'Password Confirmation'
//                 }
//                 errorStr += errResp + "</br>"
//             }
//             $("#errors").html(errorStr)
//         },
//         error: function(xhr, status, error) {
//             x = 1
//         }
//     })
// }

