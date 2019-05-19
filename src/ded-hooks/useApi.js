import { useState, useContext } from 'react';
import fetch from 'cross-fetch';

import { STORAGE } from 'ded-constants';
import { LoginContext } from 'ded-context';

export default (API) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [_, setIsLoggedIn] = useContext(LoginContext);

  const callApi = async (data = null) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem(STORAGE.TOKEN);
      const result = await fetch(API.URL, {
        method: API.METHOD,
        ...(API.METHOD !== 'GET') && { body: JSON.stringify(data) },
        headers: {
          'Content-Type': 'application/json',
          ...token && { Authorization: `Bearer ${token}` },
        },
      });

      const json = await result.json();

      // Validation error
      if (result.status >= 400) {
        if (result.status === 401) { // Unauthorized.
          setIsLoggedIn(false);
        }

        throw json
          ? (typeof json === 'object' ? [].concat(...Object.values(json)) : json)
          : 'An internal server error occurred.';
      }

      // No error, return response.
      setLoading(false);
      return json;
    } catch (err) {
      const e = err.message
        ? err.message
        : Array.isArray(err) ? err : err.toString();
      setError(e);
      setLoading(false);
      throw new Error(e); // Rejects promise.
    }
  };

  const clearError = () => setError(null);

  return [callApi, loading, error, clearError];
};
