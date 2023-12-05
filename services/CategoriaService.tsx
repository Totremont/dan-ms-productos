import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CategoriaService
{
    async insertCategoria(request: {nombre : string})
    {
        let object = await prisma.categoria.create(
            {
                data:
                {
                    nombre : request.nombre
                }
            });
        return object;
    }

    async findById(request_id : number)
    {
        let object = await prisma.categoria.findUniqueOrThrow(
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
        let object = await prisma.categoria.findFirstOrThrow(
            {
                where:
                {
                    nombre : request_nombre
                }
            });
        return object;
    }
}