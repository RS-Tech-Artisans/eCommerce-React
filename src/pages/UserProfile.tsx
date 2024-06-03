import './Pages.css';
import './UserProfile.css';
import UsersProfileAdresses from '../components/UsersProfileAdresses';
import { fetchCustomerData } from '../utils/api/getCustomer';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';

export default function UserProfile() {
  const [userData, setData] = useState<Customer>();

  const inputsBoxAdresses = UsersProfileAdresses();

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

  return (
    <>
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
              value={userData?.firstName || ''}
            />
          </div>
          <div>
            <label htmlFor="information-last-name">Last name: </label>
            <input
              id="information-last-name"
              name="last-name"
              type="text"
              autoComplete="off"
              value={userData?.lastName || ''}
            />
          </div>
          <div>
            <label htmlFor="information-birth">User&apos;s birth: </label>
            <input
              id="information-birth"
              name="birth"
              type="text"
              autoComplete="off"
              value={userData?.dateOfBirth || ''}
            />
          </div>
        </div>
      </div>
      <div className="user-profile_default-addresses">
        <h2>User&apos;s default addresses</h2>
        <div className="container-default-addresses">
          <div className="billing-default-addresses">
            <p>Billing addresses (default)</p>
            {inputsBoxAdresses}
          </div>

          <div className="shipping-default-addresses">
            <p>Shipping addresses (default)</p>
            {inputsBoxAdresses}
          </div>
        </div>
      </div>
      <div className="user-profile_saved-addresses">
        <h2>User&apos;s saved addresses</h2>
        <div className="container-addresses">
          <div className="billing-addresses">
            <p>Billing addresses</p>
            <>
              <div>
                <label htmlFor="default-street">Street: </label>
                <input
                  id="default-street"
                  name="default-street"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[1].streetName || ''}
                />
              </div>
              <div>
                <label htmlFor="default-city">City: </label>
                <input
                  id="default-city"
                  name="default-city"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[1].city || ''}
                />
              </div>
              <div>
                <label htmlFor="default-postal-code">Postal code: </label>
                <input
                  id="default-postal-code"
                  name="default-postal-code"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[1].postalCode || ''}
                />
              </div>
              <div>
                <label htmlFor="default-country">Country: </label>
                <input
                  id="default-country"
                  name="default-country"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[1].country || ''}
                />
              </div>
            </>
          </div>

          <div className="shipping-addresses">
            <p>Shipping addresses</p>
            <>
              <div>
                <label htmlFor="default-street">Street: </label>
                <input
                  id="default-street"
                  name="default-street"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[0].streetName || ''}
                />
              </div>
              <div>
                <label htmlFor="default-city">City: </label>
                <input
                  id="default-city"
                  name="default-city"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[0].city || ''}
                />
              </div>
              <div>
                <label htmlFor="default-postal-code">Postal code: </label>
                <input
                  id="default-postal-code"
                  name="default-postal-code"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[0].postalCode || ''}
                />
              </div>
              <div>
                <label htmlFor="default-country">Country: </label>
                <input
                  id="default-country"
                  name="default-country"
                  type="text"
                  autoComplete="off"
                  value={userData?.addresses[0].country || ''}
                />
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
