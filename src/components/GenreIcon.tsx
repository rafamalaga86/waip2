import { Card } from '@mui/material';
import { BsFillAirplaneFill } from 'react-icons/bs';
import { FaFistRaised, FaMousePointer } from 'react-icons/fa';
import { FaBook, FaChess, FaDiceD20, FaGun, FaLightbulb, FaMap, FaMusic } from 'react-icons/fa6';
import {
  GiCard5Hearts,
  GiChessKnight,
  GiJumpAcross,
  GiPinballFlipper,
  GiTargeted,
} from 'react-icons/gi';
import { IoCarSportSharp, IoExtensionPuzzleSharp } from 'react-icons/io5';
import { LuSwords } from 'react-icons/lu';
import { MdOutlineSportsVolleyball, MdQuiz, MdSportsMartialArts } from 'react-icons/md';
import { PiStrategyBold } from 'react-icons/pi';
import { SiApplearcade } from 'react-icons/si';

const iconDictionary = [
  { key: 2, element: <FaMousePointer /> },
  { key: 4, element: <MdSportsMartialArts /> },
  { key: 5, element: <FaGun /> },
  { key: 7, element: <FaMusic /> },
  { key: 8, element: <GiJumpAcross /> },
  { key: 9, element: <IoExtensionPuzzleSharp /> },
  { key: 10, element: <IoCarSportSharp /> },
  { key: 11, element: <PiStrategyBold /> },
  { key: 12, element: <FaDiceD20 /> },
  { key: 13, element: <BsFillAirplaneFill /> },
  { key: 14, element: <MdOutlineSportsVolleyball /> },
  { key: 15, element: <FaChess /> },
  { key: 16, element: <GiChessKnight /> },
  { key: 24, element: <GiTargeted /> },
  { key: 25, element: <FaFistRaised /> },
  { key: 26, element: <MdQuiz /> },
  { key: 30, element: <GiPinballFlipper /> },
  { key: 31, element: <FaMap /> },
  { key: 32, element: <FaLightbulb /> },
  { key: 33, element: <SiApplearcade /> },
  { key: 34, element: <FaBook /> },
  { key: 35, element: <GiCard5Hearts /> },
  { key: 36, element: <LuSwords /> },
];

export function GenreIcon({ genreId }: { genreId: number }) {
  const element = iconDictionary.find(item => item.key === genreId)?.element;
  return element;
}
