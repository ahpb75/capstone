angular.module('umb-hsa.services', [])

.service('dataService',function(){

  var transaction = {};
  var balance = {};

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

  return {
    addTransaction: addTransaction,
    getTransaction: getTransaction,
    addBalance: addBalance,
    getBalance: getBalance
  };
})
;
