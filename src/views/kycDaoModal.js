import React, { useLayoutEffect, useMemo, useRef, } from "react";
import { Helmet } from 'react-helmet'
import Button from '../components/button'
import '@kycdao/kycdao-web-sdk/dist/static/css/main.c715000a.css'
import './kycDaoModal.css'
import { useHistory } from "react-router";
import '@kycdao/kycdao-web-sdk'

const KycDaoModal = (props) => {
    const location = useHistory()

    const client = useRef(new KycDaoClient(
        400,
        650,
        ['NearTestnet', 'PolygonMumbai', 'SolanaDevnet'],
        ['KYC'],
        "#kycDaoMountingPoint",
        true,
        false,
        null,
        window.location.origin
    ))

    useLayoutEffect(() => {
        client.current.onSuccess = () => {
            location.replace('/home')
        }
        client.current.onFail = () => {
            if (data !== 'cancelled') {
                alert('Something went wrong!')
            }
            location.replace('/home')
        }
        client.current.open()

        return () => client.current.close()
    }, [])

    return <div className="modal-container">
        <Helmet>
            <title>Modal - Solana-pay-demo</title>
            <meta property="og:title" content="Modal - Solana-pay-demo" />
        </Helmet>
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100%', width: '100%' }}></div>
        <div style={{ position: 'absolute', zIndex: 10 }} id="kycDaoMountingPoint"></div>
        <div className="modal-mac-book-air-m23">
            <div className="modal-frame8191">
                <img
                    alt="image"
                    src="/playground_assets/solanapay-logo.svg"
                    className="modal-image"
                />
                <div className="modal-button">
                    <span className="modal-text">
                        <span>Connect wallet</span>
                    </span>
                </div>
            </div>
            <div className="modal-frame8126">
                <div className="modal-container1">
                    <span className="modal-text02">
                        <span>
                            This
                        </span>
                        <span className="modal-text04">
                            demo
                        </span>
                        <span>
                            will demonstrate the solana pay kyc system during an NFT drop.
                        </span>
                    </span>
                    <div className="modal-container2">
                        <Button></Button>
                    </div>
                </div>
                <div className="modal-group8125">
                    <div className="modal-container3">
                        <span className="modal-text06">
                            <span>Get NFT</span>
                        </span>
                        <img
                            alt="Frame3451"
                            src="/playground_assets/frame3451-pky.svg"
                            className="modal-frame"
                        />
                    </div>
                    <div className="modal-group8124">
                        <div className="modal-group8123">
                            <span className="modal-text08">
                                <span>
                                    <span>y00ts: mint t00b #12007</span>
                                    <br></br>
                                    <span></span>
                                </span>
                            </span>
                            <span className="modal-text13">
                                <span>102.99 SOL</span>
                            </span>
                        </div>
                        <img
                            alt="image23451"
                            src="/playground_assets/image23451-4bxl-400w.png"
                            className="modal-image2"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default KycDaoModal