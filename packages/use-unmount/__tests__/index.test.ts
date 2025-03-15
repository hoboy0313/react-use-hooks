import {renderHook} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {useUnmount} from '../src';

describe('useUnmount', () => {
    it('useUnmount should work', () => {
        const fn = vi.fn();
        const hook = renderHook(() => useUnmount(fn));
        expect(fn).not.toBeCalled();

        hook.rerender();
        expect(fn).not.toBeCalled();

        hook.unmount();
        expect(fn).toBeCalledTimes(1);
    });
});
