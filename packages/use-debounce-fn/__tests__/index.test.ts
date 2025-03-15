import {renderHook} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {useDebounceFn} from '../src';

interface ParamsObj {
    fn: (...arg: any) => any;
    deps?: any[];
    wait: number;
    immediate?: boolean;
}

const setUp = ({fn, wait, immediate}: ParamsObj) => renderHook(() => useDebounceFn(fn, wait, {immediate: immediate ?? false}));

describe('useDebounceFn', () => {
    vi.useFakeTimers();

    it('should debounce work', async () => {
        const fn = vi.fn();
        const hook = setUp({fn, wait: 200});
        hook.result.current();
        expect(fn).not.toBeCalled();

        await vi.advanceTimersByTimeAsync(100);
        hook.result.current();
        expect(fn).not.toBeCalled();

        await vi.advanceTimersByTimeAsync(150);
        expect(fn).not.toBeCalled();

        await vi.advanceTimersByTimeAsync(200);
        expect(fn).toBeCalledTimes(1);
    });

    it('should cancel work', async () => {
        const fn = vi.fn();
        const hook = setUp({fn, wait: 200});

        hook.result.current();
        expect(fn).not.toBeCalled();

        await vi.advanceTimersByTimeAsync(100);
        hook.result.current.clear();

        await vi.advanceTimersByTimeAsync(300);
        expect(fn).not.toBeCalled();
    });

    it('should flush work', async () => {
        const fn = vi.fn();
        const hook = setUp({fn, wait: 200});

        hook.result.current();
        expect(fn).not.toBeCalled();

        await vi.advanceTimersByTimeAsync(100);
        hook.result.current.flush();
        expect(fn).toBeCalledTimes(1);

        await vi.advanceTimersByTimeAsync(300);
        expect(fn).toBeCalledTimes(1);
    });

    it('should immediate work', async () => {
        const fn = vi.fn();
        const hook = setUp({fn, wait: 200, immediate: true});

        hook.result.current();
        expect(fn).toBeCalledTimes(1);

        await vi.advanceTimersByTimeAsync(100);
        hook.result.current();
        expect(fn).toBeCalledTimes(1);

        await vi.advanceTimersByTimeAsync(300);
        expect(fn).toBeCalledTimes(1);

        hook.result.current();
        expect(fn).toBeCalledTimes(2);
    });
});
