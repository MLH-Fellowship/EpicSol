import type { NextPage, GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import prisma from "../lib/prisma";

//components
import Carousel from "../components/Carousel/index";
import GameListItem from "../components/GameListItem/index";
import { useEffect } from "react";

const dummyData = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992001/valorant_q2na9f.jpg",
    title: "Valorant",
    price: 19.99,
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991993/tomb-raider_qgnyry.jpg",
    title: "Rise of The Tomb Raider",
    price: 29.99,
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992049/star_wars_m74ht5.jpg",
    title: "Star Wars Battlefront II",
    price: 39.99,
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992128/god_of_war_poster_zedurd.jpg",
    title: "God of War",
    price: 59.99,
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991965/borderlands_tshpmg.jpg",
    title: "Borderlands 3",
    price: 39.99,
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991974/cyberpunk_poster_uo4smj.png",
    title: "Cyberpunk 2077",
    price: 26.99,
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991955/abyss_fbouk0.jpg",
    title: "Neon Abyss",
    price: 6.99,
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992089/hitman_mnf3ao.jpg",
    title: "Hitman III",
    price: 15.99,
  },
  {
    id: 9,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992072/kena_poster_aiusgj.jpg",
    title: "Kena: Bridge of Spirits",
    price: 39.99,
  },
  {
    id: 10,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992021/red_gkayla.jpg",
    title: "Red Dead Redemption 2",
    price: 59.99,
  },
];

const Home: NextPage = (props) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-appBlack min-h-screen py-[100px]">
        <div className="w-[75%] mx-auto">
          <Carousel />
          <ul className="grid grid-cols-6 gap-6 mt-14">
            {dummyData.map((item, index) => (
              <GameListItem key={index} game={item} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;
