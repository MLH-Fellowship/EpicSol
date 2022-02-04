import { useContext, useEffect, useState } from "react";

//components
import CartItem from "../components/CartItem";
import CheckoutModal from "../components/CheckoutModal";

//contexts
import { CartContext } from "../contexts/CartProvider";


const Cart = () => {
  const { products, updateProducts } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const getTotal = () => {
    const amountReducer = (previousValue, currentValue) => previousValue + currentValue.price;
    const total = products.reduce(amountReducer, 0);
    setTotal(total);
  }

  useEffect(() => {
    getTotal();
  }, [])

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
            {products.map((item, index) => (
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
              value={total}
            />
            <SummaryItem 
              label="Sale Discount"
              value={0}
            />
            <SummaryItem 
              label="Coupon Discount"
              value={0}
            />
            <hr className="my-4"/>
            <SummaryItem 
              label="Subtotal"
              value={total}
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

const SummaryItem = ({label, value} : { label: string, value: number}) => (
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
