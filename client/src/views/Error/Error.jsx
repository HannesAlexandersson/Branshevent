import style from './error.module.css';
import { roach, ladybug, } from '../../assets/Bugs/index.js';


export default function ErrorPage() {


  return (
    <div id="error-page" className={style.error_container}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div className={style.ladybug_cont}>
        <img src={ladybug} className={style.ladybug}/>
      </div>
      <div className={style.roach_cont}>
      <img src={roach} className={style.roach}/>
      </div>
    </div>
  );
}