import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { IoEnterOutline } from "react-icons/io5";
import { IconContext } from "react-icons";



function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
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
          <img src={logoImg} alt="Letmeask" />
          <button type="button" onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <IconContext.Provider value={{ className: "react-icons", color: "#fff",  style: { verticalAlign: 'middle', marginRight: "10px" }}}>
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
