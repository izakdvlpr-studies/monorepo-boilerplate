import { createLogger } from 'winston';

import { config } from './config';

export const Logger = createLogger(config);
