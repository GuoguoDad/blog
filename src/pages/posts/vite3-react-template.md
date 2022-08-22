---
layout: '@/templates/BasePost.astro'
title: 【vite3体验篇】vite3从零搭建React项目
description: vite3 + antd + redux toolkit + typescript
pubDate: 2020-02-06T00:00:00Z
imgSrc: '/assets/images/image-post.jpeg'
imgAlt: 'Image post'
---

# 创建项目
```javascript
npm init vite@latest vite-react-app -- --template react
```

# 安装依赖
```javascript
npm i react-router react-router-dom antd redux redux-react @reduxjs/toolkit -S
```

# vite配置
```javascript
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'
import eslintPlugin from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
import * as path from 'path'
import { wrapperEnv } from './src/kits/util/getEnv'

// https://vitejs.dev/config/
export default defineConfig( (mode: ConfigEnv): UserConfig => {
  const localEnabled = (process.env.useMock as unknown as boolean) || false
  const env = loadEnv(process.env.appEnv!, process.cwd(), 'APP_');
  const viteEnv = wrapperEnv(env)

  return  {
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      checker({
        typescript: true
      }),
      createHtmlPlugin({
        entry: './src/index.tsx',
        inject: {
          data: {
            title: viteEnv.APP_DOCUMENT_TITLE
          }
        }
      }),
      eslintPlugin(),
      createStyleImportPlugin({
        resolves: [AntdResolve()]
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled,
        prodEnabled: false,
        watchFiles: true
      })
    ],
    resolve: {
      alias: {
        '~antd': path.resolve(__dirname, './node_modules/antd'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@comps': path.resolve(__dirname, './src/components'),
        '@http': path.resolve(__dirname, './src/http/fetch'),
        '@img': path.resolve(__dirname, './src/assets/images'),
        '@kits': path.resolve(__dirname, './src/kits'),
        '@store': path.resolve(__dirname, './src/store')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#4377FE',//设置antd主题色
          }
        }
      }
    },
    envPrefix: 'APP_',
    server: {
      port: 3000,
      open: 'http://127.0.0.1:3000/#/user/list',
      cors: true
    },
    build: {
      outDir: "dist",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  }
})
```
注意：这里虽然用createStyleImportPlugin配置了AntdResolve， 但是antd依然样式有问题
<img src="/assets/images/vite-antd-question.png" />
解决办法

```javascript
'~antd': path.resolve(__dirname, './node_modules/antd')
```


# husky + lint-staged + prettier 配置

```javascript
1、npx husky install

2、npx husky add .husky/pre-commit "yarn lint-staged --allow-empty"
```

```javascript
3、package.json

"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write --loglevel warn"
  ],
  "src/**/*.{less,postcss,css,scss}": [
    "stylelint --fix --custom-syntax postcss-less --cache --cache-location node_modules/.cache/stylelint/"
  ]
}
```

# 效果
<img src="/assets/images/vite-pic1.png" />

<img src="/assets/images/vite-pic2.png" />


# 项目地址
https://github.com/GuoguoDad/react-template-vite


