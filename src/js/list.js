
var currentSite = "home";

var pos, selected;

var dlNames, dsNames;
var length, height, width;

export function startSite(name) {
    // Set query name for this site
    currentSite = name;
    dlNames = `#${currentSite}-bg .dynamic-list .dl-row`;
    dsNames = `#${currentSite}-bg .dynamic-slideshow .ds-row`;

    // Get number of rows
    length = $(dlNames).length;

    // Get rows' size
    $(dlNames).each(function() {
        height = parseInt($(this).css('height').replace('%', ''));
        width = parseInt($(this).css('width').replace('%', ''));
    });  

    pos = selected = 0;

    slide();
}

function slide() {
    $(dlNames).each(function(indx) {
        // Math functions: https://www.desmos.com/calculator/zn2tmgp3k5

        // Position
        const x = (pos - indx) - 0;
        const w = -1, a = -10, h = -15.2;
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

$(document).bind('mousewheel', function(e) {
    var delta = e.originalEvent.wheelDelta;
    delta *= -0.01;

    if (pos + delta >= 0 && pos + delta <= length - 1) {
        pos += delta;
        slide();
    }
});