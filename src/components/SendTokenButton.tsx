import { useCallback, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import abi from "../abi/erc20.abi.json";
import { config } from "../wagmi";
import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { FAKE_WETH_ADDRESS, RECEIVE_TEST_WALLET } from "../constants";
import styles from "../styles/SendTokenButton.module.css";

export function SendTokenButton() {
  const account = useAccount();
  const [isPending, setIsPending] = useState(false);

  const sendTokens = useCallback(async () => {
    try {
      setIsPending(true);
      const smallValueAmount = "0.001";
      const tokenAmountToApprove = parseEther("100");
      // Check allowance
      const allowance = await readContract(config, {
        abi,
        address: FAKE_WETH_ADDRESS,
        functionName: "allowance",
        args: [account.address, account.address],
      });

      const allowanceAmt = formatEther(BigInt(allowance as string));
      // Check if allowance is already set
      if (parseFloat(allowanceAmt) < parseFloat(smallValueAmount)) {
        const approveResults = await writeContract(config, {
          abi,
          address: FAKE_WETH_ADDRESS,
          functionName: "approve",
          args: [account.address, tokenAmountToApprove],
        });
        await waitForTransactionReceipt(config, {
          hash: approveResults,
        });
      }
      const transformTokenResults = await writeContract(config, {
        abi,
        address: FAKE_WETH_ADDRESS,
        functionName: "transferFrom",
        args: [
          account.address,
          RECEIVE_TEST_WALLET,
          parseEther(smallValueAmount),
        ],
      });
      await waitForTransactionReceipt(config, {
        hash: transformTokenResults,
      });
    } catch (e) {
      console.info("error with transaction", e);
    } finally {
      setIsPending(false);
    }
  }, [account]);

  return (
    <button
      className={styles.button}
      disabled={isPending}
      onClick={() => sendTokens()}
    >
      {isPending ? "Sending..." : "Send Tiny Fake WETH"}
    </button>
  );
}
