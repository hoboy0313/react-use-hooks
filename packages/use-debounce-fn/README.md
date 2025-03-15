# @so-fe/react-use-debounce-fn

一个用于 React 的防抖函数 Hook，可以帮助你创建防抖函数，避免函数在短时间内被多次调用。

## 📦 安装

```bash
npm install @so-fe/react-use-debounce-fn
```

```bash
yarn add @so-fe/react-use-debounce-fn
```

```bash
pnpm add @so-fe/react-use-debounce-fn
```

## 🔨 使用方式

### 基本使用

```tsx
import {useDebounceFn} from '@so-fe/react-use-debounce-fn';

function Demo() {
    // 创建一个延迟 300ms 的防抖函数
    const debouncedFn = useDebounceFn(() => {
        console.info('搜索请求被发送');
    }, 300);

    return (
        <input
            type="text"
            onChange={() => debouncedFn()}
            placeholder="输入搜索内容"
        />
    );
}
```

#### 立即执行

```tsx
import {useDebounceFn} from '@so-fe/react-use-debounce-fn';

function Demo() {
    const debouncedFn = useDebounceFn(() => {
        console.info('立即执行，然后防抖');
    }, 500, {immediate: true});

    return (
        <button onClick={() => debouncedFn()}>点击</button>
    );
}
```

#### 取消防抖

```tsx
import {useState} from 'react';

import {useDebounceFn} from '@so-fe/react-use-debounce-fn';

function Demo() {
    const [value, setValue] = useState('');

    const debouncedSearch = useDebounceFn(searchValue => {
        console.info('搜索:', searchValue);
    }, 500);

    const handleChange = e => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedSearch(newValue);
    };

    const handleCancel = () => {
        debouncedSearch.clear();
        console.info('搜索已取消');
    };

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="输入搜索内容"
            />
            <button onClick={handleCancel}>取消搜索</button>
        </div>
    );
}
```

## API

### useDebounceFn

#### 参数
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fn | 需要防抖的函数 | (...args: any[]) => any | - |
| delay | 防抖延迟时间，单位为毫秒 | number | 100 |
| options | 配置选项 | { immediate: boolean } | { immediate: false } |

#### 返回值
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| fn | 防抖后的函数 | (...args: any[]) => any |
| clear | 清除当前防抖计时器 | () => void |
| flush | 立即调用当前防抖函数 | () => void |

#### options
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| immediate | 是否在延迟开始前调用函数 | boolean | false |
