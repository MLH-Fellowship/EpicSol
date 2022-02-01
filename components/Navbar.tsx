import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <header>
      <nav
        className="bg-appGray h-[52px] flex flex-row items-center pl-[20px] justify-between"
      >
        <div className="flex flex-row items-center">
          <p className="text-appGray1 uppercase text-[0.75em] tracking-widest">Game Store</p>
          <div
            className="flex flex-row items-center bg-appGray4 rounded-2xl space-x-2 ml-6 py-[5px] px-4"
          >
            <BsSearch color="#fff" size={12}/>
            <input 
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent ring-0 outline-none text-[#f5f5f5] text-[14px]"
            />
          </div>
        </div>
        <button
          className="h-full bg-appBlue text-white px-4 tracking-wider"
        >
          Connect Wallet
        </button>
      </nav>
    </header>
  )
}

export default Navbar;
