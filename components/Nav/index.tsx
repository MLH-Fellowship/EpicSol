import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { Popover } from "@mui/material";

const Navbar = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {    
    setAnchorEl(null);
  };

  return (
    <header>
      <nav
        className="bg-appGray h-[52px] flex flex-row items-center px-[20px] justify-between"
      >
        <p className="text-appGray1 uppercase text-[14px] tracking-widest font-medium">Game Store</p>
        {session ? (
          <>
            <button
              aria-describedby={"simple-popover"}
              onClick={handleClick}
              className="h-full"
            >
              <p className="tracking-wider text-appGray1">{session.user.name}</p>
            </button>
            <Popover
              id={'simple-popover'}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <button
                onClick={() => signOut()}
                className="w-[150px] h-[40px] hover:bg-appBlue hover:bg-opacity-10"
              >
                Sign Out
              </button>
            </Popover>
          </>
        ) : (
          <button
            className="font-medium tracking-widest text-appGray1"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  )
}

export default Navbar;
