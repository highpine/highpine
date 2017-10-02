# Domain Lead Tools

The main purpose of this tool is to help you to manage people.
It allows to:

- monitor their activity in Jira, Fecru and Gitlab
- tag people with projects, technologies, whatever to organize and filter.
- comment, write reviews, store personal development plan.

## Functionality

See: [doc/functionality.md](doc/functionality.md).

## Technical

### Requirements

**With Docker:**

- docker
- docker-compose

**Without Docker:**

- Node.js + npm
- Mongodb

### Installation

**With Docker:**

```
docker-compose build
docker-compose up -d
sudo docker-compose exec node-client ./node_modules/.bin/grunt build
```

You can also run `grunt watch` with the following command:

```
sudo docker-compose exec node-client ./node_modules/.bin/grunt watch
```

You can now visit [http://localhost:3030](http://localhost:3030).

**Without Docker:**

```
cd app
# Install dependencies
npm install
# Build client with grunt
./node_modules/.bin/grunt build
# Run server
node ./bin/www ../server 3001
# Run client
node ./bin/www ../client 3000
```

You can now visit [http://localhost:3000](http://localhost:3000).

### Grant tasks

See: [doc/grunt.md](doc/grunt.md).

### Modularity problems

1. Include .less files from client packages.
2. Include additional libraries from client packages (i.e. marked and angular-marked).
3. Include server code required for client packages (i.e. router for jira proxy).

## Links

- [Gitlab Api Documentation](http://docs.gitlab.com/ce/api/README.html)
- [Jira Api Documentation](https://docs.atlassian.com/jira/REST/latest/)
- [Fecru Api Documentation](https://developer.atlassian.com/fecrudev/remote-api-reference/rest-api-guide)
    - [Fecru](https://docs.atlassian.com/fisheye-crucible/latest/wadl/fecru.html)
    - [Crucible](https://docs.atlassian.com/fisheye-crucible/latest/wadl/crucible.html)
    - [FishEye](https://docs.atlassian.com/fisheye-crucible/latest/wadl/fisheye.html)