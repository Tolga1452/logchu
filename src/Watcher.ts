import { EventEmitter } from 'node:events';
import { LogEvent, LogType } from './types';

export default class Watcher extends EventEmitter {
    constructor() {
        super();
    };

    on(eventName: LogEvent, listener: (log: { text: string, type: LogType, date: Date }) => void): this {
        return super.on(eventName, listener);
    };
};