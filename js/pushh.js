var nickname;




var date = new Date();
 

var fulldate = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });


var textarea = document.getElementById("message-to-send")
//Setting up variables
  // console.log(firebase.auth().currentUser)

  function userinfo(){

    if(firebase.auth().currentUser === null){
        // console.log("checking current user in 500ms ")
        setTimeout(function(){userinfo()},500)
    }
    
else{
  name = firebase.auth().currentUser.displayName;
  email = firebase.auth().currentUser.email;
  profilepic = firebase.auth().currentUser.photoURL;
  userid = firebase.auth().currentUser.uid;
  // console.log(firebase.auth().currentUser)
}
  }
  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     
        //Setting up variables
         name = firebase.auth().currentUser.displayName;
         email = firebase.auth().currentUser.email;
         profilepic = firebase.auth().currentUser.photoURL;
         userid = firebase.auth().currentUser.uid;
        //Variables ends
        userinfo()

        firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).once('value',(data)=>{

            nickname= data.child("NickName").val();

            
        });  

        
    } else {
      // No user is signed in.
      
     
    }
  });
 //Variables ends

 
 
 function onclickpushdata(){
    if(textareabox.value.length>1){ pushdata()}
 else{shownotif("Warning!","Please write something before submitting. Dont Submit Blank Message.!","danger","1")}
 }

 document.getElementById("sendbtnimage").addEventListener("click", function(){moderatewords(); onclickpushdata()});
function pushdata(){
    
if(name === null || name === undefined){

    shownotif("Error!","Name Is Not Set, Cannot Send Message.","danger","4")
}



else if( email === null || email === undefined){
    shownotif("Error!","User Email Is Missing, Cannot Send Message.","danger","4")
}



else if(profilepic === null || profilepic === undefined) {

shownotif("Error!","Profile Picture Is Missing, Cannot Send Message.","danger","4")
}



else{

    if(isOnline == "No") {

        shownotif("Oops!","There is no connection between server and you, The message will not be delivered.","warning","2")
        event.preventDefault();
        return false;
    }

    

else{



    firebase.database().ref(`CHATROOM/ONLINEUSERS`).once('value',(childss)=>{

if(childss.child("status") != "Active"){
    

    firebase.database().ref(`CHATROOM/ONLINEUSERS/${firebase.auth().currentUser.uid}`).set({ParentID:firebase.auth().currentUser.uid+"ParentStatus",UserID:firebase.auth().currentUser.uid+"Status",Name:firebase.auth().currentUser.displayName,Photo:firebase.auth().currentUser.photoURL,status:"Active"});
}

    })


if(firebase.auth().currentUser.uid == "QUp7KLniDNTVbgChAJsmQJ8B1Ue2"){

    firebase.database().ref('/notifications')
    .push({
      user: firebase.auth().currentUser.displayName,
      message: textarea.value,
      userProfileImg: firebase.auth().currentUser.photoURL
    })
}

textarea.value = textarea.value.replace(/(https?:\/\/[^\s]+)/g, "<a class='sentlinks' target='_blank' href='$1'>$1</a>");


    firebase.database().ref(`CHATROOM/MESSAGES`).push({Nickname:nickname,Name: name,EMAIL: email,UserImage:profilepic , UserId: userid,Ip: userip,Message:textarea.value,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
        var textarea = document.getElementById("message-to-send");
        textarea.value = "";
        textarea.innerHTML = "";
    
      })
    
    
  
    event.preventDefault();}
}


}