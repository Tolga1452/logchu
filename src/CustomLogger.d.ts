import { CustomLoggerPresets, CustomizeOptions } from './types';
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
export declare class CustomLogger {
    /**
     * A custom logger preset
     */
    [id: string]: (text: string, options?: CustomizeOptions) => void;
    /**
     * Create a new custom logger
     * @param presets Custom logger presets
     */
    constructor(presets: CustomLoggerPresets);
}
