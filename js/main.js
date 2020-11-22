var isthisfirsttime = "YES"
var isOnline = "No"
var wasblocked = "NO";
var timeofmsg;
var name;var email;var profilepic;var userid
var e_address,pass,pass_cnfrm,namebox;
var insertedchat = document.getElementById("insert-chat");
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var textareabox = document.getElementById("message-to-send");

function scrollbottom(){
    var isScrolled = insertedchat.scrollTop == insertedchat.scrollHeight - insertedchat.offsetHeight;
       
    setTimeout(function(){insertedchat.scrollTop = insertedchat.scrollHeight;},100)
}

function enterpressed() {

if (event.keyCode == 13 && !event.shiftKey) {// console.log('only enter pressed') 
   if(textareabox.value.length>1){
       moderatewords();
       pushdata()
}
   else{

    event.preventDefault();
	
//Notification starts
shownotif("Warning!","Please write something before submitting. Dont Submit Blank Message.!","danger","1")
//Ends


}
   }
}



function deletemsg(id){


    firebase.database().ref(`CHATROOM/MESSAGES/${id}`).remove().then(function(){

        shownotif("Done!","Comment Was Deleted.!","success","1")
    })
}




function isblocked(){


    firebase.database().ref(`CHATROOM/BLOCKEDIPS`).on('value',(data)=>{
        
  
  
    
        if(data.hasChild(useripstring) || data.hasChild(firebase.auth().currentUser.uid) ){
            
    
            //agar blocked users ki list me iski ip hogi to if condition here...
            shownotif("Error!","You were blocked by administrator, If you are sure that it was an unfair ban please contact admin of this chatroom.","danger","10")
           
           if(wasblocked != "YES"){ document.getElementById("message-to-send").id="messsage-to-send";}
           
            $("#themainbody").fadeOut(300, function() {  });
            $("#blockeduser").modal({backdrop: 'static', keyboard: false})  
            wasblocked = "YES"
            
        }
        else{
           if( wasblocked === "YES") {
            document.getElementById("messsage-to-send").id="message-to-send";
            $("#themainbody").fadeIn();
            
            wasblocked = "NO"

            shownotif("Good News! ","Congratulations.! You Are Now Unblocked,  Please Reload Page For A Better Performance.","info","3")
            $("#blockeduser").modal('hide');
           }


           //console.log("User Isnt Blocked")
        
        }
    
    });
}




firebase.auth().onAuthStateChanged(function(user) {
    if (user) {


 
 if(userip !== undefined && userip !== null ){
    isblocked();
    ifonebanfoundaddothertoo();

 }
 else {setTimeout(function(){   isblocked(); ifonebanfoundaddothertoo()},1000)}
//IDLE ENDS


//If user go offline remove the html from our page.



 //SET ONLINE USERS ENDS ABOVE



        //Setting up variables
         name = firebase.auth().currentUser.displayName;
         email = firebase.auth().currentUser.email;
         profilepic = firebase.auth().currentUser.photoURL;
         userid = firebase.auth().currentUser.uid;
        //Variables ends
        
      
checkforuserdetails()



document.getElementById("headavtr").src = firebase.auth().currentUser.photoURL;
document.getElementById("nametitle").innerHTML = firebase.auth().currentUser.displayName;
        $("#modalLRForm").modal('hide');
        textareabox.addEventListener("keydown", enterpressed);

        
    } else {
      // No user is signed in.
      
      document.getElementById("nametitle").innerHTML = "Login Required..!"
      modalLRForm()
    }
  });
  

//Modal1
function modalLRForm(){
    $(document).ready(function(){

        $("#modalLRForm").modal({backdrop: 'static', keyboard: false})  
        
        });
}










function keydownverifynumber(){
    if (event.keyCode == 13) {  verifyphone() }
}



document.getElementById("verify-btn").addEventListener("click", verifyphone)



window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': function(response) {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    
    }
  });


  

function verifyphone(){
    

      var appVerifier = window.recaptchaVerifier;

   var sendsms =  firebase.auth().currentUser.linkWithPhoneNumber(document.getElementById("verifyphone").value, appVerifier)
shownotif("Alert!","In the next steps, we will be verifying your phone number.","info","30");

shownotif("Alert!","We will send you a 6 digit code on this number, you have to write that code in the prompt box (you may have to complete re-captcha first) .","info","30");
    
    sendsms.then(function(confirmationResult) {
      
        
      
        alertforcode();
    var code = alertforcode();
      

    return confirmationResult.confirm(`${code}`);

  
    })
    .then((result)=> {
      shownotif("Sucess!","Your Phone Number Is Now Verified, Thank You.","success","5");

      var phone = {Phone:document.getElementById("verifyphone").value}
      firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).set(phone)
      $("#phoneverification").modal("hide")
    })
    .catch((error) => {
      // Error occurred.
      shownotif("Error!",error,"danger","20");
    });

  
}

function alertforcode(){

    var promptcode = prompt("Write 6 Digits Code Sent To Your Phone Number")
    return promptcode
}






function getmoredetails(){
    var fullname= document.getElementById("userfullname");
    var nickname = document.getElementById("usernickname");
    var fblink= document.getElementById("userfblink");

    var islink = /^(?:(?:(?:https?|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    if(fullname.value.length <2){
shownotif("Warning!","Please Write Your Full Name.","danger","2")
return false;
    }
    else if(nickname.value.length < 3 ){
        shownotif("Warning!","Please Write Your Nick Name.","danger","2")
        return false;
    }

    

    else if(islink.test(fblink.value)=== false){
        shownotif("Error!","Link Is Invalid, Make Sure that link start with https or http, Copy complete link of your facebook profile..","danger","5")
        return false;

    }

    else{
        firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).on('value',(data)=>{

        var moredetails = {FullName:fullname.value,NickName:nickname.value,ProfilePic:firebase.auth().currentUser.photoURL,FBLink: fblink.value,RegisteredWithArea: usercity+", "+usercountry ,LastLoginArea: usercity+", "+usercountry,RegisteredWithIP: userip,LastIP:userip,RegisteredWithISP: isp,LastISP: isp,Phone: data.child("Phone").val(), Email:firebase.auth().currentUser.email}

        firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).set(moredetails).then(()=>{
            $("#modalmoreinfo").modal("hide");
                           })//then ends here

        })
    }


}



function getmoredetailskeydown() {
    if (event.keyCode == 13) { 
        getmoredetails()
              }
           }


















//Check if user has submitted all the required information:-



function checkforuserdetails(){

    



    firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).on('value',(data)=>{

    
            
        if(data.hasChild("Phone")){
            $("#phoneverification").modal('hide') 
            //console.log(data.child("Phone").val())




            if(data.hasChild("NickName")===false || data.hasChild("FullName")===false|| data.hasChild("FBLink")===false ){
                $("#modalmoreinfo").modal({backdrop: 'static', keyboard: false}) 
                document.getElementById("senddetails-btn").addEventListener("click", getmoredetails)
                document.getElementById("userfullname").addEventListener("keydown", getmoredetailskeydown)
                document.getElementById("usernickname").addEventListener("keydown", getmoredetailskeydown)
                document.getElementById("userfblink").addEventListener("keydown", getmoredetailskeydown)                
            }


            else{

                if(data.child("LastIP").val() != userip){
                firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).update({ LastIP: userip,LastLoginArea:usercity+", "+usercountry,LastISP: isp,ProfilePic:firebase.auth().currentUser.photoURL  });
            }
            else if(data.child("ProfilePic").val() != firebase.auth().currentUser.photoURL ){
                firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).update({ProfilePic:firebase.auth().currentUser.photoURL  });
                
            }
            
            else{//console.log("Logged In From New IP..!")}
            
            
        setTimeout(function(){
if(isthisfirsttime == "YES"){
            
            showdata()
            isthisfirsttime = "NO"
}
        },250)
                
                var mainbody = document.getElementById("themainbody");
                mainbody.className = "contaiiner clearfix animated fadeIn"
                mainbody.style="";

                document.getElementById("nametitle").innerHTML = data.child("FullName").val();
            }


        }
    }

            
        
else{
$("#phoneverification").modal({backdrop: 'static', keyboard: false}) 
var phonenumber = document.getElementById("verifyphone");


phonenumber.addEventListener("keydown",keydownverifynumber)

}
})
}



  function reverify(id,name){

    
                

    var namess = firebase.database().ref(`CHATROOM/USERDETAILS/${id}/FullName`);



    var confirmbox = prompt("Please Write 123456 to Confirm That You Want User: '' "+name+" '' to Re-verify His/Her Account.")


    if(confirmbox !== undefined && confirmbox !== null && confirmbox === "123456"){
                 firebase.database().ref(`CHATROOM/USERDETAILS/${id}/FBLink`).remove().then(function(){

                    shownotif("Done! ","This user will be forced to Re Fill his information such as name,nick,fblink.","info","3")
                 })
                }
                else{shownotif("Denied!","You denied to complete confirmation, The user will not be asked to refill his info.","danger","3")}
                

}














function ignorethisuser(id){

    var ignoref=firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`);
    
    
  var askforconfirmation = prompt("After ignoring this user, you will not be able to see messages from him, however this user will be able to read your messages.\n\n if you are sure to ignore this user please write '' YES ''");

if(askforconfirmation !== null && askforconfirmation !="" && askforconfirmation !== undefined && askforconfirmation.toUpperCase() == "YES"){

    firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}/${id}`).set({ignore:"True"}).then(function(){
shownotif("Done!","This User Has Been Ignored, To Un-Ignore Users Please Visit Ignore List.","info","3")})
}
else{shownotif("Action Denied!","You cancelled to perform this action, User will not be added to ignore list.","warning","3")}
}




function showdata(){

    firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`).on('value',(ignoreduser)=>{
        
        
        
        
        ignoreduser.forEach(function(ignoredusers){

            $("div[ignoreid='"+ignoredusers.key+"']").fadeOut('slow', function() { $("div[ignoreid='"+ignoredusers.key+"']").remove(); })
        //console.log(ignoredusers.key)
        
        })
        })
    

    firebase.database().ref(`CHATROOM/MESSAGES`).on('child_removed',(data)=>{


        $("div[comment='"+data.key+"']").fadeOut("slow", function() { $("div[comment='"+data.key+"']").remove(); })
        
    })

    //ONLINE USERS
 

      var onlineusersref = firebase.database().ref(`CHATROOM/ONLINEUSERS`);

      onlineusersref.on('child_added',(data)=>{
var onlineusers = document.getElementById("insert-users");





    var userpic = data.child("Photo").val();
    var activeusername = data.child("Name").val();
    var userstatus = data.child("status").val();
    var idofactiveuser = data.child("UserID").val();
    var ParentDiv = data.child("ParentID").val();
    var quoatedpic = "'"+data.child('Photo').val()+"'"
    if(data.child("ParentID").val().slice(0,-12) == firebase.auth().currentUser.uid ){ activeusername = "YOU" }


        // Do something now you know the image exists.
 onlineusers.innerHTML += '<li id="'+ParentDiv+'" class="clearfix"> <img class="avatarimg" onclick="BigPicture({ el: this, imgSrc: '+quoatedpic+' })"  src="'+userpic+'" alt="avatar" /> <div class="about"> <div class="name">'+activeusername+'</div> <div style="font-family:Amaranth;" id="'+idofactiveuser+'" title="User Is Currently Viewing Messages." class="status">  <center><img src="loadingicon.gif" style="width:30px; height:30px; border-radius:50%; position:absolute;"></center></div> </div> </li>'

 


    })

    //UPDATING USER STATUS

    firebase.database().ref(`CHATROOM/ONLINEUSERS`).on('value',(childss)=>{
        var onlineusers = document.getElementById("insert-users");
 childss.forEach(function(data){


    var userpic = data.child("Photo").val();
    var activeusername = data.child("Name").val();
    var userstatus = data.child("status").val();
    var idofactiveuser = data.child("UserID").val();
    
    var newclassname;


var divwithuserid = document.getElementById(idofactiveuser);

        // Do something now you know the image exists.
setTimeout(function(){

    if(divwithuserid !== undefined && divwithuserid !== null ){
    if(userstatus == "Active"){
        divwithuserid.innerHTML = '<i style="animation: ripple 1s  ease-in-out; border-radius:50%" class="fa fa-eye animated bounceIn online "></i><text class="animated fadeIn"> Active</text>'

        divwithuserid.setAttribute("title","User Is Viewing Messages.");
    }
    else if(userstatus == "Not Viewing"){
        divwithuserid.innerHTML = '<i class="fa fa-eye-slash animated bounceIn offline "></i><text class="animated fadeIn"> Not Viewing</text>'
        divwithuserid.setAttribute("title","The Browser Is Minimized, Or User May Be Using Other Tabs So Thats Why User Is Not Viewing The Messages.");
    }
    else if(userstatus == "Away"){
        divwithuserid.innerHTML = '<i class="fa fa-clock-o animated bounceIn offline "></i> <text class="animated fadeIn">Away</text>'
        divwithuserid.setAttribute("title","There is no activity by user from last 1 minute, Looks like this user is away from computer.");
    }

    else if(userstatus != "Away" && userstatus != "Not Viewing" && userstatus != "Active"){
       // console.log("STATUS OF USER:"+userstatus)
        return shownotif("Error!"," None of the user status matched with the conditions, Please Contact Admin","danger","2") }
    }//Undefined if div ends here   
    
    else{shownotif("Error!","Couldnt Find The Div Of Online User,If Reloading the page does not help then Please Contact Admin","danger","2")}
},500)





 })

    })

    onlineusersref.on('child_removed', function(data) {
        setTimeout(function(){
// console.log("RemovedChild: "+ data.key)


var deleteddiv = document.getElementById(data.key+"ParentStatus");


$("#"+data.key+"ParentStatus").fadeOut(300, function() { $("#"+data.key+"ParentStatus").remove(); })
},200)

 


      });

    //ONLINE USERS ENDS ABOVE

   
    var datenow = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });
    


if(firebase.auth().currentUser.uid !== null && firebase.auth().currentUser.uid !== undefined && firebase.auth().currentUser !== null ){

	firebase.database().ref(`CHATROOM/MESSAGES`).on('child_added',(data)=>{
        admin()
        

       
document.getElementById("insert-chat")
       
       var isScrolled = insertedchat.scrollTop == insertedchat.scrollHeight - insertedchat.offsetHeight;
       
       setTimeout(function(){insertedchat.scrollTop = insertedchat.scrollHeight;},100)


    
        //CHECK IF MESSAGE IS FROM CURRENT USER
var msgtime =  data.child("Time").val();
var msgdate = data.child("Date").val();
var messageofuser = data.child("Message").val();
var nameofuser = data.child('Name').val();
var imageofuser = data.child('UserImage').val();
var thenick = data.child('Nickname').val();
var userdetailsfunction = "userdetails('"+data.child("UserId").val()+"')"
 var blockuserip = "blockuserip('"+data.child("Ip").val()+"','"+data.child("UserId").val()+"')"
 var keyofthiscomment = data.key;
var isthisadminmessage = "NO"
 var quoatedsnapkey = "'"+data.key+"'";
 var styletag =""; 
 var styleforpic = "";
var quoatedimage = "'"+data.child('UserImage').val()+"'"
 var stylenone;
 var adminclass =  "dropdown dropdowndiv right";
 

var quoateduserid = "'"+data.child("UserId").val()+"'";
//if(msgtime == currentTimeStringforCheckout){

 //   msgtime = "Just Now"
//}
var ignorefunction = "ignorethisuser('"+data.child("UserId").val()+"')"

firebase.database().ref(`CHATROOM/ADMIN`).once('value',(child)=>{
    //alert(child.hasChild(data.child("UserId").val()))
            
    if(child.hasChild(data.child("UserId").val()) ){
        isthisadminmessage ="YES";
        //alert(child.hasChild(data.child("UserId").val()))
        ignorefunction = "alert('You Cannot Block An Admin, Sorry.')"
        styletag = "font-family: AmaranthBi !important; font-size: 22px;font-weight:999;filter: drop-shadow(0px 0px 2px black );-webkit-text-stroke: 0.5px black;text-shadow: 0px 0px 3px black;"
        styleforpic = "filter: drop-shadow(0px 0px 3px green);    border: 1px dashed black;"
        adminclass =  "dropdown dropdowndiv right adminrights";
        
stylenone =  "display:none; !important;"
    }
    else{
styleforpic = "none";
        isthisadminmessage = "NO"
    
        styletag = "text-shadow: 0px 0px 2px black;"
       
        adminclass =  "dropdown dropdowndiv right";
        
    }
    

});  


if(isAdmin == "YES"){

    
     ignorefunction = "alert(foradmin)"
}
        
        







//alert(styletag)
        if(data.child("UserId").val() == firebase.auth().currentUser.uid ){
            
        
        //console.log("this is mesg from current user")
        nameofuser = "YOU "
        //POSTING MSG STARTS HERE

        if(msgdate == datenow){

 //if message was sent today := 
        
 insertedchat.innerHTML += '<div  comment="'+keyofthiscomment+'" id="parentofmsg"> <li class="clearfix"> <div class="message-data align-right"> <span  data-toggle="tooltip" data-placement="top" title="'+msgtime+", "+msgdate+'" class="message-data-time"> Today at '+msgtime+'</span> &nbsp; &nbsp; <span title="'+'Nickname: '+thenick+'" class="message-data-name">'+nameofuser+'</span> <i class="fa fa-circle me"> <img width="50px" style="'+styleforpic+'"  onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })" class="avatarr" src="'+imageofuser+'"> </i> </div> <div class="message other-message float-right animated " style="text-shadow: 0px 0px 3px black;" > '+messageofuser+' </div> </li>  <br> <div class="dropdown dropdowndiv left adminrights"> <a class="aofdropdown lefta" href="javascript:void(0)" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div class="dropdown-menu menuofdropdown leftmenu">  <li><a class="adminrights" onclick="deletemsg('+quoatedsnapkey+')" href="javascript:void(0)"> Delete MSG </a></li> <li><a class="adminrights" onclick="'+userdetailsfunction+'" href="javascript:void(0)">User Details</a></li> </div> </div> </li></div>';
            
        }
        else{
        //If message was sent before today.
        insertedchat.innerHTML += '<div comment="'+keyofthiscomment+'" id="parentofmsg">  <li class="clearfix"> <div class="message-data align-right"> <span datetime="'+msgdate+'" data-toggle="tooltip" data-placement="top" title="'+msgtime+", "+msgdate+'" class=" message-data-time"> '+msgtime+", "+msgdate+' </span> &nbsp; &nbsp; <span title="'+'Nickname: '+thenick+'" class="message-data-name">'+nameofuser+'</span> <i class="fa fa-circle me"> <img width="50px" style="'+styleforpic+'"  onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })"  class="avatarr" src="'+imageofuser+'"> </i> </div> <div class="message other-message float-right animated "  style="text-shadow: 0px 0px 3px black;" > '+messageofuser+' </div> </li>  <br> <div class="dropdown dropdowndiv left adminrights"> <a class="aofdropdown lefta" href="javascript:void(0)" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div class="dropdown-menu menuofdropdown leftmenu"> <li><a href="#">Ignore User</a> <li><a onclick="'+blockuserip+'" href="javascript:void(0)" class="adminrights">Block User</a></li> <li><a  class="adminrights" href="javascript:void(0)" onclick="deletemsg('+quoatedsnapkey+')">Delete MSG</a></li> <li><a  class="adminrights" onclick="'+userdetailsfunction+'" href="javascript:void(0)">User Details</a></li> </div> </div> </li></div>';

        }
        //POSTING ENDS ABOVE

        }


        else{
           // console.log("this is mesg from another user")


           
        //POSTING MSG STARTS HERE

        if(msgdate == datenow){

 //if message was sent today := 
 insertedchat.innerHTML += '<div ignoreid="'+data.child("UserId").val()+'" comment="'+keyofthiscomment+'" id="parentofmsg"><div > <li> <div class="message-data animated fadeIn"> <img class="avatarr" style="'+styleforpic+'" onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })"  src="'+imageofuser+'"> <span title="'+'Nickname: '+thenick+'" class="message-data-name"><i class="fa fa-circle online"></i> '+nameofuser+'</span> <span  data-toggle="tooltip" title="'+msgtime+', '+msgdate+'" class="message-data-time">Today at '+msgtime+'</span> </div> <div class="message my-message animated "   style="'+styletag+'" > '+messageofuser+' </div> </li> <!--Menu--> <div style="'+stylenone+'" class="'+adminclass+'"> <a class="aofdropdown righta" onclick="" href="#" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div style="" class="dropdown-menu menuofdropdown rightmenu"> <li><a onclick='+ignorefunction+'                   href="javascript:void(0)">Ignore User</a></li> <li><a class="adminrights"  onclick="'+blockuserip+'" href="javascript:void(0)">Block User</a></li> <li><a class="adminrights" onclick="deletemsg('+quoatedsnapkey+')" href="javascript:void(0)">Delete MSG</a></li> <li><a  onclick="'+userdetailsfunction+'" class="adminrights" href="javascript:void(0)">User Details</a></li> </div> </div> </div></div>';
            
        }
        else{
        //If message was sent before today.
        insertedchat.innerHTML += '<div comment="'+keyofthiscomment+'" ignoreid="'+data.child("UserId").val()+'"   id="parentofmsg"><div > <li> <div class="message-data animated fadeIn"> <img class="avatarr" style="'+styleforpic+'" onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })"  src="'+imageofuser+'"> <span title="'+'Nickname: '+thenick+'" class="message-data-name"><i class="fa fa-circle online"></i> '+nameofuser+'</span> <span data-toggle="tooltip" title="'+msgtime+', '+msgdate+'" datetime="'+msgdate+'" class="message-data-time ">'+msgtime+", "+msgdate+'</span> </div> <div class="message my-message animated " style="'+styletag+'" > '+messageofuser+' </div> </li> <!--Menu--> <div  class="'+adminclass+'"> <a class="aofdropdown righta" onclick="" href="#" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div style="" class="dropdown-menu menuofdropdown rightmenu">  <li><a onclick="ignorethisuser('+quoateduserid+')"  href="javascript:void(0)">Ignore User</a> <li><a onclick="'+blockuserip+'" href="javascript:void(0)" class="adminrights">Block User</a></li> <li onclick="deletemsg('+quoatedsnapkey+')" class="adminrights"><a href="javascript:void(0)" >Delete MSG</a></li> <li><a class="adminrights"  onclick="'+userdetailsfunction+'" href="javascript:void(0)">User Details</a></li> </div> </div> </div></div>';

        }
        //POSTING ENDS ABOVE






        }

        //CHECKING CURRENT USER MSG ENDS ABOVE

   
        firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`).once('value',(ignoreduser)=>{
        
        
        
        
            ignoreduser.forEach(function(ignoredusers){
    
                $("div[ignoreid='"+ignoredusers.key+"']").fadeOut(10, function() { $("div[ignoreid='"+ignoredusers.key+"']").remove(); })
            // console.log(ignoredusers.key)
            
            })

            
            })


            admin()
     setTimeout(function(){if(isAdmin !== "YES"){ $(".adminrights").remove()}    },300) 
 

     setTimeout(function(){scrollbottom()},1200)
   
})


}

else{
// console.log("showing data after 500ms")
    setTimeout(function(){showdata()},500)
}

}






//Online Offline Status
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    //Online

isOnline = "YES"

getthekey()
   




    
    
 $(document).ready(function(){
      console.log("Window is loaded")
      
      setTimeout(function(){
 document.getElementById("loading").className = "loading animated fadeOut" },500)});

} else {
//Offline

    document.getElementById("loading").className = "loading animated fadeIn";
    

isOnline = "No"
setTimeout(function(){
if(isOnline == "No"){
  shownotif("Slow Connection!","It looks like you are using slow internet connection, or maybe there is no internet connection, We Couldnt Connect To Server, We are still trying, You dont need to reload once internet is available, we will automatically connect to server .","warning","10")
}
},9999)

document.getElementById("loading").className = "loading animated fadeIn";
}
});























//Login SignUp
function signup(){

    
    
    e_address = document.getElementById("modalLRInput12").value;
    
    namebox = document.getElementById("name").value;
    
    pass=document.getElementById("modalLRInput13").value;
    pass_cnfrm=document.getElementById("modalLRInput14").value;
    
    
    if(namebox.length > 12){
        
        shownotif("Warning!","Name Should Be Shorter Than 11 Characters","danger","1");
        return false;
    }
    else if(namebox.length < 3){
        
        shownotif("Warning!","Name Should Be Atleast 3 Characters Long","danger","1"); 
         return false;
    }
    else if(/^[a-zA-Z ]+$/.test(namebox) !== true){
        
        shownotif("Warning!","Invalid Name, Only Alphabets Allowed (A-z)","danger","1"); 
         return false;
    }
    else if(e_address.length<6){
        shownotif("Warning!","Please Write Valid Email Address.","danger","1"); 
         return false;
    }
    else if(pass<6 ){
        shownotif("Warning!","Password Needs To Be 6 Characters Long..","danger","1"); 
    }
    
    else if(pass==pass_cnfrm ){
    if(re.test(e_address)){
    shownotif("Loading","Please Wait While We Are Signing You Up On Our Website..!","info","1");
    }
     var username = localStorage.setItem('Name', namebox);
    
    //FireBase SignUp
    var signup= firebase.auth().createUserWithEmailAndPassword(e_address, pass);
    signup.catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      
      shownotif("Error",errorMessage+", "+errorCode,"danger","3")
      // ...
    });
    
    signup.then(function() {
      // Handle Errors here.
      shownotif("Success!","You are now our registered user, you are now logged in.","success","2")
      
    // console.log('%c'+firebase.auth().currentUser, 'font-weight: bold; font-size: 20px;color: red; text-shadow: 0px 0px 10px black; border: 2px Solid black; padding:6px; border-radius:10px; display:block;');
    
    
    
    
    updatename()  
      // ...
    });
    
   
    function updatename(){
    
    
        var user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName:  localStorage.getItem("Name"),
      photoURL: "/defaultuser.png"
    }).then(function() {
      // console.log(user.displayName)
      document.getElementById("nametitle").innerHTML = user.displayName;
    }).catch(function(error) {
      // An error happened.
      shownotif("Error",error,"danger","1")
    });
        
        
        
    }
    
    
    //firebase signup above
    
    
    
    
    }
    else{
       shownotif("Error","Password didn't matched, try again","danger","1")
    
    }
    }


    function signupkeydown() {
        if (event.keyCode == 13) { // console.log('only enter pressed') 
           signup()
                  }
               }
    document.getElementById("signup-btn").addEventListener("click", signup);


    document.getElementById("modalLRInput12").addEventListener("keydown", signupkeydown);
    
    document.getElementById("name").addEventListener("keydown", signupkeydown);
    
    document.getElementById("modalLRInput13").addEventListener("keydown", signupkeydown);
    document.getElementById("modalLRInput14").addEventListener("keydown", signupkeydown);
     
   
   
 

        //Login below:- 
        
function login(){
	

	
    var email = document.getElementById('modalLRInput10').value;
	var pass = document.getElementById('modalLRInput11').value;
	
	 var n = localStorage.getItem("email_address");
   	var p =localStorage.getItem("password");
	
		if(re.test(email) === true && pass.length > 5){
		    
		    shownotif("Loading!","Please Wait While We Are Logging You In..!","info","1")
		
		var signin =firebase.auth().signInWithEmailAndPassword(email, pass);
		signin.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  shownotif("Error: ",errorMessage+", "+errorCode,"danger","2")
  // ...
});
signin.then(function(user) {
  // Handle Errors here.

  
  shownotif("Welcome! "+user.displayName,"Successfully Logged in as "+user.email,"success","5")
  
  // ...
});

	}
	
	else{
	    
	    if (email == "" || email == null || email == " "){
	        shownotif("Oops..!"," Email Is Missing, Please write email to login.","danger","1")
	    }
	    
	     else if (pass == "" || pass == null || pass == " "){
	        shownotif("Oops..! ","Password Box Is Empty, Please write Password to login.","danger","1")
        }
        else if(re.test(email)=== false){
            shownotif("Error","Invalid Email","danger","1")
        }
        else if(pass.length < 6){
            shownotif("Error","Password incorrect. ","danger","1")
        }
     
	    else{
 shownotif("Alert!"," Email or Password is invalid, Please write a valid email & password","danger","1")}
	}
    
    
}//login function ends here	
	
//Adding key down to login

function loginkeydown() {
    if (event.keyCode == 13) { // console.log('only enter pressed') 
       login()
              }
           }
document.getElementById("modalLRInput10").addEventListener("keydown", loginkeydown);
    document.getElementById("modalLRInput11").addEventListener("keydown", loginkeydown);
    document.getElementById("btn-login").addEventListener("click", login);

    
        $('[data-toggle="tooltip"]').tooltip(); 
  



        var map = {
            "<": "\u2764\uFE0F",
            "#brokenheart": "\uD83D\uDC94",
            ":D": "\uD83D\uDE00",
            ":)": "\uD83D\uDE0A",
            ";)": "\uD83D\uDE09",
            ":(": "\uD83D\uDE12",
            ":p": "\uD83D\uDE1B",
            ";p": "\uD83D\uDE1C",
            ":'(": "\uD83D\uDE22",
            ":*": "\uD83D\uDE18",
            ":/": "\uD83D\uDE15",
            "8-)": "\uD83D\uDE0e",
            "8)": "\uD83D\uDE0e",
            "B)": "\uD83D\uDE0e",
            "-_-": "\uD83D\uDE11",
            ":'(": "\uD83D\uDE22",
            ";P": "\uD83D\uDE1c",
            "*_*": "\uD83D\uDE44",
            ":O": "\uD83D\uDE32",
            "o_o": "\uD83D\uDE33",
            
            
         "FUCK": "****",
         "BITCH": "****",
         "MOTHERFUCKER": "****",
         "asshole": "****",
          ".!.": "!!",
         "FK": "****",
         "cock": "****",
         "pussy": "****",
         "LPC":"***",
        "BC":"**",
         "STFU": "****",
         "FUCK": "****",
         "#PHONE":"U+1F4DE",
         "</": ",",
         ">": ".",
         "#BR":"<br>",
         "https😕/":"https://",
         "http😕/":"http://"
         
         
         
         
         };
         
         
          function escapeSpecialChars(regex) {
            return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
          }
          
          
         
          function  moderatewords() {
              
            for (var i in map) {
              var regex = new RegExp(escapeSpecialChars(i), 'gim');
              textareabox.value = textareabox.value.replace(regex, map[i]);
            }
            
              
          };
         

          