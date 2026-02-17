import { useEffect, useState } from 'react';
import { Button } from '../Button';
import styles from './UpdatePrompt.module.scss';

export const UpdatePrompt = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                setWaitingWorker(newWorker);
                setShow(true);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.updatePrompt}>
      <span>Доступна новая версия приложения</span>
      <Button onClick={handleUpdate} size='small'>
        Обновить
      </Button>
    </div>
  );
};
