import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import vcard from 'vcard-generator';
import { qr } from '../../assets/Icons/index.js';
import style from './qr.module.css';
function QR_Code({ firstName, lastName, email, phone }){
    const [qrCodeDataURL, setQRCodeDataURL] = useState('');

    useEffect(() => {
        

        const vcardContent = vcard.generate({
            name: {
                familyName: lastName,
                givenName: firstName,

            },
            emails: [
                {
                type: 'email',
                text: email,
              }],
              phones: [{
                type: 'phonenumber',
                text: phone,
              }, {
                text: phone,
              }, {
                uri: `tel:${phone}`,
              }],
        })

        QRCode.toDataURL(vcardContent)
            .then(qrCodeDataURL => {
                setQRCodeDataURL(qrCodeDataURL);
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
            });
    }, [firstName, lastName, email, phone]);

    return (
        <div className={style.qr_wrapper}>
            <div className={style.sub_header}>
                <img src={qr} alt="QR Code Icon" />
                <div className={style.sub_txt}>
                    <p className={style.txt}>Share this profile</p>
                </div>
            </div>
            <div className={style.qr_container}>
                {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" />}
            </div>
        </div>
    );
}

export default QR_Code