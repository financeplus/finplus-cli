import * as plugins from './finplus-cli.plugins';

export const logger = new plugins.smartlog.Smartlog({
  logContext: {
    company: 'Some Company',
    companyunit: 'Some CompanyUnit',
    containerName: 'Container Name',
    environment: 'local',
    runtime: 'node',
    zone: 'dev'
  },
  minimumLogLevel: 'silly'
});

logger.addLogDestination(new plugins.smartlogDestinationLocal.DestinationLocal());