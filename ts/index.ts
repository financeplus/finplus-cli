import * as early from '@pushrocks/early';
early.start('finplus-cli');
import * as plugins from './finplus-cli.plugins';
import * as paths from './paths';
import { logger } from './finplus-cli.logging';
early.stop();

const run = async () => {
  const projectInfo = new plugins.projectinfo.ProjectInfo(paths.packageDir);
  logger.log('info', `Starting finplus-cli ${projectInfo.npm.version}`);
  const finplusCli = await import('./finplus-cli.cli');
  await finplusCli.run();
};

if(process.env.CLI_CALL) {
  run();
}


