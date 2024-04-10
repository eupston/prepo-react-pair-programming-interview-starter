import { useAccount, useBalance, useReadContract } from "wagmi";
import styles from "../styles/MyWalletInfo.module.css";
import React from "react";
import { formatEther } from "viem";
import abi from "../abi/erc20.abi.json";
import { HORSE_TOKEN_ADDRESS, FAKE_WETH_ADDRESS } from "../constants";
import { SendTokenButton } from "./SendTokenButton";

export function MyWalletInfo() {
  const account = useAccount();

  const ethBalance = useBalance({
    address: account.address,
  });

  const fakeWETHBalance = useReadContract({
    abi,
    address: FAKE_WETH_ADDRESS,
    functionName: "balanceOf",
    args: [account.address],
  });

  return (
    <div className={styles.walletInfoContainer}>
      <div className={styles.walletInfoContent}>
        <h1>Wallet Info</h1>
        <div>
          <h2>Ethereum Address</h2>
          <p>{account.address && account.address}</p>
        </div>
        <div>
          <h2>ETH Balance</h2>
          <p>
            {ethBalance &&
              ethBalance.data &&
              `${formatEther(BigInt(ethBalance.data?.value.toString()))} ETH `}
          </p>
        </div>
        <div>
          <h2>FAKE WETH Balance</h2>
          <p>
            {" "}
            {fakeWETHBalance &&
              account.status === "connected" &&
              `${formatEther(
                BigInt(fakeWETHBalance.data?.toString() || "0")
              )} FAKE WETH `}
          </p>
        </div>
        <SendTokenButton />
      </div>
    </div>
  );
}
