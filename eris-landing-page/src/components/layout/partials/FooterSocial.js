import React from 'react';
import classNames from 'classnames';
import Image from '../../elements/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter, faLinkedin, faTelegram, faDiscord, faYoutube, faMedium, faGithub} from "@fortawesome/free-brands-svg-icons";

const FooterSocial = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-social',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a href="https://facebook.com/">
          <FontAwesomeIcon icon={faFacebookF} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/">
            <FontAwesomeIcon icon={faTwitter} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/">
            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://t.me/eris_finance">
            <FontAwesomeIcon icon={faTelegram} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://discord.gg/xxdS792B7q">
            <FontAwesomeIcon icon={faDiscord} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UC60b5etdiMUA4TWVe-klD0g">
            <FontAwesomeIcon icon={faYoutube} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://eris.medium.com/">
            <FontAwesomeIcon icon={faMedium} size="2x"/>
          </a>
        </li>
        <li>
          <a href="https://github.com/eris-finance">
            <FontAwesomeIcon icon={faGithub} size="2x"/>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FooterSocial;