"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchBar from "@/components/search-bar/search-bar";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <SearchBar />
      </main>
    </QueryClientProvider>
  );
}
