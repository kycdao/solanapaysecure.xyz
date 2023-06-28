import React, { useCallback, useEffect, useState, useRef } from "react"
import { KycDaoClient } from "@kycdao/widget"
import { InsertQrIntoDom } from "./utils/solana-pay"
import "./home.css"
import SolanaPayModal from "./solanaPayModal"

import solanaPayLogo from "assets/solanapay-logo.svg"
import solanaCoffee from "assets/solana-coffe.png"
import bgFrame from "assets/frame3451-pky.svg"

const phantomInAppUrl = `https://phantom.app/ul/browse/${encodeURIComponent(
	"https://solanapaysecure.kycdao.xyz/?startFlow=1"
)}`
const App: React.FC = () => {

	const [modalOpen, setModalOpen] = useState(
		new URLSearchParams(window.location.search).get("startFlow") === "1"
	)

	const [kycDaoProcessRan, setKycDaoProcessRan] = useState(false)

	const toggleModal = () => {
		setModalOpen((value) => !value)
	}

	useEffect(() => {
		if (!modalOpen) {
			return
		}

		const qrContainer = document.getElementById("mount-qr-code")

		if (qrContainer) {
			InsertQrIntoDom({
				url: phantomInAppUrl,
				containerElement: qrContainer,
			})

			return () => {
				const qrContainer = document.getElementById("mount-qr-code")
				if (qrContainer) {
					qrContainer.innerHTML = ""
				}
			}
		}
	}, [modalOpen])  
  
  const [client, setClient] = useState<KycDaoClient>()
  useEffect(() => {
    const newClient = new KycDaoClient({
      parent: "#modalRoot",
      modal: true,
      backdrop: true,
      config: {
        demoMode: true,
        enabledBlockchainNetworks: [
          "SolanaDevnet",
        ],
        enabledVerificationTypes: ["KYC"],
        baseUrl: "https://staging.kycdao.xyz",
      },
      onSuccess: (data) => {
		    setKycDaoProcessRan(true)

        if (data) {
          const i = /Already has an nft on (.*)\./g.exec(data)

          if (i) {
            console.log(`Already has an nft on ${i[1]}.`)
          } else {
            console.log("Completed KYC, tx: ", { data })
          }
        }
      },
      onFail: (data) => {
        if (data !== "cancelled") {
          alert("Something went wrong!")
        }

        console.log({ reason: data })
	    },
    })

    setClient(newClient)
  }, [])

  const open = useCallback(
    () => {
      client?.open()
    },
    [client]
  )

  return (
    <>
      <div id="modalRoot"></div>
      <div className="home-container">
			<div className="home-mac-book-air-m23">
				<div className="container home-frame8191">
					<img
						alt="solana logo"
						src={solanaPayLogo}
						className="home-image"
					/>
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
								src={bgFrame}
								className="home-frame"
							/>
						</div>
						<div className="home-group8124">
							<div className="home-group8123">
								<h3>1 USDC</h3>
							</div>
							<img
								alt="Its a coffee mug, in a dark background, looks pretty delicious."
								src={solanaCoffee}
								className="home-image2"
							/>
						</div>
					</div>
				</div>
			</div>

			{modalOpen && (
				<>
					{!kycDaoProcessRan && (
						<div id="the-modal" className="opened">
							<div className="modal-content">
								<div className="modal-header">
									<h1>Connect Wallet</h1>
									<h3>
										To purchase this item, your should activate you wallet.
									</h3>
									<div onClick={toggleModal} className="modal-close">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											width="24">
											<path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" />
										</svg>
									</div>
								</div>
								<div className="modal-body">
									<h3>
										Scan this QR code to open this site in your wallet&apos;s
										in-app browser.
									</h3>
									<div className="qr-code">
										<a href={phantomInAppUrl}>
											<div id="mount-qr-code"></div>
										</a>
									</div>
								</div>
								<div className="modal-button-container">
									<div onClick={() => open()} className="button-button">
										<span className="modal-text">
											<button>Connect wallet</button>
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
					{kycDaoProcessRan && <SolanaPayModal onClose={toggleModal} />}
				</>
			)}
		</div>      
    </>
  )
}

export default App
