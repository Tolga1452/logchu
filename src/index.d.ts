import { CustomLogger } from './CustomLogger';
import { Color, ColorPreset, CustomizeOptions, LogOptions, CustomLoggerPresets, ConfigCustomLoggers, Config, ConfigCustomColorPresets } from './types';
import { RGB } from '@tolga1452/toolbox.js';
/**
 * Use a custom logger.
 * @param id The id of the custom logger.
 * @returns The custom logger.
 */
export declare function useLogger(id: string): CustomLogger;
/**
 * Use a custom color preset.
 * @param id The id of the custom color preset.
 * @returns The custom color preset.
 */
export declare function useColor(id: string): Color;
/**
 * Use a color from RGB.
 * @param rgb The RGB to use.
 * @returns The color from RGB.
 * @example
 * fromRGB([255, 255, 255]);
 */
export declare function fromRGB(rgb: RGB): Color;
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
export declare function customize(text: string, options: Color | CustomizeOptions): string;
export declare const logger: {
    /**
     * Log the text to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.default('Hello, World', { bold: true });
     */
    default: (text: string, options?: LogOptions) => void;
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
    custom: (text: string, options?: Color | CustomizeOptions) => void;
    /**
     * A preset for logging info to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.info('Hello, World');
     */
    info: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging success to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.success('Hello, World');
     */
    success: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging warnings to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.warning('Hello, World', { bold: true });
     */
    warning: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging errors to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.error('Hello, World');
     */
    error: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging debug to the console.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.debug('Hello, World');
     */
    debug: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging text to the console with a random color.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.random('Hello, World');
     */
    random: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging text to the console with a random color and random options.
     * @param text The text to log.
     * @param options The overwrite options to apply to the text.
     * @example
     * log.fullRandom('Hello, World');
     * @example
     */
    fullRandom: (text: string, options?: LogOptions) => void;
    /**
     * A preset for logging text to the console with a rainbow color.
     * @param text The text to log.
     * @param options The options to apply to the text.
     * @example
     * log.rainbow('Hello, World');
     */
    rainbow: (text: string, options?: LogOptions) => void;
};
export { Color, ColorPreset, CustomizeOptions, LogOptions, CustomLoggerPresets, CustomLogger, ConfigCustomLoggers, Config, ConfigCustomColorPresets };
