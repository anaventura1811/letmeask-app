import { ReactNode } from 'react';
import '../../styles/room.scss';
import ilustrationImg from '../../assets/images/IlustrationRoom.svg';

interface NoQuestionListProps {
  children: ReactNode;
}

function NoQuestionList({ children }: NoQuestionListProps) {
  return (
    <div className="container-no-question-list">
      <div className="image-container">
        <img src={ ilustrationImg } alt="Imagem conversas" />
      </div>
      <div className="no-question-container">
       { children }
      </div>
    </div>
  );
}

export default NoQuestionList;
