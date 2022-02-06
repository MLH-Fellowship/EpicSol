import type { NextPage, GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import prisma from "../lib/prisma";

//components
import Carousel from "../components/Carousel/index";
import GameListItem from "../components/GameListItem/index";
import { useEffect, useState } from "react";



const Home: NextPage = (props) => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axios.get("http://localhost:3000/api/products");
      setProducts(data.data);
    })();
  }, []);
  return (
    <div className="bg-appBlack min-h-screen py-[100px]">
      <div className="w-[75%] mx-auto">
        <Carousel />
        <ul className="grid grid-cols-6 gap-6 mt-14">
          {products.map((item, index) => (
            <GameListItem key={index} game={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
