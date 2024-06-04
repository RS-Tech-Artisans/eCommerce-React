import { Customer } from "@commercetools/platform-sdk";

export default function UsersProfileAdresses(userData: Customer | undefined, ind: number, flagEditData: boolean) {
  return (
    <>
      <div>
        <label htmlFor="default-street">Street: </label>
        <input
          id="default-street"
          name="default-street"
          type="text"
          autoComplete="off"
          defaultValue={userData?.addresses[ind]?.streetName}
          disabled = {!flagEditData &&
            true}
        />
      </div>
      <div>
        <label htmlFor="default-city">City: </label>
        <input
          id="default-city"
          name="default-city"
          type="text"
          autoComplete="off"
          defaultValue={userData?.addresses[ind]?.city}
          disabled = {!flagEditData &&
            true}
        />
      </div>
      <div>
        <label htmlFor="default-postal-code">Postal code: </label>
        <input
          id="default-postal-code"
          name="default-postal-code"
          type="text"
          autoComplete="off"
          defaultValue= {userData?.addresses[ind]?.postalCode}
          disabled = {!flagEditData &&
            true}
        />
      </div>
      <div>
        <label htmlFor="default-country">Country: </label>
        <input
          id="default-country"
          name="default-country"
          type="text"
          autoComplete="off"
          value={userData?.addresses[ind]?.country + "A"}
          disabled = {!flagEditData &&
            true}
        />
      </div>
    </>
  );
}
