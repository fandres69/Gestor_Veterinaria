export enum SmEnum {
    /**Creación productos */
    cProduct='/stockManager/newProduct',
    /**Consulta productos */
    fProduct='/stockManager/findProduct',
    /**Actualización productos */
    uProduct='/stockManager/updateProduct',
    /**Eliminación productos */
    dProduct='/stockManager/deleteProduct',
    /**búsqueda productos con criterio*/
    getProduct='/stockManager/getProducts/',
    /**Obtiene el listado de productos */
    getAllProducts='/stockManager/getAllProducts',

    /**Creación inventario */
    cStock='/stockManager/newStock',
    /**Consulta inventario */
    fStock='/stockManager/findStock',
    /**Actualización inventario */
    uStock='/stockManager/updateStock',
    /**Eliminación inventario */
    dStock='/stockManager/deleteStock',
    /**búsqueda inventario con criterio*/
    getStock='/stockManager/getStocks/',
    /**búsqueda inventario por Id*/
    getStockId='/stockManager/getStockId/',
    /**Obtiene el inventario total */
    getCompleteStock='/stockManager/getCompleteStock',

    /**Creación servicio */
    cServicio='/stockManager/newService',
    /**Consulta servicio */
    fServicio='/stockManager/findService',
    /**Actualización servicio */
    uServicio='/stockManager/updateService',
    /**Eliminación servicio */
    dServicio='/stockManager/deleteService',
    /**búsqueda servicio con criterio*/
    getServicio='/stockManager/getServicios/',

    
    /**Consulta la vista de inventario */
    getAllServicio='/stockManager/getAllServicios',
    
   

    /**Creación entradas de inventario */
    cIngresosInv='/stockManager/createStockIn',
    /**Consulta entradas de inventario */
    fIngresosInv='/stockManager/findStockIn',
    /**Actualización entradas de inventario */
    uIngresosInv='/stockManager/updateStockIn',
    /**Eliminación entradas de inventario */
    dIngresosInv='/stockManager/deleteStockIn',
    /**búsqueda entradas de inventario con criterio*/
    getIngresosInv='/stockManager/getStocksIn/',

    getAllIngresosInv='/stockManager/getAllStocksIn',

     
}
