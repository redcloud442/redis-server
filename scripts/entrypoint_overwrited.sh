#!/bin/sh

set -e

if [ -f /run/secrets/redisPassword ]; then
  export REDIS_PASSWORD=$(cat /run/secrets/redisPassword)
fi

if [ -f /run/secrets/redisHost ]; then
  export REDIS_HOST=$(cat /run/secrets/redisHost)
fi

# Start the application
exec "$@"
