import React from 'react';
import PropTypes from 'prop-types';
import styles from './progressbar.module.css';

const Progressbar = ({ currentStep, totalSteps }) => {
  const steps = []; 

  // we loop through totalSteps, if i is less or equal to the currentstep thats passed as prop it gets the css class "completed" adn the steps over gets default class
  for (let i = 1; i <= totalSteps; i++) {
    const isCompleted = i <= currentStep;
    steps.push(
      <React.Fragment key={i}>
        <div className={`${styles.line} ${isCompleted ? styles.completed : ''}`} />{ /*if the step is completed its assigned 'isCompleted' */}
        <div className={`${styles.circle} ${isCompleted ? styles.completed : ''}`} />
      </React.Fragment>
    );
  }

  return <div className={styles.progressbar}>{steps}</div>;// we then can return the entire progressbar 
};

Progressbar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default Progressbar;