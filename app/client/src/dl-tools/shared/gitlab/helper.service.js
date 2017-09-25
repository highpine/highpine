define(['async'], function(async) {
    /* @ngInject */
    function GitlabHelperFactory(GitlabDataService) {
        return {
            /**
             * Get commits pushed by the user.
             *
             * @param {string} username
             * @param {Date|null} fromDate
             * @param {Date|null} toDate
             * @param {function} callback
             * @returns todo: Make it return promise
             */
            getUserCommits: function(username, fromDate, toDate, callback) {

                // todo: temporary workaround while order_by is not working in gitlab API.
                var limit = 300;
                var maxPerPage = 100;
                var pages = [];
                for (var i = 0; i < limit / maxPerPage; i++) {
                    pages.push(i + 1);
                }

                var apiClient = GitlabDataService.getApiClient();
                async.parallel(pages.map(function(page) {
                    return function(projectsAsyncCallback) {
                        var filter = {
                            order_by: 'last_activity_at',
                            sort: 'desc',
                            per_page: maxPerPage,
                            page: page
                        };

                        apiClient.projects().query(filter, function(projects) {
                            var filteredProjects = projects.filter(relevantProjectsFilter);
                            async.parallel(filteredProjects.map(function(project) {

                                return function(commitsAsyncCallback) {
                                    var commitsFilter = {
                                        project_id: project.id,
                                        ref_name: 'dev'
                                    };
                                    if (fromDate) {
                                        commitsFilter.since = fromDate.toISOString();
                                    }
                                    if (toDate) {
                                        commitsFilter.until = toDate.toISOString();
                                    }

                                    apiClient.projectCommits().query(commitsFilter, function (commits) {
                                        var filteredCommits = commits.filter(relevantCommitsFilter);
                                        filteredCommits.forEach(function(commit) {
                                            commit.project = project;
                                        });
                                        commitsAsyncCallback(null, filteredCommits);
                                    }, function(error) {
                                        commitsAsyncCallback(null, []);
                                    });
                                };

                            }), function(err, result) {
                                projectsAsyncCallback(null, [].concat.apply([], result).sort(commitSorter));
                            });

                        }, function(error) {
                            projectsAsyncCallback(null, []);
                        });
                    };
                }), function(err, result) {
                    callback([].concat.apply([], result));
                });


                /**
                 * Commit sorting callback.
                 * @param {object} commit1
                 * @param {object} commit2
                 * @returns {number}
                 */
                function commitSorter(commit1, commit2) {
                    if (commit1.created_at < commit2.created_at) {
                        return 1;
                    }
                    if (commit1.created_at > commit2.created_at) {
                        return -1;
                    }
                    return 0;
                }

                function relevantProjectsFilter(project) {
                    var lastActivityDate = new Date(project.last_activity_at);
                    if (fromDate && lastActivityDate < fromDate) {
                        return false;
                    }
                    if (toDate && lastActivityDate > toDate) {
                        return false;
                    }

                    return true;
                }

                function relevantCommitsFilter(commit) {
                    var lastActivityDate = new Date(commit.created_at);
                    if (fromDate && lastActivityDate < fromDate) {
                        return false;
                    }
                    if (toDate && lastActivityDate > toDate) {
                        return false;
                    }
                    if (username && commit.author_email.indexOf(username) === -1) {
                        return false;
                    }

                    return true;
                }

                return [];
            }
        };
    }

    return GitlabHelperFactory;
});