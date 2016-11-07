// credit card validation
// zipit
// shuffle - in place

// credit card validation
// Luhn formula for integers 13-19 in length
// 1) set aside last digit
// 2) start from back, multiply the digits in odd places from the end by 2
// 3) if the result is bigger than 9, ubtract 9
// 4) add all numbers together
// 5) now add last digit back in, should be a multiple of 10
// [5,2,2,8,2] returns true
function ccval(array){
	// 1..start at lenght -2
	// 2
	for (var i = array.length-2; i >= 0; i = i-2){
		array[i]=array[i]*2;
		// 3
		if (array[i] > 9){
			array[i] = array[i] - 9;
		}
	}
	function getSum(total, curr){
		return total + Math.round(curr);
	}
	var sum = array.reduce(getSum,0);
	if (sum%10 != 0){
		return false;
	} else {
		return true;
	}
}

// given 2 arrays combine their values sequentially alternating indices
// 2nd level, add the valeus to the first array
function zip1(arr1, arr2){
	var new_array = [];
	var i = 0;
	while(i < arr1.length || i < arr2.length){
		if(i < arr1.length){
			new_array.push(arr1[i]);
		}
		if(i < arr1.length){
			new_array.push(arr2[i]);
		}
		i++;
	}
	return new_array;
}

// without using splice
function zip2(arr1, arr2){
	var j = 0;
	var l = arr1.length;
	for (var i = 0; i < l; i++){
		console.log(arr1);
		var t = arr1[i+1];
	}
	return arr1;
}
var bob = [1,3,5]
var ross = [2,4,6,8]
zip2(bob,ross);

// shuffle
// fischer-yates, from https://bost.ocks.org/mike/shuffle/
function fyshuffle(array){
	var m = array.length, t, i;
	// while there are elements in need...
	while(m){
		// pick random element
		i = Math.floor(Math.random() * m--);

		// swap it with the current element
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

