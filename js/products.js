var dataTableProducts = [
	{
	'name'		: "Mariguanol",
	'price'		: "420",
	},
	{
	'name'		: "Jamon",
	'price'		: "420",
	},
	{
	'name'		: "Natural",
	'price'		: "420",
	},
	{
	'name'		: "Blue Dream",
	'price'		: "8420",
	},
	{
	'name'		: "Chuapacabras",
	'price'		: "9000",
	},
	{
	'name'		: "White Russian",
	'price'		: "10000",
	}
];
	
app.controller("productsCtrl", function($scope,  $uibModal) {
	

  	
	$scope.DataTable = dataTableProducts;

  	$scope.newProduct = function() {
     
        var modalInstance = $uibModal.open({
            templateUrl: 'modal/newProduct.html',
            controller: ModalInstanceNewProductCtrl,
            animation: true,
            size: "sm",
            resolve:{
                pData:  function(){
                    return {name:"", price:""};
                }
            }
        });
    }

    
    $(function () {
	    $('#tProducts').DataTable({
	      'paging'      : true,
	      'lengthChange': true,
	      'searching'   : true,
	      'ordering'    : true,
	      'info'        : true,
	      'autoWidth'   : true
	    })
  	});

	
});


var ModalInstanceNewProductCtrl = function ($scope, $location, $uibModalInstance, pData) {

        $scope.data     = pData;
       	$scope.className = "form-group has-error";
       	$scope.classPrice = "form-group has-error";
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
            if (pId=='price'){

	            if ($scope.data.price == undefined || $scope.data.price == ""){
	            	$scope.classPrice= "form-group has-error";
	            	$scope.error2 = true;
	            }
	            else{
	            	$scope.classPrice = "form-group has-feedback";
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