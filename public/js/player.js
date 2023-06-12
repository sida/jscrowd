'use strict';

ST.generator.player = (asset, action) => {
    let _asset = asset;
    let _elem = createElement(asset);
    let _x = 0;
    let _y = 0;
    let _dir = ST.DIR.DOWN;
    let _pose = 0;
    let _my;
    let _action = action;

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

    let _message = (message) => {
        let command = message[0];

        if (command == ST.COMMAND.INTERVAL) {
            _action.procInterval(_my);
        } else {
            _action.message(_my, message);
        }
    }

    let _getLocation = () => {
        return {
            x: _x,
            y: _y,
            pose: _pose,
            dir: _dir,
        }
    }

    let _setPose = (dir, pose) => {
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

    let _setDir = (dir) => {
        _setPose(dir, 0);
    };

    function show(n) {
        let px = (n % _asset.size.x) * _asset.size.w;
        let py = (Math.floor(n / _asset.size.x)) * _asset.size.h;
        _elem.style.backgroundPosition = `-${px}px -${py}px`
    };

    let _setLocate = (x, y) => {
        _x = x;
        _y = y;
        _elem.style.top = y + "px";
        _elem.style.left = x + "px";
        _elem.style.zIndex = y;
    };

    function _move() {
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
            // 現在向いている方向に進めなかった
            return false;
        }

        _setLocate(nx, ny);
        return true;
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

    _my = {
        message: _message,
        setDir: _setDir,
        setPose: _setPose,
        move: _move,
        getElement: () => {
            return _elem;
        },
        setLocate: _setLocate,
        getLocation: _getLocation,
    };
    return _my;
};