// Test the string and return true if matching pair of parenthesis. Also return
// premature message if closing paren without opening
//
// 1 Iterate through the string
// 2 if string at index is close
// 3   return false "premature close parens at index"
// 4 else if string at index is open
// 5   iterate from next element with new_index
// 6     if close
// 7       index to close position plus one
// 8     else
// 9       return false "open paren at index"
// 10else
// 11  return true "no unmatched pairs"

// If an open parenthesis is found in the function BELOW, send the string with
// an index point to the search_for_close function ABOVE to find the closing
// parenthesis. If another open parenthesis is found, the search_for_close
// function will call self recursively to find closed parenthesis. Upon return,
// set the index ahead of the closed parenthesis.

function search_for_close(string, pos){
    var string_length = string.length;
    for(var i = pos + 1; i < string_length; i++){
        console.log(i + ' From search_for_close');
        if(string[i] === '('){
            i = search_for_close(string, i);
        }else if(string[i] === ')'){
            //console.log(i + " position of close");
            return i;
        }else {
            return string_length -1;
        }
    }
}

function parens_valid(string){
    console.log('Parens Valid');
    console.log(string);
    var string_length = string.length;
    console.log(string_length + ' string_length');
    for(var i = 0; i < string_length; i++){
        console.log(i + ' From parens_valid');
        if(string[i] === '('){
            console.log('if ' + string[i] + ' is true!');
            var position_of_return = search_for_close(string, i);
            if(position_of_return == string_length && string[position_of_return] != ')'){
                console.log('No matched parenthesis for position ' + i);
                return false;
            }else if(position_of_return == string_length - 1 && string[position_of_return] == ')'){
                return true;
            }else if(position_of_return == string_length - 1){
                return false;
            }
            i = position_of_return;
            console.log(i + ' at end of if');
        }else if(string[i] === ')'){
            console.log('Parenthesis is premature at position ' + i);
            return false;
        }else if(i == string_length -1){
            return true;
        }
    }
}

console.log(parens_valid('H(ello'));
console.log(parens_valid('H(e()l()lo)'));
//console.log(parens_valid('He()l()lo'));
//console.log(parens_valid('H(e()l()lo'));
//console.log(parens_valid('He())l()lo'));
//console.log(parens_valid('H()e()l(lo'));
//console.log(parens_valid('H(e()))l(lo'));
console.log(parens_valid('H(*(e()))asklnmslknafsdlknafds;kljasdf;klj(((())))()()()()()()(a)adsla))))'));		