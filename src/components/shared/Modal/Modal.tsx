import { ReactNode, useEffect } from 'react'
import './Modal.scss'

interface ModalProps {
  toggleModal: () => void;
  children: ReactNode;
  isOpen: boolean;
}

export default function Modal({ toggleModal, children }: ModalProps) {
  ``
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.className === 'Modal') {
        toggleModal();
      }
    }
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [toggleModal])

  return (
    <div className='Modal'>
      {children}
    </div>
  )
}
