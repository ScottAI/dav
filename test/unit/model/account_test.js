'use strict';

var assert = require('chai').assert,
    dav = require('../../../lib');

suite('Account', function() {
  test('#toString', function() {
    var server = 'http://dav.example.com',
        credentials = new dav.Credentials({
          username: 'Killer BOB',
          password: 'blacklodge'
        }),
        caldavUrl = 'http://dav.example.com/caldav';

    var account = new dav.Account({
      server: server,
      credentials: credentials,
      caldavUrl: caldavUrl
    });

    var calendars = [new dav.Calendar({ account: account })];
    account.calendars = calendars;

    var json = JSON.parse(account.toString());
    assert.strictEqual(json.server, server);
    assert.deepEqual(json.credentials, {
      username: 'Killer BOB',
      password: 'blacklodge'
    });
    assert.strictEqual(json.caldavUrl, caldavUrl);
    assert.deepEqual(json.calendars, [{
      account: '[Circular ~]'
    }]);
  });
});
