import { PrismaClient } from "@prisma/client";
import ProductoService from "../services/ProductoService";

const prisma = new PrismaClient();
const productoService = new ProductoService();

export default class OPService
{
    async insert(request: {recepcion? : Date, proveedor_id : number, 
        cantidades : number[],productos : number[],precios : number[]
     })
    {
        let orden = await prisma.ordenProvision.create(
            {
                data:
                {
                    fechaRecepcion : request.recepcion ? request.recepcion : null,
                    proveedor : 
                    {
                        connect: { id : request.proveedor_id}
                    }              
                }
            });

        request.productos.forEach(async (current_id,index) => 
        {
            let producto = await productoService.findProductoById(current_id);
            if(producto.proveedorId != request.proveedor_id 
                || producto.stockActual < request.cantidades[index] )
            {
                throw new Error("No hay suficiente stock o el producto no es del proveedor")
            }
            else await prisma.ordenProvisionDetalle.create(
                {
                    data:
                    {
                        ordenProvision : 
                        {
                            connect: { id : orden.id}
                        },
                        cantidad : request.cantidades[index],
                        producto : 
                        {
                            connect:{id : current_id }
                        },
                        precio : request.precios[index]
                    }
                });
            await prisma.producto.update(
                {
                    where : {id : current_id},
                    data:
                    {
                        stockActual : producto.stockActual - request.cantidades[index]
                    }
                });

        }) 

        let ordenFinal = await prisma.ordenProvision.findUniqueOrThrow(
            {
                where : {id : orden.id},
                include :
                {
                    detalles : {include : {producto : true}}
                }
            });

            return ordenFinal
        
    }

    async update(recibida : boolean, orden_id : number)    //Si no es recibida fue cancelada
    {
        let object;
        let ar : number[] = undefined
        if(recibida)
        {
            object = await prisma.ordenProvision.update(
                {
                    where : {id : orden_id},
                    data :
                    {
                        fechaRecepcion : new Date(),
                        esCancelada : false
                    }
                })
        }
        else
        {
            object = await prisma.ordenProvision.update(
                {
                    where : {id : orden_id},
                    data :
                    {
                        esCancelada : true,
                        fechaRecepcion : null
                    }
                })
        }
        return object;
    }  


    async findByDate(request : {recepcion? : Date, generacion? : Date})
    {
        let objects = await prisma.ordenProvision.findMany(
            {
                where:
                {
                    AND:
                    [
                        request.recepcion ? {fechaRecepcion : request.recepcion} : {},
                        request.generacion ? {fechaGeneracion : request.generacion}: {}
                    ]
                },
                include:
                {
                    proveedor : true,
                    detalles : true
                }
            })
        return objects
    }

    async findById(request_id)
    {
        let object = await prisma.ordenProvision.findUniqueOrThrow(
            {
                where : {id : request_id}
            })
        return object;
    }

    async findByProveedor(request_id)
    {
        let objects = await prisma.ordenProvision.findMany(
            {
                where : {proveedor : {is: {id : request_id}}}
            })
        return objects;
    }
}