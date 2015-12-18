# npm install mqtt --save
# npm install -g mosca bunyan mqtt

mosca -v             \
  --http-port 8080   \
  --host 0.0.0.0     \
  --http-static WWW  \
  --http-bundle      \
  -d Db/             \
  | bunyan

# mqtt_sub -t hello
# mqtt_pub -t hello -m message
#   -l ws -h static-yaakov-belch.c9users.io

# mqtt_sub -t hello -l ws -h static-yaakov-belch.c9users.io
# mqtt_pub -t hello -m message -l ws -h static-yaakov-belch.c9users.io

# http://static-yaakov-belch.c9users.io/07a-mqtt-client.html
# http://hello-world-yaakov-belch.c9users.io/App/`