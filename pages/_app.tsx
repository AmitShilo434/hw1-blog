import { SessionProvider } from "../lib/auth-controller";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <Component {...pageProps} />
  );
  // return (
  //   <SessionProvider session={pageProps.session}>
  //     <Component {...pageProps} />
  //   </SessionProvider>
  // );
};


export default App;
