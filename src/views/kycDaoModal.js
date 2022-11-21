import React, { useEffect, useRef } from "react"
import "./kycDaoModal.css"
import { getSolanaProvider } from "../utils/getSolanaProvider"
import "@kycdao/kycdao-web-sdk"
import PropTypes from "prop-types"

const KycDaoModal = ({ onSuccess, onFail }) => {
	const solanaProvider = useRef(getSolanaProvider())

	const client = useRef(
		(() => {
			if (solanaProvider.current) {
				return new window.KycDaoClient({
					config: {
						demoMode: true,
						enabledBlockchainNetworks: [
							//"SolanaDevnet",
							"SolanaMainnet",
						],
						enabledVerificationTypes: ["KYC"],
						// baseUrl: "https://staging.kycdao.xyz"
						baseUrl: "https://prod-test.kycdao.xyz",
					},
					height: "650px",
					width: "400px",
					parent: "#kycDaoMountingPoint",
					onFail,
					onSuccess,
					url: window.location.origin,
				})
			}
		})()
	)

	useEffect(() => {
		const currentClient = client.current

		if (currentClient) {
			currentClient.open()

			return () => {
				if (currentClient.isOpen) {
					currentClient.close()
				}
			}
		}
	}, [client.current?.isOpen])

	return (
		<div className="modal-container">
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					zIndex: 10,
				}}
				id="kycDaoMountingPoint"></div>
		</div>
	)
}

KycDaoModal.propTypes = {
	onSuccess: PropTypes.func,
	onFail: PropTypes.func,
}

export default KycDaoModal
