/* eslint-disable @next/next/no-img-element */
import {
  useState,
  createRef,
  useContext,
  useEffect,
} from "react";
import BigNumber from "bignumber.js";
import { useSession } from "next-auth/react";
import {
  Cluster,
  clusterApiUrl,
  Connection,
  ConnectionConfig,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import {
  encodeURL,
  findTransactionSignature,
  FindTransactionSignatureError,
  validateTransactionSignature,
  createQR,
} from "@solana/pay";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { toast } from "react-toastify";
import { actions, utils, programs, NodeWallet } from "@metaplex/js";
import * as anchor from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";

//components
import ShippingForm from "../components/ShippingForm";

//contexts
import { CartContext } from "../contexts/CartProvider";


const opts: ConnectionConfig = {
  commitment: "processed",
};

const CheckoutModal = () => {
  const router = useRouter();
  const { products, updateProducts } = useContext(CartContext);
  const qrRef = createRef<HTMLDivElement>();
  const [showShippingForm, setShowShippingForm] = useState<boolean>(false);
  const [activeMethod, setActiveMethod] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [solTotal, setSolTotal] = useState<number>(0);
  const { connection } = useConnection();
  const { data: session } = useSession();
  const wallet = useWallet();

  const getTotal = () => {
    const amountReducer = (previousValue, currentValue) => previousValue + currentValue.price;
    const total = products.reduce(amountReducer, 0);
    setTotal(total);
  }

  const createPaymentLink = () => {
    const url = encodeURL({
      recipient: new PublicKey("8ixmyB5JqXWSAUVxZgXudUMWjqtonCTqC5FennQ1dJc8"),
      amount: new BigNumber(solTotal),
      label: "Game store",
      message: "Game store - your order",
      reference: new Keypair().publicKey,
    });

    const qrCode = createQR(url);
    qrCode.append(qrRef.current);
  };

  const selectSolanaPay = () => {
    setActiveMethod("solana-pay");
    wallet.disconnect();
  };

  const submitOrder = async () => {
    try {
      await axios.post(`http://localhost:3000/api/order`, {
        email: session.user.email,
        quantity: 2,
        amount: 100,
        products: products.map(item => item.id),
      });
      toast.success("Order Submitted");
    } catch (error) {
      toast.error(
        "An error occurred while placing your order. Please try again later."
      );
    }
  };

  const submitShipping = async (form) => {
    try {
      const res = await axios.post("http://localhost:3000/api/address", form);
      toast.success("Shipping information updated");
      setShowShippingForm(false);
    } catch (error) {
      toast.error(
        "An error occurred while updating your information. Please try again later."
      );
    }
  };

  const transferSol = async () => {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: anchor.web3.LAMPORTS_PER_SOL * solTotal,
      })
    );

    const signature = await wallet.sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, "processed");
  };

  const create_NFT = async () => {
    try {
      const response = await actions.mintNFT({
        connection, wallet: wallet,
        uri: "https://34c7ef24f4v2aejh75xhxy5z6ars4xv47gpsdrei6fiowptk2nqq.arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E",
        maxSupply: 1
      });
      console.log(response);
    } catch (error) { console.error(error) }
  }

  const burn_function =async (
    ownerAddress: anchor.web3.PublicKey,
    tokenAddress: string,
    mint: string
  ) => {
    try {
      const mint_address = new anchor.web3.PublicKey(mint);
      const mint_token_account_address = new anchor.web3.PublicKey(
        tokenAddress
      );
      let tx = new Transaction().add(
        Token.createBurnInstruction(
          TOKEN_PROGRAM_ID,
          mint_address,
          mint_token_account_address,
          ownerAddress,
          [],
          1
        )
      );
      const signature = await wallet.sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "processed");
    } catch (error) { console.error(error) }
  }

  const fetchSolPrice = async() => {
    try {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
      setSolPrice(data.solana.usd);
    } catch (error) {
      toast.error('Unable to fetch SOL price.');
    }
  }

  const computeSolPrice = () => {
    const amount = (total / solPrice);
    setSolTotal(amount)
  }

  useEffect(() => {
    if(wallet.publicKey)
      setActiveMethod('wallet')
  }, [wallet.publicKey])

  useEffect(() => {
    if(products.length === 0)
      router.back();
    else 
      getTotal();
  }, [])

  useEffect(() => {
    fetchSolPrice();
  }, [])

  useEffect(() => {
    computeSolPrice();
  }, [solPrice])
  

  // useEffect(() => {
  //   createPaymentLink();
  // }, [qrRef.current, activeMethod]);

  return (
    <div className="py-[20px] h-full overflow-y-hidden">
      <div className="bg-white 2xl:w-[65%] xl:w-[75%] w-[85%] mx-auto relative flex flex-row outline-none ring-0 h-full">
        <div className="w-[65%] pl-5 pr-2">
          <h1 className="uppercase text-[14px] font-semibold tracking-wider">
            Checkout
          </h1>
          <div className="mt-3 border-t-[3px] border-t-appBlue" />
          <div className="pt-4">
            <h2 className="uppercase text-[14px] tracking-wider">
              Shipping
            </h2>
            {showShippingForm ? (
              <ShippingForm onSubmit={submitShipping} />
            ) : (
              <ShippingInfo
                editShipping={() => setShowShippingForm(true)}
              />
            )}
            {!showShippingForm && (
              <>
                <h2 className="uppercase text-[14px] tracking-wider mt-6">
                  payment methods
                </h2>
                <button
                  className={`py-2 pl-2 mt-2 rounded bg-appGray2 mb-4 w-[150px] flex items-start justify-start flex-row ${
                    activeMethod === "solana-pay"
                      ? "border border-appBlue"
                      : ""
                  }`}
                  onClick={selectSolanaPay}
                >
                  <div className="flex flex-row items-center space-x-4 cursor-pointer">
                    <img
                      src="/solana-pay.png"
                      className="w-[85px] h-[30px] border rounded-md"
                      alt=""
                    />
                  </div>
                  {/* {activeMethod === "solana-pay" && (
                    <div className="flex flex-col items-center mt-2">
                      <div ref={qrRef}></div>
                      <p className="mt-4 font-bold">
                        Scan this code with your Solana Pay wallet
                      </p>
                      <p>You will be asked to approve the transaction</p>
                    </div>
                  )} */}
                </button>
                <WalletMultiButton />
              </>
            )}
          </div>
        </div>
        <div className="w-[35%] bg-appGray2 px-4 relative h-full">
          <p className="uppercase text-[14px] font-medium tracking-wider pt-2 pb-6">
            order summary
          </p>
          <div className="h-full overflow-y-scroll pb-28">
            <ul className="mb-6 space-y-2">
              {products.map((item, index) => (
                <OrderItem key={index} game={item} />
              ))}
            </ul>
            <SummaryItem label="List Price" value={total} />
            <SummaryItem label="Discount" value={0} />
            <SummaryItem label="Coupon" value={0} />
            <hr className="my-2" />
            <SummaryItem label="Total" value={total} />
            <div className="flex flex-row justify-end mt-1">
              <p>{Number(solTotal).toLocaleString('en')} SOL</p>
            </div>
          </div>
          <div className="absolute bottom-0 h-[100px] w-full left-0 px-4 bg-appGray2 flex flex-col justify-center">
            <button
              disabled={activeMethod === ''}
              onClick={submitOrder}
              className={`py-5 uppercase ${activeMethod === '' ? 'bg-appGray' : 'bg-appBlue'} text-appGray2 text-[12px] tracking-widest font-semibold w-full rounded drop-shadow-lg`}
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({ game }: { game: Product }) => (
  <div className="flex flex-row items-center space-x-3">
    <img alt="" src={game.image} className="w-[88.8px] h-[115px] rounded" />
    <div>
      <p className="font-bold text-[16px] tracking-wider text-appBlack1">
        {game.title}
      </p>
      <p className="text-[13px] text-appBlack1">${game.price}</p>
    </div>
  </div>
);

const SummaryItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-row items-center justify-between my-[2px]">
    <p className="tracking-wider text-appGray4 text-[14px]">{label}</p>
    <p className="tracking-wider text-appGray4 text-[14px]">
      ${Number(value).toLocaleString('en')}
    </p>
  </div>
);

const ShippingInfo = ({ editShipping }: { editShipping: () => void }) => (
  <div className="mt-2">
    <p>Rick Sanchez</p>
    <p>
      871 Kenangen Street (between Jones and Leavensworth St), San Francisco
    </p>
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
);

export default CheckoutModal;
