# Node.js Express & MongoDB: CRUD Rest APIs

There is a file **app/config/config_sample.json** you need to copy the inside and create a new file **app/config/config.json** and push your mongodb url in that object like the following.

```
{
    "development": {
        "config_id": "development",
        "node_port": 8080,
        "database": "mongodb://[user]:[password]@[host]:[post]/[db-name]"
    }
}
```

```
npm install
```

### Run
```
node server.js
```
# nodejs-rest

Request Payload:

```
{
	"startDate": "2016-01-26",
	"endDate": "2018-02-02",
	"minCount": 2700,
	"maxCount": 3000
}
```

| Http Verb  | URL                                | Description         |
| ---------- | ---------------------------------- | ------------------- |
| POST       | http://localhost:8080/api/records  | Getting the records |
