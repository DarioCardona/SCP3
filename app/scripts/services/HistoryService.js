angular.module('AngularScaffold.Services').factory('HistoryService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'https://hotelmacarthur-backend.herokuapp.com/';
		var baseUrl = 'http://localhost:8000/';
		return {
			Register: function(payload){
				console.log(payload)
	            return $http.post(baseUrl + "v1/registerMatricula", payload);
        	},
	        GetHistory: function(){
      			return $http.get(baseUrl + "v1/getHistory");
	        },
	        UpdateClass: function(payload){
	            return $http.post(baseUrl + "v1/updateClass", payload);
        	},
					Delete: function(id){
          return $http.delete(baseUrl + "v1/deleteClass/" + id);
    	}
	  	};
}]);
