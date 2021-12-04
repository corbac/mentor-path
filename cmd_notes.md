
CouchDB:
docker run --name couchdb-mentor-path -v ~/Personnel/repositories/mentor-path/couchdb/data:/opt/couchdb/data -p 5984:5984 -e COUCHDB_USER=mp -e COUCHDB_PASSWORD=Leroro123 -d couchdb:3

Web console : http://localhost:5984/_utils/#login