import { Navbar_landing } from '../../components/index.js';
import style from './error.module.css';
import { roach, ladybug, } from '../../assets/Bugs/index.js';


export default function ErrorPage() {


  return (
    <>
      <Navbar_landing />
      <div id="error-page" className={style.error_container}>
        <h1>Oops!</h1>
        <p>We are so sorry! It seem we havent fully implemented this feature yet!</p>
          <div className={style.ladybug_cont}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
          <div className={style.roach_cont}>
            <img src={roach} className={style.roach}/>
          </div>
          <div className={style.ladybug_cont1}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
          <div className={style.ladybug_cont2}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
          <div className={style.ladybug_cont3}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
          <div className={style.roach_cont1}>
            <img src={roach} className={style.roach}/>
          </div>
          <div className={style.ladybug_cont4}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
          <div className={style.ladybug_cont5}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
          <div className={style.ladybug_cont6}>
            <img src={ladybug} className={style.ladybug}/>
          </div>
      </div>
    </>
  );
}