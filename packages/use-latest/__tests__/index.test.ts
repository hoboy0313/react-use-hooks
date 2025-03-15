import {renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {useLatest} from '../src';

const setUp = <T>(val: T) => renderHook((state: T) => useLatest(state), {initialProps: val});

describe('useLatest', () => {
    it('useLatest with basic variable should work', () => {
        const {result, rerender} = setUp(0);

        rerender(1);
        expect(result.current.current).toBe(1);

        rerender(2);
        expect(result.current.current).toBe(2);

        rerender(3);
        expect(result.current.current).toBe(3);
    });

    it('useLatest with reference variable should work', () => {
        const val1 = {};
        const {result, rerender} = setUp(val1);
        expect(result.current.current).toBe(val1);

        const val2: any[] = [];
        rerender(val2);
        expect(result.current.current).toBe(val2);
    });
});
