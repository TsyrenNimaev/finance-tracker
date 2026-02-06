import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hoverable?: boolean;
  className?: string;
}

export const Card = ({
  children,
  padding = 'medium',
  hoverable = false,
  className = '',
}: CardProps) => {
  const cardClasses = [
    styles.card,
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    className,
  ]
    .join(' ')
    .trim();

  return <div className={cardClasses}>{children}</div>;
};
