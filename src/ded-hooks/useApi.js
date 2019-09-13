import { useState, useContext } from 'react';
import fetch from 'cross-fetch';
import { toast } from 'react-toastify';

import { STORAGE } from 'ded-constants';
import { LoginContext } from 'ded-context';

export default (API) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [_, __, setIsLoggedIn] = useContext(LoginContext);

  const callApi = async (urlParam = null, data = null, isJson = true) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem(STORAGE.TOKEN);
      const result = await fetch(API.URL(urlParam), {
        method: API.METHOD,
        ...(API.METHOD !== 'GET') && { body: isJson ? JSON.stringify(data) : data },
        headers: {
          ...isJson && { 'Content-Type': 'application/json' },
          ...token && { Authorization: `Bearer ${token}` },
        },
      });

      const json = await result.json();

      // Validation error
      if (result.status >= 400) {
        if (result.status === 401) { // Unauthorized.
          setIsLoggedIn(false);
          toast.info(`You've been logged out.`);
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

  const manuallySetError = e => setError(e);

  return [callApi, loading, error, clearError, manuallySetError];
};
