angular.module('umb-hsa.services', [])

.service('dataService',function(){

  var transaction = {};
  var balance = {};
  var imagedata = [];

  var addTransaction = function(newObj) {
      transaction = newObj;
  };

  var getTransaction = function(){
      return transaction;
  };

  var addBalance = function(newObj) {
      balance = newObj;
  };

  var getBalance = function(){
      return balance;
  };

  var addImageData = function(newObj){
      imagedata = newObj;
  };

  var getImageData = function(){
    return imagedata;
  };

  return {
    addTransaction: addTransaction,
    getTransaction: getTransaction,
    addBalance: addBalance,
    getBalance: getBalance,
    addImageData: addImageData,
    getImageData: getImageData
  };
})
;
