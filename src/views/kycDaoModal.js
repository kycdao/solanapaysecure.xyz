import React, { useLayoutEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import "./kycDaoModal.css";
import { useHistory } from "react-router";
import { getSolanaProvider } from "../utils/getSolanaProvider";
import "@kycdao/kycdao-web-sdk/dist/static/css/main.css";
import "@kycdao/kycdao-web-sdk";

const solanaProvider = getSolanaProvider();

const KycDaoModal = (props) => {
  const location = useHistory();
  const client = useRef(
    (() => {
      if (solanaProvider) {
        return new window.KycDaoClient({
          demoMode: true,
          enabledBlockchainNetworks: [
            "NearTestnet",
            "PolygonMumbai",
            "SolanaDevnet",
          ],
          enabledVerificationTypes: ["KYC"],
          height: "400px",
          width: "650px",
          isIframe: false,
          parent: "#kycDaoMountingPoint",
          messageTargetOrigin: window.location.origin,
          onFail: () => {},
          onSuccess: () => {},
          url: "",
        });
      }
    })()
  );

  useLayoutEffect(() => {
    console.log(client.current);

    if (client.current) {
      client.current.onSuccess = () => {
        location.replace("/home");
      };
      client.current.onFail = () => {
        if (data !== "cancelled") {
          alert("Something went wrong!");
        }
        location.replace("/home");
      };
      client.current.open();

      return () => client.current.close();
    }
  }, [client.current]);

  return (
    <div className="modal-container">
      <Helmet>
        <title>SolanaPay demo</title>
        <meta property="og:title" content="Modal - Solana-pay-demo" />
      </Helmet>
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
