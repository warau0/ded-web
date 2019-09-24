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
  SETTINGS_SHOW_NSFW: 'dedSettingsShowNsfw',
};

export const EVENT = {
  UPDATE_GALLERY: 'UPDATE_GALLERY',
  UPDATE_STREAK: 'UPDATE_STREAK',
  UPDATE_LEADERBOARD: 'UPDATE_LEADERBOARD',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
  UPDATE_AVATAR: 'UPDATE_AVATAR',
  SETTINGS_CHANGED_HIDE_TIMER: 'SETTINGS_CHANGED_HIDE_TIMER',
  UPDATE_PROFILE_USER: 'UPDATE_PROFILE_USER',
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
    FOLLOWED_INDEX: {
      METHOD: 'GET',
      URL: page => `${API_URL}/followed_submissions?page=${page}`,
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
    LIKE: {
      METHOD: 'PUT',
      URL: id => `${API_URL}/submissions/${id}/like`,
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
    FOLLOW: {
      METHOD: 'PUT',
      URL: id => `${API_URL}/users/${id}/follow`,
    },
    LIKES: {
      METHOD: 'GET',
      URL: ({ id, page = 1 }) => `${API_URL}/users/${id}/liked_submissions?page=${page}`,
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
  SOCIAL_LINKS: {
    POST: {
      METHOD: 'POST',
      URL: () => `${API_URL}/social_links`,
    },
    DELETE: {
      METHOD: 'DELETE',
      URL: id => `${API_URL}/social_links/${id}`,
    },
  },
};
