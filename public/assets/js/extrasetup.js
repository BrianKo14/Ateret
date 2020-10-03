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

var timeline = anime.timeline({
    easing: 'easeInOutSine',
});

timeline
.add({
    targets: ['#ateret path', '#cocinas path'],
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 3500
})
.add({
    targets: '#lines line',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1200
}, '-=3500')
.add({
    targets: '#ateret path',
    fill: ['rgba(21, 141, 165, 0)', '#158DA5'],
    duration: 800
}, '-=1200')
.add({
    targets: '#cocinas path',
    fill: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
    duration: 800
}, '-=1500');