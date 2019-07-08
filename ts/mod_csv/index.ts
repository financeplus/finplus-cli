import * as plugins from './mod.plugins';
import * as paths from './mod.paths';
import { logger } from '../finplus-cli.logging';

export const run = async () => {
  const csvFilesList = await plugins.smartfile.fs.listFiles(paths.csvInputDir);
  console.log(csvFilesList);
  logger.log('info', `found ${csvFilesList.length} csv file(s)`);

  // commerzbank
  const commerzbankTransactions = await universalParse(await plugins.csvCommerzbank.CsvCommerzbank.fromDir(
    paths.csvInputDir
  ));
  await writeSevdeskCli('commerzbank', commerzbankTransactions);

  // fidor
  const fidorTransactions = await universalParse(await plugins.csvFidor.CsvFidor.fromDir(paths.csvInputDir));
  await writeSevdeskCli('fidor', fidorTransactions);
  
  // spendesk
  const spendeskTransactions = await universalParse(await plugins.csvSpendesk.CsvSpendesk.fromDir(paths.csvInputDir));
  await writeSevdeskCli('spendesk', spendeskTransactions);

  // paypal
  const paypalTransactions = await universalParse(await plugins.csvPayPal.CsvPayPal.fromDir(paths.csvInputDir));
  await writeSevdeskCli('paypal', paypalTransactions);

  logger.log('success', `read files successfully! Now trying to write clean csv files!`);
};

const writeSevdeskCli = async (nameArg: string, transactionArray: plugins.tsclass.ITransaction[]) => {
  const csvSevdeskInstance = new plugins.csvSevdesk.CsvSevdesk();
  const filePath = plugins.path.join(paths.csvOutputDir, nameArg + '.csv');
  await plugins.smartfile.memory.toFs(await csvSevdeskInstance.createCsvString(transactionArray), filePath);
};

/**
 * a universal parsing function
 */
const universalParse = async <T>(parser: plugins.finplusInterfaces.AcCsvParser<T>): Promise<plugins.tsclass.ITransaction[]> => {
  logger.log(
    'ok',
    `found ${(await parser.getTransactions()).length} ${parser.paymentProviderName} transactions`
  );
  const commerzbankSimpleTransactions: plugins.tsclass.ITransaction[] = (await parser.getTransactions()).map(
    (transaction: any) => { // TODO: implement a proper common type for this
      return transaction.simpleTransaction;
    }
  );

  return commerzbankSimpleTransactions;
};
