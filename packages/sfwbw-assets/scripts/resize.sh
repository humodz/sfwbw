#!/usr/bin/env bash

INPUT_IMG="$1"
OUTPUT_IMG="$2"

convert "$INPUT_IMG" \
	-interpolate Nearest \
	-filter point \
	-resize 256x224 \
	"$OUTPUT_IMG"