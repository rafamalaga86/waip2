import { Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function GameCard({
  game,
  imgElement,
  index,
  children,
}: {
  game: { id: number; name: string };
  imgElement: ReactNode;
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        layout: { duration: 0.35, ease: 'easeOut' },
      }}
    >
      <Card className="game-card" component="div">
        {imgElement}
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
