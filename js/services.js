angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Carrito',function($filter) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pedidos = [];

// factory.addPedido = function(cantidad, tamanio, producto, precio) {
//             pedidos.push({ cantidad: cantidad, tamanio: tamanio, producto: producto, precio: precio });
//         }

// factory.removePedido = function(index) {
//             pedidos.splice(index, 1);
//           }

  return {
    all: function() {
      return pedidos;
    },
    get: function(index) {
      // Simple index lookup
      return pedidos[index];
    },
    addPedido: function (cantidad, tamanio, producto, precio, imagen) {
      var aux=true;
      for(var i=0;i<pedidos.length;i++){
        
        if(pedidos[i].producto === producto && pedidos[i].tamanio === tamanio){
          pedidos[i].cantidad += cantidad;
          pedidos[i].precio += precio;
          aux=false;
        }
      }
      if(aux){
        pedidos.push({ cantidad: cantidad, tamanio: tamanio, producto: producto, precio: precio, imagen: imagen });  
      }
    },
    getPrecio: function() {
      var total = 0;
    angular.forEach(pedidos, function(item) {
            total += item.precio;
        })
    return total
    }
    }

  })

.service('Total',function(Carrito){
  var total = 0;
  return {
    get: function() {
      return total;
    },
    save: function (precio) {
      total = precio;
    },
    check: function (tot, cupon) {
      total = tot;
      switch(cupon){
          case '10OFF':
              total -= total*0.1;
              break;
          case '15OFF':
              total -= total*0.15; 
              break;
          case '20OFF':
              total -= total*0.2;
              break;           
        }
     return total;   
    },

  }

})

.service('Columnas',function(){
  var columnas = 1;
  var width = window.innerWidth;
   
    if (width >= '1024') {
      columnas= 3;;
    } 

  return {
    get: function() {
      return columnas;
    }
  }

});





