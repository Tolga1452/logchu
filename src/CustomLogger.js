"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const _1 = require(".");
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
class CustomLogger {
    /**
     * Create a new custom logger
     * @param presets Custom logger presets
     */
    constructor(presets) {
        Object.entries(presets).forEach(([id, presetOptions]) => this[id] = (text, options) => _1.logger.custom(text, Object.assign(presetOptions, options ?? {})));
    }
    ;
}
exports.CustomLogger = CustomLogger;
;
//# sourceMappingURL=CustomLogger.js.map