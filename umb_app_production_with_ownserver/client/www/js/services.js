angular.module('umb-hsa.services', [])

.service('dataService',function(){

  var transaction = {};

  var addTransaction = function(newObj) {
      transaction = newObj;
  };

  var getTransaction = function(){
      return transaction;
  };

  return {
    addTransaction: addTransaction,
    getTransaction: getTransaction
  };
})
;
