#!/usr/bin/env bash

sudo docker compose -f db/docker-compose.yml exec -it db psql postgres postgres