angular.module('AngularScaffold.Services').factory('ClassService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'https://hotelmacarthur-backend.herokuapp.com/';
		var baseUrl = 'http://localhost:8000/';
		return {
			Register: function(payload){
				console.log(payload)
	            return $http.post(baseUrl + "v1/registerClass", payload);
        	},
	        GetClass: function(){
      			return $http.get(baseUrl + "v1/getClass");
	        },
	        UpdateClass: function(payload){
	            return $http.post(baseUrl + "v1/updateClass", payload);
        	},
					Delete: function(id){
          return $http.delete(baseUrl + "v1/deleteClass/" + id);
    	}
	  	};
}]);
