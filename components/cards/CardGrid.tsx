import { Masonry } from 'masonic';
import React from 'react';
import Card from './Card';

interface CardProps {
  front: React.ReactElement;
  back: React.ReactElement;
  isExpanded: boolean;
  onClick: (height: number) => void;
}

interface CardGridProps {
  cards: CardProps[];
}

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '90%', // This value can be adjusted to your needs
      margin: '0 auto' // This ensures horizontal centering
    }}>
      <Masonry
        items={cards}
        columnGutter={10} // space between columns
        columnWidth={150} // width of each column
        overscanBy={2} // number of items to render outside of the current scroll area
        render={({ data }) => (
          <Card
            front={data.front}
            back={data.back}
            isExpanded={data.isExpanded}
            onClick={data.onClick}
          />
        )}
      />
    </div>
  );
}
