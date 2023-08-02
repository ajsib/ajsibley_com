Card Component: Each card will be a self-contained component. The Card component will receive its data through props. This could include a title, description, image, etc. This data will be used to render the card's contents. If the card needs to make its own HTTP requests (like loading more detailed data when it's clicked), those requests can be triggered by useEffects within the Card component that depend on its props.

Grid Component: The Grid component will contain the logic for fetching the list of cards from your HTTP API. It will keep track of the current list of cards in its state (using React's useState). When the Grid component mounts, it will make an HTTP request to your API to fetch the initial list of cards. The Grid component will pass the necessary data down to each Card component through props.

Here's how the implementation of these components might look:

```tsx

// Card.tsx
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  image: string;
  // ...any other props that a card needs
}

export default function Card({ title, description, image }: CardProps) {
  // ...render the card using the passed-in props
}
```
```tsx

// Grid.tsx
import { useState, useEffect } from 'react';
import Card from './Card';

export default function Grid() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Replace this with your actual API call
    fetch('/api/cards')
      .then(response => response.json())
      .then(data => setCards(data));
  }, []);

  return (
    <div>
      {cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
```
For infinite scrolling, you could use a library like react-infinite-scroll-component or implement it yourself using Intersection Observer API. When you reach the end of the scroll, you would trigger a function to load more cards from your API and add them to your current list.

Also, please note that in a real-world application, you would want to handle errors from your API calls and potentially add loading states while data is being fetched.