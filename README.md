# logchu

Very simple and cool logger for your [Node.js](https://nodejs.org/) projects. Supports JavaScript and TypeScript.

## Features

| Feature |
| --- |
| ✅ Fully customizable |
| ✅ Basic logging |
| ✅ Chalk support |
| ✅ RGB, ANSI, Decimal, Hexadecimal support |
| ✅ JavaScript & TypeScript support |
| ✅ Advanced logging |
| ✅ Log level support |
| ✅ Custom colors |
| ✅ Custom loggers |
| ✅ Randomized logging |
| ✅ Rainbow logging |
| ✅ Config file support |
| ✅ Built-in colors |
| ✅ Custom logger logic support |

## Installation

```bash
npm install @tolga1452/logchu
```

## Usage

```js
const { logger, ColorPreset, fromChalk, LogType } = require('@tolga1452/logchu');

// Basic usage
logger.info('Hello, world!');
logger.success('Hello, world!');
logger.warning('Hello, world!');
logger.error('Hello, world!');
logger.debug('Hello, world!');

// With styles and color presets
logger.info('Hello, world!', { bold: true });
logger.custom('Hello, world!', { color: ColorPreset.Magenta, italic: true, type: LogType.Debug });
logger.custom('Hello, world!', ColorPreset.Cyan);

// With chalk
const chalk = require('chalk');

logger.custom('Hello, world!', fromChalk(chalk.dim.red(' '))); // You have to use a single space character as text for chalk
```

## Randomization

```js
const { logger } = require('@tolga1452/logchu');

logger.random('Hello, world!', { bold: true }); // Log with random color
logger.fullRandom('Hello, world!', { inverse: true }); // Fully random log with overwrites
```

## Advanced Logs

### `write` Methd

```js
const { write, ColorPreset } = require('@tolga1452/logchu');

write(
    {
        color: ColorPreset.LightGray,
        italic: true
    },
    {
        text: 'First one was default config ',
        color: ColorPreset.LightGreen
    },
    {
        text: 'this is ',
        useDefault: true
    },
    {
        text: 'awesome!',
        color: ColorPreset.LightCyan,
        bold: true
    }
);
```

### Custom Logger Logic

```js
const { CustomLogger } = require('@tolga1452/logchu');

const myCustomLogger = new CustomLogger({
    _logic: log => {
        console.log('Put your custom logic here.');
        console.log('This will be runned along with the default logic.');
    },
    info: { color: ColorPreset.BackgroundBlue, italic: true }
}, true); // true for overwrite default logic
```

## Custom Colors

Supports Hexadecimal, RGB, decimal and ANSI colors.

### In Your Code

```js
const { logger } = require('@tolga1452/logchu');

logger.custom('Hello, world!', { color: '#f44747' });
```

### From Config File

1. Create a file named `logchu.config.js` in your project root.
2. Add the following code to the file:

```js
module.exports = {
    customColorPresets: {
        myCustomColor: '#639dff'
    }
};
```

3. Use it in your code:

```js
const { logger, userColor } = require('@tolga1452/logchu');

logger.custom('Hello, world!', userColor('myCustomColor'));
```

## Custom Loggers

### In Your Code

```js
const { CustomLogger, ColorPreset } = require('@tolga1452/logchu');

const myCustomLogger = new CustomLogger({
    info: { color: ColorPreset.BackgroundBlue, italic: true },
    success: { color: ColorPreset.LightGreen, bold: true },
    trolley: { color: '#9b4eea', bold: true }
});

myCustomLogger.info('Hello, world!');
myCustomLogger.success('Hello, world!', { bold: false });
myCustomLogger.trolley('Hello, world!', ColorPreset.BackgroundRed);
```

### From Config File

1. Create a file named `logchu.config.js` in your project root.
2. Add the following code to the file:

```js
const { ColorPreset } = require('@tolga1452/logchu');

module.exports = {
    customLoggers: {
        myCustomLogger: {
            info: { color: ColorPreset.BackgroundBlue, italic: true },
            success: { color: '#80b918', bold: true },
            trolley: { color: '$custom:myCustomColor', bold: true }
        }
    },
    customColorPresets: {
        myCustomColor: '#e84118'
    }
};
```

3. Use it in your code:

```js
const { useLogger } = require('logchu');

const myCustomLogger = useLogger('myCustomLogger');

myCustomLogger.info('Hello, world!');
```
