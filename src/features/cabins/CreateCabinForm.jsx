import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin, editCabin } from "../../services/cabinsService";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import { add } from "date-fns";

const StyledFormRow = styled.div`
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

function CreateCabinForm({ cabin = {} }) {
  const { id } = cabin;
  const isEdit = !!id;
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { addCabin } = useCreateCabin();

  const onSubmit = (data) => {
    addCabin(data, { onSuccess: (data) => reset() });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          defaultValue={cabin?.name}
          type="text"
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          defaultValue={cabin?.maxCapacity}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "min value is 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          defaultValue={cabin?.regularPrice}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          defaultValue={cabin?.discount}
          id="discount"
          {...register("discount")}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          defaultValue={cabin?.description}
          type="number"
          id="description"
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Image" error={errors?.image?.message}>
        <Input
          defaultValue={cabin?.image}
          type="text"
          id="image"
          {...register("image")}
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{isEdit ? "Edit Cabin" : "Create Cabin"}</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
