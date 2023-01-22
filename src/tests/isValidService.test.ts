import { isValidService } from '../validations';

test('valid lightning address', async () => {
  let valid;
  try {
    valid = await isValidService('geyser@geyser.fund');
  } catch (error) {
    valid = false;
    console.error(error);
  }

  expect(valid).toBeTruthy();
});
