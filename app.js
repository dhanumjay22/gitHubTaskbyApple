var myApp = angular.module('myApp', []);



myApp.controller('mainController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    $scope.gitUserName = "";
    $scope.gitUser = 'https://api.github.com/users/';
    $scope.filteredName = "";
    $scope.resultsAvailable = false;
    $scope.userDetails = false;
    $scope.noUsers = false;
    $scope.errorText = "";
    $scope.currentUser = "";
    $scope.repos = "";
    $scope.name = "";
    $scope.company = "";
    $scope.location = "";
    $scope.email = "";
    $scope.publicRepos = 0;

    $scope.checkLength = function() {
        var returnValue = false;
        if ($scope.currentUser != $scope.filteredName) {
            $scope.resultsAvailable = false;
            $scope.userDetails = false;
            $scope.noUsers = false;
        }
        if ($scope.gitUserName.length > 0 && ($scope.currentUser != $scope.filteredName)) {
            returnValue = true;
        }
        return returnValue;
    };

    $scope.lowercasehandle = function() {
        $scope.filteredName = $filter('lowercase')($scope.gitUserName);
        return $scope.filteredName;
    };

    $scope.getUser = function() {
        $scope.currentUser = $scope.filteredName;
        $scope.makeAjax($scope.gitUser + $scope.filteredName, $scope.userSuccess);
    };

    $scope.getRepos = function() {
        $scope.makeAjax($scope.gitUser + $scope.filteredName + "/repos", $scope.reposSuccess);
    };

    $scope.makeAjax = function(url, successCallback) {
        $http.get(url)
            .success(function(result) {
                successCallback(result, "success");
            })
            .error(function(error) {
                successCallback(error, "error");
            })
    };

    $scope.userSuccess = function(results, status) {
        if (status == "error") {
            if (results && results.message) {
                $scope.errorText = results.message;
            } else {
                $scope.errorText = "No user found";
            }
            $scope.noUsers = true;
            return;
        }
        $scope.userDetails = true;
        $scope.name = results.name;
        $scope.company = results.company;
        $scope.location = results.location;
        $scope.email = results.email;
        $scope.publicRepos = results.public_repos;
    };

    $scope.reposSuccess = function(results, status) {
        $scope.repos = results;
        $scope.resultsAvailable = true;

    };

}]);
