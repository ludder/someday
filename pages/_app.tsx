import '../styles/globals.css'
import Link from 'next/link'
import type { AppProps } from 'next/app'
import { BankProvider } from '../contexts/BankContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <h1>Someday Bank</h1>
      <menu>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/create">Create account</Link></li>
        </ul>
      </menu>

      <BankProvider>
        <Component {...pageProps} />
      </BankProvider>
    </div>
  )
}

export default MyApp
