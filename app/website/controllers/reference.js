var ReferenceView = require('../views/reference'),
    ReferenceModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Reference = function (conf) {
    this.conf = conf || {};

    this.view = new ReferenceView();
    this.model = new ReferenceModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Reference.prototype.get_generarPdf = function (req, res, next) {
    var self = this;
  var self = this;
       var params = [{
        name: 'idReferencia',
        value: req.query.idReferencia,
        type: self.model.types.INT
    }]
    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            //inicia Page.property
            page.property('paperSize', {
                format: 'A4'
            }).then(function () {
            page.open("http://192.168.20.89:4430/api/reference/getDetalleReferenciaById?idReferencia=" + req.query.idReferencia).then(function (status) {
                page.render('Reporte_90.pdf').then(function () {
                    page.close();
                    ph.exit();
                    setTimeout(function () {
                        res.sendFile("Reporte_90.pdf", {
                            root: path.join(__dirname, '../../../')
                        });
                    }, 1)
                    console.log('creo pdf')
                });
            });
        });
        });
    });
};


Reference.prototype.get_facturasAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturasEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_EMPRESAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturasIdDocEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento,type: self.model.types.STRING},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_IDDOC_EMPRESA__SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidoIdDocEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento,type: self.model.types.STRING},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS__IDDOC_EMPRESA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_cotizacionIdDocEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento,type: self.model.types.STRING},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_IDDOC_EMPRESAS__SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturasSuc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturasDepto = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT},
    {name: 'idDepartamentos',value: req.query.idDepartamentos,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_DEPARTAMENTOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidosAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidosEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_EMPRESA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidosSuc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidosDepto = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT},
    {name: 'idDepartamentos',value: req.query.idDepartamentos,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_DEPARTAMENTO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_cotizacionAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_cotizacionAllIdDoc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento ,type: self.model.types.STRING}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_IDDOC__SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturaAllIdDoc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento ,type: self.model.types.STRING}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_IDDOC_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidoAllIdDoc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento ,type: self.model.types.STRING}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS__IDDOCSP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_cotizacionEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_EMPRESAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_cotizacionSuc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_cotizacionDepto = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT},
    {name: 'idDepartamentos',value: req.query.idDepartamentos,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_DEPARTAMENTOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_clientByName = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'varBusqueda',
        value: req.query.clientName,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_CLIENTE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_clientById = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'idBusqueda',
        value: req.query.idBusqueda,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CLIENTE_ID_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_companyByUser = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }];

    this.model.query('SEL_EMPRESA_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_branchOfficeByIdUser = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idEmpresa',
            value: req.query.idEmpresa,
            type: self.model.types.INT
        }];

    this.model.query('SEL_SUCURSAL_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_departmentByIdUser = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idSucursal',
            value: req.query.idSucursal,
            type: self.model.types.INT
        }];

    this.model.query('SEL_DEPARTAMENTO_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_docReference = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
            name: 'serie',
            value: req.query.serie,
            type: self.model.types.STRING
        },
        {
            name: 'folio',
            value: req.query.folio,
            type: self.model.types.STRING
        }];

    this.model.query('SEL_FACTURA_DATOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        }//,res.render('contrato.html', result[0]) 
                           );
    });
};

Reference.prototype.get_referenceWS = function (req, res, next) {
   //Con req.query se obtienen los parametros de la url
   //Ejemplo: ?p1=a&p2=b
   //Retorna {p1:'a',p2:'b'}
   //Objeto que envía los parámetros
   //var params = [];
   //Referencia a la clase para callback  
   var self = this;
   var params = []
   if (req.query.serie, req.query.folio) {
       params.push({
           name: 'idEmpresa',
           value: req.query.idEmpresa,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idSucursal',
           value: req.query.idSucursal,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idDepartamento',
           value: req.query.idDepartamento,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idTipoDocumento',
           value: req.query.idTipoDocumento,
           type: self.model.types.STRING
       });
       params.push({
           name: 'serie',
           value: req.query.serie,
           type: self.model.types.STRING
       });
       params.push({
           name: 'folio',
           value: req.query.folio,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idCliente',
           value: req.query.idCliente,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idAlma',
           value: req.query.idAlma,
           type: self.model.types.STRING
       });
       params.push({
           name: 'importeDocumento',
           value: req.query.importeDocumento,
           type: self.model.types.DECIMAL
       });
       params.push({
           name: 'idTipoReferencia',
           value: req.query.idTipoReferencia,
           type: self.model.types.INT
       });
       getReferenceFromWS(this.conf.parameters.WSReference,req.query.idEmpresa, req.query.idSucursal, req.query.idDepartamento,req.query.idTipoDocumento, req.query.serie, req.query.folio, req.query.idCliente,req.query.idAlma,req.query.importeDocumento,req.query.idTipoReferencia,
           function (err, data) {
               self.model.query('SEL_FACTURA_DATOS_SP', params, function (error, result) {
                   self.view.expositor(res, {
                       err: err,
                       result:data
                   });
                   
                   if (err) {
                       console.log('Error 1')
                   } else {
                       console.log(result)
                       console.log("todo bien");
                   }
               });
           });

   } else {
       console.log('Error 2')
   }
};

Reference.prototype.get_getEmpleado = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpleado', value: req.query.idEmpleado, type: self.model.types.INT }];

    this.model.query('SEL_EMPLEADO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.post_addDetailsReference = function(req, res, next) {
        //Referencia a la clase para callback
        var self = this;
        //Asigno a params el valor de mis variables
        var params = [{ name: 'idReferencia', value: req.body.idReferencia, type: self.model.types.INT },
            { name: 'idSucursal', value: req.body.idSucursal, type: self.model.types.INT },
            { name: 'idDepartamento', value: req.body.idDepartamento, type: self.model.types.INT },
            { name: 'idTipoDocumento', value: req.body.idTipoDocumento, type: self.model.types.INT },
            { name: 'serie', value: req.body.serie, type: self.model.types.STRING },
            { name: 'folio', value: req.body.folio, type: self.model.types.STRING },
            { name: 'idCliente', value: req.body.idCliente, type: self.model.types.INT },
            { name: 'idAlma', value: req.body.idAlma, type: self.model.types.STRING },
            { name: 'importeDocumento', value: req.body.importeDocumento, type: self.model.types.DECIMAL }
        ];
        this.model.post('INS_DETALLE_REFERENCIA_LOTE_SP', params, function(error, result) {
            //Callback
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
}

function getReferenceFromWS(url, idEmpresa, idSucursal,idDepartamento, idTipoDocumento, serie, folio, idCliente,idAlma, importeDocumento,idTipoReferencia, cb) {
   request.get(url + "?idEmpresa=" + idEmpresa + "&idSucursal=" + idSucursal + "&idDepartamento=" + idDepartamento 
    + "&idTipoDocumento=" + idTipoDocumento + "&serie=" + serie + "&folio="+ folio +"&idCliente=" + idCliente 
    +"&idAlma="+ idAlma + "&importeDocumento="+importeDocumento+"&idTipoReferencia="+idTipoReferencia, 
    function (error, response, body) {
       if (!error && response.statusCode == 200) {
           body = JSON.parse(body);
           //console.log(body)
           cb(null, body);
       } else {
           cb(error)
       }
   })
};


Reference.prototype.get_getDetalleReferenciaById = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idReferencia', value: req.query.idReferencia, type: self.model.types.INT }];

    self.model.query('SEL_DETALLE_REFERENCIA_SP', params, function(error, result) {
        var params2 = [{
            name: 'idEmpresa',
            value: result[0].idEmpresa,
            type: self.model.types.INT
        },{
            name: 'tipoReferencia',
            value: result[0].tipoReferencia,
            type: self.model.types.INT
        }]
        self.model.query('SEL_LEYENDAS_PDF_SP', params2, function (error, leyendas) {
            self.model.query('SEL_DETALLE_REFERENCIA_TOTAL_PAGO_SP', params, function (error, pago) {
            res.render('referencia2.html',{referencias:result, leyendas:leyendas , pago:pago});
            });
        });
    });
};

module.exports = Reference;

