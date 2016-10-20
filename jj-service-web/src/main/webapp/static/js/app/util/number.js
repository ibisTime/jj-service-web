define([], function() {
	var number = {};
	
	number.round = function(/*Number*/ value, /*Number?*/ places, /*Number?*/ increment){
		// summary:
		//		Rounds to the nearest value with the given number of decimal places, away from zero
		// description:
		//		Rounds to the nearest value with the given number of decimal places, away from zero if equal.
		//		Similar to Number.toFixed(), but compensates for browser quirks. Rounding can be done by
		//		fractional increments also, such as the nearest quarter.
		// value:
		//		The number to round
		// places:
		//		The number of decimal places where rounding takes place.  Defaults to 0 for whole rounding.
		//		Must be non-negative.
		// increment:
		//		Rounds next place to nearest value of increment/10.  10 by default.
		// example:
		// |	>>> number.round(-0.5)
		// |	-1
		// |	>>> number.round(162.295, 2)
		// |	162.29  // note floating point error.  Should be 162.3
		// |	>>> number.round(10.71, 0, 2.5)
		// |	10.75
		var factor = 10 / (increment || 10);
		return (factor * +value).toFixed(places) / factor; // Number
	};

	if((0.9).toFixed() == 0){
		// (isIE) toFixed() bug workaround: Rounding fails on IE when most significant digit
		// is just after the rounding place and is >=5
		var round = number.round;
		number.round = function(v, p, m){
			var d = Math.pow(10, -p || 0), a = Math.abs(v);
			if(!v || a >= d){
				d = 0;
			}else{
				a /= d;
				if(a < 0.5 || a >= 0.95){
					d = 0;
				}
			}
			return round(v, p, m) + (v > 0 ? d : -d);
		};
	};
	
	return number;
});