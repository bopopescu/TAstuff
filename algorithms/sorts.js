// TA algorithms sorts!
// selection, bubble, insert

// SELECTION SORT a.k.a. put smallest at front, repeat
function selSort(array){
	if (array.length < 2){
		return array;
	} else {
		// outer iterator
		for (var i = 0; i < array.length - 1; i++){
			// min finder
			for (var j = i + 1; j < array.length; j++){
				// swap if min finder is smaller than iterator
				if(array[j] < array[i]){
					var t = array[i];
					array[i] = array[j];
					array[j] = t;
				}
			}
			console.log(array);
		}
	}
}
console.log('Sel Sortness')
var test_array = [3,2,1,5,4,6];
var bob = selSort(test_array);


// BUBBLE SORT a.k.a. compare neighbors a bunch
function bubSort(array){
	if (array.length < 2){
		return array;
	} else {
		// outer iterator
		for (var i = array.length-1; i >= 2; i--){
			// bubbler iterator
			console.log('i is ' + i);
			for (var j = 0; j <= array.length-1; i++){
				// bubble!
				if(array[j]>array[j+1]){
					var t = array[j];
					array[j] = array[j+1];
					array[j+1] = t;
				}
			}
		}
	}

}
console.log('bubble-ness');
var test_array = [3,2,1,5,4,6];
var bobby = bubSort(test_array);

// INSERTION SORT a.k.a. card sort
function insertSort(array){

}

console.log('insertness');
