## 配置 tailwindcss

```
除了官网正常初始化步骤，还要在 config/dev.js 中配置:
htmltransform: {
    enable: false, //关闭 NutUI才生效
    config: {
        removeCursorStyle: false,
    }
}
webpackChain(chain, webpack) {
        chain.merge({
          plugin: {
            install: {
              plugin: UnifiedWebpackPluginV5,
              args: [{
                appType: 'taro',
                // 下面个配置，会开启 rem -> rpx 的转化
                rem2rpx: true,
                injectAdditionalCssVarScope: true,
              }]
            }
          }
        })
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

## websocket

```
send方法发送为：{data: 'xxx'}
```

## 主题配置

## 图片裁剪

touchStart: 记录开始位置。
touchMove：每次移动时，根据 clientX 算移动距离，根据正负判断增加减少。（注意：每次移动时，更新 startInfo 的 clientX）
