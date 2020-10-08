
// Intro animation
setTimeout( () => {
    anime({
        targets: ['#NE', '#SW'],
        easing: 'easeInOutSine',
        opacity: [0, 1],
        duration: 2000
    })
}, 1000);

setTimeout(() => {
    anime({
        targets: ['#NW', '#SE'],
        easing: 'easeInOutSine',
        opacity: [0, 1],
        duration: 2000,
        complete: () => {
            // $('body').attr('style', 'background-image: url("assets/images/bg.jpg");');
            // $('.bw').css('opacity', 1);
        }
    });

    anime({
        targets: ['.fa', '#contactate'],
        opacity: 1,
        easing: 'easeInOutSine',
        delay: anime.stagger(400),
        duration: 1000,
    });
}, 2500);

setTimeout(() => {
    $('#title').attr('style', 'display: block;');

    drawLogo();
}, 500);

function drawLogo() {
    var titleTimeline = anime.timeline({
        easing: 'easeInSine', // Default: easeInOutSine
    });
    
    titleTimeline
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
}

function eraseLogo() {
    var titleTimeline = anime.timeline({
        easing: 'easeInOutSine', // Default: easeInSine
    });
    
    titleTimeline
    .add({
        targets: ['#ateret path', '#cocinas path'],
        strokeDashoffset: [0, anime.setDashoffset],
        duration: 875
    })
    .add({
        targets: '#lines line',
        strokeDashoffset: [0, anime.setDashoffset],
        duration: 300
    }, '-=875')
    .add({
        targets: '#ateret path',
        fill: ['#158DA5', 'rgba(21, 141, 165, 0)'],
        duration: 200
    }, '-=300')
    .add({
        targets: '#cocinas path',
        fill: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)'],
        duration: 200
    }, '-=375');
}


// Button animation
$('.nav-button div').hover(
e => {
    var svg = e.target.parentElement.querySelector('.svg-button');
    anime({
        targets: svg,
        width: '100%',
        easing: 'easeInOutCirc',
        duration: 200,
        complete: () => {
            svg.setAttribute('style', 'left: 0; width: 100%;');
        },
    });
},
e => {
    var svg = e.target.parentElement.querySelector('.svg-button');
    anime({
        targets: svg,
        width: '0%',
        easing: 'easeInOutCirc',
        duration: 200,
        complete: () => {
            svg.setAttribute('style', 'right: 0; width: 0%;');
        },
    });
});

$('.black-highlight').hover(
    e => {
        anime({
            targets: e.target,
            easing: 'easeInSine',
            duration: 200,
            backgroundSize: ['0% 1.4rem', '100% 1.4rem'],
        });
    },
    e => {
        anime({
            targets: e.target,
            easing: 'easeInSine',
            duration: 200,
            backgroundSize: ['100% 1.4rem', '0% 1.4rem'],
        });
    }
);


// Cocinas
$('#cocinas-button').click(() => {

    anime({
        targets: ['#NE', '#SE'],
        easing: 'easeInOutQuad',
        delay: anime.stagger(100),
        translateX: '100vw',
    });
    anime({
        targets: ['#NW', '#SW'],
        easing: 'easeInOutQuad',
        delay: anime.stagger(100),
        translateX: '-100vw',
    });
    eraseLogo();
});