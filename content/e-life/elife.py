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
		return new Vector(self.x + other.x, self.y + other.y)

class Grid(Object):
	def __init__(self, height, width):
		self.space = [None] * (height*width)
		self.width = width
		self.height = height

	def isInside(self, vector):
		return 0 <= vector.x <= width and 0<= vector.y height

	def get(self, vector):
		return this.space[vector.x + (this.width * vector.y)]

	def set(self, vector, value):
		this.space[vector.x + (this.width * vector.y)] = value

	def forEach(self, f, context):
		for y in range(0, self.height):
			for x in range(0, self.width):
				value = self.space[x + y * self.width]
				if value is not None:
					f.call(context, value, new Vector(x,y))

directions = {
	'n': new Vector(0, -1),
	'ne': new Vector(1,-1),
	'e': new Vector(1, 0 ),
	'se': new Vector(1,1),
	's':new Vector(0,-1),
	'sw': new Vector(-1,1),
	'w': new vector(-1, 0),
	'nw': new Vector(-1, -1)
}

def elementFromChar(legend, ch):
	if ch == "":
		return None;
	element = new legend[ch]()
	element.originChar = ch
	return element

def charFromElement(element):
	if element == None:
		return ""
	else:
		return element.originChar

class World(Object):
	def __init__(self, map, legend):
		self.grid = new Grid(len(map[0]), len(map))
		self.legend = legend
		# learn up on this bit..
		for y, row in enumerate(map):
			for x in range(0,len(row)):
				grid.set(new Vector(x, y), elementFromChar(legend, row[x]))

	def toString(self):
		output = ""
		for y in range(0,self.grid.height):
			for x in range(0,self.grid.width):
				element = self.grid.get(new Vector(x, y))
				output.append(charFromElement(element))
			output.append('\n')
		return output




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
		
	





