import styled from "styled-components";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow2 from "../../ui/FormRow2";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();

    },
    onError: (err) => toast.error(err.message),

  });


  function onSubmit(data) {

    mutate({ ...data, image: data.image[0] })
  }

  function onError(errors) {

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow2 label="Cabin name" error={errors?.name?.message} >
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required"
          })}
        />

      </FormRow2>


      <FormRow2 label="Maximum capacity" error={errors?.maxCapacity?.message} >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1"
            }
          })}
        />

      </FormRow2>

      {/*
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "Name is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1"
            }
          })} />
      </FormRow>*/
      }



      <FormRow2 label="Regular price" error={errors?.regularPrice?.message} >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />

      </FormRow2>

      {/*
      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required"
          })} />
      </FormRow>
*/}



      <FormRow2 label="Discount" error={errors?.discount?.message} >
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
          })}
        />

      </FormRow2>


      {
/*      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number"
          id="discount"
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price'
          })}
          defaultValue={0} />
      </FormRow>*/}



      <FormRow2 label="Description for website" error={errors?.discount?.message} >
        <Textarea
          id="description"
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })
          }
          defaultValue="" />

      </FormRow2>

      {/*
      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })
          }
          defaultValue="" />
        </FormRow>*/}


      <FormRow2 label="Cabin photo" error={errors?.discount?.message} >

        <FileInput id="image" disabled={isCreating} accept="image/*"
          {...register("image")} defaultValue="" />

      </FormRow2>


      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow2>
    </Form >
  );
}

export default CreateCabinForm;
