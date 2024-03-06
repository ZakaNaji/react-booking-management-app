import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FaRegWindowClose } from "react-icons/fa";
import { createPortal } from "react-dom";
import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openWindowName, setOpenWindowName] = useState("");
  const openWindow = setOpenWindowName;
  const closeWindow = () => setOpenWindowName("");

  return (
    <ModalContext.Provider value={{ openWindow, closeWindow, openWindowName }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.Open = function Open({ openWindowName, children }) {
  const { openWindow } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => openWindow(openWindowName) });
};
Modal.Window = function Window({ name, children }) {
  const { openWindowName, closeWindow } = useContext(ModalContext);

  const ref = useClickOutside(closeWindow);

  if (openWindowName !== name) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => closeWindow()}>
          <FaRegWindowClose />
        </Button>
        <div>{cloneElement(children, { onCloseModal: closeWindow })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};
