/* eslint-disable @next/next/no-img-element */
import Game from "../../models/Game";

interface Props {
  game: Game
}

const CartItem = ({game} : Props) => {
  return (
    <li
      className="flex flex-row items-start justify-between w-full p-6 mb-4 rounded bg-appBlack1"
    >
      <div className="flex flex-row space-x-4">
        <img 
          alt=""
          src="/god_of_war_poster.jpeg"
          className="w-[131px] h-[174.66px] rounded"
        />
        <div className="flex flex-col justify-between">
          <div>
            <span className="py-1 px-2 uppercase rounded text-appGray2 text-[12px] font-medium tracking-wider bg-appGray text-center w-[fit-content]">
              Base game
            </span>
            <p className="text-[20px] text-appGray2 mt-1">God of War</p>
          </div>
          <p className="uppercase text-appGray2 text-[12px] font-semibold">Windows</p>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className="text-appGray2">$59.99</p>
        <div className="h-32"></div>
        <button
          className="border-b border-b-appGray1 text-appGray1"
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem;
