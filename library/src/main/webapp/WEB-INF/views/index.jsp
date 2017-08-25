<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2017/8/24
  Time: 15:37
  To change this template use File | Settings | File Templates.
--%>
<%@ include file="common/tag.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>library||首页</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <link href="/bui/assets/css/dpl-min.css" rel="stylesheet" type="text/css"/>
    <link href="/bui/assets/css/bui-min.css" rel="stylesheet" type="text/css"/>
    <link href="/bui/assets/css/main-min.css" rel="stylesheet" type="text/css"/>
</head>
<body>

<div class="header">
    <div class="dl-title"><span class="">前端框架</span></div>
    <div class="dl-log">欢迎您，<span class="dl-log-user">XXX</span>
        <a href="###" title="退出系统" class="dl-log-quit">[退出]</a>
    </div>
</div>
<div class="content">
    <div class="dl-main-nav">
        <ul id="J_Nav" class="nav-list ks-clear">
            <li class="nav-item dl-selected">
                <div class="nav-item-inner nav-storage">首页</div>
            </li>
            <li class="nav-item">
                <div class="nav-item-inner nav-storage">搜索页</div>
            </li>
        </ul>
    </div>
    <ul id="J_NavContent" class="dl-tab-conten">

    </ul>
</div>

<script type="text/javascript" src="/bui/assets/js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="/bui/assets/js/bui.js"></script>
<script type="text/javascript" src="/bui/assets/js/config.js"></script>
<script type="text/javascript">
    BUI.use('common/main', function () {
        var config = [{
            id: 'menu',
            menu: [{
                text: '首页内容',
                items: [
                    {id: 'main-menu', text: '鹿晗首页', href: 'https://baike.baidu.com/item/%E9%B9%BF%E6%99%97/5083717?fr=aladdin'},
                    {id: 'second-menu', text: '鹿晗微博', href: 'https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=http%3A%2F%2Fweibo.com%2Fn%2FM%25E9%25B9%25BFM%3Fc%3Dspr_qdhz_bd_baidusmt_weibo_s&domain=.weibo.com&sudaref=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3Dtu1wTjq7hIX3VUIWXexucOiBQ32HeMx1eD8AgWDjlLIIgeH14dkyc52tlO_Q4XFAdUN4d6JUsh7EPfRid58n6xXt60t4r9iRJLLJFmnGXWO%26wd%3D%26eqid%3Da8909f3a000252bb00000004599f7c6e&ua=php-sso_sdk_client-0.6.23&_rand=1503624304.5498'}
                ]
            }]
        }, {
            id: 'search',
            menu: [{
                text: '搜索页面',
                items: [
                    {id: 'introduce', text: '搜索页面简介', href: 'http://www.baidu.com'}
                ]
            }]
        }];
        new PageUtil.MainPage({
            modulesConfig: config
        });
    });

</script>
</body>
</html>




























