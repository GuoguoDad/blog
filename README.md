## Astro 介绍
Astro 是一个多合一的 Web 框架，用于构建快速、以 内容为中心的网站。

- 以内容为中心：Astro 专为内容丰富的网站而设计。
- 服务器优先：网站在服务器上呈现 HTML 时运行速度更快。
- 默认快速：在 Astro 中构建慢速网站应该是不可能的。
- 易于使用：您无需成为专家即可使用 Astro 构建某些东西。
- 功能齐全，但灵活：超过 100 多种 Astro 集成可供选择。

### 创建
```javascript
# npm
npm create astro@latest

# yarn
yarn create astro

# pnpm
pnpm create astro@latest
```

### 内置themes
<img src="https://img-blog.csdnimg.cn/49ca81d5d2ae451fab11c7966b899baa.png#pic_center" />

我们选择一个主题 clone，目录结构如下

```javascript
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └-─ Button.jsx
│   ├── layouts/
│   │   └-─ PostLayout.astro
│   └── pages/
│   │   ├── posts/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   └── index.astro
│   └── styles/
│       └-─ global.css
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └-─ social-image.png
├── astro.config.mjs
└── package.json
```
src通常包含
- 页面
- 布局
- Astro 组件
- 前端组件（React 等）
- 样式（CSS、Sass）
- Markdown

### 案例
<img src="https://img-blog.csdnimg.cn/24d7df37c2484d03ab232999350919d7.png#pic_center" width="300"/>
<br/>
src/pages/posts markdown文件目录，项目会自动解析

```javascript
blog git:(master) ✗ npm run dev

> blog@1.0.0 dev
> astro dev

  🚀  astro  v1.0.0-beta.44 started in 57ms
  
  ┃ Local    http://localhost:3000/
  ┃ Network  use --host to expose
  
  ▶ This is a  beta  prerelease build
    Feedback? https://astro.build/issues
  
上午09:43:45 [astro] reload /src/pages/posts/astro-vercel-blog.md (x30)
上午09:47:20 [astro] update /public/assets/images/.DS_Store (x2)
上午09:58:26 [astro] reload /src/pages/posts/astro-vercel-blog.md (x22)
上午10:02:06 [astro] update /public/assets/.DS_Store (x2)
上午10:05:19 [astro] reload /src/pages/posts/astro-vercel-blog.md (x18)
```
### 效果
<img src="https://img-blog.csdnimg.cn/206e3b27e6984d918a8385098d76f65e.png#pic_center" />

## 使用vercel自动化部署
### 简介
Vercel 是一个用于前端框架和静态站点即时部署的平台。个人免费。
### 1、注册账号
### 2、Add GitHub Account
<img src="https://img-blog.csdnimg.cn/8df875c40f3640c0b694d3bb76e6b8cf.png" width="350"/>

### 3、import
<img src="https://img-blog.csdnimg.cn/61a18d7aed0545a7be38cadbc49df30a.png" width="350"/>

### 4、deploy
<img src="https://img-blog.csdnimg.cn/6ab14b5483f54848a90b5994c0663903.png" width="350"/>

### 5、修改域名
dashboard -> blog -> setting -> domains

<img src="https://img-blog.csdnimg.cn/5220f33b0161455094ed53de8707e20e.png" width="350"/>

https://liuhui.vercel.app/  即可访问自己的博客啦
