import style from './contact.module.css';
function Contact(){

    return(
        <>
            <div className={style.contact_container}>
                <label className={style.label} htmlFor='email' />
                <input 
                name="email"
                className={style.input}
                disabled
                />
                <label className={style.label} htmlFor='phone' />
                <input 
                name="phone"
                className={style.input}
                disabled
                />
            </div>
        </>
    );
}

export default Contact