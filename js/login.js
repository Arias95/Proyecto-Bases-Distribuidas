/**
 * @autor Aaron Elizondo
 * 
 * Controlador de iniciar sesion
 *
 * @param {factory} InforUserArtist contiene información del artista
 */
app.controller("ctlrLogin", function($scope, $http, $location) {
	
    $scope.user = {id:"",pass:""};
    /**
     * Verifica los datos de iniciar sesión  
     */
	$scope.ingresar = function() {

		var login = document.getElementById("login").value;
		var pass = document.getElementById("pass").value;


         window.location.href = "dashboard.html";
		/*$http({
            url: dirServer+'/login',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data:{login:login,pass:pass}

        }).then(
            function(response) {
        
                var data  = response.data;
              
                if (data.status=="1"){
                    $scope.result = "";
                    
                    if (data.content=="F"){          
                        InforUser.data.login = login;
                        $location.path("/profileFan");
                    }
                    else{
                        InforUserArtist.data.login = login;
                        InforUserArtist.data.permissions = "art";
                        $location.path("/profileArtist");
                    }
                }
                if (data.status=="2"){
                    InforUser.data.session="active";
                    $location.path("/addGenres");
                }
                else{
                    $scope.result = "Login y contraseña invalidos";
                }
        
            }, 
            function(error) {
                
                manajerError(error.status, $location);
                
            }
        );*/
	}
    
});

