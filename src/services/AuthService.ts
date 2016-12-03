import {Injectable} from '@angular/core';

declare var window: any;

@Injectable()
export class AuthService {
  token: any;

  constructor() {
    // TODO: replace current token if hash token is newer, unexpired
    if (window.location.hash.match(/^#access_token/) && ! this.token) {
      console.log('parsing token');
      this.parseToken();
      //loc.assign('/');
      //location.replace('/');
    }
    else if (this.token) {
      console.log('found token: ', this.token);
    }
  }

  call() {
    // build authUrl:
    var authBase = 'https://accounts.google.com/o/oauth2/v2/auth';
    var authParams = {
      response_type: 'token',
      client_id: '269902140899-b2h30e1hv8i0c2ge5skdu4avd3e1crfh.apps.googleusercontent.com',
      redirect_uri: window.location.origin,
      scope: [ 'https://www.googleapis.com/auth/spreadsheets'
      ].join(' ')
    };
    var params = [];
    for (var k in authParams) {
      params.push(k + '=' + authParams[k]);
    }
    var authUrl = authBase + '?' + params.join('&');
    if(window.chrome) {
      window.open(authUrl, '_self');
    } else {
      console.log("trying to open");
      window.cordova.InAppBrowser.open(authUrl, '_blank',"location=no,clearsessioncache=yes,clearcache=yes");
    }
  }

  // TODO: move this to Token constructor?  Token(location.hash)
  parseToken() {
    this.token = {
      created: new Date().getTime()
    }
    var parmStr = location.hash.substring(1); // strip leading hash
    var parms = parmStr.split('&');
    for (var i in parms) {
      var kv = parms[i].split('=');
      this.token[kv[0]] = kv[1];
    }
  }
}
