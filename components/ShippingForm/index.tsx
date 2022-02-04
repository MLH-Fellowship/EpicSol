import { useState } from "react";
import { useSession } from "next-auth/react";

//components
import FormInput from "../FormInput";

interface Props {
  onSubmit: (form) => void;
}

const ShippingForm = ({ onSubmit } : Props) => {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [suite, setSuite] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postal, setPostal] = useState<string>("");

  const generateForm = () => (
    {firstName, lastName, address, suite, city, 
      country, postalCode: postal, email: session.user.email}
  )

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className="flex flex-row items-center pr-4 mt-4 space-x-4"
      >
        <FormInput 
          label="First Name"
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput 
          label="Last Name"
          name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="pr-4 mt-6">
        <FormInput 
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="pr-4 mt-6 w-[50%]">
        <FormInput 
          label="Apt., suite"
          name="apt"
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
        />
      </div>
      <div
        className="flex flex-row items-center pr-4 mt-6 space-x-4"
      >
        <FormInput 
          label="City, State"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormInput 
          label="Country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="pr-4 mt-6 w-[50%]">
        <FormInput 
          label="Postal code"
          name="postal"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={() => onSubmit(generateForm())}
          className="mx-auto mt-8 bg-appBlue text-appGray2 w-full h-[55px] uppercase tracking-widest rounded text-[12px] font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default ShippingForm;
