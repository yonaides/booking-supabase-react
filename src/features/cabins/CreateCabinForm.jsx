import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow2 from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabins";
import { useEditCabin } from "./useEditCabins";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const idEditSession = Boolean(editId)

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: idEditSession ? editValues : {}
  });
  const { errors } = formState

  const { isCreating, saveCabin } = useCreateCabin();
  const { isEditing, updateCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {

    let image;
    if (data.image)
      image = typeof data.image === 'string' ? data.image : data.image[0];

    if (idEditSession) updateCabin({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: (data) => { reset(); onCloseModal?.(); }
    });
    else
      saveCabin({ ...data, image: image }, {
        onSuccess: (data) => { reset(); onCloseModal?.(); }
      })
  }

  function onError(errors) {

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>

      <FormRow2 label="Cabin name" error={errors?.name?.message} >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required"
          })}
        />

      </FormRow2>


      <FormRow2 label="Maximum capacity" error={errors?.maxCapacity?.message} >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1"
            }
          })}
        />

      </FormRow2>



      <FormRow2 label="Regular price" error={errors?.regularPrice?.message} >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />

      </FormRow2>


      <FormRow2 label="Discount" error={errors?.discount?.message} >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
          })}
        />

      </FormRow2>




      <FormRow2 label="Description for website" error={errors?.discount?.message} >
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })
          }
          defaultValue="" />

      </FormRow2>

      <FormRow2 label="Cabin photo" error={errors?.discount?.message} >
        <FileInput id="image" disabled={isWorking} accept="image/*"
          {...register("image", {
            required: idEditSession ? false : "this field is required"
          })} defaultValue="" />
      </FormRow2>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{idEditSession ? "Edit Cabin" : "Add cabin"}</Button>
      </FormRow2>
    </Form >
  );
}

export default CreateCabinForm;
