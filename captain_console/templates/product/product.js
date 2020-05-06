// $(document).ready(function(){
//     $("#buttonSearch").on("click",function(e){
//         e.preventDefault();
//         var search_req = $("#barSearch").val();
//         $.ajax({
//             url: '/product?search_filter=' + search_req,
//             type: 'GET',
//             success: function(resp) {
//                 var newHTML = resp.data.map(d => {
//                     `<div class="flex_class">
//                         <div class="leftHalf">
//                             <h4>${product.name}</h4>
//                             <a href="/product/${product.id}">
//                                 <img class="manImg" src="${product.image}"/>
//                             <h3 class="price_tag"><u>${product.price} Kr</u></h3>
//                             </a>
//                         </div>
//                     </div>`
//                 });
//                 $('.list_container').html(newHTML.join(''));
//                 $('#barSearch').val('list_container')

//             },
//             error: function(xhr, status, error) {
//                 // TODO SHOW toastr??
//                 console.log(error);
//             }
//         })
//     });
// });