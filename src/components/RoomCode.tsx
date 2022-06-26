// import copyImg from '../assets/images/copy.svg';
import { useState } from 'react';
import '../styles/room-code.scss';
import { CheckIcon } from './Check';
import { CopyIcon } from './Copy';

type RoomCodeProps = {
  code: string | any;
}

function RoomCode(props: RoomCodeProps) {

  const [isCopied, setIsCopied] = useState(false);

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3500)
  }

  return (
    <button className="room-code" disabled={isCopied} onClick={ copyRoomCodeToClipboard }>
      <div>
        {isCopied ? <CheckIcon stroke='#F8F8F8' /> : <CopyIcon />}
        
      </div>
      <>
        {isCopied ? (<span>Código copiado</span>) : (<span>Sala #{props.code}</span>) }
      </>
    </button>
  )
}

export default RoomCode;
