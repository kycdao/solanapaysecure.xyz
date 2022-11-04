import { createQROptions } from "@solana/pay";

import QRCodeStyling from '@solana/qr-code-styling';

export default {
  insertQrIntoDom: ({url, containerElement, size = 256}) => {
    const opts = createQROptions(url, size)

    opts.margin = 0;

    const qr = new QRCodeStyling(opts);

    qr.append(containerElement);
  },
};
