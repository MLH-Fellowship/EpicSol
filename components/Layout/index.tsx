import { ReactElement } from "react";

import Navbar from "../Nav/index";

const Layout = ({children} : {children: ReactElement}) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout;
