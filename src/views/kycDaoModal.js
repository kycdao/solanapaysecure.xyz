import React, { useEffect, useRef } from "react"
import "./kycDaoModal.css"
import { getSolanaProvider } from "../utils/getSolanaProvider"
import "@kycdao/kycdao-web-sdk"
import "@kycdao/kycdao-web-sdk/dist/index.css"
import PropTypes from "prop-types"

const KycDaoModal = ({ onSuccess, onFail }) => {
	const solanaProvider = useRef(getSolanaProvider())

	const client = useRef(
		(() => {
			if (solanaProvider) {
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
					height: "100%",
					width: "100%",
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

		currentClient.open()

		return () => {
			if (currentClient.isOpen) {
				currentClient.close()
			}
		}
	}, [client.current.isOpen])

	return (
		<div className="modal-container">
			<div
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.7)",
					height: "100%",
					width: "100%",
				}}></div>
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
