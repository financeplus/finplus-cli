import * as plugins from './mod.plugins';
import * as paths from '../paths';
export * from '../paths';

export const csvDir = paths.nogitDir;
export const csvInputDir = plugins.path.join(csvDir, 'input');
export const csvOutputDir = plugins.path.join(csvDir, 'output');