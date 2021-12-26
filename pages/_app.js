import "../styles/globals.scss";
import initializeFirebase from "../conflig";

initializeFirebase();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
