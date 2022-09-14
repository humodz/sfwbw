import subprocess as sp
import tempfile as tf
from utils import Point, convert, rect, make_gif


def main():
  frame_offset = Point(25, 0)
  first_frame = Point(56, 606)
  size = Point(24, 24)

  input_img = 'source-images/units.png'
  output_img = 'loading.gif'
  tmp_frame = f'{tf.mkdtemp()}/icon-{{}}.png'

  bg_color = '#E85CE8'

  for i in range(3):
    where = rect(size, first_frame + Point(i, i) * frame_offset)
    convert(input_img, tmp_frame.format(i), crop=where, transparent=bg_color, flip='h')

  frames = [tmp_frame.format(i) for i in [0, 1, 2, 1]]
  make_gif(output_img, frames, delay=10)


main()