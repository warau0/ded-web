/* eslint-disable no-unused-vars */

const sm = '476px';
const md = '785px';
const lg = '1024px';
const xl = '1456px';

const content = { '@mixin-content': '' };

const mixins = {
  phone: _ => ({
    '@media (max-width: 785px)': content,
  }),

  tablet: _ => ({
    '@media (min-width: 785px) and (max-width: 1024px)': content,
  }),

  desktop: _ => ({
    '@media (min-width: 1024px) and (max-width: 1456px)': content,
  }),

  wide: _ => ({
    '@media (min-width: 1456px)': content,
  }),
};

module.exports = mixins;
/* eslint-enable no-unused-vars */
