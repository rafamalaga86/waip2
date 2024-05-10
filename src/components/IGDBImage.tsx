import React from 'react';

export default function IGDBImage({
  string_id,
  description,
}: {
  string_id: string;
  description: string;
}) {
  const src = `https://images.igdb.com/igdb/image/upload/t_cover_big/${string_id}.webp`;
  return <img src={src} alt={description} />;
}
