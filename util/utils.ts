import {Observable, race, timer} from 'rxjs/index';
import {mapTo} from 'rxjs/internal/operators';

export const withDefaultValueAfterTimeout = ($source: Observable<string>, timeout = 1000, defaultValue = 'N/A') => {
    const $defaultValue = timer(timeout).pipe(
        mapTo(defaultValue),
    );
    return race($source, $defaultValue);
};
