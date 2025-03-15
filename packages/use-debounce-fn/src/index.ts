import {useMemo} from 'react';

import {useLatest} from '@so-fe/react-use-latest';
import {useUnmount} from '@so-fe/react-use-unmount';
import debounce from 'debounce';

type Func = (...args: any[]) => any;

interface Options {
    immediate: boolean;
}

/**
 * Debounce function hook
 * @param {Func} fn
 * @param {number} delay default 100ms
 * @param {Options} options
 */
function useDebounceFn<T extends Func>(fn: T, delay?: number, options?: Options) {
    const fnRef = useLatest(fn);

    const debounced = useMemo(
        () =>
            debounce(
                (...args: Parameters<T>): ReturnType<T> => {
                    return fnRef.current(...args);
                },
                delay,
                options,
            ),
        [],
    );

    useUnmount(() => debounced.clear());

    return debounced;
}

export {
    useDebounceFn,
};
