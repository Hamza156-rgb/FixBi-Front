import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/providers/api/api.service';
import { HelperService } from 'src/providers/helper/helper.service';
import { map } from 'rxjs/operators';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox-provider',
  templateUrl: './inbox-provider.component.html',
  styleUrls: ['./inbox-provider.component.scss']
})
export class InboxProviderComponent implements OnInit {

  currentUser : any = {};
  public messages: Array<any> = [] // messages array/
  showFiller: boolean = false; //sidebar -toggler
  users: Array<any>; // users list.
  temp: any; // for handling temporory data from observables.
  showMessages = false; //Toggle to select a conversation.
  message: string = ''; // the  message to be sent
  userFilter:any ={name:''};
  user:any;
  constructor(public api: ApiService, private helper: HelperService,private _scrollToService: ScrollToService, private router: Router) {
    if(this.router.getCurrentNavigation().extras.state)
    {
   this.user = JSON.parse(this.router.getCurrentNavigation()?.extras?.state?.user);
   setTimeout(() => {
    this.selectUser(this.user);
   }, 1000);
  }
   }

  ngOnInit() {
    this.getAllUsers() // start by populating the users list.
  }




  // Run at the start to populate the list.
  getAllUsers() {
    this.api.setCurrentUser(localStorage.getItem('user_id'));
    this.api.getUsers().pipe(
      map((actions:any) => {
        return actions.map((a:any) => {
          let data = a.payload.doc.data();
          let id = a.payload.doc.id;
          return {...data}
        })
      })
    ).subscribe(data => {
        this.users = data.filter((item)=>{
         
         
      
       
          // let find = this.api.currentUser.conversations.find(el => el.uid == item.uid);
          // if(!find){
            return item;
          // }     
        })        
  })
}

open(list) {
  this.helper.openDialog(list)

}


logoutModal(c) {
  this.helper.openDialog(c)
}

logout() {
  this.api.clearData()
  this.router.navigate(['/login']).then(() => this.helper.closeModal())
}


closeModal() {
  this.helper.closeModal()
}







/* Main Code Logic */
toggleMessages() {
  this.showMessages = !this.showMessages;
}


//Selecting A User from the list (onclick)  to talk
async selectUser(user) {

  if (this.api.currentUser.conversations == undefined) {
    //means user has no conversations.
    this.api.currentUser.conversations = [];
  }
  console.log(user,this.api.currentUser);
  let convo = [...this.api.currentUser.conversations]; //spread operators for ensuring type Array.
  let find = convo.find(item => item.uid == user.uid); // Check If Its the same person who user has talked to before,
  if (find) { // Conversation Found 
    this.api.getChat(find.chatId).subscribe(m => {
      this.temp = m;
      // set the service values
      this.api.chat = this.temp[0];
      this.messages = this.api.chat.messages == undefined ? [] : this.api.chat.messages;
      this.messages.filter(x => x.is_seen === false && x.senderId != this.api.currentUser.uid)
     .map(x => {
      x.is_seen = true;
      this.api.pushNewMessage(this.messages).then(() => {
        this.api.currentUser.conversations.filter(x => x === user).map(x => x.newMessage = 0);
      })
    });
      this.showMessages = true;
      setTimeout(() => {
        this.triggerScrollTo() //scroll to bottom
      }, 300);
      return
    })
  } else {
    /* User is talking to someone for the very first time. */
    this.api.addNewChat().then(async () => { // This will create a chatId Instance. 
     // Now we will let both the users know of the following chatId reference
      let b = await this.api.addConvo(user); //passing other user info
    })

  }
}

/* Sending a  Message */
sendMessage() {
  // If message string is empty
  if (this.message == '') {
    alert('Enter message');
    return
  }
  //set the message object 
  let msg = {
    senderId: this.api.currentUser.uid,
    senderName: this.api.currentUser.name,
    timestamp: new Date(),
    is_seen:false,
    content: this.message
  };
  //empty message
  this.message = '';
  //update 
  this.messages.push(msg);
  this.api.pushNewMessage(this.messages).then(() => {
  })
}

//Scroll to the bottom 
public triggerScrollTo() {
  const config: ScrollToConfigOptions = {
    target: 'destination'
  };
  this._scrollToService.scrollTo(config);
}

// Firebase Server Timestamp
// get timestamp() {
//   return firebase.firestore.FieldValue.serverTimestamp();
// }

}
