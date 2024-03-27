# docusaurus 部署在 Github Page 上

实现 push 代码后，自动部署。

文档教程 [https://docusaurus.io/zh-CN/docs/deployment]

### 1、第一步

在安装了 docusaurus 后，需要在 docusaurus.config.js 文件中配置

```javascript
{
  // 注意 url 这里写到 .io 就可以了。
  url: 'https://coder-xplorer.github.io', //这个是github page生成的url，可以在github代码仓库中找到setting=>> page 中查看。

  baseUrl: '/cyber-blog/', // 注意：必须是 '/路径/' 的形式
  organizationName: 'coder-xplorer',  // 使用 github 上的用户名
  projectName: 'cyber-blog', // 使用 github 上的仓库名

  deploymentBranch: 'gh-pages', // 部署的分支，默认 gh-pages
  trailingSlash: false, // 官方文档建议设置成 true 或者 false
}

```

### 第二步

在你的 docusaurus 项目的**根目录**下添加这个工作流文件：

**我这里使用的 npm, 如果使用 yarn 将 npm 换成 yarn 即可**

```jsx title=".github/workflows/deploy.yml"
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    # Review gh actions docs if you want to further define triggers, paths, etc
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on

permissions:
  contents: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm install --frozen-lockfile
      - name: Build website
        run: npm run build

      # Popular action to deploy to GitHub Pages:
      # Docs: https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-docusaurus
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # Build output to publish to the `gh-pages` branch:
          publish_dir: ./build
          # The following lines assign commit authorship to the official
          # GH-Actions bot for deploys to `gh-pages` branch:
          # https://github.com/actions/checkout/issues/13#issuecomment-724415212
          # The GH actions bot is used by default if you didn't specify the two fields.
          # You can swap them out with your own user credentials.
          user_name: github-actions[bot]
          user_email: 41898282+github-actions[bot]@users.noreply.github.com
```

### 最后

每当你 push 代码之后，github action 会自动部署。

### 总结

我在部署的时候也遇到了很多坑，这里只是简单记录下大概流程。也可以查看最上方的官方文档。

踩坑 1：i18n 设置中文的字段是 "zh-Hans"
踩坑 2：在 docusaurus 中 .js 会被当成独立的页面去打包，所以要导出为 funtion 或者 class 的组件形式，否则会打包失败。（这里我导出的是一个数组，所以导致打包失败）

另外，git action 上也可以看到部署失败的日志。可以根据日志，找到失败的原因。
