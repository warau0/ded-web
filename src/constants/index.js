export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const STORAGE = {
  TOKEN: 'dedToken',
  THEME: 'dedTheme',
};

export const API_URL = 'http://localhost:8000';

export const API = {
  LOGIN: {
    METHOD: 'POST',
    URL: `${API_URL}/login`,
  },
  REGISTER: {
    METHOD: 'POST',
    URL: `${API_URL}/register`,
  },
};
