import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

function RoomCode() {
  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #-Mcqh8QjEDB3NUYRS6BW</span>
    </button>
  )
}

export default RoomCode;
