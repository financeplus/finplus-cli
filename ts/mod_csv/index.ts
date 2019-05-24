import * as plugins from './mod.plugins';
import * as paths from './mod.paths';

export const run = async () => {
  const csvFilesList = await plugins.smartfile.fs.listFiles(paths.csvInputDir);
  console.log(csvFilesList);
}
