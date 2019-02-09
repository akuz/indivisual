DEBUG = true; //window.location.hostname == 'indivisual.lab' || window.location.hostname == 'indivisual.remote';

APP_DIR = 'app';
STORAGE_DIR = 'storage';
SAMPLE_DIR = 'samples';
SESSION_DIR = 'sessions';
ASSET_DIR = 'assets';

_HASH = document.location.hash ? document.location.hash.substr(1) : '';
_SERVER = 'server';
_CONTROLLER = 'controller';
_ANIMATION = 'animation';
_SETUP = 'setup';
_CLIENT = 'client';
_MONITOR = 'monitor';

IS_CONTROLLER = G_INSTANCE == _CONTROLLER;
IS_SETUP      = G_INSTANCE == _SETUP;
IS_ANIMATION  = G_INSTANCE == _ANIMATION;
IS_MONITOR    = G_INSTANCE == _MONITOR;

MIDI_CLOCK_NEXT = [248, 251];
MIDI_ROW_ONE = {
    "0": [176, 16],
    "1": [176, 17],
    "2": [176, 18],
    "3": [176, 19],
    "4": [176, 20],
    "5": [176, 21],
    "6": [176, 22],
    "7": [176, 23]
};
MIDI_ROW_TWO = {
    "0": [176, 24],
    "1": [176, 25],
    "2": [176, 26],
    "3": [176, 27],
    "4": [176, 28],
    "5": [176, 29],
    "6": [176, 30],
    "7": [176, 31]
};
MIDI_SAMPLE_FEEDBACK = MIDI_ROW_ONE[6];
MIDI_PEAKBPM_FEEDBACK = MIDI_ROW_ONE[7];
MIDI_BEAT_FEEDBACK = MIDI_ROW_TWO[6];
MIDI_PEAK_FEEDBACK = MIDI_ROW_TWO[7];
MIDI_DMX_CHANNEL = 174;

LAYER_KEYCODES = {
    "49": 0,
    "50": 1,
    "51": 2,
    "52": 3,
    "53": 4,
    "54": 5,
    "55": 6,
    "56": 7,
    "57": 8,
    "48": 9,
    "97": 0,
    "98": 1,
    "99": 2,
    "100": 3,
    "101": 4,
    "102": 5,
    "103": 6,
    "104": 7,
    "105": 8,
    "96": 9
};

OSD_TIMEOUT = 2000;
RAD = Math.PI / 180;
DEG = 180 / Math.PI;
SQUARE_DIAMETER = (Math.sqrt(2*2+2*2)/2);
ANTIALIAS = true;

var HC = {};
HC.now = window.performance.now.bind(window.performance);
if (TWEEN) {
    TWEEN.now = HC.now;
}

var statics = false;

var resources = [
    {
        file: 'structure/Statics.yml',
        callback: function (data, finished) {
            statics = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/ShaderValues.yml',
        callback: function (data, finished) {
            var settings = jsyaml.load(data.contents);

            statics.ShaderValues = new HC.Settings(settings);
            finished();
        }
    },
    // {
    //     file: 'structure/ShaderSettings.yml',
    //     callback: function (data, finished) {
    //         statics.ShaderSettings = new HC.Settings(jsyaml.load(data.contents));
    //         // console.log(JSON.stringify(statics.ShaderSettings.initial).replace(/,"/g, ",\n\""));
    //         finished();
    //     }
    // },
    {
        file: 'structure/ShaderTypes.yml',
        callback: function (data, finished) {
            statics.ShaderTypes = new HC.Settings(jsyaml.load(data.contents));
            // console.log(JSON.stringify(statics.ShaderTypes.initial).replace(/,"/g, ",\n\""));
            finished();
        }
    },
    {
        file: 'structure/AnimationValues.yml',
        callback: function (data, finished) {
            var settings = jsyaml.load(data.contents);

            _loadPlugins(settings);
            statics.ShaderSettings = new HC.Settings(_loadShaderSettings(settings.shaders));
            _loadRhythms(settings);

            statics.AnimationValues = new HC.Settings(settings);
            finished();
        }
    },
    {
        file: 'structure/AnimationSettings.yml',
        callback: function (data, finished) {
            data = jsyaml.load(data.contents);
            data.shaders = statics.ShaderSettings;
            // console.log(data.shaders);
            statics.AnimationSettings = new HC.Settings(data, finished);
            finished();
        }
    },
    {
        file: 'structure/AnimationController.yml',
        callback: function (data, finished) {
            data = jsyaml.load(data.contents);
            statics.AnimationController = new HC.AnimationController(data, statics.AnimationSettings);
            finished();
        }
    },
    {
        file: 'structure/AnimationTypes.yml',
        callback: function (data, finished) {
            statics.AnimationTypes = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/ControlValues.yml',
        callback: function (data, finished) {
            statics.ControlValues = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/ControlSettings.yml',
        callback: function (data, finished) {
            statics.ControlSettings = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/ControlTypes.yml',
        callback: function (data, finished) {
            statics.ControlTypes = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/DisplayValues.yml',
        callback: function (data, finished) {
            statics.DisplayValues = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/DisplaySettings.yml',
        callback: function (data, finished) {
            statics.DisplaySettings = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/DisplayTypes.yml',
        callback: function (data, finished) {
            statics.DisplayTypes = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/SourceValues.yml',
        callback: function (data, finished) {
            statics.SourceValues = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/SourceSettings.yml',
        callback: function (data, finished) {
            statics.SourceSettings = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/SourceTypes.yml',
        callback: function (data, finished) {
            statics.SourceTypes = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/DataSettings.yml',
        callback: function (data, finished) {
            statics.DataSettings = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/SourceTypes.yml',
        callback: function (data, finished) {
            statics.DataTypes = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        file: 'structure/MidiController.yml',
        callback: function (data, finished) {
            statics.MidiController = new HC.Settings(jsyaml.load(data.contents));
            finished();
        }
    },
    {
        action: 'files',
        base: '.',
        file: SESSION_DIR,
        callback: function (files, finished) {
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                statics.ControlValues.session[f.name] = f.name;
            }

            finished();
        }
    },
    {
        action: 'files',
        base: '.',
        file: ASSET_DIR,
        callback: function (files, finished) {
            var keys = Object.keys(statics.SourceValues.input);
            var index = keys.length;
            for (var i = 0; i < files.length; i++) {
                var f = files[i];

                if (!f.name.match(/\.json/)) {
                    statics.SourceValues.input[index++] = f.name;
                }

                if (f.name.match(/\.png/)) {
                    statics.AnimationValues.material_map[f.name] = f.name;
                    statics.AnimationValues.background_input[f.name] = f.name;
                }
            }

            finished();
        }
    }
];

/**
 *
 * @param resources
 * @param callback
 */
function loadResources(resources, callback) {
    var _load = function (index, finished) {

        if (index > resources.length - 1) {
            finished();
            return;
        }
        var rsc = resources[index];
        var action = 'get';
        if (rsc.action) {
            action = rsc.action;
        }
        var file = filePath(rsc.base || APP_DIR, rsc.file);
        messaging._emit({action: action, file: file, name: rsc.name}, function (data) {
            rsc.callback(data, function () {
                _load(index+1, finished);
            });
        });
    };

    _load(0, function () {
        _setup(callback);
    });
}

/**
 *
 * @param settings
 * @private
 */
function _loadPlugins(settings) {

    Object.assign(HC.plugins.pattern_overlay, HC.plugins.pattern);

    var sectionKeys = Object.keys(HC.plugins);

    for (var pi = 0; pi < sectionKeys.length; pi++) {

        var section = sectionKeys[pi];
        var plugins = HC.plugins[section];

        // create plugin namespaces to work in
        HC.Shape.prototype.injected.plugins[section] = {};

        var pluginKeys = Object.keys(plugins);

        pluginKeys.sort(function (a, b) {
            var ai = plugins[a].prototype.index || 99999;
            var bi = plugins[b].prototype.index || 99999;
            var an = plugins[a].prototype.name || a;
            var bn = plugins[b].prototype.name || b;

            var cmpi = ai - bi;
            if (cmpi == 0) {
                return an.localeCompare(bn);
            }
            return cmpi;
        });

        for (var i = 0; i < pluginKeys.length; i++) {

            var pluginKey = pluginKeys[i];
            var plugin = HC.plugins[section][pluginKey];

            settings[section][pluginKey] = plugin.prototype.name || pluginKey;

        }
    }

    var keys = Object.keys(settings);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.endsWith('_oscillate')) {
            settings[key] = settings.oscillate;
            statics.oscillator.push(key.replace('_oscillate', ''));
        }
    }

    statics.ShaderValues.oscillate = settings.oscillate;
}

/**
 *
 * @param settings
 * @private
 */
function _loadRhythms (settings) {
    var speeds = HC.Beatkeeper.prototype.speeds;
    for (var key in speeds) {
        if (speeds[key].visible !== false) {
            settings.rhythm[key] = key;
        }
    }
}

/**
 *
 * @param values
 * @private
 */
function _loadShaderSettings(values) {
    var settings = {};
    var keys = Object.keys(values);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        settings[key] = HC.plugins.shaders[key].prototype.settings;
    }

    return settings;
}

/**
 *
 * @private
 */
function _setup (callback) {
    if (!(_HASH in statics.ControlValues.session)) {
        statics.ControlValues.session[_HASH] = _HASH;
    }

    statics.ControlSettings.session = _HASH;

    callback();
}
