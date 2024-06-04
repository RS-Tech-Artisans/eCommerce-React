import './Pages.css';
import './UserProfile.css';
import { UsersProfileAdresses } from '../components/UsersProfileAdresses';
import { EmptyUsersProfileAdresses } from '../components/UsersProfileAdresses';
import { fetchCustomerData } from '../utils/api/getCustomer';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';

export default function UserProfile() {
  const [userData, setData] = useState<Customer>();
  const [newFieldBilling, setNewFieldBilling] = useState(<></>);
  const [newFieldShipping, setNewFieldShipping] = useState(<></>);
  const [updateResult, setUpdateResult] = useState(false);

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
            {newFieldBilling}
            {userData?.defaultBillingAddressId &&
              UsersProfileAdresses(userData, 1, flagEditData)}
            {!userData?.defaultBillingAddressId && flagEditData && (
              <button
                onClick={() => {
                  setNewFieldBilling(EmptyUsersProfileAdresses());
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
              UsersProfileAdresses(userData, 0, flagEditData)}
            {!userData?.defaultShippingAddressId && flagEditData && (
              <button
                onClick={() => {
                  setNewFieldShipping(EmptyUsersProfileAdresses());
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
        disabled={!flagEditData && true}
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
