import { expect, tap } from '@pushrocks/tapbundle';
import * as finplusCli from '../ts/index';

tap.test('first test', async () => {
  console.log(finplusCli.standardExport);
})

tap.start()
