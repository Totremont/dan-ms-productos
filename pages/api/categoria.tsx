import { NextApiRequest, NextApiResponse } from "next";
import CategoriaService from "../../services/CategoriaService";

const service = new CategoriaService();

export default function handler(req : NextApiRequest ,res : NextApiResponse )
{
    switch(req.method)
    {
        case "POST":
            postHandler(req,res);
            break;
        default:
            res.status(400).send("No hay handler para la petición" + req.method)
            break;

    }
}

function postHandler(req : NextApiRequest, res: NextApiResponse)
{
    let data = req.body;
    service.insertCategoria(data)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió")});
}