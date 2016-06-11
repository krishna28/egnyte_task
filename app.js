(function() {
	'use strict';
    angular.module('fileManager', [])
        .controller('MainController', function($scope) {

            $scope.parentObject = {};
            $scope.checkBoxObject = {}
            $scope.allFileCheck = false;
            $scope.parentObject.allFileCheck = false;
            $scope.parentObject.oldFileList = [];
            $scope.parentObject.newButtonStatus = false;

            $scope.parentObject.fileList = [{
                name: "text1",
                label: "text1.txt",
                value: false,
                newForm: false,
                renameForm: false
            }, {
                name: "text",
                label: "text.txt",
                value: false,
                newForm: false,
                renameForm: false
            }];



            $scope.parentObject.selectAllFiles = function selectAllFiles() {
                if ($scope.parentObject.allFileCheck) {

                    angular.forEach($scope.parentObject.fileList, function(val, key) {
                        if (!val.value) {
                            val.value = true
                        }
                    });


                } else {

                    angular.forEach($scope.parentObject.fileList, function(val, key) {
                        val.value = false;
                    });
                }
            };

            $scope.parentObject.add = function add() {
                $scope.parentObject.newButtonStatus = true;
                $scope.parentObject.fileList.unshift({
                    name: "newfolder",
                    label: "New Folder",
                    value: false,
                    newForm: true,
                    renameForm: false
                });

            };

            $scope.parentObject.remove = function remove() {
                if (confirm("Are you sure?")) {
                    if ($scope.parentObject.allFileCheck) {
                        $scope.parentObject.fileList.length = 0;
                        $scope.parentObject.allFileCheck = false;
                    } else {

                        var removalIndexes = getAllIndex.call($scope.parentObject);
                        for (var i = removalIndexes.length - 1; i >= 0; i--) {
                            $scope.parentObject.fileList.splice(removalIndexes[i], 1);
                        }
                    }
                }
            };

            $scope.parentObject.rename = function rename() {
                var removalIndexes = getAllIndex.call($scope.parentObject);
                angular.forEach(removalIndexes, function(val, key) {
                    $scope.parentObject.fileList[val].renameForm = true;
                    $scope.parentObject.fileList[val].newForm = false;

                    $scope.parentObject.oldFileList[val] = $scope.parentObject.fileList[val].label;
                });




            }

            $scope.parentObject.createFile = function createFile(position) {

                $scope.parentObject.fileList[position].newForm = false;
                $scope.parentObject.newButtonStatus = false;


            };


            $scope.parentObject.saveFile = function saveFile(position) {

                $scope.parentObject.fileList[position].renameForm = false;

            };

            $scope.parentObject.cancel = function cancel(position) {
                $scope.parentObject.fileList[position].label = $scope.parentObject.oldFileList[position];
				$scope.parentObject.fileList[position].renameForm = false;
            };

            $scope.parentObject.cancelFileCreation = function cancelFileCreation() {
                $scope.parentObject.fileList.shift();
                $scope.parentObject.newButtonStatus = false;
            }

            $scope.parentObject.checkIfAllChecked = function checkIfAllChecked() {


                var checkedSize = getAllIndex.call($scope.parentObject);


                if (checkedSize.length == $scope.parentObject.fileList.length) {
                    $scope.parentObject.allFileCheck = true;
                } else {
                    $scope.parentObject.allFileCheck = false;
                }
            };

            $scope.parentObject.checkIfAnyChecked = function checkIfAnyChecked() {

                var result = getAllIndex.call($scope.parentObject);
                if (result.length > 0) {
                    return true;
                } else {
                    return false;
                }
            };


        });


    var getAllIndex = function getAllIndex() {
        var allCheckedPositions = [];
        angular.forEach(this.fileList, function(val, key) {
            if (val.value) {
                this.push(key);
            }
        }, allCheckedPositions);
        return allCheckedPositions;
    };

})();