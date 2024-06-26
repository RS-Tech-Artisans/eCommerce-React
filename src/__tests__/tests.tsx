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

// import { findUser, findRegisteredUser } from '../utils/api/FindCustomer';
// import EmailValidation from '../utils/validation/EmailValidation';
// test('email validation on login page', async () => {
//   await expect(EmailValidation('a2-a3', ...restValidation)).resolves.toBe(
//     false
//   );
//   await expect(EmailValidation('a2-a3@', ...restValidation)).resolves.toBe(
//     false
//   );
//   await expect(EmailValidation('a2-a3@kl', ...restValidation)).resolves.toBe(
//     false
//   );
//   await expect(EmailValidation('a23@kl.', ...restValidation)).resolves.toBe(
//     false
//   );
//   await expect(EmailValidation('a3@kl.mi', ...restValidation)).resolves.toBe(
//     true
//   );
//   await expect(EmailValidation('', ...restValidation)).resolves.toBe(false);

//   return expect(findUser('jen@example.com')).resolves.toBe('');
// });

// import EmailValidationRegistr from '../utils/validation/EmailValidationRegistr';
// test('email validation on registration page', async () => {
//   await expect(
//     EmailValidationRegistr('bj@fd.com', ...restValidation)
//   ).resolves.toBeTruthy();
//   await expect(
//     EmailValidationRegistr('do-do@npm.com', ...restValidation)
//   ).resolves.toBeTruthy();
//   await expect(
//     EmailValidationRegistr('a2-a3@kl.mi', ...restValidation)
//   ).resolves.toBeTruthy();
//   await expect(
//     EmailValidationRegistr(`a2-a3`, ...restValidation)
//   ).resolves.toBe(false);
//   await expect(
//     EmailValidationRegistr(`a2-a3@`, ...restValidation)
//   ).resolves.toBe(false);
//   await expect(
//     EmailValidationRegistr(`a2-a3@kl`, ...restValidation)
//   ).resolves.toBe(false);
//   await expect(
//     EmailValidationRegistr(`a23@kl.`, ...restValidation)
//   ).resolves.toBe(false);
//   await expect(
//     EmailValidationRegistr(` a3@kl.mi `, ...restValidation)
//   ).resolves.toBe(false);
//   await expect(
//     EmailValidationRegistr('', ...restValidation)
//   ).resolves.toBeFalsy();

//   return expect(findRegisteredUser(`jen@example.com`)).resolves.toBe(
//     'This email address already registered.'
//   );
// });

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

// import { getPromocodes } from '../utils/api/getPromoCodes';
// test('get getPromocodes', () => {
//   return expect(getPromocodes()).resolves.toStrictEqual(['RSS-2024', 'QLED']);
// });

// import { getCategoriesFromAPI } from '../utils/api/getCategories';
// test('get Categories', () => {
//   return expect(getCategoriesFromAPI()).resolves.toStrictEqual({
//     count: 4,
//     limit: 500,
//     offset: 0,
//     results: [
//       {
//         ancestors: [],
//         assets: [],
//         createdAt: '2024-05-02T06:48:20.547Z',
//         createdBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         description: { 'en-GB': 'Televisions' },
//         id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
//         lastMessageSequenceNumber: 1,
//         lastModifiedAt: '2024-06-19T08:07:21.040Z',
//         lastModifiedBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         name: { 'en-GB': 'Televisions', 'en-US': 'Televisions' },
//         orderHint: '0.07',
//         slug: { 'en-GB': 'televisions' },
//         version: 3,
//         versionModifiedAt: '2024-06-19T08:07:21.040Z',
//       },
//       {
//         ancestors: [
//           { id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836', typeId: 'category' },
//         ],
//         assets: [],
//         createdAt: '2024-05-31T04:55:20.773Z',
//         createdBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         description: { 'en-US': 'LED & LCD TVs' },
//         id: 'e1e60148-a824-49dc-a3ba-f69ba66c8609',
//         key: 'LEDLCD',
//         lastMessageSequenceNumber: 1,
//         lastModifiedAt: '2024-06-19T08:06:09.636Z',
//         lastModifiedBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         metaTitle: { 'en-US': 'led-lcd' },
//         name: { 'en-US': 'LED & LCD TVs' },
//         orderHint: '0.07',
//         parent: {
//           id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
//           typeId: 'category',
//         },
//         slug: { 'en-US': 'led-lcd' },
//         version: 4,
//         versionModifiedAt: '2024-06-19T08:06:09.636Z',
//       },
//       {
//         ancestors: [
//           { id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836', typeId: 'category' },
//         ],
//         assets: [],
//         createdAt: '2024-06-02T18:00:22.926Z',
//         createdBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         description: { 'en-US': 'OLED TVs' },
//         id: 'be9dbd44-1e90-4f09-a198-ee5478eaa088',
//         lastMessageSequenceNumber: 1,
//         lastModifiedAt: '2024-06-19T08:06:17.280Z',
//         lastModifiedBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         name: { 'en-US': 'OLED TVs' },
//         orderHint: '0.07',
//         parent: {
//           id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
//           typeId: 'category',
//         },
//         slug: { 'en-US': 'oled-tvs' },
//         version: 2,
//         versionModifiedAt: '2024-06-19T08:06:17.280Z',
//       },
//       {
//         ancestors: [
//           { id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836', typeId: 'category' },
//         ],
//         assets: [],
//         createdAt: '2024-06-02T19:21:02.652Z',
//         createdBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         id: '0fd5260d-11a8-490b-b543-6da919547c61',
//         lastMessageSequenceNumber: 1,
//         lastModifiedAt: '2024-06-19T07:44:58.502Z',
//         lastModifiedBy: {
//           isPlatformClient: true,
//           user: { id: 'fdc5d6a4-eed4-4db5-8990-061679ba94c2', typeId: 'user' },
//         },
//         name: { 'en-US': 'QLED TVs' },
//         orderHint: '0.07',
//         parent: {
//           id: 'a8ffbf68-e7fd-4860-96d5-40deb9032836',
//           typeId: 'category',
//         },
//         slug: { 'en-US': 'qled-tvs' },
//         version: 2,
//         versionModifiedAt: '2024-06-19T07:44:58.502Z',
//       },
//     ],
//     total: 4,
//   });
// });

import BlurHandlerUser from '../utils/validation/BlurHandlerUser';
const mockSetState = jest.fn();
describe('BlurHandlerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set setNameUserFill to true when name is "information-first-name"', () => {
    const setNameUserFillMock = jest.fn();

    const result = BlurHandlerUser(
      'information-first-name',
      setNameUserFillMock,
      jest.fn(),
      jest.fn()
    );

    expect(result).toBe(true);
    expect(setNameUserFillMock).toHaveBeenCalledWith(true);
  });

  it('should set setLastNameUserFill to true when name is "information-last-name"', () => {
    const setLastNameUserFillMock = jest.fn();

    const result = BlurHandlerUser(
      'information-last-name',
      jest.fn(),
      setLastNameUserFillMock,
      jest.fn()
    );

    expect(result).toBe(true);
    expect(setLastNameUserFillMock).toHaveBeenCalledWith(true);
  });

  it('should set setBirthdateFill to true when name is "information-birth"', () => {
    const setBirthdateFillMock = jest.fn();

    const result = BlurHandlerUser(
      'information-birth',
      jest.fn(),
      jest.fn(),
      setBirthdateFillMock
    );

    expect(result).toBe(true);
    expect(setBirthdateFillMock).toHaveBeenCalledWith(true);
  });

  it('should return false and not set state when name does not match', () => {
    const result = BlurHandlerUser(
      'unknown-field',
      mockSetState,
      mockSetState,
      mockSetState
    );

    expect(result).toBe(false);
    expect(mockSetState).not.toHaveBeenCalled();
  });
});

import { createApiPasswordRoot } from '../utils/api/apiPasswordRoot';
describe('createApiPasswordRoot', () => {
  test('creates API client successfully', () => {
    const apiRoot = createApiPasswordRoot('testUser', 'testPassword');
    expect(apiRoot).toBeDefined();
    expect(apiRoot.categories).toBeDefined();
  });

  test('configures API client with correct authentication options', () => {
    const username = 'testUser';
    const password = 'testPassword';

    const apiRoot = createApiPasswordRoot(username, password);

    expect(apiRoot).toBeDefined();
  });
});

import { getAllCarts } from '../utils/api/getAllCarts';

describe('getAllCarts', () => {
  test('fetches all carts successfully', async () => {
    const result = await getAllCarts();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

import { addCart } from '../utils/api/addCartForAnonim';

describe('addCart', () => {
  test('adds a cart successfully for anonymous user', async () => {
    try {
      const response = await addCart();
      expect(response).toBeDefined();

      expect(response.id).toBeDefined();
    } catch (error) {
      console.error('addCart error:', error);
      fail('addCart threw an error');
    }
  });
});

import { fetchGetCartData } from '../utils/api/getLastCart';

describe('fetchGetCartData', () => {
  test('handles error when fetching cart data fails', async () => {
    try {
      await fetchGetCartData(null);
      fail('fetchGetCartData did not throw an error for failed request');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

import { getDiscount } from '../utils/api/getDiscountAmount';
describe('getDiscount', () => {
  test('handles error when fetching cart data fails', async () => {
    try {
      await getDiscount(null);
      fail('getDiscount did not throw an error for failed request');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

import { removeCartData } from '../utils/api/removeCartData';
describe('removeCartData', () => {
  test('handles error when removeCartData data fails', async () => {
    try {
      await removeCartData(null);
      fail('removeCartData did not throw an error for failed request');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

import { ProductInfo } from '../utils/Interfaces';
import { filterProducts } from '../components/PriceFilter';
import { checkProductState } from '../utils/checkProductState';

describe('filterProducts', () => {
  const products: ProductInfo[] = [
    {
      name: 'Product A',
      price: { value: { centAmount: 1500, currencyCode: 'USD' } },
      id: '',
      imageUrl: '',
      description: '',
      discountedPrice: 0,
    },
    {
      name: 'Product B',
      price: { value: { centAmount: 2500, currencyCode: 'USD' } },
      id: '',
      imageUrl: '',
      description: '',
      discountedPrice: 0,
    },
    {
      name: 'Product C',
      price: { value: { centAmount: 3500, currencyCode: 'USD' } },
      id: '',
      imageUrl: '',
      description: '',
      discountedPrice: 0,
    },
  ];

  test('filters products with no price range', () => {
    const filteredProducts = filterProducts(products, 'product', '', '');
    expect(filteredProducts).toHaveLength(3);
    expect(filteredProducts.map((p) => p.name)).toEqual([
      'Product A',
      'Product B',
      'Product C',
    ]);
  });
});

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('checkProductState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns true if product is in cart', () => {
    const cartData = {
      lineItems: [{ productId: '123' }, { productId: '456' }],
    };
    localStorage.setItem('cartitems', JSON.stringify(cartData));

    expect(checkProductState('123')).toBe(true);
  });

  test('returns false if product is not in cart', () => {
    const cartData = {
      lineItems: [{ productId: '123' }, { productId: '456' }],
    };
    localStorage.setItem('cartitems', JSON.stringify(cartData));

    expect(checkProductState('789')).toBe(false);
  });

  test('returns false if cart is empty', () => {
    const cartData = {
      lineItems: [],
    };
    localStorage.setItem('cartitems', JSON.stringify(cartData));

    expect(checkProductState('123')).toBe(false);
  });

  test('returns false if cart data is not set', () => {
    expect(checkProductState('123')).toBe(false);
  });
});

import { truncateDescription } from '../utils/truncateDescription';

describe('truncateDescription', () => {
  test('returns the full text if it is shorter than or equal to maxLength', () => {
    const text = 'Short text';
    const maxLength = 20;
    expect(truncateDescription(text, maxLength)).toBe(text);
  });

  test('returns empty string if the input text is empty', () => {
    const text = '';
    const maxLength = 10;
    expect(truncateDescription(text, maxLength)).toBe('');
  });

  test('returns "..." if maxLength is 0', () => {
    const text = 'Any text';
    const maxLength = 0;
    expect(truncateDescription(text, maxLength)).toBe('...');
  });

  test('handles maxLength being exactly the length of the text', () => {
    const text = 'Exact length';
    const maxLength = text.length;
    expect(truncateDescription(text, maxLength)).toBe(text);
  });
});

import renderer from 'react-test-renderer';
import AuthorCard from '../components/AuthorCard';

const mockCardProps = {
  name: 'John Doe',
  gitName: 'johndoe',
  linkToGit: 'https://github.com/johndoe',
  role: 'Developer',
  img: 'path/to/image.jpg',
  about: 'A passionate developer.',
  contribution: 'Worked on the main feature.',
};

describe('AuthorCard Component', () => {
  test('renders correctly with given props', () => {
    const component = renderer.create(<AuthorCard {...mockCardProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import EmailInput from '../components/EmailInput';
import { EmailInputProps } from '../utils/Interfaces';

describe('EmailInput Component', () => {
  const mockSetEmail = jest.fn();
  const mockSetEmailErr = jest.fn();
  const mockSetFormValid = jest.fn();

  const mockEmailProps: EmailInputProps = {
    email: '',
    setEmail: mockSetEmail,
    emailErr: '',
    setEmailErr: mockSetEmailErr,
    setFormValid: mockSetFormValid,
    passwordErr: '',
  };

  test('renders correctly with initial state', () => {
    const component = renderer.create(<EmailInput {...mockEmailProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import PasswordInput from '../components/PasswordInput';
import { PasswordInputProps } from '../utils/Interfaces';

describe('PasswordInput Component', () => {
  const mockSetPassword = jest.fn();
  const mockSetPasswordErr = jest.fn();
  const mockSetFormValid = jest.fn();

  const mockPasswordProps: PasswordInputProps = {
    password: '',
    setPassword: mockSetPassword,
    passwordErr: '',
    setPasswordErr: mockSetPasswordErr,
    setFormValid: mockSetFormValid,
    emailErr: '',
  };

  test('renders correctly with initial state', () => {
    const component = renderer.create(<PasswordInput {...mockPasswordProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { ClearCartButtonProps } from '../utils/Interfaces';
import ClearCartButton from '../common/ClearCartButton';

jest.mock('../common/ClearCartButton.css', () => ({
  button: 'mock-button-class',
}));

describe('ClearCartButton Component', () => {
  const mockOnClearCart = jest.fn();

  const mockProps: ClearCartButtonProps = {
    onClearCart: mockOnClearCart,
  };

  test('renders correctly', () => {
    const component = renderer.create(<ClearCartButton {...mockProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { useLogin } from '../utils/Login';
import LogoutButton from '../common/LogoutButton';

jest.mock('../utils/Login');
jest.mock('../common/LogoutButton.css', () => ({
  button: 'mock-button-class',
}));

describe('LogoutButton Component', () => {
  const mockHandleLogout = jest.fn();

  (useLogin as jest.Mock).mockReturnValue({
    handleLogout: mockHandleLogout,
  });

  test('renders correctly', () => {
    const component = renderer.create(<LogoutButton />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('clicking the button calls handleLogout', () => {
    const component = renderer.create(<LogoutButton />);
    const instance = component.root;
    const button = instance.findByType('button');
    button.props.onClick();
    expect(mockHandleLogout).toHaveBeenCalled();
  });
});

import ToastMessage from '../common/ToastMessage';
import { ToastMessageProps } from '../utils/Interfaces';

describe('ToastMessage Component', () => {
  const mockToastProps: ToastMessageProps = {
    type: 'success',
    text: 'Success message',
  };

  test('renders correctly with type="success" and text', () => {
    const component = renderer.create(<ToastMessage {...mockToastProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with type="error" and text', () => {
    const component = renderer.create(
      <ToastMessage type="error" text="Error message" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('does not render when type or text is missing', () => {
    const component = renderer.create(<ToastMessage type={null} text={null} />);
    const tree = component.toJSON();
    expect(tree).toBeNull();
  });
});

import CouponCategory from '../components/CouponCategory';
import { CouponCategoryProps } from '../utils/Interfaces';

describe('CouponCategory Component', () => {
  const mockProps: CouponCategoryProps = {
    imageSrc: 'https://example.com/image.png',
    promoCode: 'RSS-2024',
    description: 'Promotional description',
  };

  test('renders correctly with RSS promoCode', () => {
    const component = renderer.create(<CouponCategory {...mockProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with non-RSS promoCode', () => {
    const modifiedProps = {
      ...mockProps,
      promoCode: 'QLED',
    };
    const component = renderer.create(<CouponCategory {...modifiedProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import CategoryLinks from '../components/CategoryLinks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('CategoryLinks Component', () => {
  test('renders correct links', () => {
    const component = renderer.create(
      <MemoryRouter>
        <CategoryLinks />
      </MemoryRouter>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import { formatPrice } from '../utils/formatPrice';

describe('formatPrice function', () => {
  test('formats price correctly in USD', () => {
    const price = 999; // cents
    const currency = 'USD';
    const formattedPrice = formatPrice(price, currency);
    expect(formattedPrice).toBe('$9.99'); // assuming the format is correct
  });

  test('handles zero price', () => {
    const price = 0;
    const currency = 'USD';
    const formattedPrice = formatPrice(price, currency);
    expect(formattedPrice).toBe('$0.00'); // assuming the format is correct
  });

  test('handles negative price', () => {
    const price = -999; // cents
    const currency = 'USD';
    const formattedPrice = formatPrice(price, currency);
    expect(formattedPrice).toBe('-$9.99'); // assuming the format is correct
  });
});

import { EmptyUsersProfileAdresses } from '../components/EmptyUsersProfileAdresses';
import NotFound from '../pages/NotFound';

describe('EmptyUsersProfileAdresses Component', () => {
  test('renders address fields correctly', () => {
    const id = 'testId';

    const component = renderer.create(EmptyUsersProfileAdresses(id));
    const tree = component.toJSON();

    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });
});

jest.mock('../pages/NotFound.css', () => ({}));

describe('NotFound Component', () => {
  test('renders correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import About from '../pages/About';
import { Main } from '../pages/Main';
jest.mock('../pages/About.css', () => ({}));
jest.mock('../assets/Pavel.jpeg', () => 'fake-pavel-image');
jest.mock('../assets/Vlada.jpg', () => 'fake-vlada-image');
jest.mock('../assets/Veronika.jpeg', () => 'fake-veronika-image');

describe('About Component', () => {
  test('renders correctly', () => {
    const component = renderer.create(<About />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders about title correctly', () => {
    const component = renderer.create(<About />);
    const instance = component.root;

    const aboutTitle = instance.findByProps({ className: 'about-title' });
    expect(aboutTitle.children).toContain('About Us');
  });

  test('renders all author cards with correct information', () => {
    const component = renderer.create(<About />);
    const instance = component.root;

    const authorNames = ['Pavel', 'Vladyslava', 'Veronika'];
    authorNames.forEach((authorName) => {
      const authorTitle = instance.findByProps({ children: authorName });
      expect(authorTitle).toBeTruthy();
    });
  });
});

jest.mock('../pages/Main.css', () => ({}));
describe('Main component', () => {
  test('renders correctly', () => {
    const component = renderer.create(<Main />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
