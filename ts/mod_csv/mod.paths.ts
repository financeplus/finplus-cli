import * as plugins from './mod.plugins';
import * as paths from '../paths';
export * from '../paths';

export const csvDir = plugins.path.join(paths.nogitDir, 'gdrive');
export const csvInputDir = plugins.path.join(csvDir, 'input');
export const csvOutputDir = plugins.path.join(csvDir, 'output');
