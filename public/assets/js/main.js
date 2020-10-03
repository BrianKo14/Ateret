

// #0e5c6c

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