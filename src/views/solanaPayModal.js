import { createQR, encodeURL } from '@solana/pay';
import {
  clusterApiUrl,
  ConfirmedSignatureInfo,
  Connection,
  Keypair,
  PublicKey,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import solanaPay from "../utils/solana-pay";
import "./solanaPayModal.css";

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const reference = new Keypair().publicKey;
const merchant = new PublicKey(
  'H9zyRgnANdQnRGGsGEe7i6EX1qCRCYUgJP1BnTsijB5j'
);
const amount = new BigNumber(0.1);
const phantomInAppUrl = `https://phantom.app/ul/browse/${encodeURIComponent(
  "https://solanapaysecure.xyz/?startFlow=1"
)}`;


const SolanaPayModal = ({ onSuccess, onFail }) => {
  const client = useRef(
    (() => {
      // if (solanaProvider) {
      //   return new window.KycDaoClient({
      //     demoMode: true,
      //     enabledBlockchainNetworks: [
      //       "NearTestnet",
      //       "PolygonMumbai",
      //       "SolanaDevnet",
      //     ],
      //     enabledVerificationTypes: ["KYC"],
      //     height: "100%",
      //     width: "100%",
      //     isIframe: false,
      //     parent: "#kycDaoMountingPoint",
      //     messageTargetOrigin: window.location.origin,
      //     onFail,
      //     onSuccess,
      //     url: window.location.origin,
      //   });
      // }
    })()
  );

  // useEffect(() => {
  //   client.current.open();

  //   return () => {
  //     if (client.current.isOpen) {
  //       client.current.close();
  //     }
  //   }
  // }, [client.current.isOpen]);

  useEffect(() => {
    const qrContainer = document.getElementById("mount-qr-code-solanapay");

    const url = encodeURL({
      recipient: merchant,
      amount,
      reference,
      label: 'Coffee',
      message: 'Coffee',
      memo: 'Coffee#01',
    });


    if (qrContainer) {
      
      solanaPay.insertQrIntoDom({
        url : url,
        containerElement: qrContainer,
        size: 256
      });

       return () => {
        const qrContainer = document.getElementById("mount-qr-code-solanapay");
         if (qrContainer) {
           qrContainer.innerHTML = "";
         }
       };
    }
  }, []);


  return (
    <div className="modal-container">
      <Helmet>
        <title>SolanaPay demo</title>
        <meta property="og:title" content="Modal - Solana-pay-demo" />
      </Helmet>
      <div
        style={{ position: "absolute", zIndex: 10 }}
        id="solanaPayMountingPoint"
      >
        <div className="SolanaPayModalContent">
          <div className="modal-body">
              <h3>
                Scan this QR code to open this site in your wallet's in-app
                browser.
              </h3>
              <div className="qr-code">
                <div id="mount-qr-code-solanapay"></div>
              </div>
            </div>        
        </div>
      </div>
    </div>
  );
};

export default SolanaPayModal;
