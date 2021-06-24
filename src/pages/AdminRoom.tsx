import { useParams } from 'react-router-dom';
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
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId)

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
