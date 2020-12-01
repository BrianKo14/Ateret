
 // INTRO
function introAnimation() {

    // Draw title
    setTimeout(() => {
        $('#title').attr('style', 'display: block;');
        drawLogo();
    }, 500); //100

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

}

// LOGO ANIMATION
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
        fill: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
        duration: 200
    }, '-=375');
}

// BLOCK OPACITY
function darkenBlocks(exceptionBlock) {
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

// INFO PAGE
function bringInfoPage(name, translateX, translateY) {
    anime({
        targets: `#${name}-page`,
        easing: 'easeOutQuad',
        duration: 800,
        translateX: translateX,
        translateY: translateY,
    });
    $('#modal').css('display', 'block');
    anime({
        targets: '#modal',
        easing: 'easeOutQuad',
        duration: 800,
        opacity: [0, 1]
    });
    
    $('#modal').off('click').click(() => {
        anime({
            targets: `#${name}-page`,
            easing: 'easeOutQuad',
            duration: 800,
            translateX: [translateX[1], translateX[0]],
            translateY: [translateY[1], translateY[0]],
        });
        anime({
            targets: '#modal',
            easing: 'easeOutQuad',
            duration: 800,
            opacity: [1, 0],
            complete: () => {
                $('#modal').css('display', 'none');
            },
        });
    });
}

// CHANGE SECTION
var toHLColor = '#000';
var fromHLColor = '#FFF';
function changeToSite(name) {
    startSite(name);

    $(`#${name}-bg`).css('display', 'block');
    anime({
        targets: `#${name}-bg`,
        easing: 'easeInOutSine',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        duration: 1000,
    });

    setTimeout(() => {
        anime({
            targets: `#${name}-bg .bg-container`,
            easing: 'easeInOutSine',
            opacity: [0, 1],
            duration: 500,
        });
    }, 1000);

    anime({
        targets: ['#contactate', '#visitanos', '#nosotros', '#svg-margin rect', '#social a'],
        color: ['#FFF', '#000'],
        easing: 'easeInOutSine',
        stroke: ['#FFF', '#000'],
        borderColor: ['#FFF', '#000'],
        duration: 1000,
    });

    $('.black-highlight').css('background-image', 'linear-gradient(black, black)');

    toHLColor = '#FFF';
    fromHLColor = '#000';
}
function changeFromSite(name) {

    anime({
        targets: `#${name}-bg .bg-container`,
        easing: 'easeInOutSine',
        opacity: [1, 0],
        duration: 500,
    });

    setTimeout(() => {
        anime({
            targets: `#${name}-bg`,
            easing: 'easeInOutSine',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            duration: 1000,
            complete: () => {
                $(`#${name}-bg`).css('display', 'none');
                endSite();
            },
        });
    }, 500);

    anime({
        targets: ['#contactate', '#visitanos', '#nosotros', '#svg-margin rect', '#social a'],
        color: ['#000', '#FFF'],
        easing: 'easeInOutSine',
        stroke: ['#000', '#FFF'],
        borderColor: ['#000', '#FFF'],
        duration: 1000,
    });

    $('.black-highlight').css('background-image', 'linear-gradient(white, white)');

    toHLColor = '#000';
    fromHLColor = '#FFF';
}