import type {
  LightningAddressDomainValidationOptions,
  LightningAddressUsernameValidationOptions,
  LightningAddressValidationOptions,
} from '../types';

import { LightningAddressValidationError } from '../errors';
import { isValidDomain } from '../utils';

const isValidLightningAddressDomain = (domain: string, options?: LightningAddressDomainValidationOptions): boolean => {
  if (!isValidDomain(domain)) {
    throw new LightningAddressValidationError('invalid domain', 'INVALID_DOMAIN');
  }

  const isBlacklisted = options?.blacklist?.find((supportedDomain) => supportedDomain === domain);

  if (isBlacklisted) {
    throw new LightningAddressValidationError(`the domain ${domain} is blacklisted`, 'INVALID_DOMAIN');
  }

  const isWhitelisted = options?.whitelist?.find((supportedDomain) => supportedDomain === domain);

  if (options?.whitelist && !isWhitelisted) {
    throw new LightningAddressValidationError(`the domain ${domain} is not whitelisted`, 'INVALID_DOMAIN');
  }

  return true;
};

const isValidLightningAddressFormat = (lightningAddress: string): void => {
  const regex = new RegExp(`^[^@]+@[^@]+$`);

  if (!regex.test(lightningAddress)) {
    throw new LightningAddressValidationError('invalid lightning address format', 'INVALID_FORMAT');
  }
};

const isValidLightningAddressUsername = (
  username: string,
  options?: LightningAddressUsernameValidationOptions,
): boolean => {
  const { maxLength, minLength } = options || {};

  if (maxLength && username.length > maxLength) {
    throw new LightningAddressValidationError(`username exceeds max length of ${maxLength}`, 'INVALID_USERNAME');
  }

  if (minLength && username.length > minLength) {
    throw new LightningAddressValidationError(`username shorted than min length of ${minLength}`, 'INVALID_USERNAME');
  }

  // Reference for valid character set: https://github.com/lnurl/luds/blob/luds/16.md
  const globalRegex = new RegExp('^[a-z0-9-_.]+$', 'g');

  if (!globalRegex.test(username)) {
    const negatedRegex = /[^a-z0-9-_.]/g;
    const invalidChars = username.match(negatedRegex);
    throw new LightningAddressValidationError(`invalid characters: ${invalidChars?.join(', ')}`, 'INVALID_USERNAME');
  }

  return true;
};

export const isValidLightningAddress = (
  lightningAddress: string,
  options?: LightningAddressValidationOptions,
): boolean => {
  options?.domain?.blacklist?.forEach((domain) => {
    if (!isValidDomain(domain)) {
      throw new LightningAddressValidationError('invalid domain in blacklist', 'INVALID_DOMAIN');
    }
  });

  options?.domain?.whitelist?.forEach((domain) => {
    if (!isValidDomain(domain)) {
      throw new LightningAddressValidationError('invalid domain in whitelist', 'INVALID_DOMAIN');
    }
  });

  isValidLightningAddressFormat(lightningAddress);

  const [username, domain] = lightningAddress.split('@');

  isValidLightningAddressUsername(username, options?.username);

  if (options?.username?.customValidation !== null && options?.username?.customValidation !== undefined) {
    options.username.customValidation();
  }

  isValidLightningAddressDomain(domain, options?.domain);

  if (options?.domain?.customValidation !== null && options?.domain?.customValidation !== undefined) {
    options.domain.customValidation();
  }

  return true;
};
