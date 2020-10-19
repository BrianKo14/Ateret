function introAnimation() {
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
                // $('body').attr('style', 'background: black url("assets/images/marble-bg1.jpg") no-repeat fixed center;');
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
    }, 1500);

    setTimeout(() => {
        $('#title').attr('style', 'display: block;');

        drawLogo();
    }, 500);
}

function drawLogo() {
    var titleTimeline = anime.timeline({
        easing: 'easeInOutSine', // Default: easeInSine
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

function darkenBlocks(exceptionBlock) {
    const blocks = $('.nav-block').not(exceptionBlock).toArray();
    anime({
        targets: blocks,
        easing: 'easeInOutCirc',
        duration: 300,
        filter: ['brightness(100%)', 'brightness(50%)']
    });
    anime({
        targets: exceptionBlock.getElementsByTagName('video')[0],
        easing: 'easeInOutCirc',
        duration: 300,
        filter: ['brightness(70%)', 'brightness(100%)']
    });
}
function lightenBlocks(exceptionBlock) {
    const blocks = $('.nav-block').not(exceptionBlock).toArray();
    anime({
        targets: blocks,
        easing: 'easeInOutCirc',
        duration: 300,
        filter: ['brightness(50%)', 'brightness(100%)']
    });
    anime({
        targets: exceptionBlock.getElementsByTagName('video')[0],
        easing: 'easeInOutCirc',
        duration: 300,
        filter: ['brightness(100%)', 'brightness(70%)']
    });
}