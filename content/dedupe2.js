The general idea of this is that we will iterate through our list. At each point in our list, we then check if there any duplicates of it in the rest of the list and remove them. 
The trick with this is how do we move them out of the list without using the built in methods? Enter a unique javascript trick, .length(). Most, if not all, languages contain some sort
of .length that returns an attribute. JavaScript allows you to pass an integer that will become the new length. This is how we remove stuff from an array without using slightly more complicated functions in JS.
So it follows that the next thing to worry about is getting all of the duplicates out. This relies on one thing: being sorted. Since we are going to shorten the array to remove, it makes
sense that we should want to put duplicate value at the back. It also means we want to put non-duplicate values in the front. So how do we go about doing that? Remember our two for loops for this algorithm? 
Those are the only 2 values we know. They should show us the first indices that don't match each other. What it also means is that the array in between our two for loops is full of duplicate values. We have two options now. 
Move stuff back, or bring stuff forward. To move stuff back would take another loop, which we want to avoid. So what if brought the differnt value we found and added it next in the array after our other pointer? 
E.G. give [1,1,1,2,2,2,3,3,3] after this move we would have [1,2,1,2,2,2,3,3,3]
At this point we know that our first pointer is pointing to a value that is followed by a differtn value. So safe to move that pointer along a bit, right? How about to that index we found earlier? We can repeat 
this until we find the end of the array. Now we have to shorten the array right? By how much? Well, we know we have a unique value for each swap we did, so what if had a counter going as we swapped? 
Phew! Okay, so how do we get this to not have so many loops and use fewer variables? well, if we just keep track of the index our slower for loop is at, and advance it only when we need to, we can elminate a loop for a for a variable.
Let's see what that looks like.

	function dedupe(array){
		// You will have to add checks for arrays of certain lengths.
		// our "slower" pointer
		var base = 0;
		for (var i = 1; i < array.length; i++){
			// something to iterate base, right?
		}
		// we'll want to just include the number of swaps we made
		// You'll have to add conditions depending on length if youdidn't earlier
		array.length = array.length - (1 + base);
		return array;
	}

So now we just have to navigate that tricky part about swapping the array indices and advance our slower variable, now called base
Think of how we defined array.length at the end; 1 + base ! This means that base should be increased everytime we know array needs to grow, finding a new value!
So inside our for loop, we move along. Because the array is sorted, we know the value must greater than our current value, or we have hit duplicate values.

	for (var i = 1; i<array.length; i++){
		// here see if we need to swap indices about!
		// remember if the next val is greater than, it is different else we ignore it because we have already added it to our array.
		if (array[i] > array[base]){
			// This case we found a new value!
			// lets 'add' it to our array of unique values from array[0] to array[base+1]
			array[base+1]=array[i];
			// and then increment the length of base to keep up 
			base++;
		}
		// if it isn't new, we don't want or care about it
	}
	// we've now exited the for loop and can do the new array length calculation
	array.length = array.length - (1+base)

So Ill let you just patch the two pieces of code together if that works for you.







