import { Link } from 'react-router-dom';
import { AiFillGift } from 'react-icons/ai';
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AiOutlineSave, AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
function GiftListItem({ gift }) {
  function deleteGift() {
    console.log(`delete gift id = ${gift._id}`);
  }

  const { uid, giftId } = useParams();
  if (!gift) {
    return null;
  }

  return (
    <div>
      <p>
        {gift.name} - {gift.url} - {gift.store}
      </p>
      <div>
        <Link to={`/people/${uid}/gifts/${gift._id}/edit`}>
          <button>
            <EditIcon />
          </button>
        </Link>
        <button onClick={deleteGift}>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}
export default GiftListItem;
