import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from "../styles/Button.module.css";
import React, { ReactNode, MouseEventHandler } from "react";

export function ConnectWalletButton() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (account.status !== "connected") {
          connect({ connector: connectors[1] });
        } else {
          disconnect();
        }
      }}
    >
      {account.status !== "connected" ? "Connect Wallet" : "Disconnect"}
    </button>
  );
}
