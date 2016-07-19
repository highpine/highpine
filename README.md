# Domain Lead Tools

The main purpose of this tool is to help you to manage people.
It allows to:

- monitor their activity in Jira, Fecru and Gitlab
- tag people with projects, technologies, whatever to organize and filter.
- comment, write reviews, store personal development plan.

## Functionality

### Authorization
You can authorize using your LDAP credentials.<br>
Note that authentication is done via Jira API, not LDAP.

### Access Management
A super-user can manage who has access to the app.

### Users Import
You can import users from Jira. Users are managed via LDAP, so they are available on all services.

### Tags and Tag Groups
Tag Groups allow you to organize your tag to simplify filtering users.
Example:

```
Projects        - Tag Group
- Project 1     - Tag
- Project 2     - Tag
- Project 3     - Tag

Domains         - Tag Group
- Backend       - Tag
- Frontend      - Tag
- QA            - Tag
```
You can than filter people like this:

- Show all QAs
- Show all people assigned to Project 1
- Show all Backends in Project 1

### User Profile
Each user has a profile. You can configure fields to be editable based on tags.

### User Notes
You can add a note about the user on the profile page. Notes are like comments.

### User Ratings
You can rate a user on the profile page. Rating criteria could be configured based on tags.

### User Activity
You can see the following user activity in Jira, Fecru and Gitlab for the last X days:
- comments in Jira
- comments in Fecru
- the number of created reviews in Fecru
- the number of completed reviews in Fecru.
- comments to Git commits.

### Assignment
You can see the list of active projects with people assigned to it.<br>
A percentage is shown on the user icon if he or she is assigned partly.<br>
Drag-n-drop is possible to reassign. `Ctrl + Drag-n-drop` could be used for partial assignment.
A short one-line comment could be added to the assignment.
See: [doc/Assignment visualization.png](doc/Assignment visualization.png)

## Technical

### Requirements

- Node.js
- Mongodb

### Installation

1. Checkout the repo.
2. Run `npm install`.
3. Run `node ./bin/www`.
4. Open [http://localhost:3000](http://localhost:3000).

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