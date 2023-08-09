import { Decimal, Hexadecimal, RGB } from "@tolga1452/toolbox.js";

/**
 * Color presets
 */
export enum ColorPreset {
    Default = '\x1b[0m', // Resets all colors.
    Info = '\x1b[38;2;0;128;255m', // Blue
    Success = '\x1b[38;2;0;255;0m', // Green
    Warning = '\x1b[38;2;255;255;0m', // Yellow
    Error = '\x1b[38;2;255;0;0m', // Red
    Debug = '\x1b[38;2;153;50;204m', // Purple
    Red = '\x1b[38;2;255;0;0m', // Red
    Green = '\x1b[38;2;0;255;0m', // Green
    Yellow = '\x1b[38;2;255;255;0m', // Yellow
    Blue = '\x1b[38;2;0;128;255m', // Blue
    Magenta = '\x1b[38;2;255;0;255m', // Magenta
    Cyan = '\x1b[38;2;0;255;255m', // Cyan
    LightGray = '\x1b[38;2;192;192;192m', // Light gray
    DarkGray = '\x1b[38;2;128;128;128m', // Dark gray
    LightRed = '\x1b[38;2;255;128;128m', // Light red
    LightGreen = '\x1b[38;2;128;255;128m', // Light green
    LightYellow = '\x1b[38;2;255;255;128m', // Light yellow
    LightBlue = '\x1b[38;2;128;192;255m', // Light blue
    LightMagenta = '\x1b[38;2;255;128;255m', // Light magenta
    LightCyan = '\x1b[38;2;128;255;255m', // Light cyan
    White = '\x1b[38;2;255;255;255m', // White
    Black = '\x1b[38;2;0;0;0m', // Black
    Purple = '\x1b[38;2;128;0;128m', // Purple
    Orange = '\x1b[38;2;255;165;0m', // Orange
    BackgroundRed = '\x1b[48;2;255;0;0m', // Red background
    BackgroundGreen = '\x1b[48;2;0;255;0m', // Green background
    BackgroundYellow = '\x1b[48;2;255;255;0m', // Yellow background
    BackgroundBlue = '\x1b[48;2;0;128;255m', // Blue background
    BackgroundMagenta = '\x1b[48;2;255;0;255m', // Magenta background
    BackgroundCyan = '\x1b[48;2;0;255;255m', // Cyan background
    BackgroundLightGray = '\x1b[48;2;192;192;192m', // Light gray background
    BackgroundDarkGray = '\x1b[48;2;128;128;128m', // Dark gray background
    BackgroundLightRed = '\x1b[48;2;255;128;128m', // Light red background
    BackgroundLightGreen = '\x1b[48;2;128;255;128m', // Light green background
    BackgroundLightYellow = '\x1b[48;2;255;255;128m', // Light yellow background
    BackgroundLightBlue = '\x1b[48;2;128;192;255m', // Light blue background
    BackgroundLightMagenta = '\x1b[48;2;255;128;255m', // Light magenta background
    BackgroundLightCyan = '\x1b[48;2;128;255;255m', // Light cyan background
    BackgroundWhite = '\x1b[48;2;255;255;255m' // White background
};

/**
 * Color type
 */
export type Color = `\x1b[${string}m` | RGB | Hexadecimal | Decimal;

/**
 * Log types
 */
export enum LogType {
    Normal = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Debug = 4
};

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
};

export interface CustomizeOptions extends LogOptions {
    /**
     * Type of the log.
     * @default
     * LogType.Normal
     * @example
     * log('Hello, World', { type: LogType.Info });
     */
    type?: LogType;
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
};

/**
 * Custom logger presets
 */
export interface CustomLoggerPresets {
    [name: string]: CustomizeOptions;
};

/**
 * Custom logger configuration
 */
export interface ConfigCustomLoggers {
    [id: string]: CustomLoggerPresets;
};

/**
 * Custom color presets
 */
export interface ConfigCustomColorPresets {
    [id: string]: Color;
};

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
};