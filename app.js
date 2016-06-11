(function() {
	'use strict';
    angular.module('fileManager', [])
        .controller('MainController', function() {

		    var vm = this;
		//parent object used for avoid name conflict, used as namespace
            vm.parentObject = {};
            vm.checkBoxObject = {}
            vm.allFileCheck = false;
            vm.parentObject.allFileCheck = false;
            vm.parentObject.oldFileList = [];
            vm.parentObject.newButtonStatus = false;
            vm.parentObject.fileList = [];
		
		//function used to select all checkboxes
            vm.parentObject.selectAllFiles = function selectAllFiles() {
                if (vm.parentObject.allFileCheck) {
                    angular.forEach(vm.parentObject.fileList, function(val, key) {
                        if (!val.value) {
                            val.value = true
                        }
                    });

                } else {
                    angular.forEach(vm.parentObject.fileList, function(val, key) {
                        val.value = false;
                    });
                }
            };

		//function used to add new file list
            vm.parentObject.add = function add() {
                vm.parentObject.newButtonStatus = true;
                vm.parentObject.fileList.unshift({
                    name: "newfolder",
                    label: "New Folder",
                    value: false,
                    newForm: true,
                    renameForm: false
                });
            };

		//function used to remove files from the file list
            vm.parentObject.remove = function remove() {
                if (confirm("Are you sure?")) {
                    if (vm.parentObject.allFileCheck) {
                        vm.parentObject.fileList.length = 0;
                        vm.parentObject.allFileCheck = false;
                    } else {
                        var removalIndexes = getAllIndex.call(vm.parentObject);
                        for (var i = removalIndexes.length - 1; i >= 0; i--) {
                            vm.parentObject.fileList.splice(removalIndexes[i], 1);
                        }
                    }
                }
            };

		
		//function used to rename an existing file
            vm.parentObject.rename = function rename() {
                var removalIndexes = getAllIndex.call(vm.parentObject);
                angular.forEach(removalIndexes, function(val, key) {
                    vm.parentObject.fileList[val].renameForm = true;
                    vm.parentObject.fileList[val].newForm = false;
                    vm.parentObject.oldFileList[val] = vm.parentObject.fileList[val].label;
                });

            };

		
            vm.parentObject.createFile = function createFile(position) {
                vm.parentObject.fileList[position].newForm = false;
                vm.parentObject.newButtonStatus = false;
            };

            vm.parentObject.saveFile = function saveFile(position) {
                vm.parentObject.fileList[position].renameForm = false;
            };

            vm.parentObject.cancel = function cancel(position) {
                vm.parentObject.fileList[position].label = vm.parentObject.oldFileList[position];
				vm.parentObject.fileList[position].renameForm = false;
            };

            vm.parentObject.cancelFileCreation = function cancelFileCreation() {
                vm.parentObject.fileList.shift();
                vm.parentObject.newButtonStatus = false;
            }

			//function checking if all files are checked
            vm.parentObject.checkIfAllChecked = function checkIfAllChecked() {
                var checkedSize = getAllIndex.call(vm.parentObject);
                if (checkedSize.length == vm.parentObject.fileList.length) {
                    vm.parentObject.allFileCheck = true;
                } else {
                    vm.parentObject.allFileCheck = false;
                }
            };
		
		//function checking if any file is checked

            vm.parentObject.checkIfAnyChecked = function checkIfAnyChecked() {

                var result = getAllIndex.call(vm.parentObject);
                if (result.length > 0) {
                    return true;
                } else {
                    return false;
                }
            };


        });

//function used to get the indexes of the checked files for performing delete operation
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