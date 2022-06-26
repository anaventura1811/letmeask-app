import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { database } from '../services/firebase';
import illustrationImg from '../assets/images/scandi-17.png';
import '../styles/auth.scss';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { IoEnterOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import Icon from '../components/Icon';
import { GoogleIcon } from '../components/Google';



function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Sorry, this room does not exist 😬', {
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

    if (roomRef.val().closedAt) {
      toast.dark('Time is up! 😬 Room already closed.', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }


  return (
    <div id="page-auth"> 
      <aside>
        <img src={illustrationImg} alt="Ilustração de uma abelha feliz" />
        <strong>Dê um buzz no seu evento</strong>
        <p>Crie salas de Q&amp;A ao vivo e tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          
          <Icon size={220} />
          <button type="button" onClick={handleCreateRoom} className="create-room">
            {/* <img src={googleIconImg} alt="Logo do Google" /> */}
            <GoogleIcon />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={ handleJoinRoom }>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={ roomCode }
            />
            <IconContext.Provider value={{ 
                className: "react-icons",
                color: "#fff",
                style: { verticalAlign: 'middle', marginRight: "10px" }}}
            >
              <Button type="submit">
                <IoEnterOutline size={20} />
                Entrar na sala
              </Button>
            </IconContext.Provider>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home;

// Criar a estrutura primeiro, depois fazer a estilização
// funcionamento do webpack - todas as importações utilizando o JS no React
// Contexto permite compartilhamento de informações entre as partes da aplicação
// Link para documentação do react-icons: https://github.com/react-icons/react-icons
// https://react-icons.github.io/react-icons/
// emojis retirados de: https://getemoji.com/
