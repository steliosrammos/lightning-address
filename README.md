# Lightning Address Validator

Utility package to validate lightning addresses, following the [LUD16](https://github.com/lnurl/luds/blob/luds/16.md) specs.

## Installation

Run:

```
yarn add lightning-address-validator
```

or

```
npm install lightning-address-validator
```

## API

<br>

### `isValidLightningAddress`

<br>

```ts
isValidLightningAddress(lightningAddress: string, options: Object) => boolean
```

Verifies that the lightning address follows the correct formatting, (ie: `username@domain`), according to the LUD16 specs and some user defined `options`. Returns `true` is the lightning address is valid or throws a `LightningAddressValidationError` otherwise (see [Errors](#errors) for more details).

**`options`**:

- `username`: validation options for the username
  - `maxLength`
  - `minLength`
  - `customValidation`: used to pass custom validation logic for the username
- `domain`: validation options for the domain
  - `blacklist`: array of domains that are not accepted
  - `whitelist`: array of domains that are accepted
  - `customValidation`: used to pass custom validation logic for the domain

### `isValidService`

```ts
isValidService(lightningAddress: string): Promise<boolean>
```

Checks that the Lightning Address service running at the `domain` is ready to accept requests. Do so by completing the second step of [LUD06](https://github.com/lnurl/luds/blob/luds/06.md), and checking that ther `LN_SERVICE` response is valid.

## Errors

The `LightningAddressValidationError` can have one of four types:

1. `INVALID_FORMAT`: when the lightning address format is not `username`@`domain`
2. `INVALID_USERNAME`: when the lightning address fails the username validation (eg.: character not in `a-z0-9-_.`)
3. `INVALID_DOMAIN`: when the lightning address fails the domain validation (eg.: badly formatted domain, blacklisted, etc.)
4. `INVALID_SERVICE`: when the query to the lightning address service fails or returns an invalid response.

## Running tests

Run:

`yarn test`

## Improvements

The package can be improved in the following ways:

- Add validation for onion lightning addresses
- Write more extensive tests
