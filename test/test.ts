import { expect, tap } from '@pushrocks/tapbundle';

process.env.CLI_CALL = 'true';

import * as finplusCli from '../ts/index';

tap.test('first test', async () => {
  console.log(finplusCli);
});

tap.start();
