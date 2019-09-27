import React, { useContext } from 'react';

import Layout from 'ded-components/layout';
import { ThemeContext } from 'ded-context';

import * as styles from './styles.pcss';

export default () => {
  const [theme] = useContext(ThemeContext);

  return (
    <Layout className={styles[theme]}>
      {/* eslint-disable max-len */}
      {/* eslint-disable react/jsx-curly-brace-presence */}
      <div className={styles.row}>
        <div className={styles.textBlockLeft}>
          <h2>{`What's this?`}</h2>
          <p>{`Are you looking to hone your craftsmanship? If so, you've come to the right place.`}</p>
          <p>What we do here is simple. We post our work.</p>
          <p>{`This is not a place to gather a following, there is no audience here. Instead you'll find yourself in a group of peers - others who are working on improving themselves.`}</p>
          <p>{`Social media is not a great place for your studies and failures, nor a place you'll receive much critique. These are the training grounds, a place for your failures and trial runs. A place to hone your skills before unleashing them upon the world.`}</p>
        </div>

        <div>
          <img className={styles.everyDay} src='https://cdn.justdraw.lol/intro/16_hours.jpg' alt='Every day' />
        </div>
      </div>

      <h2>But I could literally just do that in isolation on my own</h2>
      <div className={styles.row}>
        <div>
          <img className={styles.weCanAllSee} src='https://cdn.justdraw.lol/intro/we_can_all_see.png' alt='We can all see you' />
        </div>

        <div className={styles.textBlockRight}>
          <p>You could, but what about:</p>
          <ul>
            <li>
              <b>Feedback.</b>
              {` You'll be responsible for spotting all of your own mistakes, and even if you spot something, how do you fix it?`}
            </li>
            <li>
              <b>Motivation.</b>
              {` Seeing others work hard can really light a fire under your ass.`}
            </li>
            <li>
              <b>Inspiration.</b>
              {` Seeing someone's unfinished pieces and study routine can help you understand how they've gotten to where they are.`}
            </li>
            <li>
              <b>Ass pats.</b>
              {` Showing off your hard work feels nice, someone might even drop you a `}
              <i>{`'nice'`}</i>
              .
            </li>
          </ul>
          <p>
            {`This site is small. Extremely small. Microscopic. You'll get to know the faces. Every drawing is on display here - it's different posting here than dumping something into a 0 follower Twitter void.`}
          </p>
        </div>
      </div>

      <h2>{`Alright, I'm in. Where and how do I start?`}</h2>
      <p>
        {`Are you an absolute beginner? If so, here's a decent article to get you started on the important bits: `}
        <a
          target='_blank'
          rel='noopener noreferrer'
          className={styles.beginnerGuide}
          href='https://hubpages.com/art/how-to-draw-learn'
        >
          Beginner guide
        </a>
      </p>
      <p>{`As for the site, simply create an account and start posting what you produce.`}</p>
      <p><b>{`The rules are simple:`}</b></p>
      <ul>
        <li>
          <b>{`Spend at least 30 minutes.`}</b>
          {` If you have something quicker, ask yourself if this is worth posting.`}
        </li>
        <li>
          <b>{`Tag your explicit NSFW.`}</b>
          {` This does not have to include artistic nudity such as figure drawing, however tag it if you want to.`}
        </li>
        <li>
          <b>{`Don't shitpost`}</b>
          {` or leave otherwise unhelpful crude comments. It's ok to be blunt, but don't just say something is shit - please elaborate.`}
        </li>
        <li>
          <b>{`Don't discuss politics.`}</b>
          {` This is an art platform, keep things art related.`}
        </li>
      </ul>
      <p>Should you fail to follow any of these rules, warnings and bans will gladly be handed out.</p>
      <div className={styles.row}>
        <div>
          <img className={styles.gettingStarted} src='https://cdn.justdraw.lol/intro/getting_started.jpg' alt='Getting started' />
        </div>

        <div>
          <img className={styles.thatDamnedSmile} src='https://cdn.justdraw.lol/intro/that_damned_smile.jpg' alt='Loomis smile' />

          <img className={styles.mangamania} src='https://cdn.justdraw.lol/intro/mangamania.jpg' alt='Tempting mangamania' />

          <h2>{`So I just draw huh? Pretty easy`}</h2>
          <p>{`Don't fall into the trap of eternal mindless doodling. It's key that you study and apply the knowledge if you want to improve. Mileage is important, but be smart about how you spend all that time.`}</p>
          <p>{`Be careful not to burn yourself out, though. Draw what you want to draw and then supplement with studies when you feel stuck.`}</p>

          <img className={styles.youCanDoIt} src='https://cdn.justdraw.lol/intro/you_can_do_it.png' alt='You can do it' />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <div className={styles.iframeContainer}>
            <iframe
              title='YouTube - Sorta good'
              width='560'
              height='315'
              src='https://www.youtube.com/embed/DN43sCyEanA'
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
          <img className={styles.career} src='https://cdn.justdraw.lol/intro/career.jpg' alt='Art as career choice' />
        </div>
        <div>
          <img className={styles.noRules} src='https://cdn.justdraw.lol/intro/no_rules_just_tools.jpg' alt='No rules, just tools' />
        </div>
      </div>

      <iframe
        title='YouTube - Never give up'
        width='560'
        height='315'
        src='https://www.youtube.com/embed/KxGRhd_iWuE'
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />

      <h3>{`Alright, now get back to drawing.`}</h3>
      {/* eslint-enable max-len */}
      {/* eslint-enable react/jsx-curly-brace-presence */}
    </Layout>
  );
};
