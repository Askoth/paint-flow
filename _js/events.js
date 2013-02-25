window.main.register('events', function (mapDots, paintTrack) {

console.log('[events]', arguments);

    document.getElementById('inp-start-track').addEventListener('click', function () {
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            imgDataArr = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
            mapArr;

        
        mapArr = mapDots(imgDataArr);

        showCenter();

        main.paintTrack(ctx, canvas);

        //sorts to make all elements go clockwise
        // main.triforce.setCenterToSort = setCenterToSort;
        // mapArr.sort(main.triforce.sortFn);


        main.runVisualTests(mapArr, ctx);


        //###### result array ######
        document.getElementById('result-to-array').innerHTML = 
        JSON.stringify(mapArr, null, '    ')
            .replace(/\n\s*?([0-9,])/g, '$1')
            .replace(/([0-9]+)[^0-9\]]*\n.*?\]/g, '$1]');

    });

    //color
    document.getElementById('inp-bg-color').addEventListener('change', changeColor);

    changeColor(document.getElementById('inp-bg-color'));

    function changeColor (el) {

        if (!el) {
            el = this;
        }

        document.getElementById('canvas-wrap').style.backgroundColor = el.value;
    }

    //alpha
    document.getElementById('inp-bg-alpha').addEventListener('change', changeAlpha);

    function changeAlpha (el) {

        var color = document.getElementById('canvas-wrap').style.backgroundColor,
            result = '';

        if (!el) {
            el = this;
        }

        color = color.replace(/[^0-9|,]/g, '');

        color = color.split(',').slice(0, 3);

        if (color.length < 3) {
            //not rgb(a) format
            return;
        }

        result = 'rgba(' + color.join(',') + ',' + el.value/100 + ')';

        document.getElementById('canvas-wrap').style.backgroundColor = result;
    }
});
