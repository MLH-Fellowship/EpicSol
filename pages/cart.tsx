import { useState } from "react";

//components
import CartItem from "../components/CartItem";
import CheckoutModal from "../components/CheckoutModal";

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
]

const Cart = () => {
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  return (
    <div
      className="min-h-screen bg-appBlack pt-[60px] pb-[100px] relative"
    >
      <div
        className="w-[75%] mx-auto"
      >
        <h1 className="text-[45px] text-appGray2">My Cart</h1>
        <div
          className="grid grid-cols-4 gap-8 mt-6"
        >
          <ul className="col-span-3">
            {dummyData.map((item, index) => (
              <CartItem 
                key={index}
                game={item}
              />
            ))}
          </ul>
          <div className="flex flex-col">
            <p
              className="text-[40px] mb-4 text-appGray2 font-thin"
            >Summary</p>
            <SummaryItem 
              label="Price"
              value="99.98"
            />
            <SummaryItem 
              label="Sale Discount"
              value="0"
            />
            <SummaryItem 
              label="Coupon Discount"
              value="0"
            />
            <hr className="my-4"/>
            <SummaryItem 
              label="Subtotal"
              value="99.98"
            />
            <button
              onClick={() => setShowCheckout(true)}
              className="rounded bg-appBlue text-appGray2 uppercase text-[14px] font-medium h-[50px] mt-4"
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
      <CheckoutModal 
        open={showCheckout}
        closeModal={() => setShowCheckout(false)}
      />
    </div>
  )
}

const SummaryItem = ({label, value} : { label: string, value: string}) => (
  <div className="flex flex-row items-center justify-between my-[6px]">
    <p
      className="tracking-wider text-appGray2"
    >{label}</p>
    <p
      className="tracking-wider text-appGray2"
    >${value}</p>
  </div>
)

export default Cart
