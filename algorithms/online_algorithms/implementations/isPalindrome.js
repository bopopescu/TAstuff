// given a string determine if it is a palindrome(symmetrical)

// level 1, spaces have to be symmetrical too
function isPal1(str){
	var l = str.length;
	var i = 0;
	while (i < l/2){
		if(str[i] !== str[(l-1) - i++]){
			return false;
		}
	}
	return true;
}

console.log(isPal1('baobob boboab'));
// level 2, dem spaces doe!
var spaces_array = ['\n','\t',' '];
function check(val){
	return spaces_array.indexOf(val) > -1;
}
function isPal2(str){
	var right = str.length-1;
	var left = 0;
	while(right <= left){
		// make sure left is legit
		while(check(str[left])){
			left++;
		}
		// make sure right is legit...
		while(check(str[right])){
			right--;
		}
		// do the things
		if(str[left] !== str[right]){
			return false;
		}
		// progress for next loop..
		right--;
		left++;
	}
	return true;
}

console.log(isPal2('r a  ceca	r'));