angular.module('umb-hsa.services', [])

.service('HelpFunction',function(){

  searchJson = function(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(searchJson(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
            }
  return {
    searchJson: searchJson
  }
})
;
