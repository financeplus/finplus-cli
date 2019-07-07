import * as plugins from './mod.plugins';
import * as paths from './mod.paths';
import { logger } from '../finplus-cli.logging';

export const run = async () => {
  const csvFilesList = await plugins.smartfile.fs.listFiles(paths.csvInputDir);
  console.log(csvFilesList);
  logger.log('info', `found ${csvFilesList.length} csv file(s)`);
  const commerbankTransactions = await parseCommerzbank();
  const fidorTransactions = await parseFidor();
  const spendeskTransactions = await parseSpendesk();
  const paypalTransactions = await parsePaypal();

  logger.log('success', `read files successfully! Now trying to write clean csv files!`);

};

const parseCommerzbank = async () => {
  logger.log('info', `now parsing Commerzbank CSV file(s)`);
  const csvCommerzbankInstance = await plugins.csvCommerzbank.CsvCommerzbank.fromDir(
    paths.csvInputDir
  );
  logger.log('ok', `found ${(await csvCommerzbankInstance.getTransactions()).length} Commerzbank transactions`);
  const commerzbankSimpleTransactions = (await csvCommerzbankInstance.getTransactions()).map(transaction => {
    return transaction.simpleTransaction;
  });

  return commerzbankSimpleTransactions;
};

const parseFidor = async () => {
  logger.log('info', `now parsing Fidor CSV file(s)`);
  const csvFidorInstance = await plugins.csvFidor.CsvFidor.fromDir(
    paths.csvInputDir
  );
  logger.log('ok', `found ${(await csvFidorInstance.getTransactions()).length} Commerzbank transactions`);
  const fidorSimpleTransactions = (await csvFidorInstance.getTransactions()).map(transaction => {
    return transaction.simpleTransaction;
  });

  return fidorSimpleTransactions;
};

const parseSpendesk = async () => {
  logger.log('info', `now parsing Spendesk CSV file(s)`);
  const csvSpendeskInstance = await plugins.csvSpendesk.CsvSpendesk.fromDir(
    paths.csvInputDir
  );
  logger.log('ok', `found ${(await csvSpendeskInstance.getTransactions()).length} Commerzbank transactions`);
  const spendeskSimpleTransactions = (await csvSpendeskInstance.getTransactions()).map(transaction => {
    return transaction.simpleTransaction;
  });

  return spendeskSimpleTransactions;
};

const parsePaypal = async () => {
  logger.log('info', `now parsing PayPal CSV file(s)`);
  const csvPayPalInstance = await plugins.csvPayPal.CsvPayPal.fromDir(
    paths.csvInputDir
  );
  logger.log('ok', `found ${(await csvPayPalInstance.getTransactions()).length} PayPal transactions`);
  const paypalSimpleTransactions = (await csvPayPalInstance.getTransactions()).map(transaction => {
    return transaction.simpleTransaction;
  });

  return paypalSimpleTransactions;
};
