/* eslint-disable @next/next/no-img-element */
import { useState, createRef, useContext } from "react";
import { Modal } from "@mui/material";
import { IoIosWallet } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import BigNumber from 'bignumber.js';
import { Cluster, clusterApiUrl, Connection, ConnectionConfig, Keypair, PublicKey } from '@solana/web3.js';
import { encodeURL, findTransactionSignature, FindTransactionSignatureError, validateTransactionSignature, createQR } from "@solana/pay";
import { Product } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";


//components
import ShippingForm from "../ShippingForm";

//contexts
import { CartContext } from "../../contexts/CartProvider";

interface Props {
  open: boolean;
  closeModal: () => void;
}

const opts: ConnectionConfig = {
  commitment: 'processed'
}


const CheckoutModal = ({open, closeModal} : Props) => {
  const {products, updateProducts } = useContext(CartContext);
  const qrRef = createRef<HTMLDivElement>();
  const [showShippingForm, setShowShippingForm] = useState<boolean>(true);
  const [activeMethod, setActiveMethod] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  
  const establishConnection = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), opts.commitment);
  }

  const createPaymentLink = () => {
    const url = encodeURL({
      recipient: new PublicKey("8ixmyB5JqXWSAUVxZgXudUMWjqtonCTqC5FennQ1dJc8"),
      amount: new BigNumber(1),
      label: "Game store",
      message: "Game store - your order",
      reference: new Keypair().publicKey
    }) 

    const qrCode = createQR(url);
    qrCode.append(qrRef.current);
  }

  const selectSolanaPay = () => {
    if(activeMethod !== 'solana-pay') {
      setActiveMethod("solana-pay");
      createPaymentLink();
    }
  }

  const submitShipping = async (form) => {
    try {
      await axios.post('http://localhost:3000/api/address', form);
      toast.success("Shipping information updated");
      setShowShippingForm(false);
    } catch (error) {
      toast.error("An error occurred while updating your information. Please try again later.")
    }
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      className="flex items-center justify-center outline-none ring-0"
    >
      <div
        className="bg-white 2xl:w-[65%] xl:w-[75%] w-[85%] mx-auto relative flex flex-row h-[90%] outline-none ring-0"
      >
        <div
          className="w-[65%] pl-5 pr-2 pt-10"
        >
          <h1 className="uppercase text-[14px] font-semibold tracking-wider">
            Checkout
          </h1>
          <div className="mt-3 border-t-[3px] border-t-appBlue"/>
          <div className="h-[95%] overflow-y-scroll pb-14 pt-4">
            <h2
              className="uppercase text-[14px] tracking-wider"
            >Shipping</h2>
            {showShippingForm ? (
              <ShippingForm 
                onSubmit={submitShipping}
              />
            ) : (
              <ShippingInfo 
                editShipping={() => setShowShippingForm(true)}
              />
            )}
            {!showShippingForm && (
              <>
                <h2
                  className="uppercase text-[14px] tracking-wider mt-6"
                >payment methods</h2>
                <div 
                  className={`px-4 py-4 mt-2 rounded bg-appGray2 ${activeMethod === "solana-pay" ? "border border-appBlue" : ""}`}
                  onClick={selectSolanaPay}
                >
                  <div className="flex flex-row items-center space-x-4 cursor-pointer">
                    <img 
                      src="/solana-pay.png"
                      className="w-[85px] h-[40px] border rounded-md"
                      alt=""
                    />
                    <p>Solana Pay</p>
                  </div>
                  {activeMethod === 'solana-pay'  && (
                    <div className="flex flex-col items-center mt-2">
                      <div
                        ref={qrRef}
                      ></div>
                      <p className="mt-4 font-bold">Scan this code with your Solana Pay wallet</p>
                      <p>You will be asked to approve the transaction</p>
                    </div>
                  )}
                </div>
                <div
                  className={`px-4 py-4 mt-2 rounded bg-appGray2 ${activeMethod === "wallet" ? "border border-appBlue" : ""} cursor-pointer`}
                  onClick={() => setActiveMethod("wallet")}
                >
                  <div className="flex flex-row items-center space-x-4">
                    <div
                      className="w-[85px] h-[40px] border rounded-md flex flex-row items-center justify-center"
                    >
                      <IoIosWallet size={38} color="#0078f2"/>
                    </div>
                    <p>Connect Wallet</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-[35%] bg-appGray2 px-4 relative">
          <div className="flex flex-row items-end justify-end w-full h-10">
            <button
              onClick={closeModal}
              
            >
              <CgClose size={25} color="#000"/>
            </button>
          </div>
          <p
            className="uppercase text-[14px] font-medium tracking-wider pb-6"
          >order summary</p>
          <div className="h-[80%] overflow-y-scroll pb-16">
            <ul className="mb-6 space-y-2">
              {products.map((item, index) => (
                <OrderItem 
                  key={index}
                  game={item}
                />
              ))}
            </ul>
            <SummaryItem 
              label="List Price"
              value="89.97"
            />
            <SummaryItem 
              label="Discount"
              value="0.00"
            />
            <SummaryItem 
              label="Coupon"
              value="0.00"
            />
            <hr className="my-2"/>
            <SummaryItem 
              label="Total"
              value="89.97"
            />
          </div>
          <div
            className="absolute bottom-0 h-[100px] w-full left-0 px-4 bg-appGray2 flex flex-col justify-center"
          >
            <button
              className="py-5 uppercase bg-appBlue text-appGray2 text-[12px] tracking-widest font-semibold w-full rounded drop-shadow-lg"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const OrderItem = ({game} : { game: Product }) => (
  <div
    className="flex flex-row items-center space-x-3"
  >
    <img 
      alt=""
      src={game.image}
      className="w-[88.8px] h-[115px] rounded"
    />
    <div>
      <p
        className="font-bold text-[16px] tracking-wider text-appBlack1"
      >{game.title}</p>
      <p className="text-[13px] text-appBlack1">
        ${game.price}
      </p>
    </div>
  </div>
);

const SummaryItem = ({label, value} : { label: string, value: string}) => (
  <div className="flex flex-row items-center justify-between my-[2px]">
    <p
      className="tracking-wider text-appGray4 text-[14px]"
    >{label}</p>
    <p
      className="tracking-wider text-appGray4 text-[14px]"
    >${value}</p>
  </div>
)

const ShippingInfo = ({editShipping} : { editShipping: () => void }) => (
  <div className="mt-2">
    <p>Rick Sanchez</p>
    <p>871 Kenangen Street (between Jones and Leavensworth St), San Francisco</p>
    <p>San Francisco, California</p>
    <div className="flex flex-row justify-end w-full">
      <button
        onClick={editShipping}
        className="py-2 mt-4 text-appBlack rounded border-appBlue border w-[100px] uppercase text-[12px] font-semibold tracking-widest"
      >
        Edit
      </button>
    </div>
  </div>
)

export default CheckoutModal;
