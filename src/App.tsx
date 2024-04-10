import React from "react";

import { Providers } from "./providers/providers";
import { Navbar } from "./components/Navbar";
import { MyWalletInfo } from "./components/MyWalletInfo";

function App() {
  return (
    <Providers>
      <Navbar />
      <MyWalletInfo />
    </Providers>
  );
}

export default App;
