window.main.register('mapDots', function () {
    return function (imgDataArr) {

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
});