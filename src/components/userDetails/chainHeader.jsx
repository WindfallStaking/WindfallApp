"use client";
import { useAccount } from "wagmi";
import styles from "./index.module.css";
import { colors, tokens } from "@/config/const";
export default function ChainHeader() {
  const { chainId } = useAccount();
  return (
    <div className={styles.main_header}>
      <h2>
        Your{" "}
        <span className={styles.chain} style={{ color: colors[chainId] }}>
          {tokens[chainId]}
        </span>{" "}
        Deposits
      </h2>
    </div>
  );
}

