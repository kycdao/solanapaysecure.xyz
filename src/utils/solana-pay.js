import { createQROptions } from "@solana/pay";

import QRCodeStyling from '@solana/qr-code-styling';

export default {
  insertQrIntoDom: (url, containerElement) => {
    const opts = createQROptions(url, 256)

    opts.margin = 0;

    const qr = new QRCodeStyling(opts);
    // @ts-ignore
    qr.append(containerElement);
  },
};
