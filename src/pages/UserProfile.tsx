import './Pages.css';
import './UserProfile.css';
import UsersProfileAdresses from '../components/UsersProfileAdresses';

const inputsBoxAdresses = UsersProfileAdresses();
export default function UserProfile() {
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
            />
          </div>
          <div>
            <label htmlFor="information-last-name">Last name: </label>
            <input
              id="information-last-name"
              name="last-name"
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="information-birth">User&apos;s birth: </label>
            <input
              id="information-birth"
              name="birth"
              type="text"
              autoComplete="off"
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
      </div>
    </>
  );
}
