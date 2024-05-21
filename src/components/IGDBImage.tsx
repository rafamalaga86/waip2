import React from 'react';

export function IGDBImage({
  string_id,
  description,
  className,
}: {
  string_id?: string | null;
  description: string;
  className: string;
}) {
  let src;
  if (string_id) {
    src = `https://images.igdb.com/igdb/image/upload/t_720p/${string_id}.webp`;
  } else {
    src = '/images/undefined.png';
  }
  return <img className={className} src={src} alt={description} />;
}
