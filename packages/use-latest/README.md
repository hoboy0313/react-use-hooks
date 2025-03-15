# @so-fe/react-use-latest

一个简单而实用的 React Hook，用于获取组件中任何值的最新引用。

## 📦 安装

```bash
npm install @so-fe/react-use-latest
```

```bash
yarn add @so-fe/react-use-latest
```

```bash
pnpm add @so-fe/react-use-latest
```

## 🔨 使用

### 基本用法

```tsx
import {useEffect, useState} from 'react';

import {useLatest} from '@so-fe/react-use-latest';

function Demo() {
    const [count, setCount] = useState(0);
    const latestCount = useLatest(count);

    useEffect(() => {
        const timer = setInterval(() => {
            // 使用 latestCount.current 获取最新的 count 值
            console.info('当前计数:', latestCount.current);
        }, 1000);

        return () => clearInterval(timer);
    }, []); // 注意这里依赖数组为空

    return (
        <div>
            <p>
                当前计数:
                {count}
            </p>
            <button onClick={() => setCount(count + 1)}>增加</button>
        </div>
    );
}
```

### API

```ts
function useLatest<T>(value: T): React.MutableRefObject<T>;
```

#### 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 需要获取最新引用的值 | T | - |

#### 返回值

| 类型 | 说明 |
| --- | --- |
| `React.MutableRefObject<T>` | 包含最新值的 ref 对象 |
