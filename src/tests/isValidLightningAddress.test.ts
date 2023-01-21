import { LightningAddressValidationErrorType } from '../types';
import { LightningAddressValidationError } from '../errors';
import { isValidLightningAddress } from '../validations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getError = (method: any, ...args: any[]) => {
  try {
    method(...args);
  } catch (error) {
    if (!(error instanceof LightningAddressValidationError)) {
      console.error(error);
    }
    return error;
  }
};

test('valid lightning address', () => {
  expect(isValidLightningAddress('stelios@example.com')).toBeTruthy();
});

test('invalid lightning address format', () => {
  const error = getError(isValidLightningAddress, 'example.com');

  expect(error).toBeInstanceOf(LightningAddressValidationError);
  expect(error).toHaveProperty('type', LightningAddressValidationErrorType.invalidFormat);
});

test('invalid lightning address username', () => {
  const error = getError(isValidLightningAddress, '/@example.com');

  expect(error).toBeInstanceOf(LightningAddressValidationError);
  expect(error).toHaveProperty('type', LightningAddressValidationErrorType.invalidUsername);
});

test('invalid lightning address domain', () => {
  const error = getError(isValidLightningAddress, 'username@/');

  expect(error).toBeInstanceOf(LightningAddressValidationError);
  expect(error).toHaveProperty('type', LightningAddressValidationErrorType.invalidDomain);
});
