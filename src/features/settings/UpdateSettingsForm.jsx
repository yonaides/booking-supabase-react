import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner";
import { useSetting } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';


function UpdateSettingsForm() {
  const { isLoading, settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  } = {}
  } = useSetting();

  const { isUpdate, updateSetting } = useUpdateSetting();

  function handlerUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });


  }

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdate} defaultValue={minBookingLength} onBlur={e => handlerUpdate(e, 'minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdate} defaultValue={maxBookingLength} onBlur={e => handlerUpdate(e, 'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdate} defaultValue={maxGuestsPerBooking} onBlur={e => handlerUpdate(e, 'maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdate} defaultValue={breakfastPrice} onBlur={e => handlerUpdate(e, 'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
