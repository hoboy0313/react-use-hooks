# @so-fe/react-use-external

`useExternal` 是一个 React Hook，用于动态加载外部 JavaScript 和 CSS 资源。

## 📦 安装

```bash
npm install @so-fe/react-use-external
```

```bash
yarn add @so-fe/react-use-external
```

```bash
pnpm add @so-fe/react-use-external
```

## 🔧 使用

### 基本使用

```tsx
import {useExternal} from '@so-fe/react-use-external';

function App() {
    // 加载外部 JavaScript
    const jsStatus = useExternal('https://example.com/script.js');

    // 加载外部 CSS
    const cssStatus = useExternal('https://example.com/style.css');

    return (
        <div>
            <p>
                JavaScript 加载状态:
                {jsStatus}
            </p>
            <p>
                CSS 加载状态:
                {cssStatus}
            </p>
        </div>
    );
}
```

## API

```ts
function useExternal(path: string, options?: Options): Status;

interface Options {
    type?: 'js' | 'css';
    js?: Partial<HTMLScriptElement>;
    css?: Partial<HTMLStyleElement>;
    keepWhenUnused?: boolean;
}

type Status = 'unset' | 'loading' | 'ready' | 'error';
```
