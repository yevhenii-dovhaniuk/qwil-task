import {expect} from 'chai';
import {last} from 'rxjs/internal/operators';
import {createDisplayObjectObservable} from '../dashboard';
import {provideWithInterval} from './data/testDataProvider';

describe('Display order test', () => {
    it('should display only last emitted value', async () => {
        const intervalFrequency = 20; // total 5 per 100ms; 0..4, 5..9; 4 is taken as the last value from first interval
        const $temperatureValues = provideWithInterval(intervalFrequency, 6, '°C');
        const $humidityValues = provideWithInterval(1, 1, '%');
        const $pressureValues = provideWithInterval(1, 1, 'kPa');

        const $displayObjects = createDisplayObjectObservable(
            $temperatureValues,
            $humidityValues,
            $pressureValues,
        ).pipe(
            last(),
        );
        $displayObjects.subscribe((displayObject) => {
            expect(displayObject).to.have.property('temperature', '4°C');
            expect(displayObject).to.have.property('humidity', '0%');
            expect(displayObject).to.have.property('pressure', '0kPa');
        });
        await $displayObjects.toPromise();
    });

    it('should not emit display object more often than every 100ms', async () => {
        const intervalFrequency = 20; // emits 5 temperature events per 100 ms
        const amountToTake = 6;
        const $temperatureValues = provideWithInterval(intervalFrequency, amountToTake, '°C');
        const $humidityValues = provideWithInterval(intervalFrequency, 1, '%');
        const $pressureValues = provideWithInterval(intervalFrequency, 1, 'kPa');

        const $displayObjects = createDisplayObjectObservable(
            $temperatureValues,
            $humidityValues,
            $pressureValues,
        );
        $displayObjects.subscribe((displayObject) => expect(displayObject).to.have.property('temperature', '4°C'));
        await $displayObjects.toPromise();
    });

    it(`should assign "N/A" value to a property, provider of which hasn't emitted a value in 1000ms`, async () => {
        const outOfTimeInterval = 1001;
        const validInterval = 1000;
        const $temperatureValues = provideWithInterval(outOfTimeInterval, 1, '°C');
        const $humidityValues = provideWithInterval(validInterval, 5, '%');
        const $pressureValues = provideWithInterval(validInterval, 1, 'kPa');

        const $displayObjects = createDisplayObjectObservable(
            $temperatureValues,
            $humidityValues,
            $pressureValues,
        ).pipe(
            last(),
        );

        $displayObjects.subscribe((displayObject) => {
            expect(displayObject).to.have.property('temperature', 'N/A');
            expect(displayObject).to.have.property('humidity', '3%');
        });

        await $displayObjects.toPromise();
    });
})
;
