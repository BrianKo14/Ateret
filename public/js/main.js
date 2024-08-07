
// MOBILE
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

// ISSUE WITH IMAGE RATIO
// $(window).resize(() => {
//     $('.dl-pic').find('img').each(function(){
//         if ($(this).height < $(this).parent().height) {
//             $(this).css('height', '100%');
//             $(this).css('width', 'auto');
//         } else {
//             $(this).css('width', '100%');
//             $(this).css('height', 'auto');
//         }

//         // const resizeFixed = (this.width > this.height) ? 'width' : 'height';
//         // const resizeAuto = (this.width <= this.height) ? 'height' : 'width';
//         // $(this).css(resizeFixed, '110%');
//         // $(this).css(resizeAuto, 'auto');
//     })
// })


introAnimation();


// BLOCK BUTTONS
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
}

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



// CHANGE SECTION
const sites = ['cocinas', 'mesadas', 'electrodomesticos', 'placard']
sites.forEach(site => {
    $(`#${site}-button`).click(() => {
        changeToSite(site);
    });

    $(`#${site}-back-button`).click(() => {
        changeFromSite(site);
    });
});


// OPEN INFO PAGES
$('#visitanos').click(() => {
    bringInfoPage('visitus', ['-100vw', 0], [0, 0]);
});
$('#nosotros').click(() => {
    bringInfoPage('aboutus', ['100vw', 0], [0, 0]);
});
$('#contactate').click(() => {
    bringInfoPage('contact', [0, 0], ['-100vh', 0]);
});



// MAP
const coord = [-34.585030, -58.443679];
var map = L.map('map').setView(coord, 14);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYnJpYW5rbzE0IiwiYSI6ImNrZ3Zia3pkYzAxNXAyeXBnZTNyaTF4cWMifQ._ISqhPDmu3KiKDL8FqK0iA'
}).addTo(map);

var icon = L.icon({
    iconUrl: 'images/map-marker.png',
    iconSize: [38, 40],
    iconAnchor: [22, 41],
    popupAnchor: [-3, -49],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var marker = L.marker(coord, {icon: icon}).addTo(map);
var popup = L.popup()
    .setLatLng(coord)
    .setContent("<b>Ateret Cocinas</b><br>Av. Córdoba 5923");
marker.bindPopup(popup).openPopup();


// FIT TEXT
window.onresize = () => {textFit($('#aboutus-description'))};