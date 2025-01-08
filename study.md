## 配置 tailwindcss

```
除了官网正常初始化步骤，还要在 config/dev.js 中配置:
htmltransform: {
    enable: true,
    config: {
        removeCursorStyle: false,
    }
}
```

## 配置 NutUI

```
使用NutUI时还需配置：
compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
},
样式不生效解决：

```
