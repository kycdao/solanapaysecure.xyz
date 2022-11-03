import React, { useState } from "react";

import { Helmet } from "react-helmet";
import QRCode from "react-qr-code";

import "./home.css";

const Home = (props) => {
  const phantomInAppUrl = `https://phantom.app/ul/browse/${encodeURIComponent(
    "https://solanapaysecure.xyz/?startFlow=1"
  )}`;

  const modalInitialState =
    new URLSearchParams(window.location.search).get("startFlow") === "1";

  const [modalOpen, setModalOpen] = useState(modalInitialState);

  const toggleModal = (event) => {
    setModalOpen(!modalOpen);
  };

  const startFlow = (event) => {
    if (typeof window.solana !== "object") {
      alert("cannot connect to Solana wallet");
    }
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Solana-pay-demo</title>
        <meta property="og:title" content="Solana-pay-demo" />
      </Helmet>
      <div className="home-mac-book-air-m23">
        <div className="container home-frame8191">
          <img
            alt="image"
            src="/playground_assets/solanapay-logo.svg"
            className="home-image"
          />
          <div className="home-button">
            <span className="home-text">
              <span>Connect wallet</span>
            </span>
          </div>
        </div>
        <div className="container home-frame8126">
          <div className="home-container1">
            <h1 className="home-text02 headline-1">
              Wallet verification for <span>trusted payments.</span>
            </h1>
            <h2 className="home-text02 headline-2">
              This is a demo for Solana Pay extended with a compliance proof
              request. kycDAO proofs ensure merchants are paid from a verified
              wallet.
            </h2>

            <div className="home-container2">
              <div onClick={toggleModal} className="button-button">
                <span className="button-text">Buy coffee</span>
              </div>
            </div>
          </div>
          <div className="home-group8125">
            <div className="home-container3">
              <span className="home-text06">
                <span>Get Coffee</span>
              </span>
              <img
                alt="Frame3451"
                src="/playground_assets/frame3451-pky.svg"
                className="home-frame"
              />
            </div>
            <div className="home-group8124">
              <div className="home-group8123">
                <span className="home-text08">
                  <span>
                    <span>y00ts: mint t00b #12007</span>
                    <br></br>
                    <span></span>
                  </span>
                </span>
                <span className="home-text13">
                  <span>1 USDc</span>
                </span>
              </div>
              <img
                alt="Its a coffe mug, in a dark background, loosk pretty delicious."
                src="/playground_assets/solana-coffe.png"
                className="home-image2"
              />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div id="the-modal" className="opened">
          <div className="modal-content">
            <div className="modal-header">
              <h1>Connect Wallet</h1>
              <h3>To purchase this item, your should activate you wallet.</h3>
              <div onClick={toggleModal} className="modal-close">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" />
                </svg>
              </div>
            </div>
            <div className="modal-body">
              <h3>
                Scan this QR code to open this site in your wallet's in-app
                browser.
              </h3>
              <div className="qr-code">
                <QRCode value={phantomInAppUrl} size={128} level="L" />
              </div>
            </div>
            <div className="modal-button-container">
              <div onClick={startFlow} className="button-button">
                <span className="modal-text">
                  <button>Connect wallet</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
