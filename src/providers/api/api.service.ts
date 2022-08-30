import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, take  } from 'rxjs/operators';
import { Observable, combineLatest, of } from "rxjs";
export interface Chat {
  chatId: any,
  messages: Array<Message>
}

export interface Message {
  senderId: string,
  senderName: string,
  content: string,
  timestamp?: Date
}
export interface UserConvo {
  uid: string,
  name: string,
  chatId: string,
  timestamp?: Date
}
export interface User {
  uid: string,
  name: string,
  email: string,
  conversations?: Array<any>
}




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }


  private temp: any;
  public currentUser: User;
  public otherUser;
  public messages = [];
  public chat: Chat = {
    chatId: '',
    messages: []
  }
  conversationId;
  public conversations = [];
  all$: any;

  createUser(uid, data) {
    console.log(uid, data);
    return this.afs.doc('users/' + uid).set({
      uid: uid,
      name: data.name,
      email: data.email,
      user_type: data.user_type
    })
  }

  updateUser(id, data) {
    return this.afs.doc('users/' + id).update(data);
  }



  setCurrentUser(uid) {
    localStorage.setItem('uid', uid);
    let users:any = [];
    this.all$ = combineLatest(
      this.afs.doc<User>("users/" + uid).valueChanges(),
      this.afs.collection<Chat>("conversations").valueChanges()
    ).pipe(
      map(([users, chat]) => {
        return { users, chat };
      })
    );

     this.all$.subscribe((res:any) =>{
      // console.log(res);
      if(res.users.conversations)
      {
        for(let con = 0;con < res.users.conversations.length; con++)
        {
          res.chat.filter(x => x.chatId === res.users.conversations[con].chatId).map(x => {
            res.users.conversations[con].chats = x;
            var count = 1;
           
            x.messages.filter(b =>  b.is_seen == false).map(c =>{
             
              if(c.senderId != res.users.uid)
              {
                
                res.users.conversations[con].newMessage = count++;
              }
             
            });
              // {
              //   console.log(b.senderId != res.users.uid);
              //   if(b.senderId != res.users.uid)
              //   {
              //     b.is_seen == false
              //   }
               
              // }).length; 
          });
          
        }
        // setTimeout(() => {
         this.currentUser = res.users;
      }
     else{
      this.currentUser = res.users;
     }
    //  console.log(this.currentUser);
      // }, 300);
      
      });

   // return this.afs.doc('users/' + uid).valueChanges();
  }

  getCurrentUser() {
    return this.afs.doc('users/' + localStorage.getItem('uid')).valueChanges();
  }


  /* USERS */


  public getUsers() {
    return this.afs.collection<any>('users').snapshotChanges();
  }








  /* FINAL CODE */


  getChat(chatId) {
    return this.afs.collection('conversations', ref => ref.where('chatId', '==', chatId)).valueChanges()
  }
  getChat1(chatId) {
    return this.afs.collection('conversations', ref => ref.where('chatId', '==', chatId)).get();

  }
  getChat2(chatIds) {

    return this.afs.collection('conversations', ref => ref.where('chatId', '==', chatIds)).get();

  }
  refreshCurrentUser() {
    this.afs.collection('users/' + localStorage.getItem('uid')).valueChanges().subscribe(data => {
      this.temp = data;
      this.currentUser = this.temp;
    })
  }



  async addConvo(user){
    //data to be added.
    let userMsg ={name:user.name, uid: user.uid,chatId: this.chat.chatId}
    let otherMsg={name:this.currentUser.name, uid: this.currentUser.uid, chatId:this.chat.chatId}
    //first set both references.  
    let myReference = this.afs.doc('users/'+ this.currentUser.uid);
    let otherReference = this.afs.doc('users/'+ user.uid);
    // Updating my profile 
  myReference.get().subscribe((d:any)=>{
          let c=d.data()
          if(!c.conversations){
            c.conversations = [];
          }
          c.conversations.push(userMsg);
         return myReference.update({conversations: c.conversations})
      })
      // Updating Other User Profile
      otherReference.get().subscribe((d:any)=>{
        let c=d.data()
        console.log('c',c);
        if(!c.conversations){
          c.conversations = [];
        }
        c.conversations.push(otherMsg);
       return otherReference.update({conversations: c.conversations})
    })

  }
  async addConvo1(user, chatId) {
    //data to be added.

    let userMsg = {};
    if (user.company_name) {
      userMsg = { name: user.company_name, uid: user.user_id, chatId: chatId }
    }
    else {
      userMsg = { name: user.first_name + ' ' + user.last_name, uid: user.user_id, chatId: chatId }
    }
    let otherMsg = { name: this.currentUser.name, uid: this.currentUser.uid, chatId: chatId };
    this.conversations.push(userMsg);

    //first set both references.  

    let myReference = this.afs.doc('users/' + this.currentUser.uid);
    let otherReference = this.afs.doc('users/' + user.user_id);
    // Updating my profile 
    myReference.get().subscribe((d: any) => {
      let c = d.data();
      if (!c.conversations) {
        c.conversations = [];
      }
      c.conversations = this.conversations;
      myReference.update({ conversations: c.conversations })
    })


    // Updating Other User Profile
    otherReference.get().subscribe((d: any) => {
      let c = d.data()
      if (!c.conversations) {
        c.conversations = [];
      }
      c.conversations.push(otherMsg);
      otherReference.update({ conversations: c.conversations })
    })

  }

  addNewChat() {

    const chatId = this.afs.createId();
    return this.afs.doc('conversations/' + chatId).set({
      chatId: chatId,
      messages: []
    }).then(() => {
      this.chat = {
        chatId: chatId,
        messages: []
      }
    }).catch(err => {
      console.log(err);
    })
  }
  addNewChat1() {
    let chat = {};
    const chatId = this.afs.createId();
    this.afs.doc('conversations/' + chatId).set({
      chatId: chatId,
      messages: []
    }).then(() => {
      chat = {
        chatId: chatId,
        messages: []
      }
    }).catch(err => {
      console.log(err);
    })
    return chatId;
  }

  pushNewMessage(list) {
    return this.afs.doc('conversations/' + this.chat.chatId).update(
      { messages: list }
    )
  }
  pushNewMessage1(chat, list) {
    return this.afs.doc('conversations/' + chat).update(
      { messages: list }
    )
  }

  // updateChat(chat){
  //   return this.afs.doc('conversations/' + chat.chatId).update(chat)
  // }

  // getCurrentChat(chatId){
  //   console.log('get')
  //   return this.afs.doc('conversations/'+chatId).valueChanges()
  // }


  clearData() {
    localStorage.clear();
    this.messages = []
    this.currentUser = {
      conversations: [],
      name: '',
      email: '',
      uid: ''
    }
    this.chat = null;
    this.temp = null;

  }


}
