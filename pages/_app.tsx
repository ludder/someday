import "../styles/globals.css";
import Link from "next/link";
import type { AppProps } from "next/app";
import { BankProvider } from "../contexts/BankContext";
import "../styles/global.css";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />

      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/create">Create account</Link>
          </li>
          <li>
            <Link href="/transfer">Transfer funds</Link>
          </li>
        </ul>
      </nav>

      <BankProvider>
        <Component {...pageProps} />
      </BankProvider>
    </div>
  );
}

export default MyApp;
