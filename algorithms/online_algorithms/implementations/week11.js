// Balance Point/Index, flatten

// Balance Point. Given an array of number return  whether there is a balance point of the sums of two parts of the array.
// gien balancePoint([1,2,3,4,2]) returns True 1+2 +3 = 4 + 2
function balancePoint(array){
	left = 0;
	right = 0;
	for (var i = 0; i < array.length; i++){
		right ++;
	}
	for (var i =0; i < array.length; i++){
		if (right = left){
			return true;
		} else {
			left += array[i];
			right -= array[i];
		}
	}
	return false;
}

var array1 = [1,2,3,4,2];

console.log(balancePoint(array1));

// Balance index
// Given a balancedpointed array, return the index of the balance point, or if an even array, the mean of the two middle indices
function balanceIndex(array){
	var left = 0;
	var right = 0;
	for (var i = 0; i < array.length; i++){
		right += array[i];
	}
	for (var i =0; i < array.length; i++){
		if (right == left){
			return (i + i + 1)/2;
		} else {
			left += array[i];
			right -= array[i];
		}
	}
	return false;
}

console.log(balanceIndex(array1));