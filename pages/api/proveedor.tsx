import { NextApiRequest, NextApiResponse } from "next";
import ProveedorService from "../../services/ProveedorService";

const service = new ProveedorService();

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
    service.insertProveedor(data)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió")});
}