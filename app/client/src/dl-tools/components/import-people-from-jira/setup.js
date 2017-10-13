define([
    'dl-tools/components/import-people-from-jira/import-from-jira.component'
], function(importPeopleFromJiraComponent) {
    return {
        init(module) {
            module.component('importPeopleFromJira', importPeopleFromJiraComponent);
        }
    };
});