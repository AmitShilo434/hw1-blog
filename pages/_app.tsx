import { AppProps } from "next/app";
import { AuthProvider } from "../components/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};


export default App;
