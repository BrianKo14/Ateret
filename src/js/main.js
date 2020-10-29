import * as Anim from './anim.js';
import * as List from './list.js';

if (isMobile) {

    // Prevent dragging
    document.addEventListener("touchmove", (e) => { e.preventDefault(); }, {passive: false});

    changeOrientation();

    $(window).on("orientationchange", e => {
        changeOrientation();
    });
}

function changeOrientation() {
    if (window.innerHeight > window.innerWidth) { // Portrait
        $('#svg-margin rect').css('height', (window.innerHeight - 70) + 'px');
    } else { // Landscape
        $('#svg-margin rect').css('height', (window.innerWidth - 20) + 'px');
    }
}


Anim.introAnimation();

// Button animation
if (!isMobile) {
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
}

var toHLColor = '#000';
var fromHLColor = '#FFF';

// Highlight animation
if (!isMobile) {
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
}

function changeToSite(name) {
    List.startSite(name);

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
                List.endSite();
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

const sites = ['cocinas', 'mesadas', 'electrodomesticos', 'placard']
sites.forEach(site => {
    $(`#${site}-button`).click(() => {
        changeToSite(site);
    });

    $(`#${site}-back-button`).click(() => {
        changeFromSite(site);
    });
});