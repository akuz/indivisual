/**
 * @author indivisualvj / https://github.com/indivisualvj
 */

HC.plugins = HC.plugins || {};

HC.Shape.prototype.injected = {
    plugins: {}
};

/**
 *
 */
HC.Shape.prototype.initPlugins = function () {

    this.plugins = {};
    var plugins = Object.keys(HC.Shape.prototype.injected.plugins);
    for (var p = 0; p < plugins.length; p++) {
        var key = plugins[p];
        var plugin = HC.Shape.prototype.injected.plugins[key];
        var clone = JSON.parse(JSON.stringify(plugin));
        this.plugins[key] = clone;
    }
};

HC.AnimationPlugin = _class(false, false, {

    _id: function () {
        return this.tree + this.key;
    },

    construct: function (layer, settings, tree, key) {
        this.layer = layer;
        this.settings = settings;
        this.tree = tree;
        this.key = key;

        return this;
    },

    inject: function () {
        HC.Shape.prototype.injected.plugins[this.tree][this.key] = {
            values: this.injections || {}
        };
    },

    params: function (shape, values) {

        if (values !== undefined) {
            shape.plugins[this.tree][this.key].values = values;
        }

        return shape.plugins[this.tree][this.key].values;
    },

    tween: function (from) {
        return new TWEEN.Tween(from, this.layer.tween);
    },

    tweenShape: function (shape, from, to) {

        var speed = this.layer.getShapeSpeed(shape);
        var delay = this.layer.getShapeDelay(shape);

        var duration = speed.duration;
        var dly = delay.delay;

        // tweens may never be longer than their superordinate delay + duration
        var time = speed.speed.duration - speed.duration - delay.delay - speed.speed.progress;
        if (time < 0) {
            time = Math.abs(time) + 5;
            if (delay.delay > time) {
                dly -= time;

            } else if (speed.duration > time) {
                duration -= time;
            }
        }

        return this.tween(from)
            .to(to, duration)
            .delay(dly);
    },

    /**
     * Start tweens synchronized
     * @param tween
     */
    tweenStart: function (tween) {
        tween.start(HC.now() - this.layer.lastUpdate);
    },

    /**
     * Prepare etc.
     * Using isFirstShape plugins can be cancelled here if processing all shapes is not necessary.
     * @returns {boolean} true means continue, false means stop (do not call apply+after)
     */
    //before: function () {}

    /**
     *
     * @returns {boolean} true means continue, false means stop (do not call after)
     */
    // apply: function () {}

    /**
     * Clean up etc.
     */
    // after: function () {}

    /**
     * For plugins to determine if it is first or layer's dummy shape.
     * @see before
     * @param shape
     * @returns {boolean}
     */
    isFirstShape: function (shape) {
        return shape.index == 0;
    }
});

HC.audio = HC.audio || {};

HC.AudioPlugin = _class(false, false, {

    construct: function (context) {
        this.context = context;
        this.source;
        this.stream;
        return this;
    },

    start: function () {

    },

    stop: function () {
        this.disconnect();
    },

    isActive: function () {
        return this.source;
    },

    disconnect: function () {
        if (this.source) {
            this.source.disconnect();
        }

        this.source = false;
    }
});