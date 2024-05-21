type RestBlurHandlerRegProps = [
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
];
type RestToggleInput = [
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<JSX.Element>>,
  JSX.Element,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<string>>,
  JSX.Element,
];
type RestBlurHandlerProps = [
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
];
type RestValidationProps = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<string>>,
];
const restBlurHandlerReg: RestBlurHandlerRegProps = [
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
];
const toggleInput: RestToggleInput = [
  () => {},
  () => {},
  <></>,
  () => {},
  () => {},
  <></>,
];
const restBlurHandler: RestBlurHandlerProps = [() => {}, () => {}];
const restValidation: RestValidationProps = ['', () => {}, () => {}];

import BlurHandler from '../utils/validation/BlurHundler';
test('hundler input email/password', () => {
  expect(BlurHandler('email', ...restBlurHandler)).toBeTruthy();
  expect(BlurHandler('password', ...restBlurHandler)).toBeTruthy();
  expect(BlurHandler('', ...restBlurHandler)).toBe(false);
});

import TogglePassInput from '../utils/validation/TogglePassInput';
test('toggle password input', () => {
  expect(TogglePassInput('password', ...toggleInput)).toBeTruthy();
  expect(TogglePassInput('text', ...toggleInput)).toBeTruthy();
  expect(TogglePassInput('', ...toggleInput)).toBe(false);
});

import BlurHandlerRegistr from '../utils/validation/BlurHandlerRegistr';
test('hundler inputs', () => {
  expect(BlurHandlerRegistr('name-user', ...restBlurHandlerReg)).toBeTruthy();
  expect(
    BlurHandlerRegistr('last-name-user', ...restBlurHandlerReg)
  ).toBeTruthy();
  expect(BlurHandlerRegistr('birthdate', ...restBlurHandlerReg)).toBeTruthy();
  expect(BlurHandlerRegistr('street', ...restBlurHandlerReg)).toBeTruthy();
  expect(BlurHandlerRegistr('city', ...restBlurHandlerReg)).toBeTruthy();
  expect(BlurHandlerRegistr('country', ...restBlurHandlerReg)).toBeTruthy();
  expect(BlurHandlerRegistr('postal-code', ...restBlurHandlerReg)).toBeTruthy();
  expect(BlurHandlerRegistr('', ...restBlurHandlerReg)).toBe(false);
});

import CountryValidation from '../utils/validation/CountryValidation';
test('country validation', () => {
  expect(CountryValidation('USA', ...restValidation)).toBeTruthy();
  expect(CountryValidation('', ...restValidation)).toBeFalsy();
});

import { findUser, findRegisteredUser } from '../utils/FindCustomer';
import EmailValidation from '../utils/validation/EmailValidation';
test('email validation on login page', async () => {
  await expect(EmailValidation('a2-a3', ...restValidation)).resolves.toBe(
    false
  );
  await expect(EmailValidation('a2-a3@', ...restValidation)).resolves.toBe(
    false
  );
  await expect(EmailValidation('a2-a3@kl', ...restValidation)).resolves.toBe(
    false
  );
  await expect(EmailValidation('a23@kl.', ...restValidation)).resolves.toBe(
    false
  );
  await expect(EmailValidation('a3@kl.mi', ...restValidation)).resolves.toBe(
    true
  );
  await expect(EmailValidation('', ...restValidation)).resolves.toBe(false);

  return expect(findUser('jen@example.com')).resolves.toBe('');
});

import EmailValidationRegistr from '../utils/validation/EmailValidationRegistr';
test('email validation on registration page', async () => {
  await expect(
    EmailValidationRegistr('bj@fd.com', ...restValidation)
  ).resolves.toBeTruthy();
  await expect(
    EmailValidationRegistr('do-do@npm.com', ...restValidation)
  ).resolves.toBeTruthy();
  await expect(
    EmailValidationRegistr('a2-a3@kl.mi', ...restValidation)
  ).resolves.toBeTruthy();
  await expect(
    EmailValidationRegistr(`a2-a3`, ...restValidation)
  ).resolves.toBe(false);
  await expect(
    EmailValidationRegistr(`a2-a3@`, ...restValidation)
  ).resolves.toBe(false);
  await expect(
    EmailValidationRegistr(`a2-a3@kl`, ...restValidation)
  ).resolves.toBe(false);
  await expect(
    EmailValidationRegistr(`a23@kl.`, ...restValidation)
  ).resolves.toBe(false);
  await expect(
    EmailValidationRegistr(` a3@kl.mi `, ...restValidation)
  ).resolves.toBe(false);
  await expect(
    EmailValidationRegistr('', ...restValidation)
  ).resolves.toBeFalsy();

  return expect(findRegisteredUser(`jen@example.com`)).resolves.toBe(
    'This email address already registered.'
  );
});

import PasswordValidation from '../utils/validation/PasswordValidation';
test('password validation', () => {
  expect(PasswordValidation('L2_f(;!?', ...restValidation)).toBeTruthy();
  expect(PasswordValidation('SAGfdw2698686', ...restValidation)).toBeTruthy();
  expect(PasswordValidation('*)$!#&F%!1s', ...restValidation)).toBeTruthy();
  expect(PasswordValidation('*Fd25', ...restValidation)).toBe(false);
  expect(PasswordValidation(')*#@(&%$&!((!(#&!(&%', ...restValidation)).toBe(
    false
  );
  expect(PasswordValidation('oihd(#@(&%258', ...restValidation)).toBe(false);
  expect(PasswordValidation('HQUU@#$&216', ...restValidation)).toBe(false);
  expect(PasswordValidation(' SAGfd w286 ', ...restValidation)).toBe(false);
  expect(PasswordValidation('', ...restValidation)).toBe(false);
});

import PostalCodeValidation from '../utils/validation/PostalCodeValidation';

test('postal code validation', () => {
  expect(PostalCodeValidation('12345', ...restValidation)).toBeTruthy();
  expect(PostalCodeValidation('12345-1234', ...restValidation)).toBeTruthy();
  expect(PostalCodeValidation('12345-KJOI', ...restValidation)).toBeTruthy();
  expect(PostalCodeValidation('1235', ...restValidation)).toBe(false);
  expect(PostalCodeValidation('', ...restValidation)).toBe(false);
});

import CityValidation from '../utils/validation/CityValidation';

test('city validation', () => {
  expect(CityValidation('c', ...restValidation)).toBeTruthy();
  expect(CityValidation('Cb', ...restValidation)).toBeTruthy();
  expect(CityValidation('New-KJOI City', ...restValidation)).toBeTruthy();
  expect(CityValidation('', ...restValidation)).toBe(false);
});

import NameValidation from '../utils/validation/NameValidation';
test('name user validation', () => {
  expect(NameValidation('P', ...restValidation)).toBeTruthy();
  expect(NameValidation('Ki', ...restValidation)).toBeTruthy();
  expect(NameValidation('Les-Lin Lu', ...restValidation)).toBeTruthy();
  expect(NameValidation('', ...restValidation)).toBe(false);
});

import BirthdateValidation from '../utils/validation/BirthdateValidation';
test('birthdate validation', () => {
  expect(BirthdateValidation('2005-10-23', ...restValidation)).toBeTruthy();
  expect(BirthdateValidation('1960-05-15', ...restValidation)).toBeTruthy();
  expect(BirthdateValidation('1950-15-15', ...restValidation)).toBe(false);
  expect(BirthdateValidation('1805-01-01', ...restValidation)).toBe(false);
  expect(BirthdateValidation('2020-01-23', ...restValidation)).toBe(false);
  expect(BirthdateValidation('2020', ...restValidation)).toBe(false);
  expect(BirthdateValidation('1950-15', ...restValidation)).toBe(false);
});

import StreetValidation from '../utils/validation/StreetValidation';
test('street validation', () => {
  expect(StreetValidation('P-1', ...restValidation)).toBeTruthy();
  expect(StreetValidation('2365', ...restValidation)).toBeTruthy();
  expect(StreetValidation('Str8 Lu-Street', ...restValidation)).toBeTruthy();
  expect(StreetValidation('', ...restValidation)).toBe(false);
});
