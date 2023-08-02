// Grid.tsx
import { ReactNode } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface GridProps {
  children: ReactNode[];
}

export default function Grid({ children }: GridProps) {
  // Generate layout
  const generateLayout = () => {
    let layout: { x: number; y: number; w: number; h: number; i: string }[] = [];

    for (let i = 0; i < children.length; i++) {
      const layoutItem = {
        x: i % 2 * 2,
        y: Math.floor(i / 2) * 2,
        w: 2,
        h: 2,
        i: i.toString(),
      };
      layout.push(layoutItem);
    }
    return layout;
  };

  const layout = generateLayout();

  return (
    <ResponsiveReactGridLayout
      className="layout"
      layouts={{ lg: layout }}
      cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 1 }}
      rowHeight={100}
      width={1200}
    >
      {children.map((child, index) => (
        <div key={index} style={{ padding: '1rem' }}>
          {child}
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
}
