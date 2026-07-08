// OAuth step 2: GitHub redirects back here with a code. We exchange it for an
// access token (server-side, using the client secret) and hand it to the Decap
// CMS window using its postMessage handshake.

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const code = params.code;
  const returnedState = params.state;

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  const cookie = event.headers.cookie || '';
  const stateMatch = cookie.match(/(?:^|;\s*)oauth_state=([^;]+)/);
  const savedState = stateMatch ? stateMatch[1] : null;

  const fail = (message) => ({
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    body: renderPage('error', JSON.stringify({ message })),
  });

  if (!clientId || !clientSecret) return fail('OAuth is not configured on the server (missing env vars).');
  if (!code) return fail('No authorization code was returned by GitHub.');
  if (!savedState || savedState !== returnedState) return fail('Invalid OAuth state. Please try signing in again.');

  let data;
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    data = await res.json();
  } catch (e) {
    return fail('Could not reach GitHub to exchange the authorization code.');
  }

  if (!data || !data.access_token) {
    return fail(data && data.error_description ? data.error_description : 'GitHub did not return an access token.');
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
    },
    body: renderPage('success', JSON.stringify({ token: data.access_token, provider: 'github' })),
  };
};

// Decap CMS OAuth handshake: the popup announces "authorizing:github", the CMS
// window replies, and then we post the credentials back to the CMS window.
function renderPage(status, contentJson) {
  const message = `authorization:github:${status}:${contentJson}`;
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body>
<p>Completing sign-in… You can close this window if it does not close by itself.</p>
<script>
(function () {
  var message = ${JSON.stringify(message)};
  function receiveMessage(e) {
    window.opener.postMessage(message, e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;
}
