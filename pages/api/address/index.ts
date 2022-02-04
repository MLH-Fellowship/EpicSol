import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async(req,res) => {
    try {
        const {firstName,lastName,email,address,suite,city,country,postalCode} = req.body;
        const result = await prisma.address.create({
            data:{
                first_name:firstName,
                last_name:lastName,
                City:city,
                Country:country,
                address:address,
                postal_code:postalCode,
                suite:suite,
                user:{
                    connect:{
                        email:email,
                }
            }}
        })
        console.log(result);
        return res.status(400).json(result);
    } catch (error) {
        console.log("Address",error);
        return res.status(500).send(error);
    }
})

export default handler;
