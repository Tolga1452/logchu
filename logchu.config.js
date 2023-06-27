const { ColorPreset } = require("./src");

module.exports = {
    customLoggers: {
        testLogger: {
            info: {
                bold: true,
                italic: true,
                color: ColorPreset.BackgroundCyan
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
    }
};