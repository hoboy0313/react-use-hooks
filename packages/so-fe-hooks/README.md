# so-fe-hooks

一个现代的 React Hooks 工具库集合。

## ✨ 特性

* 🎯 **类型安全** - 使用 TypeScript 编写，提供完整的类型定义
* 📦 **按需加载** - 支持 Tree Shaking，只打包你使用的代码
* 🔧 **易于使用** - 简单直观的 API 设计
* 📚 **文档完善** - 详细的使用说明和示例代码

## 📦 安装

```bash
npm install @so-fe/react-hooks
```

## 📚 文档

[查看文档](https://so-fe.github.io/react-hooks/)

## 📒 包含的 Hooks

该项目包含以下独立的 hooks 包:

- [@so-fe/use-unmount](./packages/use-unmount) - React 组件卸载时执行回调
- [@so-fe/use-debounce-fn](./packages/use-debounce-fn) - 为函数提供防抖能力
- [@so-fe/use-latest](./packages/use-latest) - 始终获取最新值的 Hook
- [@so-fe/hooks](./packages/so-fe-hooks) - 所有 hooks 的统一封装

## 🔨 使用

```tsx
import {useLatest} from '@so-fe/react-hooks';
function App(props) {
    const propsRef = useLatest(props);
    return <div>{propsRef.current}</div>;
}
```
