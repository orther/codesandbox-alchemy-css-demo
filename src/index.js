import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './fonts.css';
import './styles.css';

function FeedbackloopCaps({ right }) {
  return <div className={`cap ${right ? 'right' : 'left'}`} />;
}

const stepClassName = number => {
  if (number === 1) return 'one';
  if (number === 2) return 'two';
  if (number === 3) return 'three';
  if (number === 4) return 'four';
};

function Step({ number, children, activeStep }) {
  const isActive = activeStep === number;
  const isDimmed = activeStep < number;

  const nameClass = stepClassName(number);
  const activeClass = isActive ? 'active' : '';
  const dimmedClass = isDimmed ? 'dimmed' : '';

  return (
    <div className={`step ${nameClass} ${activeClass} ${dimmedClass}`}>
      <div className="number-shadow">{number}</div>
      <div className="number">{number}</div>
      <div className="text">{children}</div>
    </div>
  );
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
  activeStep: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
};

class TheProcess extends React.Component {
  state = {
    activeStep: 1,
  };

  onNextStep = e => {
    this.setState(({ activeStep }) => {
      if (activeStep >= 4) return { activeStep: 1 };
      return { activeStep: activeStep + 1 };
    });
  };

  render() {
    const { activeStep } = this.state;

    return (
      <div className="the-process">
        <h2>The process</h2>
        <div className="feedback-loop">
          <FeedbackloopCaps />
          <div className="steps">
            <div className="step-group">
              <Step number={1} activeStep={activeStep}>
                <strong>Understand & define</strong> the problem
              </Step>
              <div className="guide-line" />
              <Step number={2} activeStep={activeStep}>
                <strong>Ideate & visualize</strong> the solution
              </Step>
            </div>
            <div className="step-group">
              <Step number={4} activeStep={activeStep}>
                <strong>Implement</strong> the ideal solution
              </Step>
              <div className="guide-line" />
              <Step number={3} activeStep={activeStep}>
                <strong>Validate</strong> to a single solution
              </Step>
            </div>
          </div>
          <FeedbackloopCaps right />
        </div>
        <button onClick={this.onNextStep} className="next-step">
          Next Step
        </button>
        {this.state.activeStep}
      </div>
    );
  }
}

function Header() {
  return (
    <header className="header">
      <div
        className="header-bg"
        style={{ transform: 'rotate(180deg) translate3d(1px, -100%, 0px)' }}
      />
      <img
        role="presentation"
        src="https://alchemy.codes/static/images/logo-alchemy-white.bdceccf1.svg"
      />
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <TheProcess />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
