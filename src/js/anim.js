 
 // Intro
 export function introAnimation() {
    setTimeout( () => {
        anime({
            targets: ['#NE', '#SW'],
            easing: 'easeInOutSine',
            opacity: [0, 1],
            duration: 2000
        })
    }, 3000);

    setTimeout(() => {
        anime({
            targets: ['#NW', '#SE'],
            easing: 'easeInOutSine',
            opacity: [0, 1],
            duration: 2000,
            complete: () => {
                // $('body').attr('style', 'background: black url("images/marble-bg1.jpg") no-repeat fixed center;');
                // $('.bw').css('opacity', 1);
            }
        });
    }, 2500);

    setTimeout(() => {
        $('#svg-margin').css('opacity', 1);
        anime({
            targets: '#svg-margin rect',
            easing: 'easeInOutSine',
            // strokeDashoffset: [anime.setDashoffset, 0],
            opacity: [0, 1],
            duration: 2000 // Default: 3500
        });

        anime({
            targets: ['#contactate', '#nosotros', '#visitanos'],
            opacity: 1,
            easing: 'easeInOutSine',
            duration: 1000,
        });

        anime({
            targets: '.fa',
            opacity: 1,
            easing: 'easeInOutSine',
            delay: anime.stagger(400),
            duration: 1000,
        });
    }, 4000);

    setTimeout(() => {
        $('#title').attr('style', 'display: block;');

        drawLogo();
    }, 500);
}

export function drawLogo() {
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
        opacity: [0, 1],
        duration: 1200
    }, '-=3500')
    .add({
        targets: '#ateret path',
        fill: ['rgba(21, 141, 165, 0)', '#158DA5'],
        duration: 800
    }, '-=1200')
    .add({
        targets: '#cocinas path',
        fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
        duration: 800
    }, '-=1500');
}
export function eraseLogo() {
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
        fill: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
        duration: 200
    }, '-=375');
}

export function darkenBlocks(exceptionBlock) {
    const blocks = $('.nav-block').not(exceptionBlock).toArray();
    anime({
        targets: blocks,
        easing: 'easeInOutCirc',
        duration: 300,
        filter: ['brightness(100%) grayscale(0%)', 'brightness(50%) grayscale(0%)'] // Change grayscale to turn gray
    });
    anime({
        targets: exceptionBlock.getElementsByTagName('video')[0],
        easing: 'easeInOutCirc',
        duration: 300,
        filter: ['brightness(70%)', 'brightness(100%)']
    });
}
export function lightenBlocks(exceptionBlock) {
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