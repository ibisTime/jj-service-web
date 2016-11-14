define([
    'app/controller/base',
    'app/util/ajax'
], function(base, ajax) {
    var dict = {
        refreshTime: "10000",   //10s
        experience: {
            "1": "1年内",
            "2": "1-3年",
            "3": "3-5年",
            "4": "5年以上"
        },
        education: {
            "1": "本科",
            "2": "大专",
            "3": "高中",
            "4": "其他"
        },
        workType: {
            "1": "全职",
            "2": "兼职",
            "3": "实习"
        },
        pwdStrength:{
            "1": "弱",
            "2": "中",
            "3": "强"
        },
        certificateStatus:{
            "0": "待审核",
            "1": "审核通过",
            "2": "审核不通过"
        },
        //收费模式
        feeMode: {
            "1": "基础服务费+提成",
            "2": "服务费",
            "3": "提成"
        },
        //是否接受定制需求
        isDZ: {
            "1": "是",
            "0": "否"
        },
        //付款周期
        payCycle: {
            "1": "月付",
            "2": "季付",
            "3": "半年付",
            "4": "年付"
        },
        //客服业务
        business: {
            "1": "售前",
            "2": "售后"
        },
        //货品种类
        goodsKind: {
            "1": "食物",
            "2": "海鲜",
            "3": "生活用品"
        },
        //1 培训 2摄影/拍摄 3 美工外包  4 店铺代运营 5 客服外包 6 仓配服务 7 软件开发  8 产业园 9 人才招聘
        serverType: {
            "1": "培训",
            "2": "摄影/拍摄",
            "3": "美工外包",
            "4": "店铺代运营",
            "5": "客服外包",
            "6": "仓配服务",
            "7": "软件开发",
            "8": "产业园"
        },
        //1 培训 2摄影/拍摄 3 美工外包  4 店铺代运营 5 客服外包 6 仓配服务 7 软件开发  8 产业园 9 人才招聘
        serverType1: {
            "1": "培训",
            "2": "摄影/拍摄",
            "3": "美工外包",
            "4": "店铺代运营",
            "5": "客服外包",
            "6": "仓配服务",
            "7": "软件开发",
            "8": "产业园",
            "9": "人才招聘"
        },
        //需求紧急程度
        urgentLevel: {
            "0": "不紧急",
            "1": "紧急",
            "2": "一般"
        },
        //职位类型
        positionKind: {
            "A": "运营总监",
            "B": "运营主管",
            "C": "运营",
            "D": "设计总监",
            "E": "设计/美工",
            "F": "推广专员",
            "G": "客服主管",
            "H": "客服/售后",
            "I": "仓储经理",
            "J": "采购经理",
            "K": "其他"
        },
        interestStatus: {
            "1": "待处理",
            "2": "已完成"
        },
        workStatus: {
            "1": "已离职，可随时到岗",
            "2": "未离职，需一段时间"
        },
        //服务状态
        serverStatus: {
            "0": "违规",
            "1": "正常"
        }
    };

    var changeToObj = function(data) {
        var data = data || [], obj = {};
        data.forEach(function(item) {
            obj[item.dkey] = item.dvalue;
        });
        return obj;
    };

    return {
        get: function(code) {
            return dict[code];
        },
        getRemote: function(type) {
            return ajax.get(base.apiUrl + '/gene/dict', {
                type: type
            }).then(function(res) {
                return changeToObj(res.data);
            });
        }
    }
});