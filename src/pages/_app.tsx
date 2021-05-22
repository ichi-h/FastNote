import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "../lib/firebase/config";
import "../styles/globals.css";
import "../../public/assets/fontello/css/fontello.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Fast Note</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <RecoilRoot>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </RecoilRoot>
    </>
  );
}

export default MyApp;
