import React, { useState } from "react";

import { Providers } from "./providers/providers";
import { useBalance } from "wagmi";
import { ShowBalance } from "./components/ShowBalances";
import { SendTokens } from "./components/SendTokenButton";
import { Navbar } from "./components/Navbar";
import { MyWalletInfo } from "./components/MyWalletInfo";

function App() {
  return (
    <Providers>
      {/* <StyledDiv color={color} onClick={handleClick}>
            Hello, world!
          </StyledDiv> */}
      {/* <SendTokens />
          <ShowBalance /> */}

      <Navbar />
      <MyWalletInfo />
    </Providers>
  );
}

export default App;
