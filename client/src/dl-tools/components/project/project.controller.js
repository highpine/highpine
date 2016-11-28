define(['async', 'moment'], function(async, moment) {
    /* @ngInject */
    function controller($scope, $stateParams, JiraDataService) {
        var projectKey = $stateParams.key;
        var jiraApiClient = JiraDataService.getApiClient();
        var dateFormat = 'DD MMM, YYYY';
        $scope.stats = {};
        $scope.chart = {
            data: [[], []],
            labels: [],
            series: ['Stories', 'Bugs'],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        };

        jiraApiClient.project()
            .get({key: projectKey}, function (project) {
                $scope.project = project;
            });


        async.parallel({
            history: function(callback) {
                // todo: implement real call for history to backend.
                // todo: implement saving current state to history.
                callback(null, [{
                    date: moment().subtract(1, 'days').format(dateFormat),
                    stories: 70,
                    bugs: 50}
                ]);
            },
            stories: function(callback) {
                getUnresolvedStories(function(result) {
                    callback(null, result.total);
                });
            },
            bugs: function(callback) {
                getUnresolvedBugs(function(result) {
                    callback(null, result.total);
                });
            }
        }, function(err, result) {
            result.history.forEach(function(record) {
                $scope.chart.labels.push(record.date);
                $scope.chart.data[0].push(record.stories);
                $scope.chart.data[1].push(record.bugs);
            });
            $scope.chart.labels.push('Now');
            $scope.chart.data[0].push(result.stories);
            $scope.chart.data[1].push(result.bugs);
        });

        function getUnresolvedStories(callback) {
            getUnresolvedIssues('Story', callback);
        }

        function getUnresolvedBugs(callback) {
            getUnresolvedIssues('Bug Report', callback);
        }

        function getUnresolvedIssues(type, callback) {
            var jql = 'resolution = Unresolved AND project = "' + projectKey + '" AND issuetype = "' + type + '"';
            var filter = {
                jql: jql,
                maxResults: 10000,
                fields: 'key',
                expand: 'names'
            };
            jiraApiClient.search().get(filter, callback);
        }

    }

    return controller;
});