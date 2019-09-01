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
  AVATAR: 'dedAvatar',
  SETTINGS_HIDE_TIMER: 'dedSettingsHideTimer',
};

export const EVENT = {
  UPDATE_GALLERY: 'UPDATE_GALLERY',
  UPDATE_STREAK: 'UPDATE_STREAK',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
  UPDATE_AVATAR: 'UPDATE_AVATAR',
  SETTINGS_CHANGED_HIDE_TIMER: 'SETTINGS_CHANGED_HIDE_TIMER',
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
  RESET_PASSWORD: {
    REQUEST: {
      METHOD: 'POST',
      URL: () => `${API_URL}/reset_password`,
    },
    SET: {
      METHOD: 'POST',
      URL: () => `${API_URL}/reset_password/set`,
    },
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
    SEEN: {
      METHOD: 'POST',
      URL: () => `${API_URL}/notifications/seen`,
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
      URL: page => `${API_URL}/submissions?page=${page}`,
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
    COMMENTS: {
      METHOD: 'GET',
      URL: id => `${API_URL}/submissions/${id}/comments`,
    },
    POST_COMMENT: {
      METHOD: 'POST',
      URL: id => `${API_URL}/submissions/${id}/comments`,
    },
  },
  USERS: {
    SHOW: {
      METHOD: 'GET',
      URL: id => `${API_URL}/users/${id}`,
    },
    SUBMISSIONS: {
      METHOD: 'GET',
      URL: ({ id, page = 1 }) => `${API_URL}/users/${id}/submissions?page=${page}`,
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
  COMMENTS: {
    PUT: {
      METHOD: 'PUT',
      URL: id => `${API_URL}/comments/${id}`,
    },
    POST: {
      METHOD: 'POST',
      URL: id => `${API_URL}/comments/${id}`,
    },
  },
  AVATAR: {
    GET: {
      METHOD: 'GET',
      URL: () => `${API_URL}/avatar`,
    },
    POST: {
      METHOD: 'POST',
      URL: () => `${API_URL}/avatar`,
    },
  },
};
