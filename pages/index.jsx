import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import FillerText from "../components/FillerText";
import Comparer from "../components/Comparer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Crypto Comparer</title>
        <meta
          name="description"
          content="This calculates awesome stuff for crypto things...or so I heard"
        />
        <link rel="icon" href="/MK.png" />
      </Head>

      <main className="bg-gray-800">
        <Navbar />
        <div className="border-white-100 border-b-2">
          <div className="text-gray-300 text-center  pb-10">
            <Comparer />
            <FillerText />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
