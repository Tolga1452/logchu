# logchu

Very simple and cool logger for your [Node.js](https://nodejs.org/) projects. Supports JavaScript and TypeScript.

## Installation

```bash
npm install @tolga1452/logchu
```

## Usage

```js
const { logger, ColorPreset } = require('@tolga1452/logchu');

// Basic usage
logger.info('Hello, world!');
logger.success('Hello, world!');
logger.warning('Hello, world!');
logger.error('Hello, world!');
logger.debug('Hello, world!');

// With styles and color presets
logger.info('Hello, world!', { bold: true });
logger.custom('Hello, world!', { color: ColorPreset.Magenta, italic: true });
logger.custom('Hello, world!', ColorPreset.Cyan);
```

## Randomization

```js
const { logger } = require('@tolga1452/logchu');

logger.random('Hello, world!', { bold: true }); // Log with random color
logger.fullRandom('Hello, world!', { inverse: true }); // Fully random log with overwrites
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
