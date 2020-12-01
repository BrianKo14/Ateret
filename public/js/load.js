
function loadFiles(files, callback) {
    var queue = new createjs.LoadQueue();

    queue.on('complete', callback);

    var manifest = []
    files.forEach(file => {
        manifest.push({ id: file, src: file });
    });
    queue.loadManifest(manifest);
}