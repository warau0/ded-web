import React, {
  memo,
} from 'react';
import PropTypes from 'prop-types';
import Language from '@material-ui/icons/Language';

import {
  logo,
  socialArtstation,
  socialDeviantart,
  socialGumroad,
  socialInstagram,
  socialKofi,
  socialPatreon,
  socialPaypal,
  socialPicarto,
  socialRedbubble,
  socialTumblr,
  socialTwitch,
  socialTwitter,
  socialYoutube,
} from 'ded-assets';

import * as styles from './styles.pcss';

const Icon = ({ url }) => {
  let icon = null;
  const lUrl = url.toLowerCase();

  switch (true) {
    case lUrl.indexOf('justdraw.lol') !== -1:
      icon = logo; break;
    case lUrl.indexOf('artstation.com') !== -1:
      icon = socialArtstation; break;
    case lUrl.indexOf('deviantart.com') !== -1:
      icon = socialDeviantart; break;
    case lUrl.indexOf('gumroad.com') !== -1:
      icon = socialGumroad; break;
    case lUrl.indexOf('instagram.com') !== -1:
      icon = socialInstagram; break;
    case lUrl.indexOf('ko-fi.com') !== -1:
      icon = socialKofi; break;
    case lUrl.indexOf('patreon.com') !== -1:
      icon = socialPatreon; break;
    case lUrl.indexOf('paypal.com') !== -1:
    case lUrl.indexOf('paypal.me') !== -1:
      icon = socialPaypal; break;
    case lUrl.indexOf('picarto.tv') !== -1:
      icon = socialPicarto; break;
    case lUrl.indexOf('redbubble.com') !== -1:
      icon = socialRedbubble; break;
    case lUrl.indexOf('tumblr.com') !== -1:
      icon = socialTumblr; break;
    case lUrl.indexOf('twitch.tv') !== -1:
      icon = socialTwitch; break;
    case lUrl.indexOf('twitter.com') !== -1:
      icon = socialTwitter; break;
    case lUrl.indexOf('youtube.com') !== -1:
      icon = socialYoutube; break;
    default: break;
  }

  if (icon) {
    return <img draggable={false} src={icon} alt='Social' />;
  }

  return <Language />;
};

const stripUrl = url => url.match('(https?://)?(www.)?(.*)')[3];

const SocialLink = memo(({
  url,
}) => (
  <div className={styles.link}>
    <Icon url={url} />
    <a href={url} target='_blank' rel='noopener noreferrer'>{stripUrl(url)}</a>
  </div>
));

const propTypes = {
  url: PropTypes.string.isRequired,
};
Icon.propTypes = propTypes;
SocialLink.propTypes = propTypes;

export default SocialLink;
