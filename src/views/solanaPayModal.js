import { encodeURL } from '@solana/pay';
import {
  Keypair,
  PublicKey,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import React, { useEffect } from "react";
import solanaPay from "../utils/solana-pay";
import "./solanaPayModal.css";

const reference = new Keypair().publicKey;
const merchant = new PublicKey(
  'H9zyRgnANdQnRGGsGEe7i6EX1qCRCYUgJP1BnTsijB5j'
);
const amount = new BigNumber(0.1);

const SolanaPayModal = ({ onClose }) => {
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
        url: url,
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
    <div id="the-modal" className="opened">
      <div className="modal-content">
        <div className="modal-header">
          <h1>Scan the QR or open this page in your Phantom mobile wallet.</h1>
          <div onClick={onClose} className="modal-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" />
            </svg>
          </div>
        </div>
        <div className="modal-body">
          <div className="qr-code">
            <div id="mount-qr-code-solanapay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolanaPayModal;
