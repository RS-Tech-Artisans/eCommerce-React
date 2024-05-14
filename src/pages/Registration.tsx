import { MdEmail } from 'react-icons/md';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import './Registration.css';

export default function Registration() {
  return (
    <>
      <form className="registration-form" action="">
        <h1>Registration</h1>
        <div className="registration-form_input-box">
          <input type="email" placeholder="E-mail" required />
          <MdEmail />
        </div>
        <div className="registration-form_input-box">
          <input type="password" placeholder="Password" required />
          <FaLock />
        </div>
        <div className="registration-form_input-box">
          <input type="text" placeholder="First Name" required />
          <FaUserCircle />
        </div>
        <div className="registration-form_input-box">
          <input type="text" placeholder="Last Name" required />
          <FaUserCircle />
        </div>
        <div className="registration-form_input-box">
          <label htmlFor="date">Birthdate: </label>
          <div>
            <input type="date" id="date" name="birthdate" />
          </div>
        </div>
        <div className="registration-form_input-box">
          <p>Address fields:</p>
          <div>
            <label htmlFor="street">Street: </label>
            <input type="text" id="street" required />
          </div>
          <div>
            <label htmlFor="city">City: </label>
            <input type="text" id="city" required />
          </div>
          <div>
            <label htmlFor="postal-code">Postal code: </label>
            <input type="text" id="postal-code" required />
          </div>
          <div>
            <label htmlFor="country">Country: </label>
            <input type="text" id="country" required />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
