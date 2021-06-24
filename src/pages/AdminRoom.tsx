import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import '../styles/room.scss';
import Question from '../components/Question';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
  id: string;
}

function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, title } = useRoom(roomId)

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      // throw new Error('You must be logged in'); // adicionar toast de erro
      toast.error('Sorry, you must be logged in 😬', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    const question = {
      content: newQuestion,
      author: { 
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask app" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length === 1 ? 
          (<span>{ questions.length} pergunta</span>) 
          : questions.length >= 2 && (<span>{ questions.length } perguntas</span>) }
        </div>

        <div className="question-list">
          { questions.map((question) => (
            <Question
              key={question.id}
              content={ question.content}
              author={ question.author }
            />
          )) }
        </div>

      </main>
    </div>
  );
}

export default AdminRoom;
