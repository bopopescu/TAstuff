// Drop The Mike
// When given a string, removes leading and trailing whitespace, capitalizes the first letter of every word, returns the string
// If string contains the word Mike, returns "stunned silence"
function dropMike(string){
	var string_array = string.split(" ");
	var answer = "";
	for (var word = 0; word < string_array.length; word++){
		if (string_array[word] == "Mike"){
			return "stunned silence";
		}
		if (['\t'," ",'\n', ''].indexOf(string_array[word]) > -1){
			continue;
		} else {
			string_array[word] = string_array[word].charAt(0).toUpperCase()+string_array[word].slice(1);
			if (answer.length == 0){
				answer = string_array[word];
			}else{
				answer = answer + " " + string_array[word];
			}			
		}
	}
	return answer;
}
console.log(dropMike("   im lost in the world 	   "));
// in place? 1N?

// converts key:value in a hash into a hash with value:key
function invertHash(assocArray){
	for (var key in assocArray){
		new_key   = assocArray[key];
		new_value = key;
		assocArray[new_key] = new_value;
		delete assocArray[key];
	}
	return assocArray;
}
console.log(invertHash({'key1': 'value1', 'key2':'value2'}));

// zip arrays to map
// given two arrays, return an array mapping values of one to the values of the other
function zip2Map(keyArray, valueArray){
	var i = 0;
	var map = {};
	while(keyArray[i] && valueArray[i]){
		map[keyArray[i]]=valueArray[i];
	}
}

// SPLICE adds/removes items to/from an array and returns the removed items
function splice(idx, size, items){
	var substring = "";

	return substring;
}


// SPLIT split method is used to split a string into an array of substrings and returns the new array. OG string is untouched
function split(string, separator, limit){
	var array = [];
	var limit = limit || string.length;
	if (!separator){
		array.push(string);
		return array;
	}
	while(limit > 0){
		// build the thing
		limit --;
	}


	return array;
}