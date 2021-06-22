import { createContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewRoom from "./pages/NewRoom";
import Home from "./pages/Home";
import firebase from 'firebase/app';
import { auth } from './services/firebase';

type AuthContextType = {
  user: object;
  signInWithGoogle: () => void;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState({} as User);

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL ) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/rooms/new" component={ NewRoom } />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;

// Fast refresh  - React - permite que a aplicação tenha sua interface atualizada,
// sem necessidade de reload contínuo do usuário
// Componentes = partes isoladas de código que, uma vez juntas, compõem a aplicação
// Componente no React = função que devolve um HTML
// Novas APIs do React só funcionam em componentes funcionais, isto é, em componentes feitos com funções 
// e não com classes
// Propriedades - React: informações ou atributos que passamos aos componentes para que
// eles possam se comportar de maneira diferente
// --> diferença entre export default and named export
