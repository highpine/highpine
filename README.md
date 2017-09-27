# Domain Lead Tools

The main purpose of this tool is to help you to manage people.
It allows to:

- monitor their activity in Jira, Fecru and Gitlab
- tag people with projects, technologies, whatever to organize and filter.
- comment, write reviews, store personal development plan.

## Functionality

See: [doc/functionality.md](doc/functionality.md)

## Technical

### Requirements

- Node.js
- Mongodb

### Installation

```
docker-compose build
docker-compose up -d
```
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