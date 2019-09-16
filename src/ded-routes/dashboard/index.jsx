import React, { useContext } from 'react';
import cn from 'classnames';

import Layout from 'ded-components/layout';
import Schedule from 'ded-components/schedule';
import Leaderboard from 'ded-components/leaderboard';
import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

/* eslint-disable react/jsx-curly-brace-presence */
export default () => {
  const [theme] = useContext(ThemeContext);

  return (
    <>
      <Layout>
        <Schedule />

        <div className={styles.row}>
          <div className={cn(styles.inDev, styles[theme])}>
            <p>{`Hi! This website is still under development in a big way!`}</p>
            <p>{`I'm still unsure about many aspect of this website. I do know however, in it's purest form, you can post images and form a gallery of sorts. This part of the website is done - What's left is all the extra bits.`}</p>
            <p>
              {`If you would like a look at the list of things I'm working on / want to work on, you can find that here: `}
              <a target='_blank' rel='noopener noreferrer' href='https://trello.com/b/S5bC886G/ded'>Trello board</a>
            </p>
          </div>
          <Leaderboard className={styles.leaderboard} />
        </div>
      </Layout>
    </>
  );
};
