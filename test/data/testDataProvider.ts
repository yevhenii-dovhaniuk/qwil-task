import {interval} from 'rxjs/index';
import {map, take} from 'rxjs/internal/operators';

export const provideWithInterval = (intervalTime: number, howMuchToTake: number, suffix: string) => interval(intervalTime)
    .pipe(
        map((index: number) => `${index}${suffix}`),
        take(howMuchToTake),
    );
