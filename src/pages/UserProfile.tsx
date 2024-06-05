import './Pages.css';
import './UserProfile.css';
import TogglePassInput from '../utils/validation/TogglePassInput';
import BlurHandler from '../utils/validation/BlurHundler';
import BlurHandlerUser from '../utils/validation/BlurHandlerUser';
import EmailValidationRegistr from '../utils/validation/EmailValidationRegistr';
import PasswordValidation from '../utils/validation/PasswordValidation';
import NameValidation from '../utils/validation/NameValidation';
import BirthdateValidation from '../utils/validation/BirthdateValidation';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { UsersProfileAdresses } from '../components/UsersProfileAdresses';
import { EmptyUsersProfileAdresses } from '../components/UsersProfileAdresses';
import { fetchCustomerData } from '../utils/api/getCustomer';
import { useLogin } from '../utils/Login';
//import { ChangePassword } from '../components/ChangePassword';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';

type RestBlurHandlerUserProps = [
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export default function UserProfile() {
  const iconPassive = <FaLock />;
  const iconActive = <FaUnlock />;
  const [userData, setData] = useState<Customer>();
  const [newFieldBilling, setNewFieldBilling] = useState(<></>);
  const [newFieldShipping, setNewFieldShipping] = useState(<></>);
  const [updateResult, setUpdateResult] = useState(false);

  const [type, setType] = useState('password');

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [nameUser, setNameUser] = useState(''),
    [lastNameUser, setLastNameUser] = useState(''),
    [birthdate, setBirthdate] = useState('');

  const [emailErr, setEmailErr] = useState(''),
    [passwordErr] = useState('Please enter the current password'),
    [newPasswordErr, setNewPasswordErr] = useState(
      'Please fill out this field'
    ),
    [passwordСonfirmErr] = useState('Password does not match'),
    [nameUserErr, setNameUserErr] = useState(''),
    [lastNameUserErr, setLastNameUserErr] = useState(''),
    [birthdateErr, setBirthdateErr] = useState('');

  const [emailFill, setEmailFill] = useState(false),
    [passwordFill, setPasswordFill] = useState(false),
    [newPasswordFill, setNewPasswordFill] = useState(false),
    [passwordСonfirmFill, setPasswordСonfirmFill] = useState(false),
    [nameUserFill, setNameUserFill] = useState(false),
    [lastNameUserFill, setLastNameUserFill] = useState(false),
    [birthdateFill, setBirthdateFill] = useState(false);

  const restBlurHandlerUser: RestBlurHandlerUserProps = [
    setNameUserFill,
    setLastNameUserFill,
    setBirthdateFill,
  ];
  const { error, handleLogin } = useLogin();
  const [formValid, setFormValid] = useState(true);

  const [passInputClasses, setPassInputClasses] =
    useState('pass-input-passive');
  const [toggleIcon, setToggleIcon] = useState(iconPassive);
  const [toggleIconClasses, setToggleIconClasses] = useState(
    'pass-toggle-icon-passive'
  );

  useEffect(() => {
    const hasError =
      emailErr ||
      passwordErr ||
      newPasswordErr ||
      passwordСonfirmErr ||
      nameUserErr ||
      lastNameUserErr ||
      birthdateErr;
    setFormValid(!hasError);
  }, [
    emailErr,
    passwordErr,
    newPasswordErr,
    passwordСonfirmErr,
    nameUserErr,
    lastNameUserErr,
    birthdateErr,
  ]);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const data = await fetchCustomerData();
        console.log('Customer data:', data);
        setData(data);
      } catch (err) {
        console.error('Error fetching customer data:', err);
      }
    };

    getCustomerData();
  }, []);

  const [flagEditData, setFlagEditData] = useState(false);

  return (
    <>
      <button
        className="user-profile_edit-data"
        onClick={() => {
          setFlagEditData(true);

          const sectionInformation: HTMLBodyElement | null =
            document.querySelector('.user-profile_information');
          const sectionDefault: HTMLBodyElement | null = document.querySelector(
            '.user-profile_default-addresses'
          );
          const sectionSaved: HTMLBodyElement | null = document.querySelector(
            '.user-profile_saved-addresses'
          );

          if (sectionInformation && sectionDefault && sectionSaved) {
            sectionInformation.style.background =
              'linear-gradient(0.25turn, rgb(174 174 174 / 48%), rgb(10 8 7 / 78%))';
            sectionDefault.style.background =
              'linear-gradient(0.25turn, rgb(174 174 174 / 48%), rgb(10 8 7 / 78%))';
            sectionSaved.style.background =
              'linear-gradient(0.25turn, rgb(174 174 174 / 48%), rgb(10 8 7 / 78%))';
          }
        }}
        disabled={flagEditData && true}
      >
        Edit data
      </button>
      <button
        className="user-profile_change-password"
        onClick={() => {
          const form: HTMLElement | null = document.querySelector(
            '.form-change-password_wrapper'
          );
          if (form !== null) form.style.display = 'block';
        }}
      >
        Change Password
      </button>
      <h1>User profile</h1>
      <div className="form-change-password_wrapper">
        <form className="user-profile_form-change-password">
          <div>
            <label htmlFor="current-password">Current password: </label>
            <input
              className={passInputClasses}
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  console.log(passwordFill);
                  //console.log(userData?.password)
                  //setPasswordFill(userData?.password !== e.target.value);
                }
              }}
              onBlur={(e) => {
                if (
                  e.target instanceof HTMLInputElement &&
                  userData !== undefined
                ) {
                  handleLogin(userData.email, e.target.value);
                  BlurHandler(e.target.name, setEmailFill, setPasswordFill);
                }
              }}
              id="information-password"
              name="password"
              type={type}
              autoComplete="off"
            />
            <div style={{ color: 'red' }}>{error && <p>{passwordErr}</p>}</div>

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
            ></span>
          </div>
          <div>
            <label htmlFor="new-password">New password: </label>
            <input
              className={passInputClasses}
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  PasswordValidation(
                    e.target.value,
                    password,
                    setPassword,
                    setNewPasswordErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  BlurHandler(e.target.name, setEmailFill, setNewPasswordFill);
                }
              }}
              id="new-password"
              name="password"
              type={type}
              autoComplete="off"
              required
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
            ></span>
            {newPasswordFill && newPasswordErr && (
              <div style={{ color: 'red' }}>{newPasswordErr}</div>
            )}
          </div>
          <div>
            <label htmlFor="confirm-new-password">Confirm New password: </label>
            <input
              className={passInputClasses}
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  const valuePass: HTMLInputElement | null =
                    document.querySelector('#new-password');
                  setPasswordСonfirmFill(valuePass?.value !== e.target.value);
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement && !e.target.value) {
                  BlurHandler(
                    e.target.name,
                    setEmailFill,
                    setPasswordСonfirmFill
                  );
                }
              }}
              id="confirm-new-password"
              name="password"
              type={type}
              autoComplete="off"
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
              <p className="turn-visibility-pass">
                Turn on visibility {toggleIcon}
              </p>
            </span>
            {passwordСonfirmFill && passwordСonfirmErr && (
              <div style={{ color: 'red' }}>{passwordСonfirmErr}</div>
            )}
          </div>
          <button>Save</button>
          <button
            onClick={() => {
              const form: HTMLElement | null = document.querySelector(
                '.form-change-password_wrapper'
              );
              if (form !== null) form.style.display = 'none';
            }}
          >
            Cancel
          </button>
        </form>
      </div>
      <div className="user-profile_information">
        <h2>User Information</h2>
        <div className="information-input">
          <div>
            <label htmlFor="information-email">Email: </label>
            <input
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  setEmailFill(Boolean(email));
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
              id="information-email"
              name="email"
              type="text"
              autoComplete="off"
              defaultValue={userData?.email || ''}
              disabled={!flagEditData && true}
            />
            {emailFill && emailErr && (
              <div style={{ color: 'red' }}>{emailErr}</div>
            )}
          </div>

          <div>
            <label htmlFor="information-first-name">First name: </label>
            <input
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  setNameUserFill(Boolean(nameUser));
                  NameValidation(
                    e.target.value,
                    nameUser,
                    setNameUser,
                    setNameUserErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement && !e.target.value) {
                  BlurHandlerUser(e.target.name, ...restBlurHandlerUser);
                }
              }}
              id="information-first-name"
              name="information-first-name"
              type="text"
              autoComplete="off"
              defaultValue={userData?.firstName || ''}
              disabled={!flagEditData && true}
            />
            {nameUserFill && nameUserErr && (
              <div style={{ color: 'red' }}>{nameUserErr}</div>
            )}
          </div>

          <div>
            <label htmlFor="information-last-name">Last name: </label>
            <input
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  setLastNameUserFill(Boolean(lastNameUser));
                  NameValidation(
                    e.target.value,
                    lastNameUser,
                    setLastNameUser,
                    setLastNameUserErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement && !e.target.value) {
                  BlurHandlerUser(e.target.name, ...restBlurHandlerUser);
                }
              }}
              id="information-last-name"
              name="information-last-name"
              type="text"
              autoComplete="off"
              defaultValue={userData?.lastName || ''}
              disabled={!flagEditData && true}
            />
            {lastNameUserFill && lastNameUserErr && (
              <div style={{ color: 'red' }}>{lastNameUserErr}</div>
            )}
          </div>

          <div>
            <label htmlFor="information-birth">User&apos;s birth: </label>
            <input
              onInput={(e) => {
                if (e.target instanceof HTMLInputElement) {
                  setBirthdateFill(Boolean(birthdate));
                  BirthdateValidation(
                    e.target.value,
                    birthdate,
                    setBirthdate,
                    setBirthdateErr
                  );
                }
              }}
              onBlur={(e) => {
                if (e.target instanceof HTMLInputElement && !e.target.value) {
                  BlurHandlerUser(e.target.name, ...restBlurHandlerUser);
                }
              }}
              id="information-birth"
              name="information-birth"
              type="date"
              defaultValue={userData?.dateOfBirth || ''}
              disabled={!flagEditData && true}
            />
            {birthdateFill && birthdateErr && (
              <div style={{ color: 'red' }}>{birthdateErr}</div>
            )}
          </div>
        </div>
      </div>
      <div className="user-profile_default-addresses">
        <h2>User&apos;s default addresses</h2>
        <div className="container-default-addresses">
          <div className="billing-default-addresses">
            <p>Billing addresses (default)</p>
            {newFieldBilling}
            {userData?.defaultBillingAddressId &&
              UsersProfileAdresses(
                userData,
                1,
                flagEditData,
                'defaultBillingAddress'
              )}
            {!userData?.defaultBillingAddressId && flagEditData && (
              <button
                onClick={() => {
                  setNewFieldBilling(
                    EmptyUsersProfileAdresses('newDefaultBillingAddress')
                  );
                  const button: HTMLElement | null = document.querySelector(
                    '.billing-default-addresses button'
                  );
                  if (button != null) button.style.display = 'none';
                }}
              >
                + add address
              </button>
            )}
          </div>

          <div className="shipping-default-addresses">
            <p>Shipping addresses (default)</p>
            {newFieldShipping}
            {userData?.defaultShippingAddressId &&
              UsersProfileAdresses(
                userData,
                0,
                flagEditData,
                'defaultShippingAddress'
              )}
            {!userData?.defaultShippingAddressId && flagEditData && (
              <button
                onClick={() => {
                  setNewFieldShipping(
                    EmptyUsersProfileAdresses('newDefaultShippingAddress')
                  );
                  const button: HTMLElement | null = document.querySelector(
                    '.shipping-default-addresses button'
                  );
                  if (button != null) button.style.display = 'none';
                }}
              >
                + add address
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="user-profile_saved-addresses">
        <h2>User&apos;s saved addresses</h2>
        <div className="container-addresses">
          <div className="billing-addresses">
            <p>Billing addresses</p>
            {userData?.billingAddressIds &&
              UsersProfileAdresses(userData, 1, flagEditData, 'billingAddress')}
          </div>

          <div className="shipping-addresses">
            <p>Shipping addresses</p>
            {userData?.shippingAddressIds &&
              UsersProfileAdresses(
                userData,
                0,
                flagEditData,
                'shippingAddress'
              )}
          </div>
        </div>
      </div>
      <button
        className="user-profile_save-data"
        onClick={() => {
          setUpdateResult(true);
          const sectionInformation: HTMLBodyElement | null =
            document.querySelector('.user-profile_information');
          const sectionDefault: HTMLBodyElement | null = document.querySelector(
            '.user-profile_default-addresses'
          );
          const sectionSaved: HTMLBodyElement | null = document.querySelector(
            '.user-profile_saved-addresses'
          );

          if (sectionInformation && sectionDefault && sectionSaved) {
            sectionInformation.style.background =
              'linear-gradient(0.25turn, #b9f3ff, #181b35)';
            sectionDefault.style.background =
              'linear-gradient(0.25turn, #b9f3ff, #181b35)';
            sectionSaved.style.background =
              'linear-gradient(0.25turn, #b9f3ff, #181b35)';
          }
        }}
        disabled={!formValid || !flagEditData}
        type="submit"
      >
        Save data
      </button>
      <div style={{ color: 'green', textAlign: 'center' }}>
        {updateResult && <p>Data updated successfully!</p>}
      </div>
      <div style={{ color: 'red', textAlign: 'center' }}>
        {flagEditData && !updateResult && <p>Error: Data update failed!</p>}
      </div>
    </>
  );
}
