import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/scandi-17.png';
import '../styles/auth.scss';
import Button from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/Icon';

function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Falta recuperar o estado da aplicação p/ conseguir recuperar estado de autenticação, persistência de dados
  const [newRoom, setNewRoom] = useState('');
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    // console.log(newRoom);
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms'); // 1 array

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/admin/rooms/${firebaseRoom.key}`)

  }

 return (
    <div id="page-auth"> 
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <Logo />
          {/* <img src={logoImg} alt="Letmeask" /> */}
          <h2>Criar uma nova sala</h2>
          <form onSubmit={ handleCreateRoom }>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={ newRoom }
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}


export default NewRoom;
