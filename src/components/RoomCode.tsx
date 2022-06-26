// import copyImg from '../assets/images/copy.svg';
import { useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import '../styles/room-code.scss';
import { CheckIcon } from './Check';
import { CopyIcon } from './Copy';
import { toast } from 'react-toastify';

type RoomCodeProps = {
  code: string | any;
}

function RoomCode(props: RoomCodeProps) {

  const [isCopied, setIsCopied] = useState(false);
  const windowSize = useWindowSize();
  const mobile = windowSize.innerWidth <= 839;

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3500)
  }

  const sendToast = () => {
    toast.info( `Código de sala copiado com sucesso!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
    return;
  }

  if (mobile) {

    return (
      <button className='button-mob' type='button' disabled={isCopied} onClick={() => { copyRoomCodeToClipboard(); sendToast()}}>
        {
          isCopied ? (
            <CheckIcon stroke='#29292e' />)
            : (<CopyIcon stroke='#29292e' />)
        }
      </button>
    )
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
