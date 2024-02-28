import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
    isError,
  } = useSettings();

  const { editSetting, isLoading: isSaving } = useUpdateSettings();

  const updateField = (e, field) => {
    const value = e.target.value;
    const settings = {
      maxBookingLength,
      minBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
      [field]: value,
    };
    editSetting(settings);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => updateField(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => updateField(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => updateField(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => updateField(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
