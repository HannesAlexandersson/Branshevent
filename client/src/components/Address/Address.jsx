import { useState } from 'react';
import style from './address.module.css';

function Address({ onAddressChange, companyAddress }){
const [address, setAddress] = useState('');

const handleInput = (event) => {
    const newAddress =sanitizeInput(event.target.value);
    setAddress(newAddress);

    onAddressChange(newAddress);//pass the address back to parent component
}
const sanitizeInput = (value) => {       
    return value.trim();
};

    return(
            <>
                <div className={style.address_wrapper}>
                    <div className={style.title}>
                        <h2>Company address</h2>
                    </div>
                    <div className={style.input_container}>
                        <input 
                            className={style.input} 
                            name="company_adress"
                            type="text"
                            onChange={handleInput}
                            placeholder="Street Address, Postalcode/City"// impossible to have newline chars in placeholder text??
                           value={companyAddress}
                        />
                    </div>
                </div>
            </>

    );
}

export default Address