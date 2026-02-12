import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
