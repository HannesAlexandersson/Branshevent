import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import style from './qr.module.css';
function QR_Code(){
    const [qrCodeDataURL, setQRCodeDataURL] = useState('');

    useEffect(() => {
        // replace it with actual data our DB when endpoints are done
        const contact = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '+1234567890',
            address: '123 Main St, Anytown, USA'
        };

        // format users details into vcard format
        const vCardContent = `BEGIN:VCARD
            VERSION:3.0
            FN:${contact.name}
            EMAIL:${contact.email}
            TEL:${contact.phone}
            ADR:${contact.address}
            END:VCARD`;

        // create the qr
        QRCode.toDataURL(vCardContent)
            .then(qrCodeDataURL => {
                setQRCodeDataURL(qrCodeDataURL);
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
            });
    }, []);

    
    return(
        <>
            <div className={style.qr_container}>
                {qrCodeDataURL && (
                    <img src={qrCodeDataURL} alt="QR Code" />
                )}
            </div>
        </>
    );
}

export default QR_Code