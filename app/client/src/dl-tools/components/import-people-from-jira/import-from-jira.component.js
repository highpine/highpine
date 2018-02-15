define([
    '@shared/people'
], function() {

    function createPersonDataFromJiraUser(jiraUser) {
        return {
            full_name: jiraUser.displayName,
            email: jiraUser.email,
            username: jiraUser.name,
            avatar: jiraUser.avatarUrls ? jiraUser.avatarUrls['48x48'] : null
        };
    }

    return {
        /* @ngInject */
        controller($rootScope, PeopleApi, PersonApi, JiraDataSource) {
            this.importPerson = (jiraUser) => {

                return JiraDataService.getApiClient().user()
                    .get({
                        username: jiraUser.name
                    }, function(jiraUser) {
                        let personData = createPersonDataFromJiraUser(jiraUser);

                        let saveHandlers = [() => {
                            $rootScope.$broadcast('people-changed');
                        }, () => {
                            // todo: publish a global message.
                        }];

                        PersonApi.get({id: '@' + personData.username}).$promise
                            .then(person => {
                                Object.assign(person, personData);
                                person.$update({id: person.id}, ...saveHandlers);
                            }, () => {
                                PeopleApi.create(personData, ...saveHandlers);
                            });
                    });
            };
        },
        templateUrl: 'dl-tools/components/import-people-from-jira/import-from-jira.tpl.html',
        bindings: {
            people: '<'
        },
    };
});