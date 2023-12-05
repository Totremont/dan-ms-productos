import { NextApiRequest, NextApiResponse } from "next";
import OPService from "../../services/OrdenProvisionService";

const service = new OPService();

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

function postHandler(req : NextApiRequest, res: NextApiResponse)    //Json Body
{
    let data = req.body;
    service.insert(data)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió " + err)});
}

function getIdHandler(req : NextApiRequest, res: NextApiResponse) 
{
    let data = req.query.id[0];
    let id = parseInt(data);
    service.findById(id)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió " + err)});
}

function getProveedorHandler(req : NextApiRequest, res: NextApiResponse) 
{
    let data = req.query.id[0];
    let id = parseInt(data);
    service.findByProveedor(id)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió " + err)});
}

function getDateHandler(req : NextApiRequest, res: NextApiResponse) //JSON BODY
{
    let data = req.body
    service.findByDate(data)
    .then((result) => {res.status(200).json(result)})
    .catch((err) => {res.status(400).send("Se pudrió " + err)});
}