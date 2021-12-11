
CouchDB:
docker run --name couchdb-mentor-path -v ~/Personnel/repositories/mentor-path/couchdb/data:/opt/couchdb/data -p 5984:5984 -e COUCHDB_USER=mp -e COUCHDB_PASSWORD=Leroro123 -d couchdb:3

Web console : http://localhost:5984/_utils/#login


curl -u mp:Leroro123 -X PUT http://127.0.0.1:5984/_users

curl -u mp:Leroro123 -X PUT http://127.0.0.1:5984/_replicator

curl -u mp:Leroro123 -X PUT http://127.0.0.1:5984/_global_changes

curl -X POST /_session HTTP/1.1
Accept: application/json
Content-Length: 24
Content-Type: application/x-www-form-urlencoded
Host: localhost:5984

name=root&password=relax