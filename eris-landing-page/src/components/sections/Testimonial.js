import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
//    bottomDivider && 'has-bottom-divider'
  );
  
  const innerClasses1 = classNames(
    'testimonial-inner section-inner',
//    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Tokenomics',
    paragraph: ''
  };

  const sectionHeader1 = {
    title: 'Find us on',
    paragraph: ''
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content mt-16" />
          <div className="mt-0 mb-32 reveal-from-top" data-reveal-delay="200">
            <h4 className="has-bottom-divider_4" style={{width:'90%', paddingBottom:'1%'}}>Eris Tokenomics Explained</h4>
            <p className="text-sm">$ERIS is a BEP-20 token with an elastic supply that rewards holders using a positive rebase formula.</p>
          </div>
          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="testimonial-tiles-item-image mb-0">
                  <Image
                      src={require('./../../assets/images/auto-lp.svg')}
                      width={100}
                      height={100} />
                </div>
                <div className="testimonial-item-content">
                  <h4>Automatic LP</h4>
                  <p className="text-sm mb-0">
                    5% of the trading fees return to the liquidity ensuring $ERIS's increasing collateral value.
                  </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="700">
              <div className="tiles-item-inner">
                <div className="testimonial-tiles-item-image mb-0">
                  <Image
                      src={require('./../../assets/images/treasury.svg')}
                      width={100}
                      height={100} />
                </div>
                <div className="testimonial-item-content">
                  <h4>Treasury</h4>
                  <p className="text-sm mb-0">
                    3% of the purchases and 8% of the sales go directly to the treasury which supports the RFV.
                  </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="1000">
              <div className="tiles-item-inner">
                <div className="testimonial-tiles-item-image mb-0">
                  <Image
                      src={require('./../../assets/images/risk-free-value.svg')}
                      width={100}
                      height={100} />
                </div>
                <div className="testimonial-item-content">
                  <h4>Risk Free Value</h4>
                  <p className="text-sm mb-0">
                    5% of the trading fees are redirected to the RFV which helps sustain and back the staking rewards provided by the positive rebase.
                  </p>
                </div>
              </div>
            </div>
          </div>
		</div>
	  </div>
	  <div className="container">
        <div className={innerClasses1}>
          <SectionHeader data={sectionHeader1} className="center-content mt-16" />
          <div className={tilesClasses}>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="200" href="https://coinmarketcap.com/currencies/eris" target="_blank">
              <figure className="logo-tiles-item-figure">
                <Image
                    src={require('./../../assets/images/frame-1.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="400" href="https://www.coingecko.com/en/coins/eris" target="_blank">
              <figure className="logo-tiles-item-figure">
                <Image
                    src={require('./../../assets/images/frame-2.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="600" href="https://www.certik.com/projects/eris" target="_blank">
              <figure className="logo-tiles-item-figure tiles-item-animation-grow">
                <Image
                    src={require('./../../assets/images/frame-3.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="800" href="https://solidity.finance/audits/Titano/" target="_blank">
              <figure className="logo-tiles-item-figure tiles-item-animation-grow">
                <Image
                    src={require('./../../assets/images/frame-4.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="200" href="https://finance.yahoo.com/news/titano-launches-defis-first-automatic-170900951.html" target="_blank">
              <figure className="logo-tiles-item-figure tiles-item-animation-grow">
                <Image
                    src={require('./../../assets/images/frame-5.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="400" href="https://news.yahoo.com/titano-launches-defis-first-automatic-170900951.html" target="_blank">
              <figure className="logo-tiles-item-figure tiles-item-animation-grow">
                <Image
                    src={require('./../../assets/images/frame-6.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="600" href="https://www.marketwatch.com/press-release/titano-launches-defis-first-automatic-fixed-apy-2021-12-17?tesla=y" target="_blank">
              <figure className="logo-tiles-item-figure tiles-item-animation-grow">
                <Image
                    src={require('./../../assets/images/frame-7.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
            <a className="logo-tiles-item reveal-from-left" data-reveal-delay="800" href="https://www.benzinga.com/pressreleases/21/12/g24674921/titano-launches-defis-first-automatic-fixed-apy" target="_blank">
              <figure className="logo-tiles-item-figure tiles-item-animation-grow">
                <Image
                    src={require('./../../assets/images/frame-8.png')}
                    width={300}
                    height={120} />                  
              </figure>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;