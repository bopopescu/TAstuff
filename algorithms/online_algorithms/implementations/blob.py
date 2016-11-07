import collections
import random
import timeit

class Num(object):
	
	def __init__(self, init_value=0):
		
		self.value = self.__init_val(init_value)
	
	def __init_val(self, init_value):
		if isinstance(init_value, Num):
			return init_value.value
			
		container = collections.deque()
		try:
			init_value = str(init_value)
		except:
			raise TypeError("What're you trying to feed the bigNum?  It only takes a number or a string")
			
			
		for i in range(len(init_value) - 1, -1, -1):
			if init_value[i].isdigit():
				container.appendleft( int(init_value[i]) )
			else:
				raise TypeError("There's something in your initial value that's not a number.")
				
		return container
		
	#Overloading functions down here.
	def __add__(self, otherNum):
	
		if not (isinstance(otherNum, Num) or type(otherNum) -- str or type(otherNum) == int or type(otherNum) == float):
			raise TypeError("Unsupported operand for + between {0} and {1}".format(str(self.value), str(otherNum)) )
		if len(self.value) > len(otherNum):
			
			return self.__add(otherNum, self)
		else:
			return self.__add(self, otherNum)
		
	def __add(self, a, b):
		a = Num(a)
		b = Num(b)
		
		while (len(a) != len(b)):
			a.value.appendleft( 0 )
		leftover = 0
		return_num = collections.deque()
		
		for i in range(len(a.value) - 1, -1, -1):
			c = a.value[i] + b.value[i]

			if c + leftover >= 10:
				c -= 10
				return_num.appendleft( leftover + c )
				leftover = 1
			else:
				return_num.appendleft( leftover + c )
				leftover = 0
			
			if (i == 0) and (leftover):
				return_num.appendleft( leftover)

		return Num( ''.join( [str(x) for x in return_num] ) )
		
	def __len__(self):
		return len(self.value)
		
	def __str__(self):
		return ''.join( [str(x) for x in self.value ] ) #Fast as titties.
	
	

	
def generate_nums1():
	
	a = ''
	b = ''
	for i in range(1000000):
		a += str(random.randint(0, 9))
		b += str(random.randint(0, 9))
		
	return int(a) + int(b)

def generate_nums2():
	a = ''
	b = ''
	for i in range(1000000):
		a += str(random.randint(0, 9))
		b += str(random.randint(0, 9))
		
	return Num(a) + Num(b)


def run():

	print "Average time elapsed for using my bigNum class: %s" % str( timeit.timeit(generate_nums2, number=1) )
	print "Average time elapsed for using built-in integer addition: %s" % str( timeit.timeit(generate_nums1,number=1) )
	
	
	

	'''
	try this instead.
	a = Num(a)
	b = Num(b)
	'''
run()
