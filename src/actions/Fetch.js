const BACKEND_URL = 'http://localhost:8000';

// eslint-disable-next-line no-unused-vars, camelcase
async function fetchBackendJSON(url, method, dataDict) {
 // eslint-disable-next-line camelcase
 const backend_url = `${BACKEND_URL}/${url}/`;
 const fetchParams = {
  method,
  mode: 'cors',
  cache: 'no-cache',
  headers: {
   'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
 };

 if (method === 'POST' && dataDict !== null) {
  fetchParams.body = JSON.stringify(dataDict);
 }
 const response = await fetch(backend_url, fetchParams);
 const data = await response.json();
 return data;
}

export default fetchBackendJSON;
