angular.module('starter.controllers', [])

  .controller('LoginCtrl', [
    '$scope', '$state', '$timeout', 'FirebaseDB',
    function LoginCtrl($scope, $state, $timeout, FirebaseDB) {
      console.log("Login Controller");

      /**
       *
       */
      $scope.doLoginAction = function (_credentials) {

        FirebaseDB.login(_credentials).then(function (authData) {
          console.log("Logged in as:", authData.uid);
          $state.go('tab.dash', {})
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("Authentication failed:", error);
          // ...
        });

      }

      /**
       *
       */
      $scope.doCreateUserAction = function (_credentials) {

        FirebaseDB.createUser(_credentials).then(function (authData) {
          console.log("Logged in as:", authData);
          $state.go('tab.PedidoMenu', {})
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("Authentication failed:", error);
          // ...
        });

      }
    }])

  .controller('DashCtrl', function ($scope, $state, $ionicPopup) {
    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Salir',
        template: '¿Esta seguro que desea salir?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          //console.log('You are sure');
          $state.go('login');
        } else {
          console.log('You are not sure');
        }
      });
    };


    $scope.IrPedido = function () {
      $state.go('tab.PedidoMenu');
    };
    $scope.IrMenu = function () {
      $state.go('tab.ListaMenu');
    };
    $scope.IrProveedor = function () {
      $state.go('mostrar_proveedores');
    };
    $scope.IrPedidos = function () {
      $state.go('mostrar_pedido');
    };
  })

  .controller('MostrarProveedorCtrl', function ($scope, $http, $state, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function (proveedor) {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function (proveedor) {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {

    });

    $scope.Editar = function (proveedor) {
      $http({
        method: 'PUT',
        url: "http://irsosav.olympos.com.ar/proveedor/" + proveedor.proveedor,
        data: proveedor
      }).success(function (data, status) {
        console.log(data),
          window.location.reload();
      })

    }
    $scope.BorrarProveedor = function (proveedor) {
      $http.delete("http://irsosav.olympos.com.ar/proveedor/" + proveedor)
        .success(function (data, status) {
          console.log(data),
            // $scope.proveedores.splice($scope.proveedores.indexOf(proveedor),1)
            window.location.reload();
        })
    };


    $scope.volver = function () {
      $state.go('tab.dash');
    };

    //$http.get("js/proveedores_json.json")
    $http.get("http://irsosav.olympos.com.ar/proveedores")
      .success(function (response, data) {
        $scope.proveedores = data
        $scope.proveedores = response.data;
        console.log("Exito")
      });
  })


  .controller('MostrarPedidoCtrl', function ($scope, $http, $state, $ionicPopup, $ionicModal) {

    $ionicModal.fromTemplateUrl('../templates/modals/edit-pedido.html', {
      scope: $scope,
      animation: 'slide-in-up'

    }).then(function (modal) {
      $scope.modal = modal;
    });
    // $scope.openModal = function(id_menu) {
    $scope.openModal = function (pedido) {
      // console.log(id_menu);
      // $scope.id_menu =id_menu;
      $scope.selectedPedido = pedido;
      console.log("recibi para editar:", pedido)
      $scope.modal.show();
    };
    $scope.closeModal = function (id_menu) {
      $scope.id_menu = id_menu;
      $scope.modal.hide();
    }
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function (id_menu) {
      $scope.modal.remove(id_menu);
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {

    });


    // no comprendo que hace esto, pero es el metodo que llamas cuando guardas un pedido lo voy a cambiar a actualizar el pedido
    //no ceo que lo que quieres hacer, creo que deberias tener una llamada difernte para modificar un pedido
    //quizás quieras hacer un $scope.editarMenu y un $scope.editarPedido

    //  $scope.Editar = function(pedido,id_menu){
    // $http({
    //     method: 'PUT',
    //     url:"http://irsosav.olympos.com.ar/menu/"+pedido.id_menu,
    //     data: pedido
    // }).success(function(data, status) {
    //        console.log(data),
    //         window.location.reload();
    //       })
    //  };
    //

    $scope.Editar = function (selectedPedido) {
      $http({
        method: 'PUT',
        url: "http://irsosav.olympos.com.ar/menu/" + selectedPedido.id_menu,
        data: selectedPedido
      }).success(function (data, status) {
        console.log(data);
        // window.location.reload();

        $http.get("http://irsosav.olympos.com.ar/menues")
          .success(function (response, data) {
            // $scope.pedidos = data
            $scope.pedidos = data && response.data;
            console.log("menu actualizado")
            $scope.modal.hide();  // al terminar de actualizar el scope, cerrar modal
          });

      })
    };


    $scope.BorrarPedido = function (id_menu) {
      //$scope.pedido.splice($scope.pedido.indexOf(pedido), pedido.id_menu)
      $http.delete('http://irsosav.olympos.com.ar/menu/' + id_menu)
        .success(function (data, status) {
          console.log(data),
            // $scope.proveedores.splice($scope.proveedores.indexOf(proveedor),1)
            window.location.reload();
        })
    };


    $scope.volver = function () {
      $state.go('tab.dash');
    };
    //$http.get("js/pedido_json.json")
    $http.get("http://irsosav.olympos.com.ar/menues")

      .success(function (response, data) {
        $scope.pedidos = data
        $scope.pedidos = response.data;
        console.log("Exito")
      });

  })


  .controller('ProveedoresCtrl', function ($scope, $http, $state, $ionicPopup) {
    $scope.limpiarProveedor = function () {
      $scope.proveedorObj =
        {
          cuit: '',
          proveedor: '',
          domicilio: '',
          ciudad: '',
          provincia: '',
          telefono: '',
          email: '',
        };

    }


    $scope.MostrarProveedor = function () {
      $state.go('mostrar_proveedores');
    };

    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Salir',
        template: '¿Esta seguro que desea salir?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          //console.log('You are sure');
          $state.go('login');
        } else {
          console.log('You are not sure');
        }
      });
    };
//modelo de objeto
    $scope.proveedorObj =
      {
        cuit: '',
        proveedor: '',
        domicilio: '',
        ciudad: '',
        provincia: '',
        telefono: '',
        email: ''
      };

    $scope.AltaProveedor = function () {     //una vez apretado el alta, empezamos con las validaciones de cada campo

      if ($scope.proveedorObj.cuit == '') {
        alert('Ingrese el cuit ');
        return;
      }
      else {
        if ($scope.proveedorObj.proveedor == '') {
          alert('Ingrese  nombre del proveedor');
          return;
        }
      }
      if ($scope.proveedorObj.domicilio == '') {
        alert('Ingrese el domicilio del proveedor');
        return;
      }
      if ($scope.proveedorObj.ciudad == '') {
        alert('Ingrese la ciudad del proveedor');
        return;
      }

      if ($scope.proveedorObj.provincia == '') {
        alert('Ingrese el provincia del proveedor');
        return;
      }

      if ($scope.proveedorObj.telefono == '') {
        alert('Ingrese el telefono del proveedor');
        return;
      }

      if ($scope.proveedorObj.email == '') {
        alert('Ingrese el Email del proveedor');
        return;
      }

      $http({
        method: 'POST',
        url: 'http://irsosav.olympos.com.ar/proveedor',
        data: $scope.proveedorObj
      }).then(function (response) {
        alert('Proveedor ha sido ingresa con Exito');
      }, function (response) {
        alert('hubo un error inesperado');
      });

    };
  })


  .controller('PedidoMenuCtrl', function ($scope, $http, $state, $ionicPopup) {

    $scope.volver = function () {
      $state.go('tab.dash');
    };
    $scope.logout = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Salir',
        template: '¿Esta seguro que desea salir?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          //console.log('You are sure');
          $state.go('login');
        } else {
          console.log('You are not sure');
        }
      });
    };


    $scope.limpiarPedido = function () {
      $scope.menuObj =
        {
          id_menu: '',
          fecha: '',
          proveedor: '',
          comida: '',
          postre: '',
          precio: ''
        };
    }

    $scope.MostrarPedido = function () {
      $state.go('mostrar_pedido');
    };

    $scope.menuObj =
      {
        id_menu: '',
        fecha: '',
        proveedor: '',
        comida: '',
        postre: '',
        precio: ''
      };

    $scope.AltaPedido = function () {

      //una vez apretado el alta, empezamos con las validaciones de cada campo
      if ($scope.menuObj.id_menu == '') {
        alert('Ingrese el numero de pedido ');
        return;
      }
      else {
        if ($scope.menuObj.fecha == '') {
          alert('Ingrese la fecha de pedido ');
          return;
        }
      }
      if ($scope.menuObj.proveedor == '') {
        alert('Ingrese el nombre de proveedor');
        return;
      }
      if ($scope.menuObj.comida == '') {
        alert('Ingrese la comida');
        return;
      }
      if ($scope.menuObj.postre == '') {
        alert('Ingrese el postre');
        return;
      }
      if ($scope.menuObj.precio == '') {
        alert('Ingrese el precio del pedido');
        return;
      }
// $http.defaults.headers.post = {
      //          "Content-Type": "application/json"
      //  };

      $http({
        method: 'POST',
        url: 'http://irsosav.olympos.com.ar/menu',
        data: $scope.menuObj
      }).then(function (response) {
        alert('Su pedido ha sido enviado')
        scope.MostrarPedido = window.location.reload();
      }, function (response) {
        alert('hubo un error inesperado');
      });
    };
  })


  .controller('ListaMenuCtrl', function ($scope, $http, $state, $ionicPopup) {

    $scope.volver = function () {
      $state.go('tab.dash');
    };
    $http.get('http://irsosav.olympos.com.ar/menues')
      .success(function (response, data) {
        $scope.menu = data
        $scope.menu = response.data;
        console.log("Exito")
      });

    $scope.logout = //function() {
      //$state.go('login');
      function () {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Salir',
          template: '¿Esta seguro que desea salir?'
        });

        confirmPopup.then(function (res) {
          if (res) {
            //console.log('You are sure');
            $state.go('login');
          } else {
            console.log('You are not sure');
          }
        });

      };
  })


  .controller('ChatsCtrl', function ($scope, $timeout, Chats, FirebaseDB, $state) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    $scope.doLogout = function () {
      $timeout(function () {
        $state.go('login', {})
      }, 1);

      firebase.auth().signOut()


    }


    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })


  .controller('ChatDetailCtrl', function ($scope, $stateParams, $timeout, Chats, FirebaseDB, $state) {
    $scope.chat = Chats.get($stateParams.chatId);


    $scope.doLogout = function () {
      $timeout(function () {
        $state.go('login', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo ...");

    }
  })

  .controller('AccountCtrl', function ($scope, $stateParams, $timeout, Chats, FirebaseDB, $state) {
    $scope.settings = {
      enableFriends: true
    };


    $scope.doLogout = function () {
      $timeout(function () {
        $state.go('login', {})
      }, 1);

      firebase.auth().signOut()
      console.log("Saliendo ...");

    }

  });
