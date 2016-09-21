###Removing duplicates 

basic problem: given a sorted array, remove the duplicates.

Pretty straightforward, right? we will make a loop and then have a second loop that checks against the first loop and then remove if needed.

function dedupe1(array){
	for (var i = 0; i <array.length; i++){
		var j = 1;
		while(array[j] != array[i] or j == array.length-1){
			j++;
		}
		array.splice(i,(j-i+1));
	}
	return array;
}
There are a few ways to implement this, but the ideas is that you have nested loops doing some comparing and you remove things you don't like.

Another approach might be to use some version of .contains() or .includes() or .indexOf() to see if a subsection of the array includes a duplicate

function dedupe2(array){
	for (var i = 0; i<array.length; i++){
		while (array.slice(i+1).indexOf(array[i]) > -1){
			array.splice(i,1);
		}
	}
	return array;
}

There are quite a few variations of the above versions, but they all involve messing with the original array. If we don't want to wreck the original array, we can use another data structure to keep track of the unique values. This can be done by changing the splicing in the above versions to some kind of push to another array. Or, if you don't like that you can use a different type of data structure that inherently prevents duplication. This is called a set, but a set isn't a linear data structure, it is abstracted in most implementations. To create a hacked 'set', you can use a dictionary/object/hashtable and take advantage of their __unique keys__. Could look something like this:

function dedupe3(array){
	var dict = {};
	var results = [];
	for (var i = 0; i < array.length; i++){
		if (!dict[array[i]]){
			dict[array[i]]=0;
		}
	}
	for (var key in dict){
		results.push(key);
	}
	return results;
}
 
This partiualr implementation is more readable if you use a helper function to build the object in my opinion. This function also has 2 neat features, it only uses .push() which is neat for dojo methods restrictions, and it works on an unsorted array. So that's dope.

But what if we are space nazis? we don't want to make any unnessecary data structures? no lists or objects or whatever?
Well, we can go back to dedupe1 or dedupe2. basically you have the second loop running that is editing the array you were given. Nice! So space isn't an issue. What about Time? Well then we can use dedupe3, building the results structure and returning it. So roughly 1N time to do. That is good. But what if we are space AND time constrained?...

There are a few ways to do this in 1N time. this version doesn't use multiple
loops, but you can have nested loops that will run in 1N time. key ideads
here: * we will keep track of indices as opposed to values * lists have a
.length attribute we can overwrite * our list is sorted, so <, >, can help us
find our spot.

function dedupe4(array){
	var base = 0;
	var runner = 1;
	while (runner < array.length and array[runner] >= array[base]){
		if(array[base] != array[runner]){
			array[base+1] = array[runner];
			base++;
		}
		runner++;
	}
	array.length = base + 1;
	return array;
}

So we handle the removal of duplicates by putting them at the end and truncating the array length. This implementation can be further refactored a bit to use less variables and to simplify the condition of the while loop, but readability begins to go out the window. So yeah, hopefully this helps. if any of he code doesn't work, fix it and edit the document :)