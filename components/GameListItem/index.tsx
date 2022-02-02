/* eslint-disable @next/next/no-img-element */
interface Props {
  game: { image: string, title: string, price: number }
}

const GameListItem = ({game} : Props) => {
  return (
    <li
      className="flex flex-col cursor-pointer relative aspect-poster"
    >
      <img 
        alt=""
        src={game.image}
        className="w-full h-full object-cover rounded"
      />
      <p
        className="line-clamp-1 text-appGray2 text-[16px] mt-2"
      >{game.title}</p>
      <p
        className="text-appGray2 text-[16px]"
      >${game.price}</p>
    </li>
  )
}

export default GameListItem;
