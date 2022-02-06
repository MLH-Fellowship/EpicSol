import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async(req,res) => {
    try {
        console.log("ORDER")
        const {email,productId,quantity,amt} = req.body;
        const res = await prisma.order.create({
            data:{
                quantity:quantity,
                total:amt,
                product:{
                    connect:{
                        id:productId
                    }
                },
                user:{
                    connect:{
                        email:email
                    }
                },
   
            }
        })
        console.log(res);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})




export default handler;