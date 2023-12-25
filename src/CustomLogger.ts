import { logger } from '.';
import { Color, CustomLoggerPresets, CustomizeOptions, LogObject } from './types';

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
     * Custom logger logic
     * @private
     */
    #logic: (log: LogObject) => void;
    /**
     * A custom logger preset
     */
    [id: string]: (text: string, options?: CustomizeOptions) => void;

    /**
     * Create a new custom logger
     * @param presets Custom logger presets
     */
    constructor(presets: CustomLoggerPresets, overwrite: boolean = false) {
        this.#logic = presets._logic as (log: LogObject) => void;

        delete presets._logic;

        Object.entries(presets).forEach(([id, presetOptions]) => this[id] = (text: string, options?: CustomizeOptions): void => {
            if (this.#logic as any) this.#logic({
                text,
                options,
                date: new Date(),
                type: id
            });
            
            if (!overwrite) logger.custom(text, Object.assign(presetOptions as object, options ?? {}));
        });
    };
};