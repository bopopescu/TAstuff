plan = ["####################",
		"#                  #",
		"#     #            #",
		"#            #     #",
		"#          ###     #",
		"#            #     #",
		"#     #            #",
		"#     ##           #",
		"#                  #",
		"####################"]
# in next implementation change x and y in to row/column for readings

class Vector(Object):
	def __init__(self, x, y):
		self.x = x
		self.y = y

	def add(self, other):
		return Vector(self.x + other.x, self.y + other.y)

class Grid(Object):
	def __init__(self, height, width):
		self.space = [None] * (height*width)
		self.width = width
		self.height = height

	def isInside(self, vector):
		return (0 <= vector.x <= width and 0<= vector.y <= height)

	def get(self, vector):
		return this.space[vector.x + (this.width * vector.y)]

	def set(self, vector, value):
		this.space[vector.x + (this.width * vector.y)] = value

	def forEach(self, f, context):
		for y in range(0, self.height):
			for x in range(0, self.width):
				value = self.space[x + y * self.width]
				if value is not None:
					f(context, value)

directions = {
	'n': Vector(0, -1),
	'ne': Vector(1,-1),
	'e': Vector(1, 0 ),
	'se': Vector(1,1),
	's':Vector(0,-1),
	'sw': Vector(-1,1),
	'w': vector(-1, 0),
	'nw': Vector(-1, -1)
}

def elementFromChar(legend, ch):
	if ch == "":
		return None;
	element = legend[ch]()
	element.originChar = ch
	return element

def charFromElement(element):
	if element == None:
		return ""
	else:
		return element.originChar

class World(Object):
	def __init__(self, map, legend):
		self.grid = Grid(len(map[0]), len(map))
		self.legend = legend
		# learn up on this bit..
		for y, row in enumerate(map):
			for x in range(0,len(row)):
				grid.set(Vector(x, y), elementFromChar(legend, row[x]))

	def toString(self):
		output = ""
		for y in range(0,self.grid.height):
			for x in range(0,self.grid.width):
				element = self.grid.get(Vector(x, y))
				output.append(charFromElement(element))
			output.append('\n')
		return output

	def turn (self):
		acted = [];
		self.grid.forEach(lambda (critter, vector): 	
			try:
				acted.index(critter)
			except:
				acted.append(critter)
				self.letAct(critter, vector)

	def letAct(self, critter, vector):
		action = critter.act(View(self, vector))
		if action and action.type === 'move':
			dest = self.checkDestination(action, vector)
			if dest and self.grid.get(dest) == None:
				self.grid.set(vector, None)
				self.grid.set(dest, critter)



	def checkDestination(self, action,  vector):
		if directions.hasOwnProperty(action.direction):
			dest = vector.plus(directions[action.direction])
			if self.grid.isInside(dest):
				return dest 

class View(Object):
	def __init__(self, world, vector):
		self.world = world
		self.vector = vector 

	def look(self, dir):
		target = self.vector.plus(directions[dir])
		if self.grid.isInside(target):
			return charFromElement(self.grid.isInside(target))
		else:
			return '#'

	def findAll(self, ch):
		found = []
		for dir in directions:
			if self.look(dir) is ch:
				found.append(dir)
		return found

	def find(self, ch):
		found = self.findAll(ch)
		if len(found) == 0:
			return None
		return randomElement(found)




# some critters
directionNames = "n ne e se s sw w nw"

# need to check this bidniss
def randomElement(string):
	return sample(string.split(" "))

class Wall(Object):
	def __init__(self):
		pass

class Bouncey(Object):
	def __init__(self, direction):
		self.direction = randomElement(directionNames)

	def act(self, view):
		pass
		
	





