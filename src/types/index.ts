export type LightningAddressUsernameValidationOptions = {
  maxLength?: number;
  minLength?: number;
  customValidation?: () => boolean;
};

export type LightningAddressDomainValidationOptions = {
  whitelist?: string[];
  blacklist?: string[];
  customValidation?: () => boolean;
};

export type LightningAddressValidationOptions = {
  username?: LightningAddressUsernameValidationOptions;
  domain?: LightningAddressDomainValidationOptions;
};

export const LightningAddressValidationErrorType = {
  invalidUsername: 'INVALID_USERNAME',
  invalidDomain: 'INVALID_DOMAIN',
  invalidFormat: 'INVALID_FORMAT',
  invalidService: 'INVALID_SERVICE',
};

export type LightningAddressValidationErrorType =
  | 'INVALID_USERNAME'
  | 'INVALID_DOMAIN'
  | 'INVALID_FORMAT'
  | 'INVALID_SERVICE';
