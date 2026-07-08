// OAuth step 1: send the editor to GitHub's authorization screen.
// Decap CMS opens this endpoint in a popup (configured via backend.base_url +
// backend.auth_endpoint in admin/config.yml).
const crypto = require('crypto');

exports.handler = async (event) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return { statusCode: 500, body: 'Server is missing OAUTH_GITHUB_CLIENT_ID.' };
  }

  const proto = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers.host;
  const redirectUri = `${proto}://${host}/.netlify/functions/callback`;

  // Random state for CSRF protection; verified in callback.js via a cookie.
  const state = crypto.randomBytes(16).toString('hex');

  const authUrl = 'https://github.com/login/oauth/authorize'
    + `?client_id=${encodeURIComponent(clientId)}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}`
    + `&scope=${encodeURIComponent('repo')}`
    + `&state=${state}`;

  return {
    statusCode: 302,
    headers: {
      Location: authUrl,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
      'Cache-Control': 'no-store',
    },
    body: '',
  };
};
