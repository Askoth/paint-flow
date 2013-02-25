'use strict';

window.Main.register('base', function (events, fileAPI, paintDots) {

    //guide http://beej.us/blog/data/html5s-canvas-2-pixel/
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        // imageCallback,
        setCenterToSort = [canvas.width/2, canvas.height/2];

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

    paintDots(ctx);

});

/*
(function (main) {
    'use strict';

    //guide http://beej.us/blog/data/html5s-canvas-2-pixel/
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        // imageCallback,
        setCenterToSort = [canvas.width/2, canvas.height/2];


    main.fileAPI('inp-image', function (e) {
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


    main.paintDots(ctx);

    function showCenter () {
        // console.log('[setCenterToSort]', setCenterToSort[0], setCenterToSort[1]);
        //show center
        ctx.strokeStyle = "rgba(0,0,0, 0.7)";
        ctx.beginPath();
        ctx.moveTo(setCenterToSort[0], setCenterToSort[1] - 10);
        ctx.lineTo(setCenterToSort[0], setCenterToSort[1] + 10);
        ctx.moveTo(setCenterToSort[0] - 10, setCenterToSort[1]);
        ctx.lineTo(setCenterToSort[0] + 10, setCenterToSort[1]);
        ctx.stroke();

    }

    function mapDots (imgDataArr) {

        var curAlpha = 0,
            imgDataHeight = canvas.height,
            imgDataWidth = canvas.width,
            imgDataLength = imgDataArr.length,
            i = 0,
            x = 0,
            y = 0,
            mapArr = [];

        //###### populate array ######
        for (i=0; i < imgDataLength; i +=4) {

            curAlpha = i + 3;

            if (imgDataArr[curAlpha] > 0) { //i == red, 0 means black

                if (imgDataArr[curAlpha-4] == 0) { //left one is white

                    if (imgDataArr[curAlpha - (imgDataWidth * 4)] == 0) {

                        y = Math.floor((i/4)/imgDataWidth);

                        x = Math.floor((i/4) - (imgDataWidth * y));

                        mapArr.push([x, y]);

                        // imgDataArr[i] = 255;
                    }

                }

            }
        }

        return mapArr;
        //END populate array
    }

    main.init();

})(window.main);

*/

window.Main.init();