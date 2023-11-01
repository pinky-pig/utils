# @arvin/utils extend @antfu/utils

> 推荐直接 fork [@antfu/utils](https://github.com/antfu/utils/) 。这里没有 fork，而是将两个仓库强制合并。

**1. GitHub新建空白仓库***utils***并下载到本地：**

```bash
git clone https://github.com/pinky-pig/utils.git
```

**2. 添加远程原仓库**

```bash
git remote add upstream https://github.com/antfu/utils.git
```

**3. 拉取代码**

```bash
git fetch upstream
```

**4. 合并远程仓库代码**

因为两个仓库本是相互独立的，所以这里 merge 肯定会被拒绝。其实最好的做法是直接在 GitHub fork 项目。因为是空白项目，所以这里使用`--allow-unrelated-histories` 合并。

```bash
git merge --allow-unrelated-histories upstream/main
```

这样项目文件就合并成功，后面再次拉取也是可以的了。

**5. commit push**
