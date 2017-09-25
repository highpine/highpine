define(['angular'], function(angular) {
    /* @ngInject */
    function managerDirectiveFactory() {
        return {
            /* @ngInject */
            controller: function($scope, $sessionStorage, $state, DataServicesManager, AUTH_STATUS_SUCCESS) {

                $scope.services = DataServicesManager.getServices();

                if ($sessionStorage.dataServicesAuthInfo) {
                    authorizeDataServices($sessionStorage.dataServicesAuthInfo);
                }

                $scope.$on('login.success', function(event, loginResult) {
                    $sessionStorage.dataServicesAuthInfo = loginResult.dataServices;
                    authorizeDataServices($sessionStorage.dataServicesAuthInfo);
                });
                $scope.$on('logout', function(event) {
                    delete $sessionStorage.dataServicesAuthInfo;
                    unauthorizeDataServices();
                    $state.go('login');
                });
                $scope.$on('unauthorized', function(event) {
                    delete $sessionStorage.dataServicesAuthInfo;
                    unauthorizeDataServices();
                    $state.go('login');
                });

                function authorizeDataServices(dataServicesAuthInfo) {
                    dataServicesAuthInfo = dataServicesAuthInfo || {};
                    angular.forEach(DataServicesManager.getServices(), function (dataService, dataServiceKey) {
                        var dataServiceResult = dataServicesAuthInfo[dataServiceKey];
                        if (dataServiceResult && dataServiceResult.status == AUTH_STATUS_SUCCESS) {
                            dataService.authorize();
                        } else {
                            dataService.unauthorize();
                        }
                    });
                }

                function unauthorizeDataServices() {
                    angular.forEach(DataServicesManager.getServices(), function (dataService) {
                        dataService.unauthorize();
                    });
                }
            },
            templateUrl: 'dl-tools/shared/data-services-manager/data-services.tpl.html'
        };
    }

    return managerDirectiveFactory;
});