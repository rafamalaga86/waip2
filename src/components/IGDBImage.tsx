import React from 'react';

export function IGDBImage({
  stringId,
  description,
  className,
}: {
  stringId?: string | null;
  description: string;
  className?: string;
}) {
  let src;
  if (stringId) {
    src = `https://images.igdb.com/igdb/image/upload/t_720p/${stringId}.webp`;
  } else {
    src = '/images/undefined.png';
  }
  return <img className={className} src={src} alt={description} />;
}
