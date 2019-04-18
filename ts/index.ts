import * as plugins from './finplus-cli.plugins';
import * as paths from './paths';
import { logger } from './finplus-cli.logging';

import { ProjectInfo } from '@pushrocks/projectinfo';

const run = async () => {
  const projectInfo = new ProjectInfo(paths.packageDir);
  logger.log('info', `Starting finplus-cli ${projectInfo.npm.version}`);
};

if(process.env.CLI_CALL) {
  run();
}

