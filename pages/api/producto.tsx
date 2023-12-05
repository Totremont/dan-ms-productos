//  Get: findById | Post : create | Put : update

import { NextApiRequest, NextApiResponse } from "next";
import ProductoService from "../../services/ProductoService";

const service = new ProductoService();

export default function handler(req : NextApiRequest ,res : NextApiResponse )
{
    switch(req.method)
    {
        case "GET":
            if(req.query.hasOwnProperty("id")) getIdHandler(req,res);
            else getCriteriaHandler(req,res);
            break;
        case "POST":
            postHandler(req,res);
            break;
        default:
            res.status(400).send("No hay handler para la petición" + req.method)
            break;

    }
}


function getIdHandler(req : NextApiRequest, res: NextApiResponse) // /api/producto?id=
{
    let param = req.query;
    let id = parseInt(param.id[0]);
    service.findProductoById(id)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió")});
    
}

function postHandler(req : NextApiRequest, res: NextApiResponse) // /api/producto | json body
{
    let producto = req.body;
    service.insertProducto(producto)
    .then((result) => res.status(200).json(result))
    .catch((err) => {res.status(400).send("Se pudrió")}); 
}

function getCriteriaHandler(req : NextApiRequest, res: NextApiResponse) // /api/producto | json body
{
    let param = req.body;
    service.findBy(param)
    .then((result) => res.status(200).json(result))
    .catch((err) => {res.status(400).send("Se pudrió " + err)}); 

}