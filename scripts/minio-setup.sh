#!/bin/bash

mc alias set local http://localhost:9000 minioadmin minioadmin
mc mb local/api-tour-app
mc policy set download local/api-tour-app
