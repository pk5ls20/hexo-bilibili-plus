# hexo-bilibili-plus   ![](https://img.shields.io/npm/v/hexo-bilibili-plus)  ![](https://img.shields.io/npm/dm/hexo-bilibili-plus)
A hexo plugin embed a bilibili video in your hexo article quickly and easily.  

一个hexo插件，可以快速而方便的在hexo页面中嵌入bilibili视频
## Install 安装
Run command `npm install hexo-bilibili-plus` in your hexo site path.  

在Hexo的博客目录下执行`npm install hexo-bilibili-plus`
## Preview 预览
![](https://github-blog-1314730533.cos.ap-beijing.myqcloud.com/20230131132606.png)

## Usage 使用
Insert `{%blil $VID $isAutoplay $isSimpleFrame %}` in your markdown file to use.  
The `$VID` can be any vaild bvid (current video number in bilibili, like `BV14b4y1U7XX`) or avid (bilibili use it from 2009 to 2020, like`av170001`).  
The `$isAutoplay` is an optional parameter, set to 1 to autoplay, default is 0.
The `$isSimpleFrame` is an optional parameter, if set to 1, the playback interface will be minimalist, default is 0.

在文章的md文件中插入`{%blil $VID $isAutoplay $isSimpleFrame %}`来使用，`$VID`可以是bv号也可以是av号
`$isAutoplay`参数可选，设为1可开启自动播放，默认关闭 
`$isSimpleFrame`参数可选，设为1可用极简界面播放，默认关闭

`{%blil $VID %}` 等同于 `{%blil $VID 0 0 %}`

## References 参考
The reference content has been written in the source code.  

参考内容在源代码中已写明
