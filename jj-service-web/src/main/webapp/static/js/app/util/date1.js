define(['moment'], function(moment) {	
/*				Token	Output
Month			M	1 2 ... 11 12
				Mo	1st 2nd ... 11th 12th
				MM	01 02 ... 11 12
				MMM	Jan Feb ... Nov Dec
				MMMM	January February ... November December
Quarter			Q	1 2 3 4
Day of Month	D	1 2 ... 30 31
				Do	1st 2nd ... 30th 31st
				DD	01 02 ... 30 31
Day of Year		DDD	1 2 ... 364 365
				DDDo	1st 2nd ... 364th 365th
				DDDD	001 002 ... 364 365
Day of Week		d	0 1 ... 5 6
				do	0th 1st ... 5th 6th
				dd	Su Mo ... Fr Sa
				ddd	Sun Mon ... Fri Sat
				dddd	Sunday Monday ... Friday Saturday
Day of Week (Locale)	e	0 1 ... 5 6
Day of Week (ISO)	E	1 2 ... 6 7
Week of Year	w	1 2 ... 52 53
				wo	1st 2nd ... 52nd 53rd
				ww	01 02 ... 52 53
Week of Year (ISO)	W	1 2 ... 52 53
					Wo	1st 2nd ... 52nd 53rd
					WW	01 02 ... 52 53
Year			YY	70 71 ... 29 30
				YYYY	1970 1971 ... 2029 2030
Week Year		gg	70 71 ... 29 30
				gggg	1970 1971 ... 2029 2030
Week Year (ISO)	GG	70 71 ... 29 30
				GGGG	1970 1971 ... 2029 2030
AM/PM			A	AM PM
				a	am pm
Hour			H	0 1 ... 22 23
				HH	00 01 ... 22 23
				h	1 2 ... 11 12
				hh	01 02 ... 11 12
Minute			m	0 1 ... 58 59
				mm	00 01 ... 58 59
Second			s	0 1 ... 58 59
				ss	00 01 ... 58 59
Fractional Second	S	0 1 ... 8 9
					SS	00 01 ... 98 99
					SSS	000 001 ... 998 999
					SSSS ... SSSSSSSSS	000[0..] 001[0..] ... 998[0..] 999[0..]
Timezone		z or zz	EST CST ... MST PST 
				Z	-07:00 -06:00 ... +06:00 +07:00
				ZZ	-0700 -0600 ... +0600 +0700
Unix Timestamp	X	1360013296
Unix Millisecond Timestamp	x	1360013296123*/
	return {
		// date to str
		format: function(date, pattern) {
			date = date || new Date();
			pattern = pattern || 'YYYY-MM-DD';
			if (typeof date == 'string') {
				pattern = date;
				date = new Date();
			}
			return moment(date).format(pattern);
		},
		
		// str to date
		parse: function(dateStr, pattern) {
			pattern = pattern || 'YYYY-MM-DD HH:mm:ss';
			return moment(dateStr, pattern).toDate();
		},
		
		// one dateformat to another
		formatStr: function(dateStr, pattern, toPattern) {
			toPattern = toPattern || 'YYYY-MM-DD';
			return this.format(this.parse(dateStr, pattern), toPattern);
		},
		
		// get the different number between two date
		diff: function(endDate, startDate, unit) {
			unit = unit || 'days'; // values: 'years', 'months', 'days' ...
			var e = moment(endDate);
			var s = moment(startDate);
			return e.diff(s, unit);
		},
		
		// add number according base date
		add: function(date, number, unit, pattern) {
			unit = unit || 'days';
			pattern = pattern || 'YYYY-MM-DD';
			moment(date).add(number, unit).format(pattern);
		},
		
		/**
         * @param hisTime 历史时间戳
         * @param nowTime 当前时间戳
         * @returns {string} 直接显示
         */
        ago: function(hisTime, nowTime) {
            var now =nowTime ? nowTime : new Date().getTime(),
                diffValue = now - hisTime,
                result='',
                minute = 1000 * 60,
                hour = minute * 60,
                day = hour * 24,
                halfamonth = day * 15,
                month = day * 30,
                year = month * 12,

                _year = diffValue/year,
                _month =diffValue/month,
                _week =diffValue/(7*day),
                _day =diffValue/day,
                _hour =diffValue/hour,
                _min =diffValue/minute;

            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
        }
	};
});