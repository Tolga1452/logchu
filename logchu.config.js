const { ColorPreset, Watcher } = require("./src");
const { LogType } = require("./src/types");

module.exports = {
    customLoggers: {
        testLogger: {
            info: {
                bold: true,
                italic: true,
                color: ColorPreset.BackgroundCyan,
                type: LogType.Info
            },
            alsoWorksWithCustomColors: {
                color: '$custom:testColor'
            },
            hexTest: {
                color: '$custom:hex'
            }
        }
    },
    customColorPresets: {
        testColor: '\x1b[38;2;0;0;0m',
        hex: '#f44747'
    },
    logFile: 'test.log',
    watcher: new Watcher()
};