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

import { findUser, findRegisteredUser } from '../utils/api/FindCustomer';
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

import { getBrandsFromAPI } from '../utils/api/getBrands';
test('get brands', () => {
  return expect(getBrandsFromAPI()).resolves.toStrictEqual([
    'Hisense',
    'Sony',
    'SAMSUNG',
    'Roku',
    'VIZIO',
    'TCL',
    'LG',
  ]);
});

import { getDisplaysFromAPI } from '../utils/api/getDisplays';
test('get display', () => {
  return expect(getDisplaysFromAPI()).resolves.toStrictEqual([
    'LED',
    'QLED',
    'OLED',
    'LCD',
  ]);
});

import { getSizesFromAPI } from '../utils/api/getSizes';
test('get sizes', () => {
  return expect(getSizesFromAPI()).resolves.toStrictEqual([
    '50-inch',
    '40-inch',
    '75-inch',
    '65-inch',
    '55-inch',
  ]);
});

import { getCategoriesFromAPI } from '../utils/api/getCategories';
test('get sizes', () => {
  return expect(getCategoriesFromAPI()).resolves.toStrictEqual({
    count: 4,
    limit: 500,
    offset: 0,
    results: [
      {
        ancestors: [],
        assets: [],
        createdAt: '2024-05-02T06:48:20.547Z',
        createdBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        description: { 'en-GB': 'Televisions' },
        id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
        lastMessageSequenceNumber: 1,
        lastModifiedAt: '2024-05-31T04:52:11.339Z',
        lastModifiedBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        name: { 'en-GB': 'Televisions', 'en-US': 'Televisions' },
        orderHint: '0.05',
        slug: { 'en-GB': 'televisions' },
        version: 2,
        versionModifiedAt: '2024-05-31T04:52:11.339Z',
      },
      {
        ancestors: [
          { id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836', typeId: 'category' },
        ],
        assets: [],
        createdAt: '2024-05-31T04:55:20.773Z',
        createdBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        description: { 'en-US': 'LED & LCD TVs' },
        id: 'e1e60148-a824-49dc-a3ba-f69ba66c8609',
        key: 'LEDLCD',
        lastMessageSequenceNumber: 1,
        lastModifiedAt: '2024-05-31T04:55:20.773Z',
        lastModifiedBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        metaTitle: { 'en-US': 'led-lcd' },
        name: { 'en-US': 'LED & LCD TVs' },
        orderHint: '0.05',
        parent: {
          id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
          typeId: 'category',
        },
        slug: { 'en-US': 'led-lcd' },
        version: 1,
        versionModifiedAt: '2024-05-31T04:55:20.773Z',
      },
      {
        ancestors: [
          { id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836', typeId: 'category' },
        ],
        assets: [],
        createdAt: '2024-06-02T18:00:22.926Z',
        createdBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        description: { 'en-US': 'OLED TVs' },
        id: 'be9dbd44-1e90-4f09-a198-ee5478eaa088',
        lastMessageSequenceNumber: 1,
        lastModifiedAt: '2024-06-02T18:00:22.926Z',
        lastModifiedBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        name: { 'en-US': 'OLED TVs' },
        orderHint: '0.05',
        parent: {
          id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
          typeId: 'category',
        },
        slug: { 'en-US': 'oled-tvs' },
        version: 1,
        versionModifiedAt: '2024-06-02T18:00:22.926Z',
      },
      {
        ancestors: [
          { id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836', typeId: 'category' },
        ],
        assets: [],
        createdAt: '2024-06-02T19:21:02.652Z',
        createdBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        id: '0fd5260d-11a8-490b-b543-6da919547c61',
        lastMessageSequenceNumber: 1,
        lastModifiedAt: '2024-06-02T19:21:02.652Z',
        lastModifiedBy: {
          isPlatformClient: true,
          user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
        },
        name: { 'en-US': 'QLED TVs' },
        orderHint: '0.05',
        parent: {
          id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
          typeId: 'category',
        },
        slug: { 'en-US': 'qled-tvs' },
        version: 1,
        versionModifiedAt: '2024-06-02T19:21:02.652Z',
      },
    ],
    total: 4,
  });
});