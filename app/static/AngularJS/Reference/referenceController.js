registrationModule.controller('referenceController', function($scope, alertFactory, referenceRepository, $rootScope,localStorageService) {
    $scope.message = 'Buscando...';
    $scope.message2 = 'Cargando PDF......';
    $scope.fechaHoy = new Date();
    $scope.searchTypeID = 1;
    localStorageService.clearAll('lgnUser');
    $rootScope.currentEmployee = 0;
    var wsData =[];
    var wsDataLot = [];
    $scope.currentIDClient = 15;
    $scope.isWaiting = false;
    $scope.panels = [
        { name: 'Factura', active: true, className: 'active' },
        { name: 'Pedidos', active: false, className: '' },
        { name: 'Cotizaciones', active: false, className: '' }
    ];
    $scope.storeParams = { idCliente: 0, idEmpresas: 0, idSucursales: 0, idDepartamentos: 0 };

    //this is the first method executed in the view
    $scope.init = function() {
        openCloseNav()
        $scope.idUsuario = 0;
        $scope.lote = false;
        $scope.individual = true;
        $scope.individualEmpresa = false;
        $scope.sucursal= false;
        $scope.departament = false;
        $scope.selectTypeDoc.show = false;
        $scope.getCompanyByUser();
        $scope.Clientefiltro = true;
        $scope.sinsuc = false;
        $scope.setTablePaging('prueba');
        $scope.searchType = "ID cliente";
            if (!($('#lgnUser').val().indexOf('[') > -1)) {
                localStorageService.set('lgnUser', $('#lgnUser').val());
                $scope.getEmpleado();
            } else {
                if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                    if (getParameterByName('employee') != '') {
                        $rootScope.currentEmployee = getParameterByName('employee');
                        $scope.getEmpleado();
                        //location.href = '/newUnits';
                    } else {
                        
                        alert('Inicie sesión desde panel de aplicaciones...');
                        location.href = '192.168.20.9:8085/Aplicaciones/index.html';
                    }
                }
            }
        $rootScope.currentEmployee = localStorageService.get('lgnUser');
        //$rootScope.currentEmployee = 12;
        $scope.getEmpleado($rootScope.currentEmployee);
    };

    $scope.lstClient = [];

    $scope.getClient = function(clientName) {
        $scope.lstClient = [];
         $scope.lstPedido = [];
        $('#tblPedido').DataTable().destroy();
        $scope.lstFactura = [];
        $('#tblFactura').DataTable().destroy();
        $scope.lstCotizacion = [];
        $('#tblReference').DataTable().destroy();
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $('#tblClient').DataTable().destroy();
        $('#loadModal').modal('show');
        $scope.showPanel1 = true;
        referenceRepository.getClientByName(clientName).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstClient = result.data;


                setTimeout(function() {
                    $scope.setTablePaging('tblClient');
                    $("#tblClient_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
            } else { $('#loadModal').modal('hide'); }
        });
    };
        
    $scope.getClientId = function(idBusqueda) {
        $scope.lstClient = [];
        $scope.lstPedido = [];
        $('#tblPedido').DataTable().destroy();
        $scope.lstFactura = [];
        $('#tblFactura').DataTable().destroy();
        $scope.lstCotizacion = [];
        $('#tblReference').DataTable().destroy();
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $scope.mostrar = false;
        $scope.showPanel1 = true;
        $scope.showPanel = false;
        $('#tblClient').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getClientById(idBusqueda).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstClient = result.data;
                /*setTimeout(function() {
                    $scope.setTablePaging('tblClient');
                    $("#tblClient_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);*/
            } else { $('#loadModal').modal('hide'); }
        });
    };

    $scope.lstFactura = [];
    $scope.lstFacturaDoc = [];

    $scope.getFacturaAllIdDoc = function(clientId) {
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturaAllIdDoc(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.numDoc = result.data.length;
                $scope.lstFacturaDoc = result.data;
                setTimeout(function() {
                    $scope.setTablePaging('tblFacturaDoc');
                    $("#tblFacturaDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
            alertFactory.facturas('Se encontraron: '+$scope.numDoc+' Factutas');
            } else { $('#loadModal').modal('hide');
            alertFactory.facturas('Se encontraron:0 Factutas'); }
        });
    };

    $scope.getFacturasIdDocEmp = function(clientId) {
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturasIdDocEmp(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFacturaDoc = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblFacturaDoc');
                    $("#tblFacturaDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
            alertFactory.facturas('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else { $('#loadModal').modal('hide');
            alertFactory.facturas('Se encontraron:0 Factutas'); }
        });
    };

    $scope.getFacturasAll = function(clientId) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturasAll(clientId).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.facturas('Se encontraron: ' + $scope.numDoc + ' Factutas');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.facturas('Se encontraron:0 Factutas');
            }
        });
    };

    $scope.getFacturasEmp = function(obj) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturasEmp(obj).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.facturas('Se encontraron: ' + $scope.numDoc + ' Factutas');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.facturas('Se encontraron:0 Factutas');
            }
        });
    };

    $scope.getFacturasSuc = function(obj) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturasSuc(obj).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.facturas('Se encontraron: ' + $scope.numDoc + ' Factutas');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.facturas('Se encontraron:0 Factutas');
            }
        });
    };

    $scope.getFacturasDepto = function(obj) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturasDepto(obj).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.facturas('Se encontraron: ' + $scope.numDoc + ' Factutas');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.facturas('Se encontraron:0 Factutas');
            }
        });
    };

    $scope.lstPedido = [];
    $scope.lstPedidoDoc = [];

    $scope.getpedidoAllIdDoc = function(clientId) {
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getpedidoAllIdDoc(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedidoDoc = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedidoDoc');
                    $("#tblPedidoDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                
                }, 1000);
            alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else {
                 alertFactory.pedidos('Se encontraron:0 Pedidos');
            }
        });
    };

    $scope.getPedidoIdDocEmp = function(clientId) {
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getPedidoIdDocEmp(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedidoDoc = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedidoDoc');
                    $("#tblPedidoDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                
                }, 1000);
            alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else {alertFactory.pedidos('Se encontraron:0 Pedidos');}
        });
    };

    $scope.getPedidosAll = function(clientId) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        referenceRepository.getPedidosAll(clientId).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.pedidos('Se encontraron: ' + $scope.numDocPe + ' Pedidos');
            } else { alertFactory.pedidos('Se encontraron:0 Pedidos'); }
        });
    };

    $scope.getPedidosEmp = function(obj) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        referenceRepository.getPedidosEmp(obj).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.pedidos('Se encontraron: ' + $scope.numDocPe + ' Pedidos');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.pedidos('Se encontraron:0 Pedidos');
            }
        });
    };

   $scope.getPedidosSuc = function(obj) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getPedidosSuc(obj).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.pedidos('Se encontraron: ' + $scope.numDocPe + ' Pedidos');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.pedidos('Se encontraron:0 Pedidos');
            }
        });
    };

    $scope.getPedidosDepto = function(obj) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getPedidosDepto(obj).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.pedidos('Se encontraron: ' + $scope.numDocPe + ' Pedidos');
            } else {
                $('#loadModal').modal('hide');
                alertFactory.pedidos('Se encontraron:0 Pedidos');
            }
        });
    };

    $scope.lstCotizacion = [];
    $scope.lstCotizaciondOC = [];

    $scope.getCotizacionAllIdDoc = function(idCliente) {
        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getCotizacionAllIdDoc(idCliente).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstCotizaciondOC = result.data;
                $scope.numDocCot = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblReferenceDoc');
                    $("#tblReferenceDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else {alertFactory.cotizacion('Se encontraron:0 Cotizaciones');}
        });
    };

    $scope.getCotizacionIdDocEmp = function(idCliente) {
        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getCotizacionIdDocEmp(idCliente).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstCotizaciondOC = result.data;
                $scope.numDocCot = result.data.length;

                setTimeout(function() {
                    $scope.setTablePaging('tblReferenceDoc');
                    $("#tblReferenceDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);
                alertFactory.cotizacion('Se encontraron: ' + $scope.numDocCot + ' Cotizaciones');
            } else { alertFactory.cotizacion('Se encontraron:0 Cotizaciones'); }
        });
    };

    $scope.getCotizacionAll = function(idCliente) {
        $scope.lstCotizacion = '';
        $('#tblReference').DataTable().destroy();
        referenceRepository.getCotizacionAll(idCliente).then(function(result) {
            if (result.data.length > 0) {
                $scope.lstCotizacion = result.data;
                $scope.numDocCot = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblReference');
                    $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
                alertFactory.cotizacion('Se encontraron: ' + $scope.numDocCot + ' Cotizaciones');
            } else { alertFactory.cotizacion('Se encontraron:0 Cotizaciones'); }
        });
    };

    $scope.getCotizacionEmp = function(obj) {
            $scope.lstCotizacion = '';
            $('#tblReference').DataTable().destroy();
            referenceRepository.getCotizacionEmp(obj).then(function(result) {
                if (result.data.length > 0) {
                    $scope.lstCotizacion = result.data;
                    $scope.numDocCot = result.data.length;  
                    setTimeout(function() {
                        $scope.setTablePaging('tblReference');
                        $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");
                        $('#loadModal').modal('hide');
                    }, 1000);
                alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
                } else { $('#loadModal').modal('hide'); 
            alertFactory.cotizacion('Se encontraron:0 Cotizaciones');}
            });
    };

    $scope.getCotizacionSuc = function(obj) {
           $scope.lstCotizacion = '';
           $('#tblReference').DataTable().destroy();
           $('#loadModal').modal('show');
           referenceRepository.getCotizacionSuc(obj).then(function(result) {
               if (result.data.length > 0) {
                   $scope.lstCotizacion = result.data;
                   $scope.numDocCot = result.data.length;
                   setTimeout(function() {
                       $scope.setTablePaging('tblReference');
                       $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");

                       $('#loadModal').modal('hide');
                   }, 1000);
                   alertFactory.cotizacion('Se encontraron: ' + $scope.numDocCot + ' Cotizaciones');
               } else {
                   $('#loadModal').modal('hide');
                   alertFactory.cotizacion('Se encontraron:0 Cotizaciones');
               }
           });
    };

    $scope.getCotizacionDepto = function(obj) {
       $scope.lstCotizacion = '';
       $('#tblReference').DataTable().destroy();
       $('#loadModal').modal('show');
       referenceRepository.getCotizacionDepto(obj).then(function(result) {
           if (result.data.length > 0) {
               $scope.lstCotizacion = result.data;
               $scope.numDocCot = result.data.length;
               setTimeout(function() {
                   $scope.setTablePaging('tblReference');
                   $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");
                   $('#loadModal').modal('hide');
               }, 1000);
               alertFactory.warning('Se encontraron: ' + $scope.numDocCot + ' Cotizaciones');
           } else {
               $('#loadModal').modal('hide');
               alertFactory.cotizacion('Se encontraron:0 Cotizaciones');
           }
        });
    };

    // Función para selecciobnar el idEmpresa y nombre 
    $scope.seletionCompany = function(idEmpresa, nombreEmpresa) {
        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = idEmpresa;
        $scope.getFacturasEmp($scope.storeParams);
        $scope.getPedidosEmp($scope.storeParams);
        $scope.getCotizacionEmp($scope.storeParams);
        $scope.idEmpresa = idEmpresa;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.idSucursal = null;
        $scope.nombreSucursal = null;
        $scope.departamentos = null;
        $scope.nombreDepartamento = null;
        $scope.getBranchOfficeByIdUser();
        $scope.sucursal= true;
         $scope.individualEmpresa = true;
    };

    $scope.seletionCompanyDoc = function(idEmpresa, nombreEmpresa) {
            //$scope.lstFacturaDoc = [];
            // $scope.lstPedidoDoc = [];
            // $scope.lstCotizaciondOC =[];
            $scope.storeParams.idDocumento = $scope.currentIDDocumento;
            $scope.storeParams.idEmpresas = idEmpresa;
            $scope.idEmpresa = idEmpresa;
            $scope.nombreEmpresa = nombreEmpresa;
            $scope.getFacturasIdDocEmp($scope.storeParams);
            $scope.getCotizacionIdDocEmp($scope.storeParams);
            $scope.getPedidoIdDocEmp($scope.storeParams);
            $scope.idSucursal = null;
            $scope.nombreSucursal = null;
            $scope.departamentos = null;
            $scope.nombreDepartamento = null;
            //$scope.getBranchOfficeByIdUser();
    };

    // Función para selecciobnar el idSucursal y nombre 
    $scope.seletionBranchoOffice = function(idSucursal, nombreSucursal) {
        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = $scope.idEmpresa;
        $scope.storeParams.idSucursales = idSucursal;
        $scope.getFacturasSuc($scope.storeParams);
        $scope.getPedidosSuc($scope.storeParams);
        $scope.getCotizacionSuc($scope.storeParams);
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.getDepartmentByIdUser();
        $scope.departament = true;
    };

    $scope.selectDepartment = function(idDepartamento, nombreDepartamento) {
        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = $scope.idEmpresa;
        $scope.storeParams.idSucursales = $scope.idSucursal;
        $scope.storeParams.idDepartamentos = idDepartamento;
        $scope.getFacturasDepto($scope.storeParams);
        $scope.getPedidosDepto($scope.storeParams);
        $scope.getCotizacionDepto($scope.storeParams);
        $scope.idDepartamento = idDepartamento;
        $scope.nombreDepartamento = nombreDepartamento;
    };

    $scope.selectTypeDoc = function(idDocumento, nombreDocumento) {
        $scope.selectTypeDoc.show = true;
        $scope.idDocumento = idDocumento;
        $scope.nombreDocumento = nombreDocumento;
        $scope.cleanInputs();
    };

    $scope.cleanInputs = function() {
        //$scope.nombreDocumento = null;
        $scope.facturaSerie = null;
        $scope.facturaFolio = null;
        $scope.cotizacionFolio = null;
        $scope.pedidoFolio = null;
    };

    $scope.tipoDocumentos = [{
        idDocumento: 1,
        nombreDocumento: 'Factura'
    }, {
        idDocumento: 2,
        nombreDocumento: 'Cotización'
    }, {
        idDocumento: 3,
        nombreDocumento: 'Pedido'
    }];

    $scope.getCompanyByUser = function() {
        $scope.promise = referenceRepository.getCompanyByUser($rootScope.currentEmployee ).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;

            } else {}
        });
    };

    $scope.getBranchOfficeByIdUser = function() {
        referenceRepository.getBranchOfficeByIdUser($rootScope.currentEmployee , $scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
            } else {}
        });
    };

    $scope.getDepartmentByIdUser = function() {
        referenceRepository.getDepartmentByIdUser($rootScope.currentEmployee , $scope.idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamentos = result.data;
            } else {}
        });
    };

    $scope.cotizacionDetalle = [];

    // Conversión de formatos de numeros
    $scope.currency =function (value, decimals, separators) {
        decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
        separators = separators || ['.', "'", ','];
        var number = (parseFloat(value) || 0).toFixed(decimals);
        if (number.length <= (4 + decimals))
            return number.replace('.', separators[separators.length - 1]);
        var parts = number.split(/[-.]/);
        value = parts[parts.length > 1 ? parts.length - 2 : 0];
        var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
            separators[separators.length - 1] + parts[parts.length - 1] : '');
        var start = value.length - 6;
        var idx = 0;
        while (start > -3) {
            result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
                + separators[idx] + result;
            idx = (++idx) % 2;
            start -= 3;
        }
        return (parts.length == 3 ? '-' : '') + result;
    };
    
    $scope.generateReference = function(obj) {
        $scope.cotizacionDetalle = obj;
                wsData.nombreEmpresa = obj.nombreEmpresa;
                wsData.idEmpresa = obj.idEmpresa;
                wsData.idSucursal = obj.idSucursal;
                wsData.idDepartamento = obj.idDepartamento;
                wsData.idTipoDocumento = obj.tipoDocumento; //hardcore
                wsData.serie = obj.serie;
                wsData.folio = obj.idDocumento;
                wsData.idCliente = obj.idCliente;
                wsData.idAlma = obj.estatus;
                wsData.saldo = obj.saldo;
                wsData.idTipoReferencia = 1;
    }

   $scope.generarPdf = function() {
       console.log('entro a generar referencia')
       $scope.idReferencia = "";
       $('#pnlProgress').modal('show');
       referenceRepository.getReferenceWS(wsData).then(function(result) {
           if (result.data.idReferencia > 0) {
               $scope.idReferencia = result.data.idReferencia;
               console.log($scope.idReferencia+'idReferencia')
               referenceRepository.generarPdf($scope.idReferencia).then(function(response) {
                    if (response.data.length > 0) {
                        console.log('response.data')
                       $scope.content = false;
                       console.log('type')
                        $scope.url = response.config.url;
console.log($scope.url)
                        window.open($scope.url+"?idReferencia="+$scope.idReferencia , "ventana1", "width=700,height=500,scrollbars=NO");
                        alertFactory.success('Se genero el pdf');
                        $('#pnlProgress').modal('hide');
                    }
                });
            }
            else {$('#pnlProgress').modal('hide');}
       });
   };

    $scope.getEmpleado = function() {
        referenceRepository.getEmpleado($rootScope.currentEmployee ).then(function(result) {
            if (result.data.length > 0) {
                $rootScope.empleado = result.data;
            } else {
                alertFactory.info("Datos Incorrectos");
            }
        }, function(error) {
            alertFactory.error("Datos no correctos");
        });
    };

    $scope.content = true;
    $scope.selectedOptionBank;

    $('#payInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
        console.log($scope.invoce)
    })

    $('#payInvoceModal').on('hide.bs.modal', function(e) {
        $scope.payMethod = ""
        $scope.pendingInvoceModalForm.$setPristine();
        $('.lineaCaptura').remove();
        $scope.content = true;
    })

    $scope.setSearchType = function(val) {
      if (val == 1) {
          $scope.searchType = "ID cliente";
          $scope.searchTypeID = 1;
          $scope.nombreEmpresa = '';
      } else {
          if (val == 2) {
              $scope.searchType = "Nombre Cliente";
              $scope.searchTypeID = 2;
          } else {
              $scope.searchType = "ID  Documento";
              $scope.searchTypeID = 3;
          }
      }

      $scope.txtSearchClient = "";
    }

    $scope.searchDocs = function(obj) {
        $scope.lstPedido = [];
        $scope.lstFactura = [];
        $scope.lstCotizacion = [];
        $scope.showPanel = true;
        $scope.currentIDClient = obj.idCliente;
        $scope.getClientId($scope.currentIDClient);
        $scope.getCotizacionAll(obj.idCliente);
        $scope.getFacturasAll(obj.idCliente);
        $scope.getPedidosAll(obj.idCliente);
    }

    $scope.searchClients = function() {
        if ($scope.searchTypeID == 1) {
            $scope.showPanel = true;
            $scope.individualEmpresa = false;
            $scope.lote = false,
            $scope.individual = true;
            $scope.Clientefiltro = true;
            $scope.DocumentoFiltro = false;
            $scope.sucursal= false;
            $scope.departament = false;
            $scope.lstPedido = [];
            $scope.lstFactura = [];
            $scope.lstCotizacion = [];
            $scope.getClientId($scope.txtSearchClient);
            $scope.currentIDClient = $scope.txtSearchClient;
            $scope.getCotizacionAll($scope.txtSearchClient);
            $scope.getFacturasAll($scope.txtSearchClient);
            $scope.getPedidosAll($scope.txtSearchClient);
            $scope.nombreEmpresa = '';
            $scope.idEmpresa = null;
            $scope.idDepartamento = null;
        } else {
            if($scope.searchTypeID == 2){
                $scope.Clientefiltro = true;
                $scope.DocumentoFiltro = false;
                $scope.mostrar = true;
                $scope.nombreEmpresa = '';
                $scope.idEmpresa = null;
                $scope.lstPedido = [];
                $scope.lstFactura = [];
                $scope.lstCotizacion = [];
                $scope.getClient($scope.txtSearchClient);
                $scope.showPanel = true;
                $scope.showPanel1 = false;
        }else{
                $scope.nombreEmpresa = '';
                $scope.Clientefiltro = false;
                $scope.DocumentoFiltro = true;
                $scope.idEmpresa = null;
                $scope.lstPedido = [];
                $('#tblPedido').DataTable().destroy();
                $scope.lstFactura = [];
                $('#tblFactura').DataTable().destroy();
                $scope.lstCotizacion = [];
                $('#tblReference').DataTable().destroy();
                $scope.lstFacturaDoc = '';
                $('#tblFacturaDoc').DataTable().destroy();
                $scope.lstPedidoDoc = '';
                $('#tblPedidoDoc').DataTable().destroy();
                $scope.lstCotizaciondOC = '';
                $('#tblReferenceDoc').DataTable().destroy();
                $scope.currentIDDocumento = $scope.txtSearchClient;
                $scope.getFacturaAllIdDoc($scope.currentIDDocumento);
                $scope.getpedidoAllIdDoc($scope.currentIDDocumento);
                $scope.getCotizacionAllIdDoc($scope.currentIDDocumento);
                $scope.showPanel = false;
                $scope.showPanel1 = false;
            }
        }
    }

    $scope.setActiveClass = function(currentTab) {
        for (var i = 0; i < $scope.panels.length; i++) {
            $scope.panels[i].active = false;
            $scope.panels[i].className = "";
        }
        currentTab.active = true;
        currentTab.className = "active";
    };

    $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [{
                extend: 'excel',
                title: 'ExampleFile'
            }, {
                extend: 'print',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }]
        });
    };

    $scope.arrayDataLot = [];
    $scope.valorCheckBoxTabla = function (id,obj) {
        $scope.totalPago = 0;
        if (id == false || id == undefined) {
            // $scope.idBorrar = obj.IDB;
            // console.log($scope.idBorrar+'idTabla')
            // $scope.ide = 0;
            // for(var i = 0; i < $scope.arrayDataLot.length;i++){
            //     if($scope.arrayDataLot[i].idTable == $scope.idBorrar){
            //         $scope.ide = i;
            //         console.log('entro');
            //         console.log($scope.ide);
            //         $scope.arrayDataLot.splice($scope.ide,1);
            //     }else{
            //         console.log('no entra aun');
            //     }
            // };
        } else {
           $scope.arrayDataLot.push({
                idTabla:obj.IDB, 
                nombreEmpresa : obj.nombreEmpresa,
                idEmpresa : obj.idEmpresa,
                nombreSucursal: obj.nombreSucursal,
                nombreDepartamento: obj.nombreDepartamento,
                idSucursal : obj.idSucursal,
                idDepartamento : obj.idDepartamento,
                idTipoDocumento : obj.tipoDocumento, 
                nombreCliente: obj.nombreCliente, //hardcore
                serie : obj.serie,
                folio : obj.idDocumento,
                idCliente : obj.idCliente,
                idAlma : obj.estatus,
                saldo : obj.saldo,
                idTipoReferencia: 2
                });
        }

        for(var i = 0; i < $scope.arrayDataLot.length;i ++){

        $scope.totalPago += parseFloat($scope.arrayDataLot[i].saldo);
        
        }

    };

     $scope.generarPdfLotes = function() {
       $scope.idReferencia = "";
       
       $('#pnlProgresso').modal('show');
       referenceRepository.getReferenceWS($scope.arrayDataLot[0]).then(function(result) {
           if (result.data.idReferencia > 0) {
               $scope.idReferencia = result.data.idReferencia;
                $scope.arrayDataLot.forEach(function (arrayDataLot) {
                    referenceRepository.addDetailsReference($scope.idReferencia,arrayDataLot.idSucursal
                                                        ,arrayDataLot.idDepartamento,arrayDataLot.idTipoDocumento,
                                                        arrayDataLot.serie,arrayDataLot.folio,arrayDataLot.idCliente,
                                                        arrayDataLot.idAlma,arrayDataLot.saldo)
                                                        .then(function (nuevos) {
                    if (nuevos.data.length > 0) {
                        console.log('Se guardo bien')
                    }else{
                        console.log('Error al Guardar')
                    }
                    });
                });
               referenceRepository.generarPdf($scope.idReferencia).then(function(response) {
                    if (response.data.length > 0) {
                        console.log('response.data')
                       $scope.content = false;
                       console.log('type')
                        $scope.url = response.config.url;
console.log($scope.url)
                        window.open($scope.url+"?idReferencia="+$scope.idReferencia , "ventana1", "width=700,height=500,scrollbars=NO");
                        alertFactory.success('Se genero el pdf');
                        $('#pnlProgresso').modal('hide');
                    }
                });
            }
            else {$('#pnlProgress').modal('hide');}
       });
   };
    $scope.detalleLotes = function(){
        $scope.lote = true;
        $scope.individual = false;
    }

    $scope.referenceLote = function(){
        $scope.lote = true;
        $scope.individual = false;
        $scope.individualEmpresa = false;
    }

    $scope.cancelReferenceLote = function(){
        $('input[type=checkbox]').attr('checked', false);
        $scope.arrayDataLot = [];
        $scope.lote = false;
        $scope.individual = true;
        $scope.individualEmpresa = true;
    }
    $scope.cerrarModalLotes = function(){
        $('input[type=checkbox]').attr('checked', false);
        $scope.arrayDataLot = [];
        $scope.lote = false;
        $scope.individual = true;
        $scope.individualEmpresa = true;
    }
});
