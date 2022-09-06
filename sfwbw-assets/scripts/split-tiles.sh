#!/usr/bin/env bash

INPUT_IMG="$1"
OUTPUT_DIR="$2"

mkdir -p "$OUTPUT_DIR"

convert "$INPUT_IMG" -crop 16x16 "$OUTPUT_DIR/image-%d.png"