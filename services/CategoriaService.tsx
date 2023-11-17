import { PrismaClient } from "@prisma/client";

export default class CategoriaService
{
    private static prisma = new PrismaClient()

    async insertCategoria(request: {nombre : string})
    {
        let object = await CategoriaService.prisma.categoria.create(
            {
                data:
                {
                    nombre : request.nombre
                }
            });
        return object;
    }
}