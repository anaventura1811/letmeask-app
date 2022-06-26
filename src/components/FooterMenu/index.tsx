import { House, XCircle } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RoomCode from '../RoomCode';
import './footerMenu.scss';
import { useState } from 'react';


interface FooterMenuProps {
  handleOpenCloseRoomModal?: () => void;
  roomId: string | any;
}

export function FooterMenu({ roomId, handleOpenCloseRoomModal }: FooterMenuProps) {
  const [visbile, setVisibile] = useState(false);



  return (
    <footer>
      <span>
        <RoomCode code={roomId} />
      </span>
      {handleOpenCloseRoomModal && <XCircle onClick={handleOpenCloseRoomModal} size={32}  />}
      

    </footer>
  )
}
