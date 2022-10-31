import React, {  useLayoutEffect, useMemo, } from "react";
import { Helmet } from 'react-helmet'
import Button from '../components/button'
import '@kycdao/kycdao-web-sdk'
import '@kycdao/kycdao-web-sdk/dist/static/css/main.c715000a.css'
import './kycDaoModal.css'

function KycDaoClient(width, height, parent, isIframe = true, url, messageTargetOrigin) {
    this.messageTargetOrigin = messageTargetOrigin
    this.parent = parent || document.body
    this.url = url
    this.width = width || 400
    this.height = height || 650
    this.modal = null
    this.isOpen = false
    this.result = false
    this.onOutsideClick = (function (event) {
        if (this.modal && !event.composedPath().includes(document.getElementsByClassName('KycDaoModal').item(0))) {
            this.close()
        }
    }).bind(this)
    this.isIframe = isIframe
    this.messageHndlr = (function ({ origin, data }) {
        if (origin === this.url) {
            switch (data) {
                case 'kycDaoCloseModal':
                    this.close()
                    break
                case 'kycDaoSuccess': {
                    if (this.onSuccess) {
                        this.onSuccess(this.result)
                    }
                    this.close()
                }
                    break
                case 'kycDaoFail': {
                    if (this.onFail) {
                        this.onFail(this.result)
                    }
                    this.close()
                }
            }
        }
    }).bind(this)
    this.onSuccess = null
    this.onFail = null
}

KycDaoClient.prototype.open = function () {
    this.modal = document.createElement('div')
    this.modal.classList.add("KycDaoModal")

    const modalContent = document.createElement('div')
    modalContent.classList.add("KycDaoModalContent")

    const modalBody = document.createElement('div')
    modalBody.className = 'modal-body'
    modalBody.classList.add("KycDaoModalBody")

    const container = this.isIframe ? document.createElement('iframe') : document.createElement('div')
    container.allow = "encrypted-media; camera"
    container.style = "border: 0px"
    container.src = this.url
    container.width = this.width
    container.height = this.height
    container.classList.add('KycDaoModalIframe')

    modalBody.appendChild(container)
    modalContent.appendChild(modalBody)
    this.modal.appendChild(modalContent)

    if (typeof this.parent === 'string') {
        this.parent = document.querySelector(this.parent)
    }

    this.parent.appendChild(this.modal)
    this.isOpen = true

    setTimeout(() => {
        window.addEventListener('click', this.onOutsideClick)
        window.addEventListener('message', this.messageHndlr)
        if(!this.isIframe) {
            BootstrapKycDaoModal(container, this.height, this.width, this.messageTargetOrigin)
        }
    }, 0);
}

KycDaoClient.prototype.close = function () {
    if (this.modal) {
        if (this.parent) {
            this.parent.removeChild(this.modal)
        } else {
            document.removeChild(this.modal)
        }
    }

    window.removeEventListener('click', this.onOutsideClick)
    window.removeEventListener('message', this.closHndlr)
    this.isOpen = false
}

const KycDaoModal = (props) => {
    const client = useMemo(() => new KycDaoClient(400, 650, "#kycDaoMountingPoint", false, window.location.origin), [])

    useLayoutEffect(() => {
        client.open()

        return () => client.close()
    }, [])

    return <div className="modal-container">
        <Helmet>
            <title>Modal - Solana-pay-demo</title>
            <meta property="og:title" content="Modal - Solana-pay-demo" />
        </Helmet>
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
            <div id="kycDaoMountingPoint"></div>
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