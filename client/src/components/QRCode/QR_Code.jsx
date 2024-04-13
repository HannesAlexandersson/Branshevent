import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { qr } from '../../assets/Icons/index.js';
import style from './qr.module.css';
function QR_Code({ firstName, lastName, email, phone }){
    const [qrCodeDataURL, setQRCodeDataURL] = useState('');

    useEffect(() => {
        const fullname = firstName + ' ' + lastName; 
        // replace it with actual data our DB when endpoints are done
        const contact = {
            name: fullname,
            email: email,
            phone: phone,            
        };

        // format users details into vcard format
        const vCardContent = `BEGIN:VCARD
            VERSION:3.0
            FN:${contact.name}
            EMAIL:${contact.email}
            TEL:${contact.phone}           
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
            <div className={style.qr_wrapper}>
                <div className={style.sub_header}>
                    <img src={qr} />
                    <div className={style.sub_txt}>
                        <p className={style.txt}>Share this profile</p>
                    </div>
                </div>
                <div className={style.qr_container}>
                    {qrCodeDataURL && (
                        <img src={qrCodeDataURL} alt="QR Code" />
                    )}
                </div>
            </div>
        </>
    );
}

export default QR_Code