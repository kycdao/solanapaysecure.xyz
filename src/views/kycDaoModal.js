import React, { useEffect, useRef } from "react";
import "./kycDaoModal.css";
import { getSolanaProvider } from "../utils/getSolanaProvider";
import "@kycdao/kycdao-web-sdk/dist/static/css/main.css";
import "@kycdao/kycdao-web-sdk";

const solanaProvider = getSolanaProvider();

const KycDaoModal = ({ onSuccess, onFail }) => {
  const client = useRef(
    (() => {
      if (solanaProvider) {
        return new window.KycDaoClient({
          demoMode: true,
          enabledBlockchainNetworks: [
            "SolanaMainnet",
          ],
          enabledVerificationTypes: ["KYC"],
          height: "100%",
          width: "100%",
          isIframe: false,
          parent: "#kycDaoMountingPoint",
          messageTargetOrigin: window.location.origin,
          onFail,
          onSuccess,
          url: window.location.origin,
        });
      }
    })()
  );

  useEffect(() => {
    client.current.open();

    return () => {
      if (client.current.isOpen) {
        client.current.close();
      }
    }
  }, [client.current.isOpen]);

  return (
    <div className="modal-container">
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "100%",
          width: "100%",
        }}
      ></div>
      <div
        style={{ position: "absolute", zIndex: 10 }}
        id="kycDaoMountingPoint"
      ></div>
    </div>
  );
};

export default KycDaoModal;
