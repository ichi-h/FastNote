import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "../lib/firebase/config";
import "../styles/globals.css";
import "../../public/assets/fontello/css/fontello.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      {typeof window === "undefined" ? null : <Component {...pageProps} />}
    </RecoilRoot>
  );
}

export default MyApp;
