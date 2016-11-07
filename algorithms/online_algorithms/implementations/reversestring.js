// Given a string return a reversed version of it

function reverseString(str){
	var new_str = "";
	for (var i = str.length-1; i >= 0; i--){
		new_str = new_str + str[i];
	}
	return new_str;
}

console.log(reverseString("bored"));