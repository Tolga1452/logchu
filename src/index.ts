import { CustomLogger } from './CustomLogger';
import { Color, ColorPreset, CustomizeOptions, LogOptions, CustomLoggerPresets, ConfigCustomLoggers, Config, ConfigCustomColorPresets, LogType, WriteOptions, CustomLoggerPresetsWithoutLogic, ConsoleType } from './types';
import { Decimal, Hexadecimal, RGB, convertToRGB, randomNumber } from '@tolga1452/toolbox.js';
import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import Watcher from './Watcher';

let config: Config = {
  customColorPresets: {},
  customLoggers: {}
};
let configDir: string = `${process.cwd()}/logchu.config.js`;

/**
 * Use a custom logger.
 * @param id The id of the custom logger.
 * @returns The custom logger.
 */
export function useLogger(id: string): CustomLogger {
  config = require(configDir).default ?? require(configDir);

  if (!config.customLoggers?.[id]) throw new Error(`Custom logger ${id} does not exist.`);

  for (var customLogger in config.customLoggers) {
    if (typeof config.customLoggers[customLogger] !== 'function') for (var preset in config.customLoggers[customLogger]) {
      let color: Color = (config.customLoggers[customLogger] as CustomLoggerPresetsWithoutLogic)[preset].color as Color;

      if (typeof color === 'string' && color.startsWith('$custom:')) {
        color = color.split(':')[1] as Color;

        if (!config.customColorPresets?.[color as string]) throw new Error(`Custom color preset ${color} does not exist.`);

        (config.customLoggers[customLogger] as CustomLoggerPresetsWithoutLogic)[preset].color = config.customColorPresets?.[color as string];
      };
    };
  };

  return new CustomLogger(config.customLoggers?.[id] as CustomLoggerPresets);
};

/**
 * Use a custom color preset.
 * @param id The id of the custom color preset.
 * @returns The custom color preset.
 */
export function useColor(id: string): Color {
  config = require(configDir);

  if (!config.customColorPresets?.[id]) throw new Error(`Custom color preset ${id} does not exist.`);

  return config.customColorPresets?.[id] as Color;
};

/**
 * Get a log type.
 * @param type The type of the log.
 * @returns The log type.
 * @example
 * getType(LogType.Info);
 */
export function getType(type: LogType): ConsoleType {
  switch (type) {
    case LogType.Normal:
      return 'log';
    case LogType.Info:
      return 'info';
    case LogType.Warning:
      return 'warn';
    case LogType.Error:
      return 'error';
    case LogType.Debug:
      return 'debug';
    default:
      return 'log';
  };
};

/**
 * Use a color from RGB.
 * @param rgb The RGB to use.
 * @returns The color from RGB.
 * @example
 * fromRGB([255, 255, 255]);
 */
export function fromRGB(rgb: RGB): Color {
  return `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

/**
 * Get a color to log with.
 * @param color The color to log with.
 * @returns The color to log with.
 */
export function getColor(color: Color): Color {
  if (Array.isArray(color)) return fromRGB(color);
  else if ((typeof color === 'string' && color.startsWith('#')) || typeof color === 'number') return fromRGB(convertToRGB(color as Hexadecimal | Decimal));
  else return undefined as unknown as Color;
};

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
export function customize(text: string, options: Color | CustomizeOptions): string {
  let color = (options as CustomizeOptions)?.color ?? options;

  if (Array.isArray(color) || ((typeof color === 'string' && color.startsWith('#')) || typeof color === 'number')) color = getColor(color);

  return typeof options === 'object' ? `${(typeof color === 'object' ? (options as CustomizeOptions)?.color : color) ?? ColorPreset.Default}${(options as CustomizeOptions).bold ? '\x1b[1m' : ''}${(options as CustomizeOptions).underline ? '\x1b[4m' : ''}${(options as CustomizeOptions).inverse ? '\x1b[7m' : ''}${(options as CustomizeOptions).strikethrough ? '\x1b[9m' : ''}${(options as CustomizeOptions).hidden ? '\x1b[8m' : ''}${(options as CustomizeOptions).italic ? '\x1b[3m' : ''}${text}${ColorPreset.Default}` : `${color ?? ColorPreset.Default}${text}${ColorPreset.Default}`;
};

/**
 * Write an advanced log.
 */
export function write(defaultConfig: CustomizeOptions, ...options: WriteOptions[]) {
  let text = '';

  for (let option of options) {
    if (option.useDefault) text += customize(option.text, defaultConfig);
    else text += customize(option.text, option);
  };

  console.log(text);
};

/**
 * Use a color from chalk.
 * @param color The color to use.
 * @returns The color from chalk.
 * @example
 * fromChalk(chalk.red(' '));
 */
export function fromChalk(color: string): Color {
  return color.split(' ')[0] as Color;
};

export function log(originalText: string, text: string, type: LogType): void {
  let config: Config = {};

  try {
    config = require(configDir);
  } catch (error) {
    config = {};
  };

  console[getType(type)](text);

  if (config.watcher) {
    let log = {
      text: originalText,
      type,
      date: new Date()
    };

    config.watcher.emit('log', log);
    config.watcher.emit(getType(type), log);
  };

  if (config.logFile) {
    if (!existsSync(config.logFile)) writeFileSync(config.logFile, '');

    appendFileSync(config.logFile, `[${new Date().toUTCString()}] ${getType(type).toUpperCase()} > ${originalText}\n`);
  };
};

export const logger = {
  /**
   * Log the text to the console.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.default('Hello, World', { bold: true });
   */
  default: (text: string, options?: LogOptions): void => log(text, customize(text, options as any), LogType.Normal),
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
  custom: (text: string, options?: Color | CustomizeOptions): void => {
    if (typeof options === 'object') log(text, customize(text, options), (options as CustomizeOptions).type as LogType);
    else log(text, customize(text, options as any), LogType.Normal);
  },
  /**
   * A preset for logging info to the console.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.info('Hello, World');
   */
  info: (text: string, options?: LogOptions): void => log(text, customize(text, { color: ColorPreset.Info, ...options }), LogType.Info),
  /**
   * A preset for logging success to the console.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.success('Hello, World');
   */
  success: (text: string, options?: LogOptions): void => log(text, customize(text, { color: ColorPreset.Success, ...options }), LogType.Normal),
  /**
   * A preset for logging warnings to the console.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.warning('Hello, World', { bold: true });
   */
  warning: (text: string, options?: LogOptions): void => log(text, customize(text, { color: ColorPreset.Warning, ...options }), LogType.Warning),
  /**
   * A preset for logging errors to the console.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.error('Hello, World');
   */
  error: (text: string, options?: LogOptions): void => log(text, customize(text, { color: ColorPreset.Error, ...options }), LogType.Error),
  /**
   * A preset for logging debug to the console.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.debug('Hello, World');
   */
  debug: (text: string, options?: LogOptions): void => log(text, customize(text, { color: ColorPreset.Debug, ...options }), LogType.Debug),
  /**
   * A preset for logging text to the console with a random color.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.random('Hello, World');
   */
  random: (text: string, options?: LogOptions): void => {
    let color = {
      r: randomNumber(0, 255),
      g: randomNumber(0, 255),
      b: randomNumber(0, 255)
    };

    return log(text, customize(text, { color: `\x1b[38;2;${color.r};${color.g};${color.b}m`, ...options }), LogType.Normal);
  },
  /**
   * A preset for logging text to the console with a random color and random options.
   * @param text The text to log.
   * @param options The overwrite options to apply to the text.
   * @example
   * log.fullRandom('Hello, World');
   * @example
   */
  fullRandom: (text: string, options?: LogOptions): void => {
    let color = {
      r: randomNumber(0, 255),
      g: randomNumber(0, 255),
      b: randomNumber(0, 255)
    };

    return log(text, customize(text, Object.assign({
      color: `\x1b[38;2;${color.r};${color.g};${color.b}m`,
      bold: randomNumber(0, 1),
      underline: randomNumber(0, 1),
      inverse: randomNumber(0, 1),
      strikethrough: randomNumber(0, 1),
      hidden: randomNumber(0, 1),
      italic: randomNumber(0, 1)
    }, options as CustomizeOptions)), LogType.Normal);
  },
  /**
   * A preset for logging text to the console with a rainbow color.
   * @param text The text to log.
   * @param options The options to apply to the text.
   * @example
   * log.rainbow('Hello, World');
   */
  rainbow: (text: string, options?: LogOptions): void => {
    let colors: Color[] = [ColorPreset.Red, ColorPreset.Orange, ColorPreset.Yellow, ColorPreset.Green, ColorPreset.Cyan, ColorPreset.Blue, ColorPreset.Purple];
    let rainbow: string = '';

    for (var i = 0; i < text.length; i++) rainbow += `${colors[i % colors.length]}${text[i]}`;

    return log(text, customize(rainbow, options ?? '' as Color as CustomizeOptions), LogType.Normal);
  }
};

export {
  Color,
  ColorPreset,
  CustomizeOptions,
  LogOptions,
  CustomLoggerPresets,
  CustomLogger,
  ConfigCustomLoggers,
  Config,
  ConfigCustomColorPresets,
  LogType,
  WriteOptions,
  Watcher
};