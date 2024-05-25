import { CoverSize } from 'src/enums/gameEnums';

export function IGDBImage({
  stringId,
  description,
  className,
  size = CoverSize.big,
}: {
  stringId?: string | null;
  description: string;
  className?: string;
  size?: CoverSize;
}) {
  let src;
  if (stringId) {
    src = `https://images.igdb.com/igdb/image/upload/t_${size}/${stringId}.webp`;
  } else {
    src = '/images/undefined.png';
  }
  return <img className={className} src={src} alt={description} />;
}
