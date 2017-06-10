angular.module('AngularScaffold.Controllers')
  .controller('ClassController', ['ClassService' , '$scope', '$state', '$rootScope', '$sessionStorage',
  	function (ClassService, $scope, $state, $rootScope, $sessionStorage) {
    $scope.lisUsuario = [];

    $scope.getClass = function(){
      ClassService.GetClass().then(function(response){
      $scope.lisUsuario = response.data
      console.log($scope.lisUsuario);
      });
    }

    $scope.crear_class = function(){
      /*console.log(!!$scope.class.class_code )
      console.log( !!$scope.class.class_name )
       console.log( !!$scope.class.unity)*/


      if (!!$scope.class.class_code && !!$scope.class.class_name && !!$scope.class.unity  ) {
             ClassService.Register($scope.class).then(function(algo){
               console.log(algo);
               swal("¡Exito!","success");
               $scope.class="";

             }).catch(function(err){
               swal("Error", "Error al guardar la clase", "error");
           });
           $scope.getClass = function(){
             ClassService.GetClass().then(function(response){
             $scope.lisUsuario = response.data
             console.log($scope.lisUsuario);
             });
           }
      }else{

        swal("","Debe llenar todos los campos correctamente para poder guardar la clase");
      }
    };



    $scope.modificar_clase = function(){
      console.log(!!$scope.claseSeleccionado.class_code )
      console.log( !!$scope.claseSeleccionado.class_code )
      console.log( !!$scope.claseSeleccionado.unity)


      var temp = {
        class_code : $scope.claseSeleccionado.class_code,
        class_name : $scope.claseSeleccionado.class_code,
        unity : $scope.claseSeleccionado.unity,


      }
     if (!!$scope.claseSeleccionado.class_code && !!$scope.claseSeleccionado.class_code && !!$scope.claseSeleccionado.unity) {
          ClassService.UpdateClass($scope.claseSeleccionado).then(function(algo){
        swal("¡Exito!","success");
        $scope.claseSeleccionado = " ";
      }).catch(function(err){
      });
    }else{
       swal("Error", "No se puedo modificar la clase porque no siguio el formato adecuado", "error");
     }
   };


   $scope.killclass = function(){
     console.log($scope.claseSelec)
     console.log($scope.claseSelec._id)
     ClassService.Delete($scope.claseSelec._id).then(function(response){
       swal("¡Exito!","Success");
     }).catch(function(err){
       swal("Error", "No se puedo eliminar la seccion", "error");
     });
     }


}]);
