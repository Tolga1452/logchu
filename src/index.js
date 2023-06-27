"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = exports.ColorPreset = exports.logger = exports.customize = exports.fromRGB = exports.useColor = exports.useLogger = void 0;
const CustomLogger_1 = require("./CustomLogger");
Object.defineProperty(exports, "CustomLogger", { enumerable: true, get: function () { return CustomLogger_1.CustomLogger; } });
const types_1 = require("./types");
Object.defineProperty(exports, "ColorPreset", { enumerable: true, get: function () { return types_1.ColorPreset; } });
const toolbox_js_1 = require("@tolga1452/toolbox.js");
let config = {
    customColorPresets: {},
    customLoggers: {}
};
let configDir = `${process.cwd()}\\logchu.config.js`;
/**
 * Use a custom logger.
 * @param id The id of the custom logger.
 * @returns The custom logger.
 */
function useLogger(id) {
    config = require(configDir);
    if (!config.customLoggers[id])
        throw new Error(`Custom logger ${id} does not exist.`);
    for (var customLogger in config.customLoggers) {
        for (var preset in config.customLoggers[customLogger]) {
            let color = config.customLoggers[customLogger][preset].color;
            if (typeof color === 'string' && color.startsWith('$custom:')) {
                color = color.split(':')[1];
                if (!config.customColorPresets[color])
                    throw new Error(`Custom color preset ${color} does not exist.`);
                config.customLoggers[customLogger][preset].color = config.customColorPresets[color];
            }
            ;
        }
        ;
    }
    ;
    return new CustomLogger_1.CustomLogger(config.customLoggers[id]);
}
exports.useLogger = useLogger;
;
/**
 * Use a custom color preset.
 * @param id The id of the custom color preset.
 * @returns The custom color preset.
 */
function useColor(id) {
    config = require(configDir);
    if (!config.customColorPresets[id])
        throw new Error(`Custom color preset ${id} does not exist.`);
    return config.customColorPresets[id];
}
exports.useColor = useColor;
;
/**
 * Use a color from RGB.
 * @param rgb The RGB to use.
 * @returns The color from RGB.
 * @example
 * fromRGB([255, 255, 255]);
 */
function fromRGB(rgb) {
    return `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}
exports.fromRGB = fromRGB;
;
/**
 * Customize the text with the given options.
 * @param text The text to customize.
 * @param options The color or options to apply to the text.
 * @returns The customized text.
 * @example
 * customize('Hello, World', ColorPreset.Info);
 * @example
 * customize('Hello, World', { color: ColorPreset.Info });
 * @example
 * customize('Hello, World', { color: ColorPreset.Info, bold: true });
 */
function customize(text, options) {
    let color = options.color ?? options;
    if (Array.isArray(color))
        color = fromRGB(color);
    else if ((typeof color === 'string' && color.startsWith('#')) || typeof color === 'number')
        color = fromRGB((0, toolbox_js_1.convertToRGB)(color));
    return typeof options === 'object' ? `${color ?? types_1.ColorPreset.Default}${options.bold ? '\x1b[1m' : ''}${options.underline ? '\x1b[4m' : ''}${options.inverse ? '\x1b[7m' : ''}${options.strikethrough ? '\x1b[9m' : ''}${options.hidden ? '\x1b[8m' : ''}${options.italic ? '\x1b[3m' : ''}${text}${types_1.ColorPreset.Default}` : `${color}${text}${types_1.ColorPreset.Default}`;
}
exports.customize = customize;
;
exports.logger = {
    /**
     * Log the text to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.default('Hello, World', { bold: true });
     */
    default: (text, options) => console.log(customize(text, options)),
    /**
     * Log the text to the console with the given color.
     * @param text The text to log.
     * @param options The color or options to apply to the text.
     * @example
     * log.custom('Hello, World', ColorPreset.Info);
     * @example
     * log.custom('Hello, World', '\x1b[34m');
     * @example
     * log.custom('Hello, World', { color: ColorPreset.Debug, italic: true });
     */
    custom: (text, options) => console.log(customize(text, options)),
    /**
     * A preset for logging info to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.info('Hello, World');
     */
    info: (text, options) => console.log(customize(text, { color: types_1.ColorPreset.Info, ...options })),
    /**
     * A preset for logging success to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.success('Hello, World');
     */
    success: (text, options) => console.log(customize(text, { color: types_1.ColorPreset.Success, ...options })),
    /**
     * A preset for logging warnings to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.warning('Hello, World', { bold: true });
     */
    warning: (text, options) => console.log(customize(text, { color: types_1.ColorPreset.Warning, ...options })),
    /**
     * A preset for logging errors to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.error('Hello, World');
     */
    error: (text, options) => console.log(customize(text, { color: types_1.ColorPreset.Error, ...options })),
    /**
     * A preset for logging debug to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.debug('Hello, World');
     */
    debug: (text, options) => console.log(customize(text, { color: types_1.ColorPreset.Debug, ...options })),
    /**
     * A preset for logging text to the console with a random color.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.random('Hello, World');
     */
    random: (text, options) => {
        let color = {
            r: (0, toolbox_js_1.randomNumber)(0, 255),
            g: (0, toolbox_js_1.randomNumber)(0, 255),
            b: (0, toolbox_js_1.randomNumber)(0, 255)
        };
        return console.log(customize(text, { color: `\x1b[38;2;${color.r};${color.g};${color.b}m`, ...options }));
    },
    /**
     * A preset for logging text to the console with a random color and random options.
     * @param text The text to log.
     * @param options The overwrite options to apply to the text.
     * @example
     * log.fullRandom('Hello, World');
     * @example
     */
    fullRandom: (text, options) => {
        let color = {
            r: (0, toolbox_js_1.randomNumber)(0, 255),
            g: (0, toolbox_js_1.randomNumber)(0, 255),
            b: (0, toolbox_js_1.randomNumber)(0, 255)
        };
        return console.log(customize(text, Object.assign({
            color: `\x1b[38;2;${color.r};${color.g};${color.b}m`,
            bold: (0, toolbox_js_1.randomNumber)(0, 1),
            underline: (0, toolbox_js_1.randomNumber)(0, 1),
            inverse: (0, toolbox_js_1.randomNumber)(0, 1),
            strikethrough: (0, toolbox_js_1.randomNumber)(0, 1),
            hidden: (0, toolbox_js_1.randomNumber)(0, 1),
            italic: (0, toolbox_js_1.randomNumber)(0, 1)
        }, options)));
    },
    /**
     * A preset for logging text to the console with a rainbow color.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.rainbow('Hello, World');
     */
    rainbow: (text, options) => {
        let colors = [types_1.ColorPreset.Red, types_1.ColorPreset.Orange, types_1.ColorPreset.Yellow, types_1.ColorPreset.Green, types_1.ColorPreset.Cyan, types_1.ColorPreset.Blue, types_1.ColorPreset.Purple];
        let rainbow = '';
        for (var i = 0; i < text.length; i++)
            rainbow += `${colors[i % colors.length]}${text[i]}`;
        return console.log(customize(rainbow, options ?? ''));
    }
};
//# sourceMappingURL=index.js.map