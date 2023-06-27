import { logger } from '.';
import { Color, CustomLoggerPresets, CustomizeOptions } from './types';

/**
 * Custom logger
 * @example
 * const myCustomLogger = new CustomLogger({
 *  info: { color: Colors.Blue, italic: true },
 *  success: { color: Colors.Green, bold: true }
 * });
 * 
 * myCustomLogger.info('Hello, World');
 */
export class CustomLogger {
    /**
     * A custom logger preset
     */
    [id: string]: (text: string, options?: CustomizeOptions) => void;

    /**
     * Create a new custom logger
     * @param presets Custom logger presets
     */
    constructor(presets: CustomLoggerPresets) {
        Object.entries(presets).forEach(([id, presetOptions]) => this[id] = (text: string, options?: CustomizeOptions): void => logger.custom(text, Object.assign(presetOptions, options ?? {})));
    };
};