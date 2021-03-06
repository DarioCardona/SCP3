angular.module('AngularScaffold.Services').factory('AuthService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'https://hotelmacarthur-backend.herokuapp.com/';
		var baseUrl = 'http://localhost:8000/';
		return {
			Logout: function(){
				return $http.get(baseUrl +"v1/logout");
			},
			Login: function(payload){
				console.log(payload)
				return $http.post(baseUrl +"v1/login", payload);
			},
			LoginWithPin: function(payload){
				return $http.post(baseUrl + "v1/loginWithPin", payload);
			}
	    };
}]);
