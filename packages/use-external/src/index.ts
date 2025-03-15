import {useEffect, useRef, useState} from 'react';

interface JsOptions {
    type: 'js';
    js?: Partial<HTMLScriptElement>;
    keepWhenUnused?: boolean;
}

interface CssOptions {
    type: 'css';
    css?: Partial<HTMLStyleElement>;
    keepWhenUnused?: boolean;
}

interface DefaultOptions {
    type?: never;
    js?: Partial<HTMLScriptElement>;
    css?: Partial<HTMLStyleElement>;
    keepWhenUnused?: boolean;
}

type Options = JsOptions | CssOptions | DefaultOptions;

const EXTERNAL_USED_COUNT: Record<string, number> = {};

type Status = 'unset' | 'loading' | 'ready' | 'error';

interface LoadResult {
    ref: Element;
    status: Status;
}

type LoadExternal = <T>(path: string, props?: Partial<T>) => LoadResult;

const loadScript: LoadExternal = (path, props = {}) => {
    const script = document.querySelector(`script[src="${path}"]`);

    if (!script) {
        const newScript = document.createElement('script');
        newScript.src = path;

        Object.keys(props).forEach(key => {
            // @ts-expect-error 在 dom 上增加一个属性
            newScript[key] = props[key];
        });

        newScript.setAttribute('data-status', 'loading');
        document.body.appendChild(newScript);

        return {
            ref: newScript,
            status: 'loading',
        };
    }

    return {
        ref: script,
        status: (script.getAttribute('data-status') as Status) || 'ready',
    };
};

const loadCss: LoadExternal = (path, props = {}) => {
    const css = document.querySelector(`link[href="${path}"]`);
    if (!css) {
        const newCss = document.createElement('link');

        newCss.rel = 'stylesheet';
        newCss.href = path;
        Object.keys(props).forEach(key => {
            // @ts-expect-error 在 dom 上增加一个属性
            newCss[key] = props[key];
        });
        // IE9+
        const isLegacyIECss = 'hideFocus' in newCss;
        // use preload in IE Edge (to detect load errors)
        if (isLegacyIECss && newCss.relList) {
            newCss.rel = 'preload';
            newCss.as = 'style';
        }
        newCss.setAttribute('data-status', 'loading');
        document.head.appendChild(newCss);

        return {
            ref: newCss,
            status: 'loading',
        };
    }

    return {
        ref: css,
        status: (css.getAttribute('data-status') as Status) || 'ready',
    };
};

function useExternal(path?: string, options?: Options) {
    const [status, setStatus] = useState<Status>(() => {
        return path ? 'loading' : 'unset';
    });

    const ref = useRef<Element | null>(null);

    useEffect(() => {
        if (!path) {
            setStatus('unset');
            return;
        }
        const pathname = path.replace(/[|#].*$/, '');
        if (options?.type === 'css' || (!options?.type && /^css!|\.css$/.test(pathname))) {
            const result = loadCss(path, options?.css);
            ref.current = result.ref;
            setStatus(result.status);
        } else if (options?.type === 'js' || (!options?.type && /^js!|\.js$/.test(pathname))) {
            const result = loadScript(path, options?.js);
            ref.current = result.ref;
            setStatus(result.status);
        }

        if (!ref.current) {
            return;
        }

        if (EXTERNAL_USED_COUNT[path] === undefined) {
            EXTERNAL_USED_COUNT[path] = 1;
        } else {
            EXTERNAL_USED_COUNT[path] += 1;
        }

        const handler = (event: Event) => {
            const targetStatus = event.type === 'load' ? 'ready' : 'error';
            ref.current?.setAttribute('data-status', targetStatus);
            setStatus(targetStatus);
        };

        ref.current.addEventListener('load', handler);
        ref.current.addEventListener('error', handler);
        return () => {
            ref.current?.removeEventListener('load', handler);
            ref.current?.removeEventListener('error', handler);

            EXTERNAL_USED_COUNT[path] -= 1;

            if (EXTERNAL_USED_COUNT[path] === 0 && !options?.keepWhenUnused) {
                ref.current?.remove();
            }

            ref.current = null;
        };
    }, [path]);

    return status;
}

export {
    useExternal,
};

export type {
    Options,
    Status,
};
