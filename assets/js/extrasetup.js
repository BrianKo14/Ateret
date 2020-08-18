// INITIALIZE FIREBASE

// Your web app's Firebase configuration
  var firebaseConfig = {
        apiKey: "AIzaSyCUdvvflw8Zl98zAvUKH4fV1uVlBlMx5bQ",
        authDomain: "ateret-7c184.firebaseapp.com",
        databaseURL: "https://ateret-7c184.firebaseio.com",
        projectId: "ateret-7c184",
        storageBucket: "ateret-7c184.appspot.com",
        messagingSenderId: "1061857222909",
        appId: "1:1061857222909:web:c5d984bb719448f5239e94",
        measurementId: "G-VC5VML8VR7"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

// Reference messages collection
var messageRef = firebase.database().ref('messages');

// Get 'message sent' label
var sentLabel = document.getElementById('messageSent');

// Submit form
function submitForm(e) {

    //Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    // Save message
    saveMessage(name, email, message);

    // Shows 'message sent' label
    sentLabel.style.opacity = 1;

    console.log('Email sent.');
}

// Function to get form values 
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to Firebase
function saveMessage(name, email, message) {
    var newMessageRef = messageRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message
    });
}