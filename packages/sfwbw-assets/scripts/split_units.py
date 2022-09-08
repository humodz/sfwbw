#!/usr/bin/env python3

import subprocess as sp
import tempfile as tf
import os


def main():
	os.makedirs('result', exist_ok=True)

	input_img = 'source-images/units.png'
	tmp_img = f'{tf.mkdtemp()}/units.png'

	make_color_transparent(input_img, tmp_img, '#E85CE8')

	armies = [
		['red', Point(3, 35)],
		['blue', Point(392, 35)],
		['green', Point(3, 529)],
		['yellow', Point(392, 529)]
	]

	for color, offset in armies:
		output_img = f'result/army-{color}-{{}}.png'
		crop_units(tmp_img, output_img, offset)


def crop_units(input_img, output_img, offset):
	sprite_size = Point(16, 16)
	sprite_count = 24
	padding_x = 3

	for i in range(sprite_count):
		pos = offset + sprite_size * Point(0, i) + Point(0, 3 * i)
		crop_image(input_img, output_img.format(i), rect(sprite_size, pos))


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

	def __mul__(self, that):
		return Point(self.x * that.x, self.y * that.y)

	def __repr__(self):
		return f'Point(x={self.x}, y={self.y})'



main()