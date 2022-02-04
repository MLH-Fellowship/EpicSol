/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//models
import Game from "../../models/Game";

//contexts
import { CartContext } from "../../contexts/CartProvider";
import { toast } from "react-toastify";

//components
import CheckoutModal from "../../components/CheckoutModal";

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

const GamePage = () => {
  const { updateGames, games } = useContext(CartContext);
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState<Game>(dummyData[0]);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const findGame = () => {
    dummyData.forEach(element => {
      if(element.id === parseInt(id as string))
        setGame(element);
    })
  };

  const addToCart = () => {
    console.log(game);
    
    if(games.length > 0) {
      const index = games.findIndex(item => item.id === game.id);
      console.log(index);
      
      if(index === -1)
        updateGames([...games, game]);
      else
        toast.info("You already have this item in your cart")
    } else
      updateGames([game])
  }

  const buyNow = () => {
    addToCart();
    setShowCheckout(true);
  }

  useEffect(() => {
    findGame();
  }, []);

  return (
    <div className="min-h-screen bg-appBlack pt-[60px] pb-[100px]">
      <div className="w-[75%] mx-auto">
        <h1 className="text-[50px] text-appGray2 font-medium">{game?.title}</h1>
        <div className="grid grid-cols-4 gap-8 mt-6">
          {/* video embed */}
          <div className="col-span-3 rounded-xl">
            <iframe
              src="https://www.youtube.com/embed/K0u_kAWLJOA"
              title="God of War Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded aspect-video"
            ></iframe>
            <p className="text-appGray2 text-[20px] mt-10">
              His vengeance against the Gods of Olympus years behind him, Kratos
              now lives as a man in the realm of Norse Gods and monsters. It is
              in this harsh, unforgiving world that he must fight to survive…
              and teach his son to do the same.
            </p>
          </div>
          {/* actions column */}
          <div>
            <img
              alt=""
              src="/god_of_war_logo.png"
              className="max-h-[150px] mx-auto"
            />
            <p className="mt-8 text-appGray2">${game?.price}</p>
            <button
              onClick={buyNow} 
              className="uppercase text-appGray2 bg-appBlue rounded w-full h-[50px] text-[14px] font-medium my-4">
              Buy Now
            </button>
            <button 
              onClick={addToCart}
              className="border border-appGray2 rounded w-full h-[50px] text-appGray2 uppercase text-[14px] font-medium mb-8">
              Add to Cart
            </button>
            <GameDetail label="Developer" value="Santa Monica Studio" />
            <GameDetail label="Publisher" value="PlayStation PC LLC" />
            <GameDetail label="Release Date" value="01/14/22" />
            <GameDetail label="Platform" value="WINDOWS" />
          </div>
        </div>
      </div>
      <CheckoutModal 
        open={showCheckout}
        closeModal={() => setShowCheckout(false)}
      />
    </div>
  );
};

const GameDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-row items-center justify-between pb-3 mb-3 border-b border-b-appGray">
    <p className="text-appGray2 text-opacity-60 text-[16px]">{label}</p>
    <p className="text-appGray2 text-[16px]">{value}</p>
  </div>
);

export default GamePage;
