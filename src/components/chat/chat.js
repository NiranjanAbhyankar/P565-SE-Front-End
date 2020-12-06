import React, { useRef, useState } from 'react';
import './chat.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyB9LwVR4EdVtYVmT3uuibKaU56O7XmmE8M",
    authDomain: "login-demo-291323.firebaseapp.com",
    databaseURL: "https://login-demo-291323.firebaseio.com",
    projectId: "login-demo-291323",
    storageBucket: "login-demo-291323.appspot.com",
    messagingSenderId: "34720020853",
    appId: "1:34720020853:web:ff479caea9478ffdba7b3c",
    measurementId: "G-W60Y4Q5KKY"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


const Chat = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="chat-body">
        <div className="Chat" >
            <div>
                {/* <SignOut /> */}
                {user ? <ChatRoom /> : <SignIn />}
            </div>
        </div>
    </div>
  );
}

function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Chat with a Manager</button>
      </>
    )
  
  }
  
  function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
  
  
  function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <div >
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span>
    
        <form onSubmit={sendMessage}>
  
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />
    
            <button type="submit" disabled={!formValue}>💬</button>
    
        </form>
        <p></p>
  
      </div>
  
      
    </>)
  }
  
  
  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }
  
  export default Chat;