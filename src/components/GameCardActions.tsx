import { CardActions, IconButton } from '@mui/material';
import { FaGamepad } from 'react-icons/fa';
import { IoRemoveCircle } from 'react-icons/io5';
import { MdDownloadDone, MdEdit } from 'react-icons/md';

export function GameCardActions() {
  return (
    <CardActions className='game-card-actions'>
      <IconButton aria-label='delete'>
        <FaGamepad />
      </IconButton>
      <IconButton aria-label='delete'>
        <MdDownloadDone />
      </IconButton>
      <IconButton aria-label='delete'>
        <IoRemoveCircle />
      </IconButton>
      <IconButton aria-label='delete'>
        <MdEdit />
      </IconButton>
    </CardActions>
  );
}
