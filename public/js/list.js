var currentSite = "home";

var pos, selected;

var dlNames, dsNames;
var length, height, width;

function startSite(name) {
    // Set jQuery name for this site
    currentSite = name;
    dlNames = `#${currentSite}-bg .bg-container .dynamic-list .dl-row`;
    dsNames = `#${currentSite}-bg .bg-container .dynamic-slideshow .ds-row`;

    // Get number of rows
    length = $(dlNames).length;

    $(dlNames).each(function() {
        // Get rows' size
        height = parseInt($(this).css('height').replace('%', ''));
        width = parseInt($(this).css('width').replace('%', ''));

        // Attach mobile click event listener
        if (isMobile) {
            $(this).click(() => {
                $(`#${currentSite}-bg .bg-container .dynamic-slideshow`).css('display', 'block');
                $(`#${currentSite}-bg .bg-container .dynamic-list`).css('display', 'none');
                $(`#${currentSite}-bg .bg-container .goback`).css('display', 'block');
            });
        }

    });  

    // Go back button
    $(`#${currentSite}-bg .bg-container .goback`).click(() => {
        $(`#${currentSite}-bg .bg-container .dynamic-slideshow`).css('display', 'none');
        $(`#${currentSite}-bg .bg-container .dynamic-list`).css('display', 'block');
        $(`#${currentSite}-bg .bg-container .goback`).css('display', 'none');
    });

    pos = selected = 0;

    slide();
}

function endSite() {
    currentSite = "home";
}

function slide() {
    $(dlNames).each(function(indx) {
        // Math functions: https://www.desmos.com/calculator/zn2tmgp3k5

        // Position
        const x = (pos - indx) - 0;
        const w = -1, a = -20, h = -15.2;
        const part = (Math.tanh( (a*x/w) - a*Math.floor(x/w) - a/2) ) / (2*Math.tanh(a/2));
        const offset = h * (part + 0.5 + Math.floor(x/w));

        $(this).css('top', (50 - height/2 - offset) + '%');

        // Size
        const sigma = 0.9;
        var size = (1/(sigma*Math.sqrt(2*Math.PI))) * Math.exp((-0.5)*((indx - pos)/sigma)**2) + 0.8;
        size *= 0.8;
        $(this).css('transform', `scale(${size})`);

        // Z-index
        $(this).css('z-index', Math.round(20 + size*10))

        // Opacity
        $(this).css('opacity', `${size**7}`);


        // Selected
        if (Math.abs(pos - indx) < 0.5) {
            selected = indx;

            // Show slideshow
            $(dsNames).each(function(dsIndx) {
                if (dsIndx == selected) {
                    $(dsNames).eq(dsIndx).css('display', 'block');
                } else {
                    $(dsNames).eq(dsIndx).css('display', 'none');
                }
            });
        }
    });
}

// LIST SCROLLING
var yPosBuffer = 0;
if (!isMobile) {
    // PC Scrolling

    $(document).on('wheel', function(e) { // TODO: Not working on Firefox !!!
        const delta = e.originalEvent.wheelDelta * -0.008;
    
        if (pos + delta >= 0 && pos + delta <= length - 1) {
            pos += delta;
            slide();
        }
    });
}
else {
    // Mobile swipe

    $(document).on('touchstart', function(e) {
        yPosBuffer = e.touches[0].screenY
    });

    $(document).on('touchmove', function(e) { 
        const delta = (e.touches[0].screenY - yPosBuffer) * -0.006;

        if (pos + delta >= 0 && pos + delta <= length - 1) {
            pos += delta;
            slide();
        }

        yPosBuffer = e.touches[0].screenY;
    });
}    
