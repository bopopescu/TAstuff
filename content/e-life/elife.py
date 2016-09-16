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


