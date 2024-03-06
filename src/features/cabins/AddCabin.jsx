import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open openWindowName="addNewCabinForm">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="addNewCabinForm">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}
