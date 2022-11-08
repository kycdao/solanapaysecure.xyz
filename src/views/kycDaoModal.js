import React, { useEffect, useRef } from "react";
import "./kycDaoModal.css";
import { getSolanaProvider } from "../utils/getSolanaProvider";
import "@kycdao/kycdao-web-sdk";
import "@kycdao/kycdao-web-sdk/dist/index.css";

const solanaProvider = getSolanaProvider();

const KycDaoModal = ({ onSuccess, onFail }) => {
  const client = useRef(
    (() => {
      if (solanaProvider) {
        return new window.KycDaoClient({
          config: {
            demoMode: true,
            enabledBlockchainNetworks: [
              "SolanaDevnet",
            ],
            enabledVerificationTypes: ["KYC"],
            baseUrl: "https://staging.kycdao.xyz"
          },
          height: "100%",
          width: "100%",
          parent: "#kycDaoMountingPoint",
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
