import React from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import './modalCloseRoom.scss';
import { IconContext } from "react-icons";
import { RiCloseCircleLine } from 'react-icons/ri';

interface ModalCloseRoomProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick: () => void;
}


function ModalCloseRoom({ isOpen, onRequestClose, onClick }: ModalCloseRoomProps) {
  return (
    <Modal
      isOpen={ isOpen }
      onRequestClose={ onRequestClose }
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="main-container">
        <div className="container-img">
          <IconContext.Provider value={{ color: "#e73f5d", size: "2.5rem" }}>
            <RiCloseCircleLine />
          </IconContext.Provider>
        </div>
        <h2>Encerrar sala</h2>
        <p>Tem certeza de que deseja encerrar esta sala?</p>
        <div className="container">
          <Button id="cancel-btn" onClick={ onRequestClose } >
            Cancelar
          </Button>
          <Button id="confirm-btn" onClick={ onClick } >
            Sim, encerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCloseRoom;
