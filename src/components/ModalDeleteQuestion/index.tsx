import React from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import { IconContext } from "react-icons";
import { AiOutlineDelete } from 'react-icons/ai';
import './modalDeleteQuestion.scss';

interface ModalQuestionDeleteProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onClick: () => void;
}

function ModalQuestionDelete({ isOpen, onRequestClose, onClick }: ModalQuestionDeleteProps) {
  return (
    <Modal  // modal de remoção de pergunta
        isOpen={ isOpen }
        onRequestClose={ onRequestClose }
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
          <div className="main-container">
            <div className="container-img">
              <IconContext.Provider value={{ color: "#e73f5d", size: "2.5rem" }}>
                <AiOutlineDelete />
              </IconContext.Provider>
            </div>
            <h2>Deletar pergunta</h2>
            <p>Tem certeza de que você deseja excluir esta pergunta?</p>
            <div className="container">
              <Button id="cancel-btn" onClick={ onRequestClose } >
                Cancelar
              </Button>
              <Button id="confirm-btn" onClick={ onClick }>
                Sim, excluir
              </Button>
            </div>

          </div>
    </Modal>
  );
}

export default ModalQuestionDelete;
