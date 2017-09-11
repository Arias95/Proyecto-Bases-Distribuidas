app.controller("newOrderCtlr", function($scope,  $uibModal, $location, InforUser) {
	  	
	$scope.DataTableProducts = dataTableProducts;
	$scope.selectedProducts = new Array();
  	$scope.total = 0;
	$scope.notProcess = true;

  	$scope.addProduct = function(pNewProduct) {
  		
  		for (var i = 0; i < $scope.selectedProducts.length; i++){
  			if ($scope.selectedProducts[i].$$hashKey == pNewProduct.$$hashKey){
  				return;
  			}
  			
  		}
  		var sal = $scope.selectedProducts;
      sal[sal.length] = pNewProduct;
  		sal[sal.length-1].quantity = 1;
      $scope.selectedProducts = new Array;
      $scope.selectedProducts = sal;

        
  		$scope.verifyOrder();
  		$scope.calculeteTotal();

  	}
    
    $scope.deleteProduct = function(pDeleteProduct) {
        var sal = new Array();
        for (var i = 0; i < $scope.selectedProducts.length; i++){
            if ($scope.selectedProducts[i].$$hashKey != pDeleteProduct.$$hashKey){
                sal[sal.length] = $scope.selectedProducts[i];
            }
        }
        $scope.selectedProducts=sal;
        $scope.verifyOrder();
        $scope.calculeteTotal();
    }
  	
    $scope.verifyOrder = function() {
  		if ($scope.selectedProducts.length==0){
  			$scope.processFlag = false;
  		}
  		else{
  			$scope.processFlag = true;
  		}
  	}

  	
  	$scope.process = function() {
  	}
    		

  	$scope.calculeteTotal = function() {
  		var sal = 0;
  		for (var i = 0; i < $scope.selectedProducts.length; i++){
  			if ($scope.selectedProducts[i].quantity == undefined){
  				$scope.selectedProducts[i].quantity = 1;
  			}
  			sal += $scope.selectedProducts[i].price*$scope.selectedProducts[i].quantity;
  		}
  		$scope.total = sal;
  	}

  	$scope.cancelOrder = function() {
  		$location.path("clients");
  	}
  	
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
	    $('#tOrder').DataTable({
	      'paging'      : false,
	      'lengthChange': false,
	      'searching'   : false,
	      'ordering'    : false,
	      'info'        : false,
	      'autoWidth'   : true
	    })
  	});

  	$(function () {
	    $('#tProductsSelect').DataTable({
	      'paging'      : true,
	      'lengthChange': false,
	      'searching'   : true,
	      'ordering'    : true,
	      'info'        : true,
	      'autoWidth'   : true
	    })
  	});

    
	
});


