'use strict';

window.Main.register('base', function (events, fileAPI, paintDots, canvas, ctx) {

    //guide http://beej.us/blog/data/html5s-canvas-2-pixel/
    // imageCallback,
    var setCenterToSort = [canvas.width/2, canvas.height/2];

    fileAPI('inp-image', function (e) {
        var img = new Image();   // Create new img element
        // Render

        img.onload = function() {

            var canvasBg = document.getElementById('canvas-bg'),
                ctxBg = canvasBg.getContext('2d'),
                canvasWrap = document.getElementById('canvas-wrap');

            canvas.width = img.width;
            canvas.height = img.height;

            canvasBg.width = img.width;
            canvasBg.height = img.height;

            canvasWrap.style.width = img.width + 'px';
            canvasWrap.style.height = img.height + 'px';

            ctxBg.drawImage(img, 0, 0);

            setCenterToSort = [img.width/2, img.height/2];

            // var dataURL = canvas.toDataURL();

            // // set canvasImg image src to dataURL
            // // so it can be saved as an image
            // document.getElementById('image').src = dataURL;
        }

        img.src = e.target.result;

    });

    paintDots();

});

window.Main.init();