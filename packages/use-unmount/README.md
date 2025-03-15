# @so-fe/react-use-unmount

一个简单的 React Hook，用于在组件卸载时执行回调函数。

## 📦 安装

```bash
npm install @so-fe/react-use-unmount
```

或者

```bash
yarn add @so-fe/react-use-unmount
```

或者

```bash
pnpm add @so-fe/react-use-unmount
```

## 🔨 使用

### 基本用法

```tsx
import {useUnmount} from '@so-fe/react-use-unmount';

function Demo() {
    useUnmount(() => {
        console.info('组件已卸载');
    });

    return <div>示例组件</div>;
}
```

### API

```ts
function useUnmount(fn: () => void): void;
```

#### 参数
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fn | 组件卸载时执行的回调函数 | () => void | - |
