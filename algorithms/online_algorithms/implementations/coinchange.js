// given an integer, return the change you would get!

// one thing and then the next...
function change1(int){
	// input checks....blah blah balh(make sure it is an integer)
	var coins = {
		'dollar'  : 100,
		'quarter' :  25,
		'dime'	  :  10,
		'nickel'  :   5,
		'penny'	  :   1
	};
	var change = {};
	// get the dollars
	change['dollars'] = Math.floor(int/coins['dollar']);
	// sees how much we have left
	var remnant = int%coins['dollar'];
	console.log(remnant);
	// gets the quarters
	change['quarters'] = Math.floor(remnant/coins['quarter']);
	// figures out how muchwe have left
	remnant = remnant%coins['quarter'];
	console.log(remnant);
	// wait a second
	change['dimes'] = Math.floor(remnant/coins['dime']);
	// this is kind of
	remnant = remnant%coins['dime'];
	console.log(remnant);
	// repetitive
	change['nickels'] = Math.floor(remnant/coins['nickel']);
	// isn't that bad?
	remnant = remnant%coins['nickel'];
	console.log(remnant);
	// shuold refactor this
	change['pennies'] = Math.floor(remnant);
	return change;
}
// and what if the coinage is differnt. does order matter?
console.log(change1(141));