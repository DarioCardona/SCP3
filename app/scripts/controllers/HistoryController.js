angular.module('AngularScaffold.Controllers')
  .controller('HistoryController', ['HistoryService','ClassService','$scope', '$state', '$rootScope', '$sessionStorage',
  	function (HistoryService,ClassService, $scope, $state, $rootScope, $sessionStorage) {

    $scope.lisclase = [];

    $scope.getClass = function(){
      ClassService.GetClass().then(function(response){
      $scope.lisclase = response.data
      console.log($scope.lisclase);
      });
    };


    $scope.crear_matricula = function(){
      console.log(!!$scope.historial.year )
      console.log( !!$scope.historial.score )



      if ( !!$scope.historial.year && !!$scope.historial.score  ) {
        if ($scope.historial.score>=59.5) {
          $scope.historial.state = "APD";
        }else{
            $scope.historial.state = "RPD";
        }
             HistoryService.Register($scope.historial).then(function(algo){
               console.log(algo);
               swal("¡Exito!","success");
               $scope.class="";

             }).catch(function(err){
               swal("Error", "Error al guardar la clase", "error");
           });

      }else{

        swal("","Debe llenar todos los campos correctamente para poder guardar la clase");
      }
    };


}]);
