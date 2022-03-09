import "../styles/globals.css";
import type { AppProps } from "next/app";
import { BankProvider } from "../contexts/BankContext";
import "../styles/global.css";
import { Header } from "../components/Header/Header";
import { Nav } from "../components/Nav/Nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />

      <Nav />

      <BankProvider>
        <Component {...pageProps} />
      </BankProvider>
    </div>
  );
}

export default MyApp;
