// Week 3 Algorithms for 1st stack online
// Remove Duplicates from an Array, Rotate an array, Reverse an array

// Reverse an array. Given an array[1,2,3] return [3,2,1]
function reverseArr(array){
	// for readability
	var l = array.length;
	if (array.length < 2){
		return array;
	}
	for (var i = 0; i < l/2; i++){
		var t = array[i];
		array[i] = array[l-i-1];
		array[l-i-1] = t;
		// for visuals
		console.log(array);
	}
	return array;
}

var array1 = [1,2,3,4,5];
// console.log(reverseArr(array1));

// Rotate an array. Given an array[1,2,3,4] and a rotate value of 1, return [4,1,2,3]
// lvl 1: In place, no built-ins
function rotateArr1(array, shifter){
	// no validations....
	// for readability
	var l = array.length;
	for (var i = 0; i < shifter; i++){
		var t = array[l-1];
		for (var j = l-1; j > 0; j--){
			array[j]=array[j-1];
		}
		array[0] = t;
		// for visualization
		console.log(array)
	}
	// for visualization
	console.log(array);
	return array;
}

// lvl2: handle negative shifters for shifting leftwards
function rotateArr2(array, shifter){
	// no validations....
	// for readability
	var l = array.length;
	var s = Math.abs(shifter);
	for (var i = 0; i < s; i++){
		// this has gotta be refactored...
		if (shifter > 0){
			var t = array[l-1];
			for (var j = l-1; j > 0; j--){
				array[j]=array[j-1];
			}
			array[0] = t;
		} else {
			var temp = array[0];
			for (var k = 0; k < l-1; k++){
				array[k]=array[k+1];
			}
			array[l-1]=temp;
		}
		// for visualization
		console.log(array)
	}
	// for visualization
	console.log(array);
	return array;
}

// lvl3:minimize memory usage...handle shifter=100000
// ???already does?


// lvl4: minimize touches on each element.
// gonna make some new arrays?
function rotateArr4(array, shifter){
	// no validations....
	// for readability
	if (shifter > 0){

	} else if (shifter < 0)


	return array;
}


// rotateArr2(array1,-2);

// Remove duplicates from an array
// Given an array[1,1,2,2,3,3,3,4] return [1,2,3,4]
function dedupe(array){
	if (array.length < 3 || (array.length = 2 && array[1] != array[2])){
		return array;
	}
	var base = 0;
	for (var i = 1; i<array.length; i++){
		console.log(array);
		if (array[i] > array[base]){
			array[base+1]=array[i];
			base++;
		}
	}
	array.length = array.length - (base + 1)

	return array;
}

var arr2 = [1,1,2,2,2,3,3,3,4,5]
var arr3 = [1,1]
var arr4 = [1,2]

console.log(dedupe(arr2));
console.log(dedupe(arr3));
console.log(dedupe(arr4));