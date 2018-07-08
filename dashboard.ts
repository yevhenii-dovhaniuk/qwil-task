import _ from 'lodash';
import {combineLatest, Observable} from 'rxjs/index';
import {auditTime, distinctUntilChanged, map, skipWhile} from 'rxjs/internal/operators';
import {DisplayObject} from './model/model';
import {withDefaultValueAfterTimeout} from './util/utils';

export const createDisplayObjectObservable = (
    temperatureObservable: Observable<string>,
    humidityObservable: Observable<string>,
    pressureObservable: Observable<string>,
) => combineLatest(
    withDefaultValueAfterTimeout(temperatureObservable, 1000),
    withDefaultValueAfterTimeout(humidityObservable, 1000),
    withDefaultValueAfterTimeout(pressureObservable, 1000),
).pipe(
    distinctUntilChanged(_.isEqual),
    auditTime(100),
    map(([temperature, humidity, pressure]) => new DisplayObject(temperature, humidity, pressure)),
    skipWhile((displayObject) => displayObject.isEmpty()),
);
