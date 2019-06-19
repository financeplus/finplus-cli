import * as plugins from './finplus-cli.plugins';
import { logger } from './finplus-cli.logging';

const finplusCli = new plugins.smartcli.Smartcli();

export const run = async () => {
  finplusCli.standardTask().subscribe(argvArg => {
    logger.log('info', 'finplus cli simplifies the steps needed to consolidate transactions');
    logger.log('info', 'try "finplus csv"');
  });

  finplusCli.addCommand('csv').subscribe(async argvArg => {
    const modCsv = await import('./mod_csv');
    modCsv.run();
  });

  finplusCli.startParse();
};
