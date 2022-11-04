import React, { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import solanaPay from "../utils/solana-pay";
import KycDaoModal from "../views/kycDaoModal";
import { getSolanaProvider } from "../utils/getSolanaProvider";

import "./home.css";
import SolanaPayModal from "./solanaPayModal";

const solanaProvider = getSolanaProvider();
const phantomInAppUrl = `https://phantom.app/ul/browse/${encodeURIComponent(
  "https://solanapaysecure.xyz/?startFlow=1"
)}`;

const Home = (props) => {
  const [modalOpen, setModalOpen] = useState(new URLSearchParams(window.location.search)
    .get("startFlow") === "1");

  const [kycModalOpen, setKycModalOpen] = useState(new URLSearchParams(window.location.search)
    .get("startKyc") === "1");

  const [kycDaoProcessRan, setKycDaoProcessRan] = useState(false)

  const onSuccess = useCallback(() => {
    setKycDaoProcessRan(true)
    setKycModalOpen(false)
  }, [])

  const onFail = useCallback((data) => {
    if (data !== "cancelled") {
      alert("Something went wrong!");
    }

    setKycModalOpen(false)
  }, [])

  const toggleModal = () => {
    setModalOpen((value) => !value);
  };

  const startFlow = () => {
    if (!solanaProvider) {
      alert("cannot connect to Solana wallet");
      return;
    }

    setKycModalOpen(true);
  };

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    const qrContainer = document.getElementById("mount-qr-code");

    if (qrContainer) {
      solanaPay.insertQrIntoDom({
        url: phantomInAppUrl,
        containerElement: qrContainer
      });

      return () => {
        const qrContainer = document.getElementById("mount-qr-code");
        if (qrContainer) {
          qrContainer.innerHTML = "";
        }
      };
    }
  }, [modalOpen]);

  return (
    <div className="home-container">
      <Helmet>
        <title>SolanaPay demos</title>
        <meta property="og:title" content="Solana-pay-demo" />
      </Helmet>
      <div className="home-mac-book-air-m23">
        <div className="container home-frame8191">
          <img
            alt="image"
            src="/playground_assets/solanapay-logo.svg"
            className="home-image"
          />
          { /*
          <div className="home-button">
            <span className="home-text">
              <span>Connect wallet</span>
            </span>
          </div>
          */ }
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
                <h3>1 USDC</h3>
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

      {modalOpen &&
        <>
          {!kycDaoProcessRan && <div id="the-modal" className="opened">
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
                  <a href={phantomInAppUrl}>
                    <div id="mount-qr-code"></div>
                    </a>
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
          </div>}
          {
            kycDaoProcessRan && <SolanaPayModal onClose={toggleModal} />
          }
        </>
      }

      {kycModalOpen && <KycDaoModal onFail={onFail} onSuccess={onSuccess} />}
    </div>
  );
};

export default Home;
