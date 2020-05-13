


function validateForm() {
    let invalidForms = [];
    var isValid = true;
    var contactName = document.forms["contactInfo"]["fullName"].value;
    var contactCity = document.forms["contactInfo"]["city"].value;
    var contactStreet = document.forms["contactInfo"]["streetName"].value;
    var contactHouse = document.forms["contactInfo"]["houseNum"].value;
    var contactCountry = document.forms["contactInfo"]["country"].value;
    var contactPost = document.forms["contactInfo"]["postalCode"].value;

    if (contactName=="") {
        isValid = false
        invalidForms.push("fullName")
    }
    if (contactCity=="") {
        isValid = false
        invalidForms.push("city")
    }
    if (contactStreet=="") {
        isValid = false
        invalidForms.push("streetName")
    }
    if (contactHouse=="") {
        isValid = false
        invalidForms.push("houseNum")
    }
    if (contactCountry=="") {
        isValid = false
        invalidForms.push("country")
    }
    if (contactPost=="") {
        isValid = false
        invalidForms.push("postalCode")
    }
    if (isValid) {
        saveToLocal()
        return true
    }
    else {
        $("#contactAlert").show(); // Shows the alert telling the user that not all forms have been filled out
        for (let i = 0; i < invalidForms.length; i++) {
            // This outlines all error forms
            $("#" + invalidForms[i]).css('outline', 'none');
            $("#" + invalidForms[i]).css('border-color', 'red');
            $("#" + invalidForms[i]).css('box-shadow', '0 0 .25rem red');
        }
        return false
    }
}


function saveToLocal() {
    localStorage.setItem("fullname", $("#fullName").val())
    localStorage.setItem("city", $("#city").val())
    localStorage.setItem("streetname", $("#streetName").val())
    localStorage.setItem("housenumber", $("#houseNum").val())
    localStorage.setItem("country", $("#country").val())
    localStorage.setItem("postcode", $("#postalCode").val())
    // window.location.href = location.origin + "/cart/overview"
}

function goToOverview () {
    // window.location.href = location.origin + "/cart/overview"
    return location.origin + "/cart/overview"
}

// // Wait for the DOM to be ready
// $(function() {
//     console.log("tEST")
//     // Initialize form validation on the registration form.
//     // It has the name attribute "registration"
//     $("form[name='contactInfo']").validate({
//       // Specify validation rules
//       rules: {
//         // The key name on the left side is the name attribute
//         // of an input field. Validation rules are defined
//         // on the right side
//         fullName: "required",
//         city: "required",
//         streetName: "required",
//         houseNum: "required",
//         postalCode: "required",
        
        
//       },
//       // Specify validation error messages
//       messages: {
//         fullName: "Please enter your full name",
//       },
//       // Make sure the form is submitted to the destination defined
//       // in the "action" attribute of the form when valid
//       submitHandler: function(form) {
//         // $("#contactContinue").click();
//         form.submit()
//       }
//     });
//   });