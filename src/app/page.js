import styles from "./page.module.css";
import Header from "@/components/header";
import Main from "@/components/main";
import UserDetails from "@/components/userDetails";
import Recent from "@/components/recent";
import Footer from "@/components/footer";
import { getQueryClient, prefetchState } from "@/config/query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
export default function Home() {
  const queryClient = getQueryClient();
  prefetchState();
  return (
    <main className={styles.main}>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Main />
        <UserDetails />
        <Recent />
      </HydrationBoundary>
      <Footer />
    </main>
  );
}
