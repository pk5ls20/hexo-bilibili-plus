//插入适用于Hexo博客的bilibili嵌入视频
hexo.extend.tag.register('blil', function (args)
{
    const axios = require('axios');
    const vid = args[0];
    let cid = '';
    let avid = '';

    const getCID = (vid_, tp) =>
    {
        //使用了 https://blog.xxwhite.com/2020/03230.bilibili-bvid.html 提供的api
        //作者 叉叉白 at https://blog.xxwhite.com/
        const rq = axios.get('https://api.bilibili.com/x/player/pagelist?'+tp+vid_);
        return rq.then((res) =>
        {
            const rq_ = res.data;
            if (res.status !== 200)
            {
                throw new Error(vid+"-API服务出现异常，请检查网络情况重试或联系作者");
            }
            if (rq_.code !== 0)
            {
                throw new Error(vid+"-无效的视频bv号，请重新确认");
            }
            return parseInt(rq_.data[0].cid);
        });
    };

    const BvtoAV = (x) =>
    {
        //使用了 https://www.zhihu.com/question/381784377/answer/1099438784 的算法
        //作者 mcfx at https://www.zhihu.com/people/-._.-
        const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
        const tr = {};
        for (let i = 0; i < 58; i += 1)
        {
            tr[table[i]] = i;
        }
        const s = [11, 10, 3, 8, 4, 6];
        const xor = 177451812;
        const add = 8728348608;
        let r = 0;
        for (let i = 0; i < 6; i += 1)
        {
            r += tr[x[s[i]]] * (58 ** i);
        }
        return (r - add) ^ xor;
    };

    //纯数字->avid
    if (vid.match(/^\d+$/))
    {
        cid = getCID(vid, 'aid=');
        avid = vid;
    }
    //开头有av->avid
    else if (vid.match(/^av/i))
    {
        const avid_ = vid.slice(2)
        cid = getCID(avid_, 'aid=');
        avid = avid_;
    }
    //开头有bv->bvid
    else if(vid.match(/^bv/i))
    {
        const bv_temp = 'BV'+ vid.slice(2)
        cid = getCID(bv_temp, 'bvid=');
        avid = BvtoAV(bv_temp);
    }
    //去前两位字母->bvid
    else if(vid.slice(2).match(/^[a-zA-Z0-9]+$/))
    {
        cid = getCID(`BV${vid}`, 'bvid=');
        avid = BvtoAV(`BV${vid}`);
    }
    else
    {
        throw new Error(vid+"-无法匹配bilibili视频，请重试！");
    }

    //bilivideo播放器代码参考自 https://www.jianshu.com/p/9b4d5903dfc8
    //作者：DHUtoBUAA at https://www.jianshu.com/u/4257405009b7
    return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe src="//player.bilibili.com/player.html?aid=${avid}&cid=${cid}&page=1" scrolling="no" border="0" frameborder="no"
  framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>`;
});
