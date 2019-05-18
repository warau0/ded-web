import { useState } from 'react';
import fetch from 'cross-fetch';

import { STORAGE } from 'constants';

export default (API) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (data = null) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem(STORAGE.TOKEN);
      const result = await fetch(API.URL, {
        method: API.METHOD,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...token && { 'Authorization': `Bearer ${token}` },
        },
      });

      const json = await result.json();

      // Validation error
      if (result.status >= 400) {
        throw json
        ? (typeof json === 'object' ? [].concat(...Object.values(json)) : json)
        : 'An internal server error occurred.'
      }

      // No error, return response.
      setLoading(false);
      return json;
    } catch(err) {
      const e = err.message
        ? err.message
        : Array.isArray(err) ? err : err.toString();
      setError(e);
      setLoading(false);
      throw new Error(e); // Rejects promise.
    }
  };

  return [callApi, loading, error];
}
