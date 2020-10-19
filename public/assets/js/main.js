
// Intro animation
introAnimation();


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

    darkenBlocks(e.target.parentElement.parentElement);
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

    lightenBlocks(e.target.parentElement.parentElement);
});

// Highlight animation
$('.black-highlight').hover(
    e => {
        anime({
            targets: e.target,
            easing: 'easeInSine',
            duration: 200,
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
            backgroundSize: ['100% 1.4rem', '0% 1.4rem'],
            complete: () => {
                e.target.style.backgroundPosition = 'right bottom';
            },
        });

    }
);


// Menu reorganization
function moveOut() {
    anime({
        targets: ['#NE', '#SE'],
        easing: 'easeInOutQuad',
        delay: anime.stagger(100),
        translateX: ['0', '100vw'],
    });
    anime({
        targets: ['#NW', '#SW'],
        easing: 'easeInOutQuad',
        delay: anime.stagger(100),
        translateX: ['0', '-100vw'],
    });
}
function moveIn() {
    $('.nav-block').css({'transform': 'translateX(0)', 'opacity': 0});
    introAnimation();
}


// Cocinas
$('#cocinas-button').click(() => {
    moveOut();
    eraseLogo();
});

$('#contactate').click(() => {
    moveIn();
});