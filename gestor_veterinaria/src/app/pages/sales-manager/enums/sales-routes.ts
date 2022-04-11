export enum SalesRoutes {
    /**Crea un pedido */
    cPedido='/salesManager/createOrder',
    /**Actualiza un pedido */
    uPedido='/salesManager/updateOrder',
    /**Elimina un pedido */
    dPedido='/salesManager/deleteOrder',
    /**OPtiene listado de pedidos */
    getAllPedidos='/salesManager/getPedidos',
    /**Crea un pedido con sequelize*/
    cPedidoSquelize='/salesManager/cOrder',



    /**Crea un detalle de pedido */
    cDetailOrder='/salesManager/createOrderDetail',
    /**Actualiza un detalle de pedido */
    uDetailOrder='/salesManager/updateOrderDetail',
    /**Elimina un detalle de pedido */
    dDetailOrder='/salesManager/deleteOrderDetail',
    /**Obtiene el detalle de un pedido */
    getDetailOrder='/salesManager/getDetailByOrder/',
    /**Carga de forma masiva detalles de un pedidos */
    bulkDetalles='/salesManager/bulkDetalles',



    /**Crea una devolucion */
    cDevolucion='/salesManager/createDevolution',
    /**Actualiza una devolucion */
    uDevolucion='/salesManager/updateDevolution',
    /**Elimina una devolucion */
    dDevolucion='/salesManager/deleteDevolution',
    /**Obtiene todas las devoluciones */
    getAllDevolucion='/salesManager/getAllDevoluciones',
    /**Obtiene devoluciones de un pedido */
    getDevolucion='/salesManager/getAllDevolucionesByOrder/',

    /**Consulta la vista de inventario */
    getViewInv='/salesManager/vewDetailInv',
}
 