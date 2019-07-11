import config from '../../config.json';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const STORAGE = {
  TOKEN: 'dedToken',
  THEME: 'dedTheme',
  TIMER_LOGS: 'dedTimerLogs',
  TIMER_SHOW: 'dedTimerShow',
};

export const EVENT = {
  UPDATE_GALLERY: 'UPDATE_GALLERY',
  UPDATE_STREAK: 'UPDATE_STREAK',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
};

export const { API_URL } = config;

export const API = {
  LOGIN: {
    METHOD: 'POST',
    URL: () => `${API_URL}/login`,
  },
  REGISTER: {
    METHOD: 'POST',
    URL: () => `${API_URL}/register`,
  },
  VERIFY_TOKEN: {
    METHOD: 'GET',
    URL: () => `${API_URL}/verify_token`,
  },
  NOTIFICATIONS: {
    GET: {
      METHOD: 'GET',
      URL: () => `${API_URL}/notifications`,
    },
  },
  PLANS: {
    GET: {
      METHOD: 'GET',
      URL: () => `${API_URL}/plans`,
    },
    PUT: {
      METHOD: 'PUT',
      URL: id => `${API_URL}/plans/${id}`,
    },
    POST: {
      METHOD: 'POST',
      URL: () => `${API_URL}/plans`,
    },
    DELETE: {
      METHOD: 'DELETE',
      URL: id => `${API_URL}/plans/${id}`,
    },
  },
  TAGS: {
    GET: {
      METHOD: 'GET',
      URL: () => `${API_URL}/tags`,
    },
    PUT: {
      METHOD: 'PUT',
      URL: id => `${API_URL}/tags/${id}`,
    },
    POST: {
      METHOD: 'POST',
      URL: () => `${API_URL}/tags`,
    },
    DELETE: {
      METHOD: 'DELETE',
      URL: id => `${API_URL}/tags/${id}`,
    },
  },
  SUBMISSIONS: {
    INDEX: {
      METHOD: 'GET',
      URL: () => `${API_URL}/submissions`,
    },
    SHOW: {
      METHOD: 'GET',
      URL: id => `${API_URL}/submissions/${id}`,
    },
    PUT: {
      METHOD: 'PUT',
      URL: id => `${API_URL}/submissions/${id}`,
    },
    POST: {
      METHOD: 'POST',
      URL: () => `${API_URL}/submissions`,
    },
    DELETE: {
      METHOD: 'DELETE',
      URL: id => `${API_URL}/submissions/${id}`,
    },
  },
  USERS: {
    SUBMISSIONS: {
      METHOD: 'GET',
      URL: id => `${API_URL}/users/${id}/submissions`,
    },
  },
  STREAKS: {
    CURRENT: {
      METHOD: 'GET',
      URL: () => `${API_URL}/streaks/current`,
    },
  },
  LEADERBOARD: {
    GET: {
      METHOD: 'GET',
      URL: offset => `${API_URL}/leaderboard?offset=${offset}`,
    },
  },
};
