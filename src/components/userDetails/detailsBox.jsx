// "use client";
//
// import Image from "next/image";
// import styles from "./depositBox.module.css";
// import icons from "@/public/icons/icons";
// import { colors, names } from "@/config/const";
// import { useAccount } from "wagmi";
// import { useQuery } from "@tanstack/react-query";
// import { getUserDetails } from "@/actions";
//
// export default function DepositBox() {
//
//   const { address, chainId, isConnected } = useAccount();
//
//   const { data, isError, isLoading } = useQuery({
//     queryKey: ['userDetails', chainId, address],
//     queryFn: () => { getUserDetails(address) },
//   });
//
//   if (address === undefined) {
//     return (<div>Undefined</div>);
//   }
//   if (chainId != 7700 && chainId != 81457) {
//     return (<div>Wrong Network</div>);
//   }
//   if (isLoading) {
//     return (<div> Loading... </div>);
//   }
//   if (isError) {
//     return (<div> Error </div>);
//   }
//
//   // <Image src={icons[names[chainId].toLowerCase()]} alt="canto logo" fill />
//   return (
//     <div className={styles.main}>
//       <div className={styles.details}>
//         <div className={styles.amount_details}>
//           <div className={styles.token} style={{ color: colors[chainId] }}>
//             <div className={styles.token_icon}>
//             </div>
//             {names[chainId].toUpperCase()}
//           </div>
//           <div className={styles.amount}>
//             {1000}
//             {true && <span>{900}</span>}
//           </div>
//         </div>
//         <div className={styles.status_details}>
//           <div className={styles.status}>
//             <div
//               className={styles.dot}
//               style={{
//                 backgroundColor: !true
//                   ? true
//                     ? "#33de2f"
//                     : "#7B7B7B"
//                   : "#7B7B7B",
//               }}
//             ></div>
//             <span className={styles.status_text}>
//               {!true
//                 ? true
//                   ? "Live"
//                   : "Inactive"
//                 : "Inactive"}
//             </span>
//           </div>
//           <span>{5}</span>
//         </div>
//       </div>
//       <div className={styles.buttons}>
//       </div>
//     </div>
//   );
//
// }
//
// {hasRewards ? (
//   <ClaimRewardButton data={data} chain={chain} />
// ) : (
//   <NoRewardButton />
// )}
// {unstakingBufferPeriod ? (
//   <UnstakeBufferPeriodButton
//     token={data}
//     setUnstakingBufferPeriod={setUnstakingBufferPeriod}
//   />
// ) : unstaking ? (
//   <FinishUnstakingButton token={data} />
// ) : (
//   <UnstakeButton
//     data={data}
//     setUnstakingBufferPeriod={setUnstakingBufferPeriod}
//     showBuffer={setUnstaking}
//     setActive={setActive}
//   />
// )}
