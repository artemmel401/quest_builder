import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import styles from './qrCode.module.scss';

type QrCodeProps = {
  number: number;
};

export default function QrCode({ number}: QrCodeProps) {

  return (
    <div className={styles.container}>
      <p>Уникальный QR-код на ваше занятие</p>
      <div className={styles.container__qr}>
        <QRCode
          style={{ height: `130px`, width: `130px` }}
          value={`http://localhost:8080/${number}`}
        />
      </div>
    </div>
  );
}