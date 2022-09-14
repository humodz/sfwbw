#!/usr/bin/env python3

import subprocess as sp
import tempfile as tf
import os
from utils import make_color_transparent, Point, crop_image, rect


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
		pos = offset + sprite_size * Point(0, i) + Point(0, padding_x * i)
		crop_image(input_img, output_img.format(i), rect(sprite_size, pos))


main()