angular.module('AngularScaffold.Controllers',['bc.AngularKeypad'])
  .controller('UsersController', ['AuthService','UserService' , '$scope', '$state', '$rootScope', '$sessionStorage',
  	function (authService,UserService, $scope, $state, $rootScope, $sessionStorage) {
  	$scope.$sessionStorage = $sessionStorage;
  	$scope.title = "Login";
    $scope.username = "";
    $scope.password = "";
  	$scope.usuario = { employee_type:"0", role:"0"};
    $scope.lisUsuario = [];
    $scope.usuarioSeleccionado ={};
    $sessionStorage.logged = false;
    $scope.employees = [];
    $scope.SelectedEmployee = {};
    $scope.validpwd = false;
    $scope.password2;
    $scope.is_admin_logged = false;
    $scope.show_logout = false;

    $scope.getUser = function(){
      UserService.GetUser().then(function(response){
      $scope.lisUsuario = response.data
      console.log($scope.lisUsuario);
      });
    }

    $scope.mostraUsuario = function(){
      console.log($scope.usuarioSeleccionado);
    }

    /*$scope.verifyPassword =  function(){
      var pwd = document.getElementById("password").value;
      var pwd2 = document.getElementById("password_2").value;
      var pwdm = document.getElementById("passwordm").value;
      var pwd2m = document.getElementById("password_2m").value;
      if (pwd === null || pwdm === null) {
        $scope.validpwd=false;
      } else if (pwd === pwd2) {
        for (var i = 0; i < pwd.length ; i++) {
          if (pwd.charAt(i) === pwd2.charAt(i)) {
            $scope.validpwd=true;
          } else {
            $scope.validpwd=false;
          }
        }
      } else if (pwdm === pwd2m) {
        for (var i = 0; i < pwdm.length ; i++) {
          if (pwdm.charAt(i) === pwd2m.charAt(i)) {
            $scope.validpwd=true;
          } else {
            $scope.validpwd=false;
          }
        }
      } else {
        $scope.validpwd=false;
      }
    }
    */

    $scope.crear_usuario = function(){
      console.log(!!$scope.usuario.Firstname )
      console.log( !!$scope.usuario.Secondname )
       console.log( !!$scope.usuario.cel)

         console.log(  !!$scope.usuario.direction)
        console.log(   !!$scope.usuario.id)
         console.log(   !!$scope.usuario.account)
         console.log(    !!$scope.usuario.carrier )

      if (!!$scope.usuario.Firstname && !!$scope.usuario.Secondname && !!$scope.usuario.cel  && !!$scope.usuario.direction
           &&  !!$scope.usuario.id &&  !!$scope.usuario.account && !!$scope.usuario.carrier) {
             UserService.Register($scope.usuario).then(function(algo){
               console.log(algo);
               swal("¡Exito!","success");
               $scope.usuario="";

             }).catch(function(err){
               swal("Error", "Error al guardar el usuario", "error");
           });
           $scope.getUser = function(){
             UserService.GetUser().then(function(response){
             $scope.lisUsuario = response.data
             console.log($scope.lisUsuario);
             });
           }
      }else{

        swal("","Debe llenar todos los campos correctamente para poder guardar el usuario");
      }
    };



    $scope.modificar_usuario = function(){
    /*  console.log(!!$scope.usuarioSeleccionado.Firstname )
      console.log( !!$scope.usuarioSeleccionado.Secondname )
      console.log( !!$scope.usuarioSeleccionado.cel)
      console.log( !!$scope.usuarioSeleccionado.id )
      console.log(  !!$scope.usuarioSeleccionado.account)
      console.log(   !!$scope.usuarioSeleccionado.direction)
      console.log(    !!$scope.usuarioSeleccionado.carrier )*/

      var temp = {
        Firstname : $scope.usuarioSeleccionado.Firstname,
        Secondname : $scope.usuarioSeleccionado.Secondname,
        cel : $scope.usuarioSeleccionado.cel,
        id : $scope.usuarioSeleccionado.id,
        account:$scope.usuarioSeleccionado.account,
        direction: $scope.usuarioSeleccionado.direction,
        carrier: $scope.usuarioSeleccionado.carrier,

      }
     if (!!$scope.usuarioSeleccionado.Firstname && !!$scope.usuarioSeleccionado.Secondname && !!$scope.usuarioSeleccionado.cel
          && !!$scope.usuarioSeleccionado.id && !!$scope.usuarioSeleccionado.account &&  !!$scope.usuarioSeleccionado.carrier
          &&  !!$scope.usuarioSeleccionado.direction ) {
          UserService.UpdateUser($scope.usuarioSeleccionado).then(function(algo){
        swal("¡Exito!","success");
        $scope.usuarioSeleccionado = " ";
      }).catch(function(err){
      });
    }else{
       swal("Error", "El no se puedo modificar el usuario proque no siguio el formato adecuado", "error");
     }
   };


    $scope.killUser = function(){
      console.log($scope.usuarioSelec)
      console.log($scope.usuarioSelec._id)
      UserService.Delete($scope.usuarioSelec._id).then(function(response){
        swal("¡Exito!","Success");
      }).catch(function(err){
        swal("Error", "No se puedo modificar el Usuario", "error");
      });
    };



    $scope.isLogged = function(){
      if(typeof($sessionStorage.currentUser) === "undefined" || $state.current.name === 'login' || $state.current.name === 'start' || $state.current.name === 'pin_login'){
        return false
      }
      return true;
    }


    $scope.logout = function(){
      authService.Logout().then(function(response){

      }).catch(function(err){
      	BootstrapDialog.alert({
        	title: 'ERROR',
        	message: 'Sesión expirado, vuelva a conectarse',
        	type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        	closable: true, // <-- Default value is false
        	buttonLabel: 'Cerrar', // <-- Default value is 'OK',
      	});
      })
    }

   	$scope.login = function(){
      if ($scope.Firstname != null && $scope.password != null) {
        UserData = {
          Firstname: $scope.Firstname,
          password: $scope.password
        }
        authService.Login(UserData).then(function(response){
          if(response.data != "error"){

                $state.go("home")

          }else{
            swal("Error", "Ingrese los datos correctos", "error");
          }
        }).catch(function(err){
          swal("Error", "Ingrese los datos correctos", "error");
        });
      }else{
        swal("Error", "Ingrese los datos correctos", "error");
      	BootstrapDialog.alert({
      	  title: 'ERROR',
          message: 'Porfavor ingrese un usuario y contraseña valido.',
          type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
          closable: true, // <-- Default value is false
          buttonLabel: 'Cerrar', // <-- Default value is 'OK',
       	});
      }
   	}



    //checkups for ng-if in navbar
    $scope.check_login_allowed = function(){
      $scope.clear_user()

    }

    $scope.clear_user = function(){
      $sessionStorage.currentUser = {};
    }

    $scope.show_for_admin= function(){
      
        return true;


   }

    $scope.show_logout= function(){
      try{
        if(typeof($sessionStorage.currentUser.username) === "undefined")
          return false;
        if($sessionStorage.currentUser.logged)
          return false;
        if($state.current.name == 'login' || $state.current.name == 'start'|| $state.current.name == 'pin_login'){
          return false;
        }
        return true;
      }catch(err){
      }
    }

    //done with checkups
    $scope.go_admin_login = function(){
      $state.go("login")
    }

    $scope.go_start = function(){
      $state.go("start")
    }

    $scope.go_emp_login = function(){
      $state.go("pin_login")
    }

    $scope.getEmployees = function(){

    }

    $scope.select_current_emp = function(employee){

      $scope.SelectedEmployee = employee;
      if(employee.pin === null){
        BootstrapDialog.confirm({
          title: 'SUCCESS',
          message: 'Porfavor ingresar un PIN.',
          type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
          closable: true, // <-- Default value is false
          buttonLabel: 'Cerrar', // <-- Default value is 'OK',
        });
      }
    }

    $scope.verificarDatos = function(numbers,employee){
      if (employee.pin === null) {
        var temp = {
          username: employee.username,
          pin: numbers
        }
        UserService.ModifyPin(temp).then(function(response){
          BootstrapDialog.confirm({
            title: 'SUCCESS',
            message: 'Pin creado exitosamente.',
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            buttonLabel: 'Cerrar', // <-- Default value is 'OK',
            callback: function(result) {
              // result will be true if button was click, while it will be false if users close the dialog directly.
              location.reload();
            }
          });
        });
      }else if(employee.pin != numbers){
        BootstrapDialog.alert({
          title: 'ERROR',
          message: 'Porfavor ingrese un pin valido.',
          type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
          closable: true, // <-- Default value is false
          buttonLabel: 'Cerrar', // <-- Default value is 'OK',
        });
      }else if(employee.pin != null && employee.username != null){
        UserData = {
          username: employee.username,
          pin: numbers
        }
        authService.LoginWithPin(UserData).then(function(response){
          if(response.data != "error"){
            $sessionStorage.currentUser = response.data
            $sessionStorage.logged = true;
            if(response.data.role === 1){
              $scope.actualUser = true;
              $state.go("emp")
            }
          }
        })
        $('#numpad').modal('hide');
        $('.modal-backdrop').remove();
      }
    }

    $scope.infoRC;
    //settings
    $scope.save_settings = function(){
      var settings = {
        pin_login: document.getElementById("pin_login_check").checked
      }
      console.log(settings)

    }

    $scope.get_settings = function(){

    }
    //fin settings

    $scope.infoRC;

    //settings
    $scope.save_settings = function(){
      var settings = {
        pin_login: document.getElementById("pin_login_check").checked
      }

    }

    $scope.get_settings = function(){

    }
    //fin settings

    $scope.clickIconButton = function(){
      Notify("Stop! Hammer time", null, null, 'danger');

    }
}]);
