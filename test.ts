import { ColorPreset, CustomLogger, fromChalk, logger, useColor, useLogger, write } from '.';

logger.custom('--- Built-in ---', { color: ColorPreset.Yellow, bold: true, inverse: true });

logger.default('Hello, World', { bold: true });
logger.custom('Hello, World', '\x1b[34m');
logger.custom('Hello, World', { color: '\x1b[34m', italic: true });
logger.info('Hello, World');
logger.success('Hello, World');
logger.warning('Hello, World', { bold: true });
logger.error('Hello, World');
logger.debug('Hello, World');
logger.random('Hello, World');
logger.fullRandom('Hello, World');
logger.rainbow('Hello, World');

logger.custom('--- Custom Logger ---', { color: ColorPreset.Yellow, bold: true, inverse: true });

const myCustomLogger = new CustomLogger({
    info: { color: ColorPreset.BackgroundBlue, italic: true },
    success: { color: ColorPreset.LightGreen, bold: true },
    trolley: { color: ColorPreset.BackgroundYellow, bold: true }
});

myCustomLogger.info('Hello, World');
myCustomLogger.success('Hello, World');
myCustomLogger.trolley('Hello, World');

logger.custom('--- From Config ---', { color: ColorPreset.Yellow, bold: true, inverse: true });

logger.custom('Hello, World', useColor('testColor'));

const myCustomLoggerFromConfig = useLogger('testLogger');

myCustomLoggerFromConfig.info('Hello, World', { bold: true });
myCustomLoggerFromConfig.alsoWorksWithCustomColors('Hello, World');

logger.custom('--- Custom Colors v2 ---', { color: ColorPreset.Yellow, bold: true, inverse: true });

logger.custom('Hello, World', '#639dff');
myCustomLoggerFromConfig.hexTest('Hello, World');

logger.custom('--- Advanced Log ---', { color: ColorPreset.Yellow, bold: true, inverse: true });

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