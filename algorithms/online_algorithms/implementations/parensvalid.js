// returns if a string has valid parenthesisssss
function valPar1(str){
	// we will keep track of stuff to make sure is 'balanced'
	var open = 0;
	var closed = 0;
	// iterate through so we can count stuff
	// L -> R because opens first matters
	for (var i = 0; i < str.length; i++){
		// keep track of stuff
		if (str[i] == '('){
			open++;
			
		} else if (str[i] ==')'){
			closed++;
		}
		// check the 'state of things'
		if (open < closed){
			console.log('open < closed')
			return false;
		}	
	}
	// if we have the same number of things that is good
	if(open == closed){
		return true;
	}
	console.log('open was not equal to closed',open,closed);
	return false;
}

console.log(valPar1('ab(de)fghi(e(v)c)'));

// refactored a bit!
function valPar2(str){
	// we are just tracking the difference between open and closed right?
	// open is +1, closed is -1?
	var difference = 0;
	// because why for loop?
	for(var i = 0; i < str.length; i++){
		// is there a better order for these?
		
		if (str[i] == '('){
			difference++;
		}
		if (str[i] == ')'){
			difference--;
		}
		if (difference < 0){
			return false;
		}
	}
	// at this point, difference is above -1 aaand we got all the way through
	return (difference === 0);
}

console.log(valPar2('ab(de)fghi(e(v)c)('));

// returns if a string has valid parenthesis, brackets, curlymajiggers
function valStuff1(str){
	// since we have to keep track of stuff, lets just adapt our valPar2
	var pdifferences = 0;
	// and to keep track of the other stuff
	var bdifferences = 0;
	var cdifferences = 0;
	for(var i = 0; i < str.length; i++){
		// track the things!
		if(str[i] == '('){
			pdifferences++;
		} else if(str[i] == ')'){
			pdifferences--;
		} else if(str[i] == '['){
			bdifferences++;
		} else if(str[i] == ']'){
			bdifferences--;
		} else if(str[i] == '{'){
			cdifferences++;
		} else if(str[i] == '}'){
			cdifferences--;
		} else {
			continue;
		}
		// do the checks on the things
		if (pdifferences < 0 || bdifferences < 0 || cdifferences < 0){
			return false;
		}
	}
	return (pdifferences === 0 && bdifferences === 0 && cdifferences === 0);
}
console.log(valStuff1('abc[]{}()([{}])'));

// BUT WAIT!!!!!!!
console.log(valStuff1('abc[]{}()([{}[{]}])')); 
// that shouldn't be true!

// after soem looking, we are gonna have to see what the last thing we added was. if it was an open, the next closure must be of the same type!
// refactor...
function valStuff2(str){
	// so we need to keep track of what opened last, so if a close happens we can check if its valid
	// should be alist because if we keep removing the things we'll need to keep backtracking, ye?
	var lastopen = [];
	var pdifferences = 0;
	var bdifferences = 0;
	var cdifferences = 0;
	for(var i = 0; i < str.length; i++){
		if(str[i] == '('){
			pdifferences++;
			// push adds it to our lastopen list
			lastopen.push('(');
		} else if(str[i] == ')'){
			// pop returns AND removes the last thing inour lastopen list
			if (lastopen.pop() !== '('){
				return false;
			}
			pdifferences--;
		} else if(str[i] == '['){
			lastopen.push('[');
			bdifferences++;
		} else if(str[i] == ']'){
			if (lastopen.pop() != '('){
				return false;
			}
			bdifferences--;
		// this is getting long and messy...
		} else if(str[i] == '{'){
			lastopen.push('{');
			cdifferences++;
		} else if(str[i] == '}'){
			if (lastopen.pop() != '('){
				return false;
			}
			cdifferences--;
		} else {
			continue;
		}
		if (pdifferences < 0 || bdifferences < 0 || cdifferences < 0){
			return false;
		}
	}
	return (pdifferences === 0 && bdifferences === 0 && cdifferences === 0);
}

console.log(valStuff2('abc[]{}()([{}[{]}])')); 

// HOH BUT THAT'S JANKY!
// how to refactor? D.R.Y.! how...
// We are conceptually, doing the same thing just it changes for each symbol. e.g.,lines 114-121 ar repeated once before and after sorta...
// So how can we do the same thing but depending on our character look for a different character?
// key idea, characters are 'associated' together, so how can we easily keep track of these associations?
// ENTER THE ASSOCIATIVE ARRAY!
// so what if we use an associative array to generalize things?
function valBraces(str){
	// we want to have ease of checking our lastopen list, so in order to work off of closing braces, we use them as keys
	var chars = {
		')' : '(',
		'}' : '{',
		']' : '['
	};
	// still need this thingy
	var lastopen = [];
	// loop through string
	for (var i = 0; i < str.length; i++){
		// if opener add to last open
		// if closer check if last open is correct character
		if(chars[str[i]]){
			if(!(lastopen.pop() == chars[str[i]])){
				return false;
			}
		} else if( str[i] == '(' || str[i] == '{' || str[i] == '['){
			lastopen.push(str[i]);
		} else {
			continue;
		}

	}
	return (lastopen.length === 0);
}