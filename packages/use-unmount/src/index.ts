import {useEffect} from 'react';

import {useLatest} from '@so-fe/react-use-latest';

export function useUnmount(fn: () => void) {
    const fnRef = useLatest(fn);

    useEffect(() => () => {
        fnRef.current();
    }, []);
}
