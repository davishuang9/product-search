import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, category, sku } = req.body;
      console.log("product", name, category, sku);
      const product = await prisma.product.create({
        data: { name, category, sku }
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong", error: e });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
