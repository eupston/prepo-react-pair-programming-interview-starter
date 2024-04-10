import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import styles from "../styles/ConnectWalletButton.module.css";
import React from "react";

export function ConnectWalletButton() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (account.status !== "connected") {
          connect({
            connector: connectors.find(
              (connector) => connector.name === "MetaMask"
            ) as Connector,
          });
        } else {
          disconnect();
        }
      }}
    >
      {account.status !== "connected" ? "Connect Wallet" : "Disconnect"}
    </button>
  );
}
