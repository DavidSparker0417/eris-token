import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}

const Hero = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    ...props
}) => {

    const [videoModalActive, setVideomodalactive] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setVideomodalactive(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setVideomodalactive(false);
    }

    const outerClasses = classNames(
        'hero section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'hero-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <div className="container-sm">
                <div className={innerClasses}>
                    <div className="hero-content">
                        <div className="split-wrap invert-mobile">
                            <div className="split-item" data-reveal-delay="200">
                                <div className="split-item-image center-content-mobile reveal-from-left" data-reveal-container=".split-item" style={{width:"100%"}}>
                                    <Image
                                        className="has-shadow"
                                        src={require('./../../assets/images/logo.png')}
                                        alt="Hero"
                                    />
                                </div>
                                <div className="split-item-content split-item-wrap-left reveal-from-right" data-reveal-container=".split-item">
                                    <h2 className="mt-0 mb-16 reveal-from-top">
                                        The Best Auto-Staking & Auto-Compounding Protocol in Crypto
                                    </h2>
                                    <ul className="reveal-from-bottom">
                                        <li>Highest Fixed APY – 102,483%</li>
                                        <li>First Automatic Staking and Compounding in Your Wallet!</li>
                                        <li>Get Rewards Every 30 Minutes / 48 Times Daily!</li>
                                    </ul>
                                    <ButtonGroup>
                                        <div class="button-wrapper">
                                            <div class="button-wrapspace">
                                                <Button tag="a" color="primary" style="animation-bloom" wideMobile href="https://pancakeswap.finance/swap?outputCurrency=0xba96731324de188ebc1ed87ca74544ddebc07d7f">
                                                    <div></div>
                                                    <span>Buy $ERIS</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div class="button-wrapper">
                                            <div class="button-wrapspace">
                                                <Button tag="a" color="pink" style="animation-bloom" wideMobile href="https://docs.eris.finance/">
                                                    <div></div>
                                                    <span>White Paper</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-xs">
                <h2 className="mt-32 mb-16 reveal-from-top ta-c" data-reveal-delay="400">
                    Eris Autostaking Protocol
                </h2>
                <div className="split-wrap invert-mobile">
                    <div className="split-item" data-reveal-delay="600">
                        <div className="split-item-content reveal-from-left split-item-wrap-right" data-reveal-container=".split-item">
                            <h4 className="mt-16 mb-16 reveal-from-bottom text-color-secondary">ABOUT</h4>
                            <p className="mt-0 mb-32 reveal-from-bottom" style={{lineHeight: 2}}>
                                Eris Finance is transforming DeFi with the Eris Autostaking Protocol (EAP) that delivers the industry's
                                    highest fixed APY, rebasing rewards every 30 minutes, and a simple buy-hold-earn system that grows your 
                                    portfolio in your wallet, fast.
                            </p>

                            <Button tag="a" color="primary" style="animation-float mt-32" wideMobile href="https://app.titano.finance/" target="_blank">
                                Explore DApp
                            </Button>
                        </div>
                        <div className="split-item-image center-content-mobile reveal-from-right" data-reveal-container=".split-item" style={{maxWidth:240}}>
                            <Image
                                className="has-shadow"
                                src={require('./../../assets/images/fixed_stak_apy.png')}
                                alt="Hero"
                            />
                        </div>
                    </div>
                </div>
                <a className="mt-0 mb-32 reveal-from-bottom ta-c" data-reveal-delay="600"
                    href="https://bscscan.com/address/0xBA96731324dE188ebC1eD87ca74544dDEbC07D7f"
                    target="_blank"
                    style={{fontSize:14}}>
                        $Eris Contract: 0xba96731324de188ebc1ed87ca74544ddebc07d7f
                </a>

            </div>
        </section>
    );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;