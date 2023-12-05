import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class ProductoService
{
    async insertProducto(request: {nombre : string, descripcion : string, stockActual : number,
        proveedorId : number, categoriaId : number})
    {
        let object = await prisma.producto.create(
            {
                data:
                {
                    nombre : request.nombre,
                    descripcion : request.descripcion,
                    proveedor:
                    {
                        connect:
                        {
                            id: request.proveedorId
                        }
                    },
                    categoria:
                    {
                        connect:
                        {
                            id: request.categoriaId
                        }
                    },
                    stockActual : request.stockActual
                },
                include:
                {
                    proveedor : true,
                    categoria : true
                }
            });
        return object;
    }

    async updateProducto(request: {id : number,nombre : string, descripcion : string, stockActual : number})
    {
        let object = await prisma.producto.update(
            {
                where:
                {
                    id : request.id
                },
                data:
                {
                    nombre : request.nombre,
                    descripcion : request.descripcion,
                    stockActual : request.stockActual
                }
            });
        return object;
    }

    async deleteProducto(request_id : number)
    {
        let object = await prisma.producto.delete(
            {
                where:
                {
                    id : request_id
                }
            });
        return object;
    }

    async findProductoById(request_id : number)
    {
        let object = await prisma.producto.findUniqueOrThrow(
            {
                where:
                {
                    id : request_id
                },
                include:
                {
                    proveedor : true,
                    categoria : true
                }
            });
        return object;
    }

    async findBy(criteria : {nombre?,proveedor?,categoria?,stock?} 
        = {nombre : "",proveedor : "", categoria : ""})
    {
        let object = await prisma.producto.findMany(
            {
                where:
                {
                    AND:
                    [
                        {
                            nombre : {contains : criteria.nombre}
                        },
                        {
                            proveedor : {is : {nombre : {contains : criteria.proveedor}}}
                        },
                        {
                            categoria : {is : {nombre : {contains : criteria.categoria}}}
                        },
                        {
                            stockActual : criteria.hasOwnProperty("stock") ? {equals : criteria.stock} : {gt : -1}
                        },
                    ]
                },
                include:
                {
                    proveedor : true,
                    categoria : true
                }
            });
        return object;
    }
}