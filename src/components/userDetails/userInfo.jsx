"use client";
import styles from "./index.module.css";
import icons from "@/public/icons/icons";
import Image from "next/image";
import IncreaseStakeModal from "../modal/increaseStake";
import ReduceStakeModal from "../modal/reduceStake";
import UnstakeModal from "../modal/unstake";
import DisclaimerModal from "../modal/disclaimer";
import { colors, isSupportedChainId, names } from "@/config/const";
import { formatEther } from "viem";
import { useContractState, useUserDetails } from "@/config/query/queries";
import { useState } from "react";
export default function UserInfo({ address, chainId }) {
  const { data: userData } = useUserDetails(address, chainId);
  const { data: contractData } = useContractState(chainId);

  const [increaseStakeModal, setIncreaseStakeModal] = useState(false);
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const [reduceStakeModal, setReduceStakeModal] = useState(false);
  const [unstakeModal, setUnstakeModal] = useState(false);

  if (userData === undefined || contractData === undefined || !isSupportedChainId(chainId)) {
    return null;
  }
  const userValue = Number(formatEther(userData.value));
  const userPercentage = contractData.totalStaked > 0 ? Number(BigInt(100) * userData.value / contractData.totalStaked) : 0;
  const chainName = names[chainId].toLowerCase();
  return (
    <>
      <div className={styles.box} >
        <div className={styles.amount_details}>
          <div className={styles.token} style={{ color: colors[chainId] }}>
            <div className={styles.token_icon}>
              <Image src={icons[chainName]} alt="logo" fill />
            </div>
            {chainName.toUpperCase()}
          </div>
          <div className={styles.amount}>
            <h4>Amount Staked:</h4> {userValue > 100 ? userValue.toFixed(0) : userValue.toFixed(2)}
            <span>{userPercentage > 1 ? userPercentage.toFixed(1) : userPercentage.toFixed(3)}%</span>
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.increase_stake} onClick={() => {
            if (userData.value == 0) {
              setDisclaimerModal(true);
            } else {
              setIncreaseStakeModal(true)
            }
          }}>Increase Stake</button>
          <button className={styles.reduce_stake} onClick={() => { setReduceStakeModal(true) }} >Reduce Stake</button>
          <button className={userData.availableUnstake > 0 ? styles.unstake_pending : styles.unstake_none} onClick={() => { setUnstakeModal(true) }} >Unstake</button>
        </div>
      </div>

      {disclaimerModal && <DisclaimerModal
        isOpen={disclaimerModal}
        onClose={() => { setDisclaimerModal(false) }}
        onAccept={() => {
          setDisclaimerModal(false);
          setIncreaseStakeModal(true);
        }
        } />}
      {increaseStakeModal && <IncreaseStakeModal
        isOpen={increaseStakeModal}
        onClose={() => { setIncreaseStakeModal(false) }}
      />}
      {reduceStakeModal && <ReduceStakeModal
        isOpen={reduceStakeModal}
        onClose={() => { setReduceStakeModal(false) }}
      />}
      {unstakeModal && <UnstakeModal
        isOpen={unstakeModal}
        onClose={() => { setUnstakeModal(false) }}
      />}
    </>
  );

}

