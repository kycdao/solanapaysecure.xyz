import { createQR } from "@solana/pay";

export default {
  insertQrIntoDom: (url, id) => {
    const qr = createQR(url);
    // @ts-ignore
    qr.append(document.getElementById(id));
  },
};
