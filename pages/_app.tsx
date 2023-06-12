import { SessionProvider } from "../lib/auth-controller";
import { AppProps } from "next/app";
import { AuthProvider } from "../components/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
  // return (
  //   <SessionProvider session={pageProps.session}>
  //     <Component {...pageProps} />
  //   </SessionProvider>
  // );
};


export default App;
