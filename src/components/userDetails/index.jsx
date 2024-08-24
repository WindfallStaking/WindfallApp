"use client";
import { useAccount } from "wagmi";
import styles from "./index.module.css";
import { isSupportedChainId } from "@/config/const";
import ChainHeader from "./chainHeader";
import UserInfo from "./userInfo";
export default function UserDetails() {
  const { address, isConnected, chainId } = useAccount();

  if (!isConnected || address === 'undefined' || chainId === undefined || !isSupportedChainId(chainId)) {
    return (<></>);
  }
  return (
    <div className={styles.main}>
      <ChainHeader />
      <UserInfo address={address} chainId={chainId} />
    </div>
  );
}
