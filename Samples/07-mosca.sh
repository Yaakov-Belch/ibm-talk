# npm install mqtt --save
# npm install -g mosca bunyan mqtt

mosca -v                \
  --http-port 8080      \
  --host 0.0.0.0        \
  --http-static ../WWW  \
  --http-bundle         \
  -d Db/                \

# mqtt_sub -t hello
# mqtt_pub -t hello -m message
#   -l ws -h mosca-yaakov-belch.c9users.io

# mqtt_sub -t hello -l ws -h mosca-yaakov-belch.c9users.io
# mqtt_pub -t hello -m message -l ws -h mosca-yaakov-belch.c9users.io

# https://mosca-yaakov-belch.c9users.io/07a-mqtt-client.html
# https://mosca-yaakov-belch.c9users.io/App/