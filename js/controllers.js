angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})


.controller('PizzasCtrl', function($scope, $http, Carrito, Columnas, Total) {
 

  $scope.columnas = Columnas.get(); // Num columnas segun ordenador o movil
	$http.get('data/pizzasPredef.json').success(function(data) {
    $scope.pizzas = data.productos;
    $scope.precios = data.precios;
    $scope.factores = data.factorPrecioTam;

  })


  $scope.totalCarrito = function(){
        return Carrito.getPrecio();
    }

  $scope.numColumns = function(numColumns){
        $scope.columnas= numColumns;
    }

  $scope.save = function(cantidad, tamanio, producto, precio, imagen){
       Carrito.addPedido(cantidad, tamanio, producto, precio, imagen);
    }

  $scope.precio = function(cantidad, precio, factor) {
        return cantidad*precio*factor;
    }     
})

.controller('BebidasCtrl', function ($scope, $http, Carrito, Columnas) {
   
  $scope.columnas = Columnas.get(); // Num columnas segun ordenador o movil
  $http.get('data/bebidasPredef.json').success(function(data) {
    $scope.bebidas = data.productos;
    $scope.precios = data.precios;
    $scope.factores = data.factorPrecioTam;

  })

  $scope.totalCarrito = function(){
        return Carrito.getPrecio();
    }

  $scope.numColumns = function(numColumns){
        $scope.columnas= numColumns;
    }

  $scope.save = function(cantidad, tamanio, producto, precio, imagen){
       Carrito.addPedido(cantidad, tamanio, producto, precio, imagen);
    }
  $scope.precio = function(cantidad, precio, factor) {
        return cantidad*precio*factor;
    }        

})

.controller('PostresCtrl', function ($scope, $http, Carrito, Columnas) {
  
  $scope.columnas = Columnas.get(); // Num columnas segun ordenador o movil  
  $http.get('data/postresPredef.json').success(function(data) {
    $scope.postres = data.productos;
    $scope.precios = data.precios;
    $scope.factores = data.factorPrecioTam;
  })

   $scope.totalCarrito = function(){
        return Carrito.getPrecio();
    }

  $scope.numColumns = function(numColumns){
        $scope.columnas= numColumns;
    }

  $scope.save = function(cantidad, tamanio, producto, precio, imagen){
       Carrito.addPedido(cantidad, tamanio, producto, precio, imagen);
    }

  $scope.precio = function(cantidad, precio, factor) {
        return cantidad*precio*factor;
    }        
})

.controller('ModalCtrl', function($scope, Carrito, Total) {
  
  $scope.datos = Carrito.all();

  

  $scope.datosQR = function() {
    return $scope.json = '{"p":'+angular.toJson($scope.datos)+',"t":'+Total.get()+'}';
}
  
})

.controller('CarritoCtrl', function($scope, $ionicModal,$filter, Carrito, Total) {
  $scope.carrito = Carrito.all();
  $scope.removeItem = function(index) {
        $scope.carrito.splice(index, 1);
    }
  
  $scope.total = function() {
        var total = 0;
        angular.forEach($scope.carrito, function(item) {
            total += item.precio;
        })

        return total;
    }  

  $scope.checkCupon = function(cupon) {
        var total = $scope.total();

        var checkedTotal = Total.check(total, cupon);

        total = $filter('number')(checkedTotal, 2);
        Total.save(total);
        return total;
    }   

   $ionicModal.fromTemplateUrl('modal.html', function(modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up',
    focusFirstInput: true
  }); 

});
