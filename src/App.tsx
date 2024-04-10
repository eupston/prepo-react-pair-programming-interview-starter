import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { Providers } from "./providers/providers";
import { useBalance } from "wagmi";
import { ShowBalance } from "./components/ShowBalances";

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: end;
  padding: 1rem;
`;

const StyledDiv = styled.div`
  color: ${(props) => props.color || props.theme.color.primary};
  box-shadow: ${(props) => props.theme.shadow.prepo};
  cursor: pointer;
`;

function App() {
  const [color, setColor] = useState("red");

  const handleClick = () => {
    setColor(color === "red" ? "blue" : "red");
  };

  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <Wrapper>
          {/* <StyledDiv color={color} onClick={handleClick}>
            Hello, world!
          </StyledDiv> */}
          <ShowBalance />
          <ConnectWalletButton />
        </Wrapper>
      </ThemeProvider>
    </Providers>
  );
}

export default App;
