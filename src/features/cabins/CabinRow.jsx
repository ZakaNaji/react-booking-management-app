import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/cabinsService";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { IoCreateOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { IoDuplicateOutline } from "react-icons/io5";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, name, description, maxCapacity, regularPrice, discount, image } =
    cabin;
  const { addCabin } = useCreateCabin();
  const copyCabin = () => {
    addCabin({ ...cabin, name: "Copy of - " + cabin.name });
  };

  const { isLoading: isDeleting, mutate: deleteRow } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Error deleting cabin");
    },
  });

  const queryClient = useQueryClient();
  return (
    <Table.Row>
      <Img src={image} alt={name} role="img" />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Modal.Open openWindowName="editCabin">
            <button>
              <IoCreateOutline />
            </button>
          </Modal.Open>
          <Modal.Window name="editCabin">
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open openWindowName="deleteCabin">
            <button disabled={isDeleting}>
              <MdDeleteOutline />
            </button>
          </Modal.Open>
          <Modal.Window name="deleteCabin">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteRow(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <button onClick={() => copyCabin()}>
          <IoDuplicateOutline />
        </button>
      </div>
    </Table.Row>
  );
}
