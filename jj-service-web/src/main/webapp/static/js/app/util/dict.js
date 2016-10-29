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