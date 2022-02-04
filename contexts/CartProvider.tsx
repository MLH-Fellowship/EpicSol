import { createContext, ReactElement, useState } from "react";

import Game from "../models/Game";

interface ICartContext {
  games: Game[],
  updateGames: (newGames: Game[]) => void
}

const defaultState: ICartContext = {
  games: [],
  updateGames: () => {},
}

export const CartContext = createContext<ICartContext>(defaultState);

const CartProvider = ({children} : {children: ReactElement}) => {
  const [games, setGames] = useState(defaultState.games);

  const updateGames = (newGames: Game[]) => {
    setGames(newGames);
  }

  return (
    <CartContext.Provider value={{games, updateGames}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
