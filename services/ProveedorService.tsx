import { PrismaClient } from "@prisma/client";

export default class ProveedorService
{
    private static prisma = new PrismaClient()

    async insertProveedor(request: {nombre : string, email : string})
    {
        let object = await ProveedorService.prisma.proveedor.create(
            {
                data:
                {
                    nombre : request.nombre,
                    mail : request.email
                }
            });
        return object;
    }
}
