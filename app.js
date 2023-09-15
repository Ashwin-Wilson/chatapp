
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js'
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBLrufh0SA6WrN3rp6EDo5NL3Jkqh8MBTs",
    authDomain: "ashwin-chat-app.firebaseapp.com",
    projectId: "ashwin-chat-app",
    storageBucket: "ashwin-chat-app.appspot.com",
    messagingSenderId: "913245538914",
    appId: "1:913245538914:web:091e9516dee3ba39615f3b",
    measurementId: "G-0EX1FB6HET"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

var form = document.querySelector('#enterMessage');
let chatSection = document.querySelector('.chat-section');
let headerImage = document.querySelector('.header-image');
let headerName = document.querySelector('.header-name');
let userDetails;
const img_src = "data:image/jpeg;base64,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";

// ---------------FUNCITON TO CHECK WHETHER USER IS LOGGED IN     
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        userDetails = user;
        headerImage.src = user.photoURL;
        headerName.innerText = user.displayName;
        getMessages();
        // console.log(user)
        // window.location = "index.html"; // redirect page.
        // ...
    } else {
        console.log("User is signed out");
        window.location = "sign_up.html";
        // User is signed out
        // ...
    }
});
// ---------------END OF FUNCITON TO CHECK WHETHER USER IS LOGGED IN   


//-------------------FUCNTION TO SIGNOUT USER LOGIN
let signout = document.querySelector('.sign-out');
signout.addEventListener('click', function (e) {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log('Sign-out successful.');
    }).catch((error) => {
        console.log('An error happened.');
    });
})
//------------------- END OF FUCNTION TO SIGNOUT USER LOGIN


form.addEventListener('submit', async function (e) {
    let message_value = form.message.value;
    let date = new Date();
    let date_value = date.getHours() + ':' + date.getMinutes() + ' | ' + date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
    e.preventDefault();

    // ---------------ADDING DATA
    try {
        const docRef = await addDoc(collection(db, "chats"), {
            user_id: userDetails.uid,
            user_name: userDetails.displayName,
            message: message_value,
            user_image: userDetails.photoURL,
            date: date_value

        });
        // IF CRETING DATA IS SUCCESSFULL
        // MESSAGE OBJECT
        let message = {
            user_id: userDetails.uid,
            user_name: userDetails.displayName,
            message: message_value,
            user_image: userDetails.photoURL,
            date: date_value
        }
        // console.log(message);
        addMessageChat(message);
        form.message.value = '';
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    // ---------------END OF ADDING DATA
    // console.log(date_value);
})






// ---------------READING DATA
async function getMessages() {
    const querySnapshot = await getDocs(collection(db, "chats"));
    await querySnapshot.forEach(async (doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data());
        await addMessageChat(doc.data());
    });
}
function addMessageChat(message) {
    //TO CREATE HTML ELEMENTS
    let user_image = document.createElement('img');
    let user_name = document.createElement('h6');
    let message_element = document.createElement('p');
    let date = document.createElement('small');
    let chat_wrapper = document.createElement('div');
    let single_chat = document.createElement('div');

    // TO ADD VALUE TO ELEMENTS
    user_image.src = message.user_image;
    user_name.innerText = message.user_name;
    message_element.innerText = message.message;
    date.innerText = message.date;

    //  TO ADD CLASSES TO ELEMENTS
    user_image.classList.add('avatar');
    chat_wrapper.classList.add('message-info');


    if (message.user_id === userDetails.uid) {
        single_chat.classList.add('my-chat');
    }
    else {
        single_chat.classList.add('single-chat');
    }

    //APPENDING ELEMENTS (nesting html elements is called appending)
    chat_wrapper.append(user_name);
    chat_wrapper.append(message_element);
    chat_wrapper.append(date);

    single_chat.append(user_image);
    single_chat.append(chat_wrapper);

    chatSection.append(single_chat);
    chatSection.scrollTop = chatSection.scrollHeight;
}