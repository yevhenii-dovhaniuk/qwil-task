import {EventEmitter} from 'events';
import {fromEvent} from 'rxjs/index';
import {createDisplayObjectObservable} from './dashboard';

export const DATA_EVENT = 'data';

export const temperatureEmitter = new class extends EventEmitter {
}();
export const humidityEmitter = new class extends EventEmitter {
}();
export const pressureEmitter = new class extends EventEmitter {
}();

const $temperature = fromEvent<string>(temperatureEmitter, DATA_EVENT);
const $humidity = fromEvent<string>(humidityEmitter, DATA_EVENT);
const $pressure = fromEvent<string>(pressureEmitter, DATA_EVENT);

const $displayObject = createDisplayObjectObservable($temperature, $humidity, $pressure); // TODO use me
