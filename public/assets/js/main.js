
// Intro animation
anime({
    targets: ['#NW', '#SE'],
    easing: 'easeInOutSine',
    opacity: [0, 1],
    duration: 2000
});

setTimeout(() => {
    anime({
        targets: ['#NE', '#SW'],
        easing: 'easeInOutSine',
        opacity: [0, 1],
        duration: 2000,
        complete: () => {
            // $('body').attr('style', 'background-image: url("assets/images/bg.jpg");');
            // $('.bw').css('opacity', 1);
        }
    });

    anime({
        targets: '.fa',
        opacity: 1,
        easing: 'easeInOutSine',
        delay: anime.stagger(400),
        duration: 1000,
    });
}, 500);

setTimeout(() => {
    $('#title').attr('style', 'display: block;');

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
}, 500);


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

    // const id = e.target.parentElement.parentElement.id;
    // var targets = ['#NW-bw', '#NE-bw', '#SW-bw', '#SE-bw'];
    // targets.splice(targets.indexOf('#' + id + '-bw'), 1);
    // anime({
    //     targets: targets,
    //     clip: 'rect(0, 100vw, 100vh, 0)',
    //     easing: 'easeInOutCirc',
    //     duration: 1000,
    // });
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
    
    // const id = e.target.parentElement.parentElement.id;
    // var targets = ['#NW-bw', '#NE-bw', '#SW-bw', '#SE-bw'];
    // targets.splice(targets.indexOf('#' + id + '-bw'), 1);
    // anime({
    //     targets: targets,
    //     clip: 'rect(0, 0vw, 100vh, 0)',
    //     easing: 'easeInOutCirc',
    //     duration: 1000,
    // });
});


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
    anime({
        targets: '#title',
        easing: 'easeInOutQuad',
        translateX: ['-50%', '-50%'],
        translateY: ['-52.5%','-112.5%'],
    });
});