import Credentials from './credentials';
/* Credentials is an object with this 3 informations:
const Credentials = {
  client_id: encodeURIComponent('Your client id'),
  redirect_uri: 'http://localhost:3000/',
  scope: 'playlist-modify-public'
}
// https://github.com/spotify/web-api-auth-examples
// Not in use */
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Get the params of the callback URL
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const state = generateRandomString(16);
const params = getHashParams();    
let accessToken = '';
//get what iis stored in sessionStorage
const now = new Date();
if (params.access_token) {
  // Get the token informations (the main idea was to compare state to the stored state but I ran out of time to implement it)
  sessionStorage.stateKey = params.state;
  //Store now + 1 hour to refresh the token + timeOut
  let in1Hour = new Date();
  in1Hour.setSeconds(in1Hour.getSeconds() + params.expires_in);
  sessionStorage.expire = in1Hour;
  accessToken = params.access_token;
  window.setTimeout(() => accessToken = '', params.expires_in * 1000);
  window.history.pushState('Access Token', null, '/');
}
const storedExpire = Date.parse(sessionStorage.expire);

//Let's connect
const SpotifyConnect =  {
  getToken(){
    //Check if we need to refresh the token
    if (accessToken !== '' && storedExpire !== null && storedExpire > now ){
      return accessToken;
    } else {
      //Query to get a token
      let url = 'https://accounts.spotify.com/authorize?response_type=token';
      url += '&client_id=' + encodeURIComponent(Credentials.client_id);
      url += '&scope=' + encodeURIComponent(Credentials.scope);
      url += '&redirect_uri=' + encodeURIComponent(Credentials.redirect_uri);
      url += '&state=' + encodeURIComponent(state);
      console.log(`Redirect to ${url}`);
      window.location = url;
    }
  }
};

export default SpotifyConnect;