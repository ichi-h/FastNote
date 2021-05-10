import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </RecoilRoot>
  );
}

export default MyApp;
