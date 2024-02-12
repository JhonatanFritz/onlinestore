import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TechMart 🤖</title>
        <meta name="description" content="TechMart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/carrito.png" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer theme="colored" autoClose={3000} />
    </>
  );
}
