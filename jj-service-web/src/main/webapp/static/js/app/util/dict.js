define([
    'app/controller/base',
    'app/util/ajax'
], function(base, ajax) {
    var dict = {
        companyStatus: {
            0: '未提交',
            1: '待审核',
            2: '已通过',
            3: '未通过'
        },
        serveType: {
            'A': '现金管理',
            'B': '贸易重构',
            'C': '财报优化',
            'D': '市值管理',
            '1': '等分模式',
            '2': '优先劣后',
            'a': '项目众筹',
            'b': '金融众筹',
            'E': '企业降本'
        },
        quoteType: {
            'A': '年化(自然日)',
            'B': '年化(工作日)',
            'C': '分成',
            'D': '保底+分成'
        },
        subjectStatus: {
            '0': '待确认',
            '1': '已认购',
            '2': '已取消',
            '3': '流项目',
            '4': '已完成'
        },
        fundType: {
            '10': '虚拟币兑换',
            '11': '充值',
            '-11': '取现',
            '12': '线下打款',
            '-12': '认购',
            '13': '解冻',
            '-13': '冻结',
            '14': '线上收款',
            '-14': '线下结算',
            '19': '蓝补',
            '-19': '红冲'
        },
        busKey: {
            '1': '进项交易金额',
            '2': '存款利率',
            '3': '存款利息',
            '4': '掉期点差',
            '5': '掉期收益',
            '6': '贴息收入',
            '7': '即期收益',
            '8': '远期收益',
            '9': '总收益',
            '10': '出项交易金额',
            '11': '贴现利率',
            '12': '贴现利息',
            '13': 'LC开证手续费',
            '14': 'LC承兑费',
            '15': 'DP交单费',
            '16': '手续费',
            '17': '货损',
            '18': '总成本',
            '19': '毛利',
            '20': '水利基金',
            '21': '印花税',
            '22': '增值税',
            '23': '其他税负',
            '24': '即期利润',
            '25': '远期利润',
            '26': '净利'
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