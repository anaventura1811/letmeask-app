import { createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewRoom from "./pages/NewRoom";
import Home from "./pages/Home";

export const TestContext = createContext('');

function App() {
  return (
    <TestContext.Provider value={'Teste'}>
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/rooms/new" component={ NewRoom } />
      </Switch>
    </TestContext.Provider>
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
