// 使用 Mock
var Mock = require('mockjs');

var login = require('./mock/login.js');
var newOpro = require('./mock/newOpro.js');
var indexList = require('./mock/seriesList.js');
var menu = require('./mock/menu.js');
var hotSearch = require('./mock/hotSearch.js');

Mock.mock('/login',login)//登录
Mock.mock('/getOpro',newOpro)//首页新品
Mock.mock('/getIndexList',indexList)//首页list
Mock.mock('/getBanner',banners)//首页banner
Mock.mock('/getMenu',menu)//首页menu
Mock.mock('/getHotSearch',hotSearch)//首页热搜

Mock.mock('/product/details', // 详情数据
    {

    }
)
Mock.mock('/product/addCollect', // 某个商品加入收藏夹
    {

    }
)
Mock.mock('/hotProduct', // 某个商品加入收藏夹
    [

    ]
)
Mock.mock('/getReceiveInfo', // 收件人信息
    [

    ]
)


Mock.mock('/addReceiveInfo', // 添加收获人信息
    {}
)
Mock.mock('/deleteReceiveInfo', // 删除收获人信息
    {}
)

Mock.mock('/getUserInfo', // 获取用户信息
    {
        birthday: '', //格式是xxxx-xx-xx
        sex: '',
        email: '',
        phone: '',
    }
)
Mock.mock('/modifyUserInfo', // 修改用户信息
    {}
)
Mock.mock('/addConcern', // 加入关注
    {}
)











