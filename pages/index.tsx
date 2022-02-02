import type { NextPage } from 'next';

//components
import Carousel from '../components/Carousel';
import GameListItem from '../components/GameListItem';

const dummyData = [
  {
    id: 1,
    image: "/valorant.jpeg",
    title: "Valorant",
    price: 19.99
  },
  {
    id: 2,
    image: "/tomb-raider.jpeg",
    title: "Rise of The Tomb Raider",
    price: 29.99
  },
  {
    id: 3,
    image: "/star_wars.jpeg",
    title: "Star Wars Battlefront II",
    price: 39.99
  },
  {
    id: 4,
    image: "/god_of_war_poster.jpeg",
    title: "God of War",
    price: 59.99
  },
  {
    id: 5,
    image: "/borderlands.jpeg",
    title: "Borderlands 3",
    price: 39.99
  },
  {
    id: 6,
    image: "/cyberpunk_poster.png",
    title: "Cyberpunk 2077",
    price: 26.99
  },
  {
    id: 7,
    image: "/abyss.jpeg",
    title: "Neon Abyss",
    price: 6.99
  },
  {
    id: 8,
    image: "/hitman.jpeg",
    title: "Hitman III",
    price: 15.99
  },
  {
    id: 9,
    image: "/kena_poster.jpeg",
    title: "Kena: Bridge of Spirits",
    price: 39.99
  },
  {
    id: 10,
    image: "/red.jpeg",
    title: "Red Dead Redemption 2",
    price: 59.99
  },
]

const Home: NextPage = () => {
  return (
    <div
      className='bg-appBlack min-h-screen py-[100px]'
    >
      <div
        className='w-[75%] mx-auto'
      >
        <Carousel />
        <ul
          className='grid grid-cols-6 gap-6 mt-14'
        >
          {dummyData.map((item, index) => (
            <GameListItem 
              key={index}
              game={item}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
