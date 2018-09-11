  const messaging = firebase.messaging();


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.


  /*
  
  
    function requestforpermision(){
     firebase.messaging().requestPermission().then(function() {
    // Notification permission granted.
    saveMessagingDeviceToken();
  }).catch(function(error) {
    console.error('Unable to get permission to notify.', error);
    
    
    shownotif("Permissions Denied!","Your Notifications Are Disabled, You have not granted notifications permission. Please allow notifications otherwise you will not recieve any notification.","warning","5")
  });
    
    }
    requestforpermision()
    */
    
    
    
    messaging.onMessage(function(payload) {
  console.log('Notification received. ', payload);
  
});

    
    
    
    
    // ...
  } else {
    // User is signed out.
    // ...
  }
});