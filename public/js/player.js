'use strict';

ST.generator.player = (asset) => {
    let _asset = asset;
    let _elem = createElement(asset);
    let _x = 0;
    let _y = 0;
    let _dir = ST.DIR.DOWN;
    let _pose = 0;

    function createElement(asset) {
        let elem = document.createElement('div');
        elem.style.position = 'absolute';
        elem.style.width = `${asset.size.w}px`;
        elem.style.height = `${asset.size.h}px`;
        elem.style.overflow = 'hidden';
        elem.style.backgroundImage = `url("${asset.img}")`;
        elem.style.backgroundSize = 'auto';

        return elem;
    }

    let setPose = (dir, pose) => {
        _dir = dir;

        let i = 0;
        switch (dir) {
            case ST.DIR.UP:
                i = 9;
                break;
            case ST.DIR.DOWN:
                i = 0;
                break;
            case ST.DIR.LEFT:
                i = 3;
                break;
            case ST.DIR.RIGHT:
                i = 6;
                break;
        }

        _pose = pose % _asset.size.x;
        show(i + _pose);
    };

    let setDir = (dir) => {
        setPose(dir, 0);
    };

    let show = (n) => {
        let px = (n % _asset.size.x) * _asset.size.w;
        let py = (Math.floor(n / _asset.size.x)) * _asset.size.h;
        _elem.style.backgroundPosition = `-${px}px -${py}px`
    };

    return {
        message: (message) => {
        },
        setDir: setDir,
        setPose: setPose,
        nextPose: () => {
            setPose(_dir, _pose + 1);
        },
        show: show,
        getElement: () => {
            return _elem;
        },
        setLocate: (x, y) => {
            _x = x;
            _y = y;
            _elem.style.top = y + "px";
            _elem.style.left = x + "px";
            _elem.style.zIndex = y;
        },
    };
};