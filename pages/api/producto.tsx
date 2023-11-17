//  Get: findById | Post : create | Put : update

import { NextApiRequest, NextApiResponse } from "next";
import { findProductoById, insertProducto } from "../../services/ProductoService";

export default function handler(req : NextApiRequest ,res : NextApiResponse )
{
    switch(req.method)
    {
        case "GET":
            getHandler(req,res);
            break;
        case "POST":
            postHandler(req,res);
            break;
        default:
            res.status(400).send("No hay handler para la petición" + req.method)
            break;

    }
}


function getHandler(req : NextApiRequest, res: NextApiResponse) // /api/producto?id=
{
    let param = req.query;
    let id = parseInt(param.id[0]);
    findProductoById(id)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió")});
    
}

function postHandler(req : NextApiRequest, res: NextApiResponse) // /api/producto | json body
{
    let producto = req.body;
    insertProducto(producto)
    .then((result) => res.status(200).json(result))
    .catch((err) => {res.status(400).send("Se pudrió")});
    
    
}