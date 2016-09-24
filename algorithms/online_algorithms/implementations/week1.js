// Countdowns

// lvl1: log positive numbers from 2016 to 0 in 4s, without a 4 loop
function countdown1(){
	var x = 2016;
	while (x > 0){
		console.log(x);
		x -= 4;
	}
}

// countdown1();

// lvl2: given low, high, mult print multiples of mult from high to low using for loop
function countdown2(low, high, mult){
	for (var i = high; i > low; i--){
		if (i%mult == 0){
			console.log(i);
		}
	}
}
// countdown2(2,16,3);

// lvl3: given a 4th param, skip when its the 4th param. use a while
function countdown3(low, high, mult, except){
	// this is to preserve high
	var i = high;
	while ( i > low){
		if(i % mult == 0){
			if(i != except){
				console.log(i);
			}
		}
		i--;
	}
}
// countdown3(2,178,7,63);