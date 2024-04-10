import styles from "../styles/Navbar.module.css";
import React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src="/prepo-logo.svg" alt="Logo" />
      <ConnectWalletButton />
    </nav>
  );
}
