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

    let _message = (message) => {
        let command = message[0];

        switch (command) {
            case ST.COMMAND.INTERVAL:
                procIntervalCommand();
                break;
        }
    }

    let _setLocate = (x, y) => {
        _x = x;
        _y = y;
        _elem.style.top = y + "px";
        _elem.style.left = x + "px";
        _elem.style.zIndex = y;
    };


    let intervalCounter = Math.floor(Math.random() * 1000);

    function procIntervalCommand() {
        intervalCounter++;
        if (intervalCounter >= 1000) {
            intervalCounter = 0;
        }

        if ((intervalCounter % 200) == 0) {
            // 時々ランダムに方向を変える
            setDir(ST.util.randDir());
        }

        const c = intervalCounter % 10;
        switch (c) {
            case 0:
                setPose(_dir, _pose + 1);
                break;
            case 1:
                walk();
                break;
            case 10:
                break;
        }
    }

    function walk() {
        let nx = _x;
        let ny = _y;
        const len = 4;
        switch (_dir) {
            case ST.DIR.UNKNOWN:
                _dir = ST.DIR.DOWN;
                break;
            case ST.DIR.UP:
                ny -= len;
                break;
            case ST.DIR.LEFT:
                nx -= len;
                break;
            case ST.DIR.RIGHT:
                nx += len;
                break;
            case ST.DIR.DOWN:
                ny += len;
                break;
        }

        if (!checkXY(nx, ny)) {
            setDir(ST.util.randDir());
            return;
        }

        _setLocate(nx, ny);
    }

    function checkXY(x, y) {
        if ((x < 0) || (x > (ST.assets.screen_w - _asset.size.w))) {
            return false;
        }
        if ((y < 0) || (y > (ST.assets.screen_h - _asset.size.h))) {
            return false;
        }
        return true;
    }

    return {
        message: _message,
        setDir: setDir,
        setPose: setPose,
        getElement: () => {
            return _elem;
        },
        setLocate: _setLocate,
    };
};