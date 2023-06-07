import { sequelize } from '../database/database.js';
import { Productos } from '../models/productos.js';

const obtenerProductos = async (req, res) => {
    console.log("Ingreso a obtener productos");
    const datosProductos = await Productos.findAll();
    console.log('datos de la bd',datosProductos);

    try {
        if(datosProductos.length === 0 || !datosProductos){
            return res.json({
                status: 200,
                message: 'No hay productos registrados',
            });
        }
        return res.json({
            status: 200,
            message: 'Productos obtenidos',
            data: datosProductos
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const insertarProducto = async (req, res) => {
    console.log(req.body);
    const { 
        str_producto_codigo,
        str_producto_nombre, 
        int_producto_cantidad,
        str_producto_marca,
        int_producto_precio,
        str_producto_proveedor
    } = req.body;

    try {
        const producto = await Productos.create({
            str_producto_codigo,
            str_producto_nombre,
            int_producto_cantidad,
            str_producto_marca,
            int_producto_precio,
            str_producto_proveedor
        });
    
        console.log('producto ', producto);
        res.json({
            status: 200,
            message: 'Producto insertado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const actualizarProducto = async (req, res) => {

    const { id } = req.params;
    console.log(id);
      const { 
        str_producto_codigo,
        str_producto_nombre, 
        int_producto_cantidad,
        str_producto_marca,
        int_producto_precio,
        str_producto_proveedor,
        str_producto_estado
    } = req.body;
    try {
        const producto = await Productos.update({
            str_producto_codigo,
            str_producto_nombre,
            int_producto_cantidad,
            str_producto_marca,
            int_producto_precio,
            str_producto_proveedor,
            str_producto_estado
            
        }, {
            where: { int_producto_id: id }
        });
    
        /*const producto = await Productos.update({
            str_producto_nombre,
            int_producto_cantidad
        }, {
            where: { int_producto_id: id }
        })*/
    
        console.log(producto[0]);
        /*const producto = await Productos.findOne({
            where: { int_producto_id: id }
        });*/
        if(!producto || producto[0] === 0){
            return res.json({
                status: false,
                message: 'El Producto a actualizar no existe',
            });
        }
        /*producto.str_producto_nombre = str_producto_nombre;
        producto.int_producto_cantidad = int_producto_cantidad;
        await producto.save();*/
    
        return res.json({
            status: true,
            message: 'Producto actualizado exitosamente',
            //body:producto
        });
    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
   
};

const eliminarProducto = async (req, res) => {

    console.log("Ingreso a eliminar producto");
    const { id } = req.params;
    console.log(id);
    try {
        const data = await Productos.destroy({
            where: { int_producto_id: id }
        });
    
        console.log('data ', data);
        if(data === 1){
            return res.json({
                status: 200,
                message: 'Producto eliminado exitosamente',
            });
        }
        return res.json({
            status: 200,
            message: 'El Producto a eliminar no existe',
        });
    
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};
export default {
    obtenerProductos,
    insertarProducto,
    actualizarProducto,
    eliminarProducto
};
