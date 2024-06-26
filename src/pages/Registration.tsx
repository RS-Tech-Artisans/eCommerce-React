import { useState, useEffect } from 'react';
import BlurHandler from '../utils/validation/BlurHundler';
import BlurHandlerRegistr from '../utils/validation/BlurHandlerRegistr';
import EmailValidationRegistr from '../utils/validation/EmailValidationRegistr';
import PasswordValidation from '../utils/validation/PasswordValidation';
import NameValidation from '../utils/validation/NameValidation';
import BirthdateValidation from '../utils/validation/BirthdateValidation';
import StreetValidation from '../utils/validation/StreetValidation';
import CityValidation from '../utils/validation/CityValidation';
import CountryValidation from '../utils/validation/CountryValidation';
import PostalCodeValidation from '../utils/validation/PostalCodeValidation';
import TogglePassInput from '../utils/validation/TogglePassInput';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUnlock, FaUserCircle } from 'react-icons/fa';
import './Registration.css';
import './Pages.css';
import { useRegistration } from '../utils/Registration';
import { useLogin } from '../utils/Login';
import { useSession } from '../utils/SessionContext';

type RestBlurHandlerRegistrProps = [
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

export default function Registration() {
  const iconPassive = <FaLock />;
  const iconActive = <FaUnlock />;

  const [type, setType] = useState('password');

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [nameUser, setNameUser] = useState(''),
    [lastNameUser, setLastNameUser] = useState(''),
    [birthdate, setBirthdate] = useState(''),
    [street, setStreet] = useState(''),
    [city, setCity] = useState(''),
    [country, setCountry] = useState(''),
    [postalCode, setPostalCode] = useState(''),
    [streetBilling, setStreetBilling] = useState(''),
    [cityBilling, setCityBilling] = useState(''),
    [countryBilling, setCountryBilling] = useState(''),
    [postalCodeBilling, setPostalCodeBilling] = useState('');

  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);
  const [billingAddress, setBillingAddress] = useState<boolean>(false);
  const [defaultBillingAddress, setDefaultBillingAddress] =
    useState<boolean>(false);

  const [emailErr, setEmailErr] = useState('Please fill out this field'),
    [passwordErr, setPasswordErr] = useState('Please fill out this field'),
    [nameUserErr, setNameUserErr] = useState('Please fill out this field'),
    [lastNameUserErr, setLastNameUserErr] = useState(
      'Please fill out this field'
    ),
    [birthdateErr, setBirthdateErr] = useState('Please fill out this field'),
    [streetErr, setStreetErr] = useState('Please fill out this field'),
    [cityErr, setCityErr] = useState('Please fill out this field'),
    [countryErr, setCountryErr] = useState('Please select from the list'),
    [postalCodeErr, setPostalCodeErr] = useState('Please fill out this field'),
    [streetErrBilling, setStreetErrBilling] = useState(
      'Please fill out this field'
    ),
    [cityErrBilling, setCityErrBilling] = useState(
      'Please fill out this field'
    ),
    [countryErrBilling, setCountryErrBilling] = useState(
      'Please select from the list'
    ),
    [postalCodeErrBilling, setPostalCodeErrBilling] = useState(
      'Please fill out this field'
    );

  const [emailFill, setEmailFill] = useState(false),
    [passwordFill, setPasswordFill] = useState(false),
    [nameUserFill, setNameUserFill] = useState(false),
    [lastNameUserFill, setLastNameUserFill] = useState(false),
    [birthdateFill, setBirthdateFill] = useState(false),
    [streetFill, setStreetFill] = useState(false),
    [cityFill, setCityFill] = useState(false),
    [countryFill, setCountryFill] = useState(false),
    [postalCodeFill, setPostalCodeFill] = useState(false),
    [streetFillBilling, setStreetFillBilling] = useState(false),
    [cityFillBilling, setCityFillBilling] = useState(false),
    [countryFillBilling, setCountryFillBilling] = useState(false),
    [postalCodeFillBilling, setPostalCodeFillBilling] = useState(false);

  const [formValid, setFormValid] = useState(false);
  const { handleLogin } = useLogin();

  const [passInputClasses, setPassInputClasses] =
    useState('pass-input-passive');
  const [toggleIcon, setToggleIcon] = useState(iconPassive);
  const [toggleIconClasses, setToggleIconClasses] = useState(
    'pass-toggle-icon-passive'
  );

  const restBlurHandlerRegistr: RestBlurHandlerRegistrProps = [
    setNameUserFill,
    setLastNameUserFill,
    setBirthdateFill,
    setStreetFill,
    setCityFill,
    setCountryFill,
    setPostalCodeFill,
    setStreetFillBilling,
    setCityFillBilling,
    setCountryFillBilling,
    setPostalCodeFillBilling,
  ];

  const { error, registrationResult, handleRegistration } = useRegistration();
  const { token } = useSession();

  useEffect(() => {
    const hasError =
      emailErr ||
      passwordErr ||
      nameUserErr ||
      lastNameUserErr ||
      birthdateErr ||
      streetErr ||
      cityErr ||
      countryErr ||
      postalCodeErr ||
      streetErrBilling ||
      cityErrBilling ||
      countryErrBilling ||
      postalCodeErrBilling ||
      token;

    setFormValid(!hasError);
  }, [
    emailErr,
    passwordErr,
    nameUserErr,
    lastNameUserErr,
    birthdateErr,
    streetErr,
    cityErr,
    countryErr,
    postalCodeErr,
    streetErrBilling,
    cityErrBilling,
    countryErrBilling,
    postalCodeErrBilling,
    token,
  ]);

  useEffect(() => {
    if (billingAddress) {
      StreetValidation(
        street,
        streetBilling,
        setStreetBilling,
        setStreetErrBilling
      );
      CityValidation(city, cityBilling, setCityBilling, setCityErrBilling);
      CountryValidation(
        country,
        countryBilling,
        setCountryBilling,
        setCountryErrBilling
      );
      PostalCodeValidation(
        postalCode,
        postalCodeBilling,
        setPostalCodeBilling,
        setPostalCodeErrBilling
      );
    }
  }, [
    billingAddress,
    street,
    city,
    country,
    postalCode,
    cityBilling,
    countryBilling,
    postalCodeBilling,
    streetBilling,
  ]);

  return (
    <>
      <form
        className="registration-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>Registration</h1>
        <div className="registration-form_input-box">
          <input
            onInput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                EmailValidationRegistr(
                  e.target.value,
                  email,
                  setEmail,
                  setEmailErr
                );
              }
            }}
            onBlur={(e) => {
              if (e.target instanceof HTMLInputElement) {
                BlurHandler(e.target.name, setEmailFill, setPasswordFill);
              }
            }}
            name="email"
            type="text"
            placeholder="E-mail"
            autoComplete="off"
          />
          <MdEmail />
        </div>
        {emailFill && emailErr && (
          <div style={{ color: 'red' }}>{emailErr}</div>
        )}
        <div className="registration-form_input-box">
          <input
            className={passInputClasses}
            onInput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                PasswordValidation(
                  e.target.value,
                  password,
                  setPassword,
                  setPasswordErr
                );
              }
            }}
            onBlur={(e) => {
              if (e.target instanceof HTMLInputElement) {
                BlurHandler(e.target.name, setEmailFill, setPasswordFill);
              }
            }}
            type={type}
            name="password"
            placeholder="Password"
          />
          <span
            onClick={() =>
              TogglePassInput(
                type,
                setType,
                setToggleIcon,
                iconActive,
                setPassInputClasses,
                setToggleIconClasses,
                iconPassive
              )
            }
            className={`toggle ${toggleIconClasses}`}
          >
            {toggleIcon}
          </span>
        </div>
        {passwordFill && passwordErr && (
          <div style={{ color: 'red' }}>{passwordErr}</div>
        )}
        <div className="registration-form_input-box">
          <input
            onInput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                NameValidation(
                  e.target.value,
                  nameUser,
                  setNameUser,
                  setNameUserErr
                );
              }
            }}
            onBlur={(e) => {
              if (e.target instanceof HTMLInputElement) {
                BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
              }
            }}
            name="name-user"
            type="text"
            placeholder="First Name"
            autoComplete="off"
          />
          <FaUserCircle />
        </div>
        {nameUserFill && nameUserErr && (
          <div style={{ color: 'red' }}>{nameUserErr}</div>
        )}
        <div className="registration-form_input-box">
          <input
            onInput={(e) => {
              if (e.target instanceof HTMLInputElement) {
                NameValidation(
                  e.target.value,
                  lastNameUser,
                  setLastNameUser,
                  setLastNameUserErr
                );
              }
            }}
            onBlur={(e) => {
              if (e.target instanceof HTMLInputElement) {
                BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
              }
            }}
            name="last-name-user"
            type="text"
            placeholder="Last Name"
            autoComplete="off"
          />
          <FaUserCircle />
        </div>
        {lastNameUserFill && lastNameUserErr && (
          <div style={{ color: 'red' }}>{lastNameUserErr}</div>
        )}
        <div className="registration-form_input-box">
          <label htmlFor="date">Birthdate: </label>
          <div>
            <input
              id="date"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BirthdateValidation(
                    e.target.value,
                    birthdate,
                    setBirthdate,
                    setBirthdateErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
                }
              }}
              name="birthdate"
              type="date"
            />
          </div>
        </div>
        {birthdateFill && birthdateErr && (
          <div style={{ color: 'red' }}>{birthdateErr}</div>
        )}
        <div className="registration-form_input-box">
          <p>Address fields:</p>
          <div>
            <label htmlFor="street">Street: </label>
            <input
              id="street"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  StreetValidation(
                    e.target.value,
                    street,
                    setStreet,
                    setStreetErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
                }
              }}
              name="street"
              type="text"
              autoComplete="off"
            />
          </div>
          {streetFill && streetErr && (
            <div style={{ color: 'red' }}>{streetErr}</div>
          )}
          <div>
            <label htmlFor="city">City: </label>
            <input
              id="city"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  CityValidation(e.target.value, city, setCity, setCityErr);
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
                }
              }}
              name="city"
              type="text"
              autoComplete="off"
            />
          </div>
          {cityFill && cityErr && <div style={{ color: 'red' }}>{cityErr}</div>}
          <div>
            <label htmlFor="postal-code">Postal code: </label>
            <input
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  PostalCodeValidation(
                    e.target.value,
                    postalCode,
                    setPostalCode,
                    setPostalCodeErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
                }
              }}
              name="postal-code"
              id="postal-code"
              autoComplete="off"
              required
            />
          </div>
          {postalCodeFill && postalCodeErr && (
            <div style={{ color: 'red' }}>{postalCodeErr}</div>
          )}
          <div>
            <label htmlFor="country">Country: </label>
            <select
              onChange={(e) => {
                if (e.target instanceof HTMLSelectElement) {
                  CountryValidation(
                    e.target.value,
                    country,
                    setCountry,
                    setCountryErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLSelectElement) {
                  BlurHandlerRegistr(e.target.name, ...restBlurHandlerRegistr);
                }
              }}
              name="country"
              id="country"
            >
              <option value=""></option>
              <option value="US">USA</option>
            </select>
          </div>
          {countryFill && countryErr && (
            <div style={{ color: 'red' }}>{countryErr}</div>
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <div className="registration-form_checkbox">
            <label htmlFor="default-address">Default shipping address</label>
            <input
              id="default-address"
              type="checkbox"
              name="default-address"
              checked={defaultAddress}
              onChange={(): void => {
                setDefaultAddress(!defaultAddress);
              }}
            />
          </div>
          <div className="registration-form_checkbox">
            <label htmlFor="billing-address">Billing address</label>
            <input
              id="billing-address"
              type="checkbox"
              name="billing-address"
              checked={billingAddress}
              onChange={(): void => {
                setBillingAddress(!billingAddress);
              }}
            />
          </div>
        </div>
        <div className="registration-form_input-box">
          <p>Billing Address fields:</p>
          <div>
            <label htmlFor="street-billing">Street: </label>
            <input
              id="street-billing"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  StreetValidation(
                    e.target.value,
                    streetBilling,
                    setStreetBilling,
                    setStreetErrBilling
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(
                    `${e.target.name}forBillingAddress`,
                    ...restBlurHandlerRegistr
                  );
                }
              }}
              value={billingAddress ? street : streetBilling}
              name="street-billing"
              type="text"
              autoComplete="off"
            />
          </div>
          {streetFillBilling && streetErrBilling && !billingAddress && (
            <div style={{ color: 'red' }}>{streetErrBilling}</div>
          )}
          <div>
            <label htmlFor="city-billing">City: </label>
            <input
              id="city-billing"
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  CityValidation(
                    e.target.value,
                    cityBilling,
                    setCityBilling,
                    setCityErrBilling
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(
                    `${e.target.name}forBillingAddress`,
                    ...restBlurHandlerRegistr
                  );
                }
              }}
              value={billingAddress ? city : cityBilling}
              name="city"
              type="text"
              autoComplete="off"
            />
          </div>
          {cityFillBilling && cityErrBilling && !billingAddress && (
            <div style={{ color: 'red' }}>{cityErrBilling}</div>
          )}
          <div>
            <label htmlFor="postal-code-billing">Postal code: </label>
            <input
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  PostalCodeValidation(
                    e.target.value,
                    postalCodeBilling,
                    setPostalCodeBilling,
                    setPostalCodeErrBilling
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandlerRegistr(
                    `${e.target.name}forBillingAddress`,
                    ...restBlurHandlerRegistr
                  );
                }
              }}
              value={billingAddress ? postalCode : postalCodeBilling}
              name="postal-code"
              id="postal-code-billing"
              autoComplete="off"
              required
            />
          </div>
          {postalCodeFillBilling && postalCodeErrBilling && !billingAddress && (
            <div style={{ color: 'red' }}>{postalCodeErrBilling}</div>
          )}
          <div>
            <label htmlFor="country-billing">Country: </label>
            <select
              onChange={(e) => {
                if (e.target instanceof HTMLSelectElement) {
                  CountryValidation(
                    e.target.value,
                    countryBilling,
                    setCountryBilling,
                    setCountryErrBilling
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLSelectElement) {
                  BlurHandlerRegistr(
                    `${e.target.name}forBillingAddress`,
                    ...restBlurHandlerRegistr
                  );
                }
              }}
              value={billingAddress ? country : countryBilling}
              name="country"
              id="country-billing"
            >
              <option value=""></option>
              <option value="US">USA</option>
            </select>
          </div>
          {countryFillBilling && countryErrBilling && !billingAddress && (
            <div style={{ color: 'red' }}>{countryErrBilling}</div>
          )}

          <div style={{ display: 'flex' }}>
            <div className="registration-form_checkbox">
              <label htmlFor="default-billing-address">
                Default billing address
              </label>
              <input
                id="default-billing-address"
                type="checkbox"
                name="default-billing-address"
                checked={defaultBillingAddress}
                onChange={(): void => {
                  setDefaultBillingAddress(!defaultBillingAddress);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              handleRegistration(
                email,
                password,
                nameUser,
                lastNameUser,
                birthdate,
                street,
                city,
                postalCode,
                country,
                defaultAddress,
                defaultBillingAddress,
                streetBilling,
                cityBilling,
                postalCodeBilling,
                countryBilling
              );

              setTimeout(() => {
                handleLogin(email, password);
              }, 1000);
            }}
            disabled={!formValid}
            type="submit"
          >
            Registration
          </button>

          <div>
            Email Is Already Registered? Try{' '}
            <a
              href="/login"
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
            >
              Login
            </a>
          </div>
        </div>

        <div style={{ color: 'green' }}>
          {registrationResult && !error && <h2>Registration successful!</h2>}
        </div>
        <div style={{ color: 'red' }}>
          {error && <h2>Error: try again later</h2>}
        </div>
      </form>
    </>
  );
}
