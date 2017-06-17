angular.module('AngularScaffold.Controllers')
  .controller('HistoryController', ['HistoryService','ClassService','UserService','$scope', '$state', '$rootScope', '$sessionStorage',
  	function (HistoryService,ClassService,UserService, $scope, $state, $rootScope, $sessionStorage) {

    $scope.lisclase = [];
    $scope.lisUsuario = [];
    $scope.lisHistory = [];
    $scope.lisHistory2 = [];
    $scope.listemp = [];

    $scope.getClass = function(){
      ClassService.GetClass().then(function(response){
      $scope.lisclase = response.data
      console.log($scope.lisclase);
      });

        UserService.GetUser().then(function(response){
        $scope.lisUsuario = response.data
        console.log($scope.lisUsuario);
        });

        HistoryService.GetHistory().then(function(response){
        $scope.lisHistory = response.data
        $scope.lisHistory2 = $scope.lisHistory;
        console.log($scope.lisHistory);
        });

    };



    $scope.crear_matricula = function(){
      console.log(!!$scope.historial.year )
      console.log( !!$scope.historial.score )
      $scope.historial.student = $scope.temp.student.account;
      $scope.historial.class_code = $scope.temp.class_code.class_code;


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

    $scope.calcular_prom = function(){
      //console.log($scope.temp)
      $scope.listemp=[];
      $scope.uvs=0;
      $scope.nota=0;
      for (var i = 0; i < $scope.lisHistory2.length; i++) {
        if ($scope.lisHistory2[i].student == $scope.temp.account ) {
          $scope.listemp.push($scope.lisHistory2[i]);
          //console.log("sexo")
        }
      }
      $scope.lisHistory = $scope.listemp;
      for (var i = 0; i < $scope.lisHistory.length; i++) {

        for (var j = 0; j < $scope.lisclase.length; j++) {

          if ($scope.lisHistory[i].class_code == $scope.lisclase[j].class_code) {

            if ($scope.lisHistory[i].state== "APD") {
              $scope.uvs = $scope.uvs +  $scope.lisclase[j].unity;
              $scope.nota = $scope.nota + $scope.lisHistory[i].score*$scope.lisclase[j].unity;
            }
          }
        }
      }
      console.log($scope.nota/$scope.uvs)
      document.getElementById("grade").value = $scope.nota/$scope.uvs;
    }


}]);
