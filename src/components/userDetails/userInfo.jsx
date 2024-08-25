"use client";
import styles from "./index.module.css";
import icons from "@/public/icons/icons";
import Image from "next/image";
import IncreaseStakeModal from "../modal/increaseStake";
import { colors, isSupportedChainId, names, tokens } from "@/config/const";
import { formatEther } from "viem";
import { useContractState, useUserDetails } from "@/config/query/queries";
import { useState } from "react";
import ReduceStakeModal from "../modal/reduceStake";
import UnstakeModal from "../modal/unstake";
import DisclaimerModal from "../modal/disclaimer";
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
  const tokenName = tokens[chainId].toUpperCase();
  return (
    <>
      <div className={styles.box} >
        <div className={styles.amount_details}>
          <div className={styles.header} style={{ color: colors[chainId] }}>
            <div className={styles.token_name_icon}>
              <Image src={icons[chainName]} style={{ width: '27px', height: '27px' }} alt="logo" />
              {tokenName}
            </div>
            <div className={styles.amount}>
              {userValue > 100 ? userValue.toFixed(0) : userValue.toFixed(2)}
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.increase_stake} onClick={() => {
            if (userData.value == 0) {
              setDisclaimerModal(true);
            } else {
              setIncreaseStakeModal(true)
            }
          }}>Stake ({userPercentage > 1 ? userPercentage.toFixed(0) : userPercentage.toFixed(3)}%)</button>
          <button className={userData.availableUnstake > BigInt(0) ? styles.unstake_pending : styles.unstake_none} onClick={() => { userData.availableUnstake > BigInt(0) ? setUnstakeModal(true) : setReduceStakeModal(true) }} >Unstake</button>
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

