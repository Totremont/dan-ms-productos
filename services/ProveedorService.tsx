import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class ProveedorService
{
    async insertProveedor(request: {nombre : string, email : string})
    {
        let object = await prisma.proveedor.create(
            {
                data:
                {
                    nombre : request.nombre,
                    mail : request.email
                }
            });
        return object;
    }

    async findById(request_id : number)
    {
        let object = await prisma.proveedor.findUniqueOrThrow(
            {
                where:
                {
                    id : request_id
                }
            });
        return object;
    }

    async findByNombre(request_nombre : string)
    {
        let object = await prisma.proveedor.findFirstOrThrow(
            {
                where:
                {
                    nombre : request_nombre
                }
            });
        return object;
    }
}
