import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
//    bottomDivider && 'has-bottom-divider'
  );

  const innerClasses1 = classNames(
    'features-split-inner section-inner',
//    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'How much can I earn?',
    paragraph: 'Our products are powered by DeFi and are designed to help you effortlessly generate cash flow from your crypto.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={{}} className="center-content" />
          <div className={splitClasses}>

            <div className="split-item">
              <div className={
                classNames(
                  'split-item-image split-item-wrap-left center-content-mobile reveal-from-left',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/play-win.png')}
                  alt="Features split 01"
                  width={971}
                  height={1200} />
              </div>

              <div className="split-item-content split-item-wrap-left center-content-mobile reveal-from-bottom" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Prize-Linked Accumulating Yield
                </div>
                <h2 className="mt-0 mb-12">
                  Eris P.L.A.Y.
                  </h2>
                <p className="m-0">
                  Eris P.L.A.Y. is the new Eris TAP based project that allows Eris token holders to generate even more rewards. Simple, Powerful and Proven.
                  </p>
                <ul>
                  <li>Your Eris Tokens Give You Access to P.L.A.Y.</li>
                  <li>Easy to Enter Easy to Play</li>
                  <li>Multiple Big Winners Each Week</li>
                  <li>No One Loses Their Initial Deposit</li>
                  <li>Even if you don’t win, keep all of your money!</li>
                </ul>
                <Button tag="a" color="secondary" style="mt-32" wideMobile href="https://app.eris.finance/" target="_blank">
                   Comming Soon ->
                </Button>
              </div>
            </div>
		</div>
	</div>
	
	<div className="container">
        <div className={innerClasses1}>
            <SectionHeader data={sectionHeader} className="center-content" />
			<div className={splitClasses}>			
            <div className="split-item">
              <div className="split-item-content split-item-wrap-left split-item-wrap-right center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <h3 className="mt-0">
                  At the end of the year and with $1000 USD of $ERIS invested.
                </h3>
                <div>
                  <span className="h3 mt-0 mb-12 text-color-high">You can earn up to </span>
                  <span className="h3 text-color-primary">$1,002,758.54 USD </span>
                  <span className="h3 text-color-high">of $ERIS at 102,483.58% APY*.</span>
                  <span className="text-color-low"/>
                </div>
                
                <p>Earnings are calculated in a scenario where the RFV sustains the rebase reward for 365 days. </p>
                <Button tag="a" color="primary" style="animation-float" wideMobile href="https://app.eris.finance/" target="_blank">
                   Starting Earning Now >
                </Button>
              </div>

              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={require('./../../assets/images/stock-earn.png')}
                  alt="Features split 03"
                  width={800}
                  height={500} />
              </div>
            </div>
          </div>
	  </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;