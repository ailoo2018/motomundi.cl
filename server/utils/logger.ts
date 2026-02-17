// server/utils/logger.ts
import { createLogger, transports } from 'winston'

export const logger = createLogger({
  transports: [new transports.File({ filename: 'combined.log' })]
})
