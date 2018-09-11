firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

 

    // ...
  } else {
    // User is signed out.
    
    
    
    
    
     
  

  }
});



$("#verifyphone").intlTelInput({
  // allowDropdown: false,
  // autoHideDialCode: false,
  // autoPlaceholder: "off",
  // dropdownContainer: "body",
  // excludeCountries: ["us"],
  // formatOnDisplay: false,
  // geoIpLookup: function(callback) {
  //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
  //     var countryCode = (resp && resp.country) ? resp.country : "";
  //     callback(countryCode);
  //   });
  // },
  // hiddenInput: "full_number",
  initialCountry: "pk",
  // nationalMode: false,
  // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  // placeholderNumberType: "MOBILE",
   preferredCountries: ['pk'],
  // separateDialCode: true,
  utilsScript: "../phoneapi/utils.js"
});