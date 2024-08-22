import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ClientPortalInterface = {
  children: React.ReactNode;
  selector: string;
};
export const ClientPortal: FC<ClientPortalInterface> = ({ children, selector }) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return ref.current ? createPortal(children, ref.current) : null;
};
