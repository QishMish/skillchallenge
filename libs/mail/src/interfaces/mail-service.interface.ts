import { MailOptions } from '@app/types';

interface MailServiceInterface {
  send(options: MailOptions): Promise<void>;
}

export { MailServiceInterface };
