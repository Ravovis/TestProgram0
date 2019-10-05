var app = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

app.controller("itemsController", function ($scope, $http) {

    $scope.items = [];

    function updateFilteredItems() {
        var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;

        $scope.filteredItems = $scope.items.slice(begin, end);
    }

    $http.get("api/item").then(
        function successCallback(response) {
            $scope.items = response.data;

            updateFilteredItems();
        },
        function errorCallback(response) {
            console.log("Unable to perform get request");
        }
        
    );

    $scope.curPage = 1;
    $scope.itemsPerPage = 4;
    $scope.maxSize = 5;



    $scope.numOfPages = function () {
        return Math.ceil($scope.items.length / $scope.itemsPerPage);

    };

    

    $scope.$watch('curPage + numPerPage', updateFilteredItems);


    $scope.errPost = "";
    $scope.add = function () {
        if ($scope.newItemName == "" || !$scope.newItemName) {
            $scope.errPost = "Item Name Cannot Be Empty";
            return;
        }
        if ($scope.newItemType == "" || !$scope.newItemType) {
            $scope.errPost = "Item Type Cannot Be Empty";
            return;
        }
        $scope.errPost = "";
        var newItem = {
            ItemName: $scope.newItemName,
            ItemType: $scope.newItemType,
            
        }; 
        $http.post("api/item", newItem).then(
            function successCallback(response) {
                $scope.items.push(response.data);
                $scope.newItemName = "";
                $scope.newItemType = "";
                updateFilteredItems();
            },
            function errorCallback(response) {
                console.log("Unable to perform post request");
            }
        );
    };

    $scope.EditItem = {
        id: null,
        itemName: "",
        itemType: ""
    };

    $scope.HideEditBox = true;

    $scope.errPut = "";

    $scope.editBox = function (x) {
        $scope.EditItem = {
            id: x.id,
            itemName: x.itemName,
            itemType: x.itemType
        };
        $scope.HideEditBox = false;
    };

    $scope.edit = function () {
        if ($scope.EditItem.itemName == "" || !$scope.EditItem.itemName ) {
            $scope.errPut = "Item Name Cannot Be Empty";
            return;
        }
        if ($scope.EditItem.itemType == "" || !$scope.EditItem.itemType) {
            $scope.errPut = "Item Type Cannot Be Empty";
            return;
        }
        $scope.errPut = "";

        var data = {
            Id:$scope.EditItem.id,
            ItemName:$scope.EditItem.itemName,
            ItemType:$scope.EditItem.itemType,
        };
        $http.put("api/item/" + $scope.EditItem.id, data).then(
            function successCallback(response) {
                
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].id === $scope.EditItem.id) {
                        $scope.items[i] = $scope.EditItem;
                        break;
                    }
                }
                updateFilteredItems();

                $scope.EditItem = {
                    id: null,
                    itemName: "",
                    itemType: ""
                };

                $scope.HideEditBox = true;

            },
            function errorCallback(response) {
                console.log("Unable to perform put request");
            }
        );
    };


    $scope.remove = function (x) {
        var id = x.id;
        
        $http.delete("api/item/" + x.id).then(
            function successCallback(response) {
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].id === id) {
                        $scope.items.splice(i, 1);
                        break;
                    }
                }
                updateFilteredItems();
            },
            function errorCallback(response) {
                console.log("Unable to perform delete request");
            }
        );
    };
});

app.controller("itemsStatsController", function ($scope, $http) {
    $scope.items = [];

    function updateFilteredItems() {
        var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
            end = begin + $scope.itemsPerPage;

        $scope.filteredItems = $scope.items.slice(begin, end);
    }

    $http.get("api/item/statistics").then(
        function successCallback(response) {
            $scope.items = response.data;
            updateFilteredItems();
        },
        function errorCallback(response) {
            console.log("Unable to perform get request");
        }
    );

    $scope.curPage = 1;
    $scope.itemsPerPage = 3;
    $scope.maxSize = 5;



    $scope.numOfPages = function () {
        return Math.ceil($scope.items.length / $scope.itemsPerPage);

    };



    $scope.$watch('curPage + numPerPage', updateFilteredItems);
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "items.html",
		//controller: "itemsCtrl"
    })
    .when("/items", {
        templateUrl : "items.html",
		//controller: "itemsCtrl"
    })
    .when("/stats", {
        templateUrl : "stats.html",
		//controller: "statsCtrl"
    });
});


