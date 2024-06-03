import './Pages.css';
import './UserProfile.css';
import UsersProfileAdresses from '../components/UsersProfileAdresses';
import { fetchCustomerData } from '../utils/api/getCustomer';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';

export default function UserProfile() {


  const inputsBoxAdresses = UsersProfileAdresses;
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
              defaultValue= {userData?.firstName || ''}
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
            />
          </div>
        </div>
      </div>
      <div className="user-profile_default-addresses">
        <h2>User&apos;s default addresses</h2>
        <div className="container-default-addresses">
          <div className="billing-default-addresses">
            <p>Billing addresses (default)</p>
           {
            userData?.defaultBillingAddressId && 
              inputsBoxAdresses(userData, 1)
            }
            {
            !(userData?.defaultBillingAddressId) && 
            <><span>Enter Billing addresses information:</span>
            <button>Click</button></>
            }
          </div>

          <div className="shipping-default-addresses">
            <p>Shipping addresses (default)</p>
            {userData?.defaultShippingAddressId && 
          inputsBoxAdresses(userData,0)
        }
        {
            !(userData?.defaultShippingAddressId) && 
            <><span>Enter Shipping addresses information:</span>
            <button>Click</button></>
            }
          </div>
        </div>
      </div>
      <div className="user-profile_saved-addresses">
        <h2>User&apos;s saved addresses</h2>
        <div className="container-addresses">
          <div className="billing-addresses">
            <p>Billing addresses</p>
            {userData?.billingAddressIds && 
          inputsBoxAdresses(userData,1)
        }
          </div>

          <div className="shipping-addresses">
            <p>Shipping addresses</p>
           {userData?.shippingAddressIds && 
          inputsBoxAdresses(userData,0)
        }
          </div>
        </div>
      </div>
    </>
  );
}
