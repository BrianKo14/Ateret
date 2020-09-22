// Get 'message sent' label
var sentLabel = document.getElementById('messageSent');

// Submit form
function submitForm(e) {

    //Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    console.log('Sending email...');

    // Send message
    fetch('/email', {method: 'POST', body: JSON.stringify({name: name, email: email, message: message}), headers: {'Content-Type': 'application/json'}}).then(() => {

        // Shows 'message sent' label
        sentLabel.style.opacity = 1;

        console.log("Email sent.");
    });
}

// Function to get form values 
function getInputVal(id) {
    return document.getElementById(id).value;
}