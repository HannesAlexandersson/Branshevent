import { useNavigate } from 'react-router-dom';
import style from './quiz.module.css';

function Quiz_wrapper(){
    const navigate = useNavigate();
    const handleQuiz = () => {
        navigate('/error');
    }
    return(
        <>
        
        <div className={style.quiz_wrapper}>
            <button className={style.quizbtn} onClick={handleQuiz}>
                <p className={style.quiz_head}>What company suits you the best?</p>
                <p className={style.quiz_sub}>Increase your chances of connecting by taking this quiz</p>
            </button>
        </div>

        </>
    );
}

export default Quiz_wrapper