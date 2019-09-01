import React, {
  useState,
  useContext,
} from 'react';
import { toast } from 'react-toastify';

import { ThemeContext, EventContext } from 'ded-context';
import Layout from 'ded-components/layout';
import { STORAGE, THEME, EVENT } from 'ded-constants';

import * as styles from './styles.pcss';

const Settings = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [_, fireEvent] = useContext(EventContext);

  const [nsfwSetting, setNsfwSetting] = useState(false);
  const [timerSetting, setTimerSetting] = useState(
    JSON.parse(window.localStorage.getItem(STORAGE.SETTINGS_HIDE_TIMER) || false),
  );

  const _setNsfwSetting = () => {
    const newSetting = !nsfwSetting;
    setNsfwSetting(newSetting);

    // TODO API call to save setting

    if (newSetting) {
      toast.success('NSFW posts are now visible.');
    } else {
      toast.success('NSFW posts are no longer visible.');
    }
  };

  const _setTimerSetting = () => {
    const newSetting = !timerSetting;
    setTimerSetting(newSetting);
    window.localStorage.setItem(STORAGE.SETTINGS_HIDE_TIMER, JSON.stringify(newSetting));
    fireEvent(EVENT.SETTINGS_CHANGED_HIDE_TIMER);

    if (newSetting) {
      toast.success('Timer is no longer visible.');
    } else {
      toast.success('Timer is now visible.');
    }
  };

  const _setDarkThemeSetting = () => {
    setTheme(theme === THEME.LIGHT ? 'dark' : 'light');
  };

  return (
    <Layout>
      <h1>Settings</h1>

      <div className={styles.settingsContainer}>
        <h2>general</h2>

        <div className={styles.settingsList}>
          <div className={styles.checkbox}>
            <label htmlFor='dark-theme-setting'>
              <input
                type='checkbox'
                id='dark-theme-setting'
                checked={theme !== THEME.LIGHT}
                onChange={_setDarkThemeSetting}
              />
              Enable dark theme
            </label>
          </div>

          <div className={styles.checkbox}>
            <label htmlFor='timer-setting'>
              <input
                type='checkbox'
                id='timer-setting'
                checked={timerSetting}
                onChange={_setTimerSetting}
              />
              Hide timer
            </label>
          </div>
        </div>

        {/* <h2>Gallery</h2>

        <div className={styles.settingsList}>
          <div className={styles.checkbox}>
            <label htmlFor='nsfw-setting'>
              <input
                type='checkbox'
                id='nsfw-setting'
                checked={nsfwSetting}
                onChange={_setNsfwSetting}
              />
              Show posts tagged as NSFW
            </label>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Settings;
