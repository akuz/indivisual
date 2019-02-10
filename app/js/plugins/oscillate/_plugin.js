HC.plugins.oscillate = HC.plugins.oscillate || {};

HC.OscillatePlugin = _class(false, HC.Plugin, {

    construct: function (layer, settings, tree, key) {
        HC.Plugin.prototype.construct.call(this, layer, settings, tree, key);
        this.cache = this.cache || {};
    },

    params: function (key, value) {

        // create a unique key to cache progress etc.
        var ckey = '_' + (isObject(key) ? '_object_' : key);

        if (ckey in this.cache) {
            // key already exists
            if (value !== undefined) {
                this.cache[ckey] = value;
            }

        } else {
            // key does not exist
            this.cache[ckey] = Object.create(this.preset) || 0;
        }

        return this.cache[ckey];
    },

    store: function (key) {

        // store original value
        if (isObject(key)) {
            var ckey = (isObject(key) ? '_object_' : key);
            this.cache[ckey] = key.value;

        } else {
            this.cache[key] = this.settings[key];
        }

    },

    restore: function (key) {
        // restore original value
        if (isObject(key)) {
            var ckey = (isObject(key) ? '_object_' : key);
            key.value = this.cache[ckey];

        } else {
            this.settings[key] = this.cache[key];
        }

    },

    activate: function (key, value, overwrite) {

        if (isObject(key)) {
            if (overwrite) {
                key.value = value;

            } else {
                key.value *= value;
            }

        } else {
            if (overwrite) {
                this.settings[key] = value;
            } else {
                this.settings[key] *= value;
            }
        }
    }
});