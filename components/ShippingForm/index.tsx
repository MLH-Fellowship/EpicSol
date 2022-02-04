//components
import FormInput from "../FormInput";

interface Props {
  onSubmit: () => void;
}

const ShippingForm = ({ onSubmit } : Props) => {
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
        />
        <FormInput 
          label="Last Name"
          name="last_name"
        />
      </div>
      <div className="pr-4 mt-6">
        <FormInput 
          label="Address"
          name="address"
        />
      </div>
      <div className="pr-4 mt-6 w-[50%]">
        <FormInput 
          label="Apt., suite"
          name="apt"
        />
      </div>
      <div
        className="flex flex-row items-center pr-4 mt-6 space-x-4"
      >
        <FormInput 
          label="City, State"
          name="city"
        />
        <FormInput 
          label="Country"
          name="country"
        />
      </div>
      <div className="pr-4 mt-6 w-[50%]">
        <FormInput 
          label="Postal code"
          name="postal"
        />
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={onSubmit}
          className="mx-auto mt-8 bg-appBlue text-appGray2 w-full h-[55px] uppercase tracking-widest rounded text-[12px] font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default ShippingForm;
