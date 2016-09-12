// recursive algorithms for TA stuff
// recursive fibonacci and factorial

// basic factorial
function rFac(num){
	if(num <2){
		return 1;
	} else {
		return num * rFac(num-1);
	}
}

// basic fibonacci
function rFib(num){
	if(num<2){
		return 1;
	} else {
		return rFib(num-1) + rFib(num-2);
	}
}


// space optimized fib
function rFib2(num){
	if(num<2){
		return 1;
	} else {
		return tail(num);
	}

	function tail(num, prev, prev2){
		if !(prev){ prev = 1};
		if !(prev2){prev2 = 0};
		if (num > 0){
			tail(num-1, prev + prev2, prev);
		}
		return prev + prev2;
		
	}
}


// space optimized factorial