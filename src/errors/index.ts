import type { LightningAddressValidationErrorType } from '../types';

export class LightningAddressValidationError extends Error {
  type: LightningAddressValidationErrorType;

  description: string;

  constructor(description: string, type: LightningAddressValidationErrorType) {
    super(description);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    //   if (Error.captureStackTrace) {
    //     Error.captureStackTrace(this, LightningAddressValidationError);
    //   }

    Object.defineProperty(this, 'name', { value: 'LightningAddressValidationError' });
    this.description = description;
    this.type = type;
  }
}
