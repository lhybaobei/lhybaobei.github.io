## 本地测试
##先安装
```bash
yarn install
```

```bash
yarn dev
```

默认地址： http://localhost:4000/

修改文件后重新生成html

```bash
yarn build
```

## 发布

```bash
yarn pub
```

## 重新发布所有页面

修改主题模板等公共资源后，需先清理再发布

```bash
yarn clean && yarn pub
```

## 清理master分支历史版本，减小仓库体积

```bash
git checkout master
rm -rf .DS_Store Thumbs.db db.json *.log node_modules public .deploy_git
git checkout --orphan=tmp
git add -A
git commit -am "clean"
git branch -D master
git branch -m master
git push -f origin master
```

## 以后图片应命名为文章_图片
