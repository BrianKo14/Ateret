import * as Anim from './anim.js';

var isMobile = false;
if (/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

Anim.introAnimation();

// Button animation
$('.nav-button div').hover(
e => {
    // White highlight
    const svg = e.target.parentElement.querySelector('.svg-button');
    anime({
        targets: svg,
        width: '100%',
        easing: 'easeInOutCirc',
        duration: 200,
        complete: () => {
            svg.setAttribute('style', 'left: 0; width: 100%;');
        },
    });

    Anim.darkenBlocks(e.target.parentElement.parentElement);
},
e => {
    // White highlight
    const svg = e.target.parentElement.querySelector('.svg-button');
    anime({
        targets: svg,
        width: '0%',
        easing: 'easeInOutCirc',
        duration: 200,
        complete: () => {
            svg.setAttribute('style', 'right: 0; width: 0%;');
        },
    });

    Anim.lightenBlocks(e.target.parentElement.parentElement);
});

var toHLColor = '#000';
var fromHLColor = '#FFF';

// Highlight animation
$('.black-highlight').hover(
    e => {
        anime({
            targets: e.target,
            easing: 'easeInSine',
            duration: 200,
            color: toHLColor,
            borderColor: toHLColor,
            backgroundSize: ['0% 1.4rem', '100% 1.4rem'],
            complete: () => {
                e.target.style.backgroundPosition = 'left bottom';
            },
        });
    },
    e => {
        anime({
            targets: e.target,
            easing: 'easeInSine',
            duration: 200,
            color: fromHLColor,
            borderColor: fromHLColor,
            backgroundSize: ['100% 1.4rem', '0% 1.4rem'],
            complete: () => {
                e.target.style.backgroundPosition = 'right bottom';
            },
        });

    }
);

// Cocinas
$('#cocinas-button').click(() => {
    $('#cocinas-bg').css('display', 'block');
    anime({
        targets: '#cocinas-bg',
        easing: 'easeInOutSine',
        opacity: [0, 0.9],
        duration: 1000,
    });

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
});

$('#back-button').click(() => {
    anime({
        targets: '#cocinas-bg',
        easing: 'easeInOutSine',
        opacity: [0.9, 0],
        duration: 1000,
        complete: () => {
            $('#cocinas-bg').css('display', 'none');
        },
    });

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
});