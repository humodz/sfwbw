# Super Famicom Wars by Web

## TODO

- Tile: player should always be zero for non-cities
- how much does supply cost?


## Differences

- counter attack is simultaneous
- hq can recruit
- can't recruit from captured bases (even neutral)
- tire can't walk on forest
- transport loses turn when loaded
- when transport takes damage, loaded units also take damage
- copter can't load/unload if sitting on forest, mountain, water
	- river?
- truck only supplies land and copters


## Scripts

### COs

```sh
convert original.png -crop 32x32+89+50 co-left.png
convert original.png -crop 32x32+209+50 co-right.png
```

### Nations

```sh
convert original.png -crop 16x16+20+32 nation-left.png
convert original.png -crop 16x16+140+32 nation-right.png
```
