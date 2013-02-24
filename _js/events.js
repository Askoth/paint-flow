window.main.register('events', function () {

    document.getElementById('inp-start-track').addEventListener('click', function () {

        var imgDataArr = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
            mapArr;

        mapArr = mapDots(imgDataArr);

        showCenter();

        main.paintTrack(ctx, canvas);

        //sorts to make all elements go clockwise
        main.triforce.setCenterToSort = setCenterToSort;
        mapArr.sort(main.triforce.sortFn);


        main.runVisualTests(mapArr, ctx);


        //###### result array ######
        document.getElementById('result-to-array').innerHTML = 
        JSON.stringify(mapArr, null, '    ')
            .replace(/\n\s*?([0-9,])/g, '$1')
            .replace(/([0-9]+)[^0-9\]]*\n.*?\]/g, '$1]');

    });

    document.getElementById('inp-bg-color').addEventListener('change', function () {
        document.getElementById('canvas-wrap').style.backgroundColor = this.value;
    });

    document.getElementById('inp-bg-alpha').addEventListener('change', function () {

        var color = document.getElementById('canvas-wrap').style.backgroundColor,
            result = '';

        color = color.replace(/[^0-9|,]/g, '');

        color = color.split(',').slice(0, 3);

        if (color.length < 3) {
            //not rgb(a) format
            return;
        }

        result = 'rgba(' + color.join(',') + ',' + this.value/100 + ')';
        console.log(document.getElementById('canvas-wrap').style.backgroundColor);

        document.getElementById('canvas-wrap').style.backgroundColor = result;
    });
})
