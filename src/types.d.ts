import { Decimal, Hexadecimal, RGB } from "@tolga1452/toolbox.js";
/**
 * Color presets
 */
export declare enum ColorPreset {
    Default = "\u001B[0m",
    Info = "\u001B[38;2;0;128;255m",
    Success = "\u001B[38;2;0;255;0m",
    Warning = "\u001B[38;2;255;255;0m",
    Error = "\u001B[38;2;255;0;0m",
    Debug = "\u001B[38;2;153;50;204m",
    Red = "\u001B[38;2;255;0;0m",
    Green = "\u001B[38;2;0;255;0m",
    Yellow = "\u001B[38;2;255;255;0m",
    Blue = "\u001B[38;2;0;128;255m",
    Magenta = "\u001B[38;2;255;0;255m",
    Cyan = "\u001B[38;2;0;255;255m",
    LightGray = "\u001B[38;2;192;192;192m",
    DarkGray = "\u001B[38;2;128;128;128m",
    LightRed = "\u001B[38;2;255;128;128m",
    LightGreen = "\u001B[38;2;128;255;128m",
    LightYellow = "\u001B[38;2;255;255;128m",
    LightBlue = "\u001B[38;2;128;192;255m",
    LightMagenta = "\u001B[38;2;255;128;255m",
    LightCyan = "\u001B[38;2;128;255;255m",
    White = "\u001B[38;2;255;255;255m",
    Black = "\u001B[38;2;0;0;0m",
    Purple = "\u001B[38;2;128;0;128m",
    Orange = "\u001B[38;2;255;165;0m",
    BackgroundRed = "\u001B[48;2;255;0;0m",
    BackgroundGreen = "\u001B[48;2;0;255;0m",
    BackgroundYellow = "\u001B[48;2;255;255;0m",
    BackgroundBlue = "\u001B[48;2;0;128;255m",
    BackgroundMagenta = "\u001B[48;2;255;0;255m",
    BackgroundCyan = "\u001B[48;2;0;255;255m",
    BackgroundLightGray = "\u001B[48;2;192;192;192m",
    BackgroundDarkGray = "\u001B[48;2;128;128;128m",
    BackgroundLightRed = "\u001B[48;2;255;128;128m",
    BackgroundLightGreen = "\u001B[48;2;128;255;128m",
    BackgroundLightYellow = "\u001B[48;2;255;255;128m",
    BackgroundLightBlue = "\u001B[48;2;128;192;255m",
    BackgroundLightMagenta = "\u001B[48;2;255;128;255m",
    BackgroundLightCyan = "\u001B[48;2;128;255;255m",
    BackgroundWhite = "\u001B[48;2;255;255;255m"
}
/**
 * Color type
 */
export type Color = `\x1b[${string}m` | RGB | Hexadecimal | Decimal;
/**
 * Log options
 */
export interface LogOptions {
    /**
     * Whether or not to apply bold to the text.
     * @default
     * false
     * @example
     * log('Hello, World', { bold: true });
     */
    bold?: boolean;
    /**
     * Whether or not to apply underline to the text.
     * @default
     * false
     * @example
     * log('Hello, World', { underline: true });
     */
    underline?: boolean;
    /**
     * Whether or not to apply inverse to the text.
     * @default
     * false
     * @example
     * log('Hello, World', { inverse: true });
     */
    inverse?: boolean;
    /**
     * Whether or not to apply strikethrough to the text.
     * @default
     * false
     * @example
     * log('Hello, World', { strikethrough: true });
     */
    strikethrough?: boolean;
    /**
     * Whether or not to apply hidden to the text.
     * @default
     * false
     * @example
     * log('Hello, World', { hidden: true });
     */
    hidden?: boolean;
    /**
     * Whether or not to apply italic to the text.
     * @default
     * false
     * @example
     * log('Hello, World', { italic: true });
     */
    italic?: boolean;
}
export interface CustomizeOptions extends LogOptions {
    /**
     * Color to apply to the text.
     * @default
     * Colors.Default
     * @example
     * log('Hello, World', Colors.Info);
     * @example
     * log('Hello, World', { color: Colors.Info });
     */
    color?: Color;
}
/**
 * Custom logger presets
 */
export interface CustomLoggerPresets {
    [name: string]: CustomizeOptions;
}
/**
 * Custom logger configuration
 */
export interface ConfigCustomLoggers {
    [id: string]: CustomLoggerPresets;
}
/**
 * Custom color presets
 */
export interface ConfigCustomColorPresets {
    [id: string]: Color;
}
/**
 * logchu configuration
 */
export interface Config {
    /**
     * Custom color presets
     */
    customColorPresets?: ConfigCustomColorPresets;
    /**
     * Custom loggers
     */
    customLoggers?: ConfigCustomLoggers;
}
