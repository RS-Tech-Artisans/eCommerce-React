import './Pages.css';
import './UserProfile.css';
import { UsersProfileAdresses } from '../components/UsersProfileAdresses';
import { EmptyUsersProfileAdresses } from '../components/UsersProfileAdresses';
import { fetchCustomerData } from '../utils/api/getCustomer';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';

export default function UserProfile() {
  //const inputsBoxAdresses = UsersProfileAdresses;

  const [userData, setData] = useState<Customer>();
  //just downloaded the test data to check on the profile page
  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const data = await fetchCustomerData();
        console.log('Customer data:', data);
        setData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    getCustomerData();
  }, []);
  //just downloaded the test data to check on the profile page

  const [flagEditData, setFlagEditData] = useState(false);
  const body: HTMLBodyElement | null = document.querySelector('body');

  return (
    <>
      <button
        className="user-profile_edit-data"
        onClick={() => {
          setFlagEditData(true);
          if (body)
            body.style.background =
              'linear-gradient(0.25turn, #ffffff, rgb(4 35 8))';
        }}
        disabled={flagEditData && true}
      >
        Edit data
      </button>
      <h1>User profile</h1>
      <div className="user-profile_information">
        <h2>User Information</h2>
        <div className="information-input">
          <div>
            <label htmlFor="information-first-name">First name: </label>
            <input
              id="information-first-name"
              name="first-name"
              type="text"
              autoComplete="off"
              defaultValue={userData?.firstName || ''}
              disabled={!flagEditData && true}
            />
          </div>
          <div>
            <label htmlFor="information-last-name">Last name: </label>
            <input
              id="information-last-name"
              name="last-name"
              type="text"
              autoComplete="off"
              defaultValue={userData?.lastName || ''}
              disabled={!flagEditData && true}
            />
          </div>
          <div>
            <label htmlFor="information-birth">User&apos;s birth: </label>
            <input
              id="information-birth"
              name="birth"
              type="text"
              autoComplete="off"
              defaultValue={userData?.dateOfBirth || ''}
              disabled={!flagEditData && true}
            />
          </div>
        </div>
      </div>
      <div className="user-profile_default-addresses">
        <h2>User&apos;s default addresses</h2>
        <div className="container-default-addresses">
          <div className="billing-default-addresses">
            <p>Billing addresses (default)</p>
            {userData?.defaultBillingAddressId &&
              UsersProfileAdresses(userData, 1, flagEditData)}
                            {!userData?.defaultBillingAddressId && flagEditData &&
              EmptyUsersProfileAdresses()}
          </div>

          <div className="shipping-default-addresses">
            <p>Shipping addresses (default)</p>
            {userData?.defaultShippingAddressId &&
              UsersProfileAdresses(userData, 0, flagEditData)}
                                          {!userData?.defaultShippingAddressId && flagEditData &&
              EmptyUsersProfileAdresses()}
          </div>
        </div>
      </div>
      <div className="user-profile_saved-addresses">
        <h2>User&apos;s saved addresses</h2>
        <div className="container-addresses">
          <div className="billing-addresses">
            <p>Billing addresses</p>
            {userData?.billingAddressIds &&
              UsersProfileAdresses(userData, 1, flagEditData)}
          </div>

          <div className="shipping-addresses">
            <p>Shipping addresses</p>
            {userData?.shippingAddressIds &&
              UsersProfileAdresses(userData, 0, flagEditData)}
          </div>
        </div>
      </div>
      <button
        className="user-profile_save-data"
        onClick={() => {
          setFlagEditData(false);
          if (body)
            body.style.background =
              'linear-gradient(0.25turn, #b9f3ff, #181b35)';
        }}
        disabled={!flagEditData && true}
      >
        Save data
      </button>
    </>
  );
}
