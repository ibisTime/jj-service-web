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