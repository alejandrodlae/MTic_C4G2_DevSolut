import {Client, expect} from '@loopback/testlab';
import {R4InventarioLbApp} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: R4InventarioLbApp;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
