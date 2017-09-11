var dataTableClient = [
	{
	'name'		: "Aaron",
	'lname'		: "Elizondo",
	'phone'		: "88888888",
	'email'		: "email@email.com"
	},
	{
	'name'		: "Edwin",
	'lname'		: "Vasquez",
	'phone'		: "88888888",
	'email'		: "email@email.com"
	},
	{
	'name'		: "Andres",
	'lname'		: "Arias",
	'phone'		: "88888888",
	'email'		: "email@email.com"
	}
];
	
app.controller("clientsCtrl", function($scope,  $uibModal, $location, InforUser) {
	
	$scope.DataTable = dataTableClient;

  	$scope.newClient = function() {
     
        var modalInstance = $uibModal.open({
            templateUrl: 'modal/newClient.html',
            controller: ModalInstanceCtrl,
            animation: true,
            size: "sm",
            resolve:{
                pData:  function(){
                    return {name:"", lname:""};
                }
            }
        });
    }

    $scope.newOrder = function() {
        $location.path("newOrder");
    }

    var ModalInstanceCtrl = function ($scope, $location, $uibModalInstance, pData) {

        $scope.data     = pData;
       	$scope.className = "form-group has-error";
       	$scope.classLName = "form-group has-error";
       	$scope.error1 = true;
       	$scope.error2 = true;
       	$scope.error = true;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }

        $scope.verifyData = function(pId){
            
            if (pId=='name'){
	            if ($scope.data.name == undefined || $scope.data.name == ""){
	            	$scope.className = "form-group has-error";
	            	$scope.error1 = true;
	            }
	            else{
	            	$scope.className = "form-group has-feedback";
	            	$scope.error1 = false;
            	}
        	}
            if (pId=='lname'){

	            if ($scope.data.lname == undefined || $scope.data.lname == ""){
	            	$scope.classLName = "form-group has-error";
	            	$scope.error2 = true;
	            }
	            else{
	            	$scope.classLName = "form-group has-feedback";
	            	$scope.error2 = false;
	            }
	        }
            $scope.error = !((!$scope.error1) && (!$scope.error2));
            
        }

        $scope.accept = function(){
            /*$http({
                url: url+'/rewards/'+ pId+'/changeRewardTail',
                method: 'POST',
                headers: {'accept': store.get('jwt')}
            }).then(
                function(response) {
                    $uibModalInstance.dismiss('cancel');
                    soliciteRewardsAux(pCurrentPage);
                },
                function(error) {
                    $uibModalInstance.dismiss('cancel');
                    errorManager(error, store, $location);
                }
            );*/
        }

    }
   
    $(function () {
	    $('#tClients').DataTable({
	      'paging'      : true,
	      'lengthChange': true,
	      'searching'   : true,
	      'ordering'    : true,
	      'info'        : true,
	      'autoWidth'   : true
	    })
  	});
	
});


