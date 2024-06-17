import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { shapeIGDBCoverUrl } from 'src/lib/helpers';

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
    src = shapeIGDBCoverUrl(size, stringId);
  } else {
    src = '/images/undefined.png';
  }
  return <img className={className} src={src} alt={description} />;
}
