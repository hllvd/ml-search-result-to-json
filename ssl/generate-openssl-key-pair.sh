#!/bin/bash

openssl req -x509 -out localhost-server.crt -keyout localhost-server.key \
  -newkey rsa:2048 -nodes -sha256 -days 1825 -config ./generate-openssl-key-pair.config
