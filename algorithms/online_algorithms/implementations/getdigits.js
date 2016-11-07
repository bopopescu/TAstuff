// Given a string that may include digits, return the integer those digits form

function getDigits(str){
	var result = 0;
	var places = 0;
	for (var i = str.length-1; i >= 0; i--){
		if (str[i] == " "){
			continue;
		}
		if (str[i] == "0"){
			places++;
		} else if (!isNaN(str[i])){
			result += str[i] * Math.pow(10, places);
			places++;
		}
	}
	return result;
}

console.log(getDigits('1a30gn 14'));