window.Main.register('events', function (mapDots, paintTrack, canvas, ctx) {

    document.getElementById('inp-start-track').addEventListener('click', function () {
        var imgDataArr = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
            mapArr;

        
        mapArr = mapDots(imgDataArr);

        paintTrack();

        //###### result array ######
        document.getElementById('result-to-array').innerHTML = 
        JSON.stringify(mapArr, null, '    ')
            .replace(/\n\s*?([0-9,])/g, '$1')
            .replace(/([0-9]+)[^0-9\]]*\n.*?\]/g, '$1]');

    });

    document.getElementById('inp-start-flow').addEventListener('click', function () {
        var imgDataArr = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
            mapArr;

        
        mapArr = mapDots(imgDataArr);

        paintTrack();

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
        if (!el || !el.value) {
            el = this;
        }

        document.getElementById('canvas-wrap').style.backgroundColor = el.value;
    }

    //alpha
    document.getElementById('inp-bg-alpha').addEventListener('change', changeAlpha);

    function changeAlpha (el) {

        var color = document.getElementById('canvas-wrap').style.backgroundColor,
            result = '';

        if (!el || !el.value) {
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
