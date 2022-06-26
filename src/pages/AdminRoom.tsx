import { useNavigate, useParams } from 'react-router-dom';
// import answerImg from '../assets/images/answer.svg';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import '../styles/room.scss';
import Question from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { useState } from 'react';
import ModalQuestionDelete from '../components/ModalDeleteQuestion';
import ModalCloseRoom from '../components/ModalCloseRoom';
import NoQuestionList from '../components/NoQuestionList';
import IconLine from '../components/IconLine';
import { CheckIcon } from '../components/Check';
import { DeleteIcon } from '../components/Delete';
import { AnswerIcon } from '../components/AnswerIcon';


type RoomParams = {
  id: string;
}

function AdminRoom() {
  const [isConfirmEraseQuestionModalOpen, setConfirmEraseQuestionModalOpen] = useState(false);
  const [isConfirmCloseRoom, setIsConfirmCloseRoom] = useState(false);

  const handleOpenConfirmEraseQuestion = () => {
    setConfirmEraseQuestionModalOpen(true);
  }

  const handleCloseEraseQuestionModal = () => {
    setConfirmEraseQuestionModalOpen(false);
  }

  const handleOpenCloseRoomModal = () => {
    setIsConfirmCloseRoom(true);
  }

  const handleCloseCloseRoomModal = () => {
    setIsConfirmCloseRoom(false);
  }

  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title, setRoomClosed } = useRoom(roomId);

  console.log(questions);

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    })
    // setRoomClosed(true);
    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setConfirmEraseQuestionModalOpen(false);
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
     await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <IconLine size={230} height={82} />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={ handleOpenCloseRoomModal }>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <ModalCloseRoom
        isOpen={ isConfirmCloseRoom }
        onRequestClose={ handleCloseCloseRoomModal }
        onClick={ handleCloseRoom }
      />
      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length === 1 ? 
          (<span>{ questions.length} pergunta</span>) 
          : questions.length >= 2 && (<span>{ questions.length } perguntas</span>) }
        </div>

        <div className="question-list">
          { questions.length > 0 ?( questions.map((question) => (
            <Question
              key={question.id}
              content={ question.content}
              author={ question.author }
              isAnswered={ question.isAnswered }
              isHighlighted={ question.isHighlighted }
            >
              { !question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <CheckIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <AnswerIcon />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={ handleOpenConfirmEraseQuestion }
              >
                <DeleteIcon />
              </button>
               <ModalQuestionDelete  // modal de remoção de pergunta
                  isOpen={ isConfirmEraseQuestionModalOpen }
                  onRequestClose={ handleCloseEraseQuestionModal }
                  onClick={ () => handleDeleteQuestion(question.id)}
                />
            </Question>
          )) ) : (
            <NoQuestionList>
              <h3>Nenhuma pergunta por aqui...</h3>
              <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
            </NoQuestionList>
          )}
        </div>

      </main>
    </div>
  );
}

export default AdminRoom;
