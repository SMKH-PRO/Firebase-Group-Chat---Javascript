
var uploadfilesdiv = document.getElementById("uploadfilesdiv");

var filename;
	var fulldate = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });
var fulltime = currentTimeStringforCheckout;
    
var filedisplay = "fileicons/defaultfile.png";
var uploadboxclose = document.getElementById("uploadboxclose");
	
var uploader = document.getElementById("uploader");
var percentagetext =document.getElementById("percentagetext");
var fileButton = document.getElementById("uploadfiles");
//Two:
var uploadboxclosetwo = document.getElementById("uploadboxclosetwo");
var uploadertwo = document.getElementById("uploadertwo");
var percentagetexttwo =document.getElementById("percentagetexttwo");
var fileButtontwo = document.getElementById("uploadfilestwo");

var filedata;





var thenameofuser;

var theemailofuser;
var theprofilepicofuser;
var theuseridofuser;

var thenicknameofuser;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     
        //Setting up variables
        thenameofuser = firebase.auth().currentUser.displayName;
        theemailofuser = firebase.auth().currentUser.email;
        theprofilepicofuser = firebase.auth().currentUser.photoURL;
        theuseridofuser = firebase.auth().currentUser.uid;
        //Variables ends
        userinfo()

        firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).once('value',(data)=>{

            thenicknameofuser= data.child("NickName").val();

            
        });  

        
    } else {
      // No user is signed in.
      
     
    }
  });






function downloadfile(url){
    
      var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

}

fileButton.addEventListener('change'||'drop', function(e){  
    




		
    
    document.getElementById("btn-upload").style="display:none;"
uploadboxclose.style="display:none;"
    var useripstring = userip.replace(/\./g,'')
    // console.log("function upload file started")

	var file = e.target.files[0];
	filename = e.target.files[0].name;

		// console.log(file)
		// console.log("file type : "+file.type)
		uploader.style="display:block;";
		document.getElementById('percentagetext').style="outline-width: 0px; border: 0px solid black; background: transparent; color: silver; font-weight: 800; width: 100%; text-align: center; position: absolute; left: 0px; bottom: 45px; font-size: 25px; display:block"
		
		
			if(filename.length > 20){
	    filename = "...."+file.name.slice(-18);
	    
	    // console.log(filename)
	}
		 
		if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
	
	uploader.style ="display:block; transition:all 3000ms ease;";
	
	
var storageRef = firebase.storage().ref();

// File or Blob named mountains.jpg

var file = e.target.files[0];
// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(`CHATROOM/${firebase.auth().currentUser.displayName}/${file.name}`).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    	uploader.value = progress;
percentagetext.value = Math.round(progress)+"%";
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        // console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        // console.log('Upload is running');
        break;
    }
  }, function(error) {
      
      
uploadboxclose.style="display:block;"
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  

    	percentagetext.style="outline-width: 0px; border: 0px solid black; background: transparent; color: red; font-weight: 800; width: 100%; text-align: center; position: absolute; bottom: 45px; font-size: 14px;"
  switch (error.code) {
    case 'storage/unauthorized':
      percentagetext.value = "File Size Limit Exceeded, Upload file smaller than 5MB "+error.code;
      shownotif("Error!","Your File Upload Limit Is Smaller Than 5 MB,So Upload files smaller than 5MB. ","danger","3")
  
      shownotif("Offer!","If you want to upload files larger than 5 MB then please buy premium membership from admin.","info","8")
	  
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      percentagetext.value = "Error..!! Upload Cancelled "+error.code;
      break;

    case 'storage/unknown':
      percentagetext.value = "  Unknown Error:  "+error.code;
      break;
  }
  
}, function() {
    
    
    var downloadURL = uploadTask.snapshot.downloadURL.toString();
     var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

  	uploader.value = "100"
percentagetext.value = "Upload Completed.";
	
	
		
		
 setTimeout(function(){    $("#Uploadfiles").modal("hide"); uploadboxclose.style="display:block;"  ; }, 700);

document.getElementById("btn-upload").style="display:block;"

	var quoatedURL = "'"+downloadURL+"'";
   /* firebase.database().ref(`MFS_files/${useripstring}`).push('');*/

   var bigimagefunc= "BigPicture({ el: this, imgSrc: '"+downloadURL+"' })"
   
   
   firebase.database().ref(`CHATROOM/MESSAGES`).push({Nickname:thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:`<figure onclick="${bigimagefunc}" ><img class='sentimage' caption='Image Sent By ${thenameofuser}' src='${downloadURL}'> <figcaption title="${file.name}">${filename}</figcaption> </figure>`,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {

  firebase.database().ref('/notifications')
    .push({
      user: firebase.auth().currentUser.displayName,
      message: "Sent A Phpto ......",
      userProfileImg: firebase.auth().currentUser.photoURL
    })

    shownotif("Completed!","Your Image Was Uploaded Successfully..! ","info","1")
})
  
			

  
  
  // console.log(downloadURL)
  
  //document.getElementById('namebox2').className ='namebox2 animated fadeOutUp';
setTimeout(function(){
// document.getElementById('namebox2').style.display= 'none'; 
 //uploader.value = "0";
}, 2000);
  
});
 
	
	
	
	
	

 }
 

 else{
	 
	 
	 
var storageRef = firebase.storage().ref();

// File or Blob named mountains.jpg

var file = e.target.files[0];


// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(`CHATROOM/${firebase.auth().currentUser.displayName}/${file.name}`).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    	uploader.value = progress;
percentagetext.value = Math.round(progress)+"%";
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        // console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        // console.log('Upload is running');
        break;
    }
  }, function(error) {
      
      document.getElementById("btn-upload").style="display:block;"
uploadboxclose.style="display:block"
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors'
  	percentagetext.style="outline-width: 0px; border: 0px solid black; background: transparent; color: red; font-weight: 800; width: 100%; text-align: center; position: absolute; bottom: 45px; font-size: 14px;"
  switch (error.code) {
    case 'storage/unauthorized':
      percentagetext.value = "File Size Limit Exceeded ";
      shownotif("Error!","Your File Upload Limit Is Smaller Than 5 MB,So Upload files smaller than 5MB. ","danger","3")
  
      shownotif("Offer!","If you want to upload files larger than 5 MB then please buy premium membership from admin.","info","8")
	  uploader.value = "0";
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
	uploader.value = "0";
      percentagetext.value = "Error..!! Upload Cancelled "+error.code;
      break;

    case 'storage/unknown':
	uploader.value = "0";
      percentagetext.value = "  Unknown Error:  "+error.code;
      break;
  }
}, function() {
    
    
    var downloadURL = uploadTask.snapshot.downloadURL.toString();
     var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

  	uploader.value = "100"
percentagetext.value = "Upload Completed.";
	
	
		
		

setTimeout(function(){  $("#Uploadfiles").modal("hide"); }, 700);


    /*firebase.database().ref(`MFS_files/${useripstring}`).push('<a class="imgdwnld"  href="/Firebase-Group-Chat--Javascript/'+downloadURL+'" download><div class="yst-card-4 test uploadedimage" > <img src='+filedisplay+'  class="uploadedfileimage" alt="Default File Icon." style="width:100%;opacity:0.85"> <div class="yst-container"> <center>'+filename+' </center></b> </div> </div></a></div>');*/


    
    
    document.getElementById("btn-upload").style="display:block;"

    if(file.type == "video/mp4"||file.type == "video/mpeg"||file.type == "video/avi"||file.type == "video/3gp"||file.type == "video/flv"||file.type == "video/wmv"||file.type == "video/mov"||file.name.slice(-4) == ".mp4"||file.name.slice(-4) == ".avi"){

    var bigimagefunction= "BigPicture({ el: this, vidSrc: '"+downloadURL+"' })"
   
      firebase.database().ref(`CHATROOM/MESSAGES`).push({Nickname:thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:`<video class="uploadedvideo" onclick="${bigimagefunction}" > <source src="${downloadURL}" > Your browser does not support HTML5 video. </video> <img onclick="${bigimagefunction}"  src="play-button.png" class="avatarimg vidplaybtn"><br> <text class="nameofvideo" title="${file.name}"><text class="redcolor"> Video:</text> ${filename}</text>`,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
     firebase.database().ref('/notifications')
    .push({
      user: firebase.auth().currentUser.displayName,
      message: "Sent A Video File ......",
      userProfileImg: firebase.auth().currentUser.photoURL
    })
   
       shownotif("Completed!","Your Video Was Uploaded Successfully..! ","info","1")
   })
     

      

    }


    else if(file.type == "audio/mp3"||file.type == "audio/mpeg"||file.type == "audio/avi"||file.type == "audio/3gp"||file.type == "audio/m4a"||file.type == "audio/ogg"||file.type == "audio/mpa"||file.type == "audio/mov"||file.name.slice(-4) == ".m4a" || file.name.slice(-4) == ".mp3"||file.name.slice(-4) == ".ogg"){

      firebase.database().ref(`CHATROOM/MESSAGES`).push({Nickname:thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:"<audio controls> <source src='"+downloadURL+"' > </audio>",Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
  firebase.database().ref('/notifications')
    .push({
      user: firebase.auth().currentUser.displayName,
      message: "Sent A File ......",
      userProfileImg: firebase.auth().currentUser.photoURL
    })

        shownotif("Completed!","Your Audio File Was Uploaded Successfully..! ","info","2")
    })
			

    }

    else{
    firebase.database().ref(`CHATROOM/MESSAGES`).push({Nickname:thenameofuser,Name: thenameofuser,EMAIL: theemailofuser,UserImage:theprofilepicofuser , UserId: theuseridofuser,Ip: userip,Message:"<a href="/Firebase-Group-Chat--Javascript/+downloadURL+" target='_blank' download><figure><img class='sentfile' src='"+filedisplay+"'> <figcaption title='"+file.name+"' >"+filename+"</figcaption> </figure></a>",Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
  firebase.database().ref('/notifications')
    .push({
      user: firebase.auth().currentUser.displayName,
      message: "Sent A File ......",
      userProfileImg: firebase.auth().currentUser.photoURL
    })

        shownotif("Completed!","Your File Was Uploaded Successfully..! ","info","1")
    })
			
  }
  
  
  //// console.log(downloadURL)
  
 
});
 
	
	
	
	
	
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
 }//Else Ends here
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});







function uploadbtnfunction(){
    
    $('#Uploadfiles').modal({backdrop: 'static', keyboard: false})
	document.getElementById('uploadimg').style='display:block;' ;
	document.getElementById('uploadfiles').value =''; 
	document.getElementById('percentagetext').value = 'Drop Files Or Click Browse.'; 
	document.getElementById('percentagetext').style="display:none;"
	document.getElementById('uploader').value = '0';
    document.getElementById('uploader').style='display:none;'
$(".filename").html("")
	
}


//UPDATE PROFILE












function updateprofilebtnfunction(){
    
  $('#picprofile').modal({backdrop: 'static', keyboard: false})
document.getElementById('uploadimgtwo').style='display:block;' ;
document.getElementById('uploadfilestwo').value =''; 
document.getElementById('percentagetexttwo').value = 'Drop Files Or Click Browse.'; 
document.getElementById('percentagetexttwo').style="display:none;"
document.getElementById('uploadertwo').value = '0';
  document.getElementById('uploadertwo').style='display:none;'
$(".the2ndfilename").html("")

}




fileButtontwo.addEventListener('change'||'drop', function(e){  
    




		
    
  
uploadboxclosetwo.style="display:none;"
  var useripstring = userip.replace(/\./g,'')
  //console.log("function upload file started")

var file = e.target.files[0];
filename = e.target.files[0].name;

 // console.log(file)
 // console.log("file type : "+file.type)
  uploadertwo.style="display:block;";
  document.getElementById('percentagetexttwo').style="outline-width: 0px; border: 0px solid black; background: transparent; color: silver; font-weight: 800; width: 100%; text-align: center; position: absolute; left: 0px; bottom: 45px; font-size: 25px; display:block"
  
  


   
  if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){

uploadertwo.style ="display:block; transition:all 3000ms ease;";


var storageRef = firebase.storage().ref();

// File or Blob named mountains.jpg

var file = e.target.files[0];
// Create the file metadata


// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child(`CHATROOM/${firebase.auth().currentUser.displayName}/${file.name}`).put(file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
function(snapshot) {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploadertwo.value = progress;
    percentagetexttwo.value = Math.round(progress)+"%";
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      // console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      // console.log('Upload is running');
      break;
  }
}, function(error) {
    
    
uploadboxclosetwo.style="display:block;"
// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors


percentagetexttwo.style="outline-width: 0px; border: 0px solid black; background: transparent; color: red; font-weight: 800; width: 100%; text-align: center; position: absolute; bottom: 45px; font-size: 14px;"
switch (error.code) {
  case 'storage/unauthorized':
  percentagetexttwo.value = "File Size Limit Exceeded."+error.code;
  shownotif("Error!","Your File Upload Limit Is Smaller Than 5 MB,So Upload files smaller than 5MB. ","danger","3")
  
  shownotif("Offer!","If you want to upload files larger than 5 MB then please buy premium membership from admin.","info","8")
    // User doesn't have permission to access the object
    break;

  case 'storage/canceled':
  percentagetexttwo.value = "Error..!! Upload Cancelled "+error.code;
    break;

  case 'storage/unknown':
  percentagetexttwo.value = "  Unknown Error:  "+error.code;
    break;
}

}, function() {
  
  
  var downloadURL = uploadTask.snapshot.downloadURL.toString();
   var user = firebase.auth().currentUser;
var quoted = "'"+downloadURL+"'";

  uploadertwo.value = "100"
percentagetexttwo.value = "Upload Completed.";


       var user = firebase.auth().currentUser;

user.updateProfile({
 
  photoURL: downloadURL.toString()
  
}).then(function() {

  
setTimeout(function(){  location.reload();  $("#picprofile").modal("hide"); uploadboxclosetwo.style="display:block;"  ; }, 2000);

shownotif("Task Completed!","Your Profile Picture Has Been Changed Successfully, We are reloading page to make sure that the profile update take effect.","info","5")
})



 /* firebase.database().ref(`MFS_files/${useripstring}`).push('');*/

 
 

  shownotif("Completed!","Your Image Was Uploaded Successfully..! ","info","1")


    



// console.log(downloadURL)



});







}


else{
  updateprofilebtnfunction()
 shownotif("Error!","The file you selected is not an image file, Please Select File With Valid Image Format Such As .png, .jpg","danger","6")
}//Else Ends here
  
  

  
});




