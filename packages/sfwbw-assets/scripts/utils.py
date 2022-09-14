import subprocess as sp


def convert(input_img, output_img, crop=None, transparent=None, flip=None):
  args = []

  if crop:
    args += ['-crop', crop]

  if transparent:
    args += ['-transparent', transparent]

  if flip:
    if 'w' in flip:
      args += ['-flp']
    if 'h' in flip:
      args += ['-flop']

  sp.run(['convert', '-size', '24x24', input_img, *args, '+repage', output_img])


def make_gif(output_img, frames, delay):
  command = ['convert', '-delay', str(delay), '-loop', '0', *frames, output_img]
  sp.run(command)


def make_color_transparent(input_img, output_img, color):
	command = ['convert', input_img, '-transparent', color, output_img]
	sp.run(command)


def crop_image(input_img, output_img, where):
	command = ['convert', input_img, '-crop', where, output_img]
	sp.run(command)


def rect(size, offset):
	return f'{size.x}x{size.y}+{offset.x}+{offset.y}'


class Point:
	def __init__(self, x, y):
		self.x = x
		self.y = y

	def __add__(self, that):
		return Point(self.x + that.x, self.y + that.y)

	def __sub__(self, that):
		return Point(self.x - that.x, self.y - that.y)

	def __mul__(self, that):
		return Point(self.x * that.x, self.y * that.y)

	def __repr__(self):
		return f'Point(x={self.x}, y={self.y})'