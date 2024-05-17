import React from 'react';

export function IGDBImage({ string_id, description }: { string_id?: string; description: string }) {
  let src;
  if (string_id) {
    src = `https://images.igdb.com/igdb/image/upload/t_cover_big/${string_id}.webp`;
  } else {
    src = '/images/undefined.png';
  }
  return <img src={src} alt={description} />;
}
