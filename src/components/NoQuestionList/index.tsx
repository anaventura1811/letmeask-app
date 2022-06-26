import { ReactNode } from 'react';
import '../../styles/room.scss';
import ChatIllustration from '../Chat';

interface NoQuestionListProps {
  children: ReactNode;
}

function NoQuestionList({ children }: NoQuestionListProps) {
  return (
    <div className="container-no-question-list">
      <div className="image-container">
        <ChatIllustration size={230} height={130} />
      </div>
      <div className="no-question-container">
       { children }
      </div>
    </div>
  );
}

export default NoQuestionList;
