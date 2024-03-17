import {
  useRef,
  useCallback,
  useMemo,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { overlay, flexContainer } from '../navigation/useModal.css';

/**
 * A hook for creating and managing modals.
 * @param onOpen - A callback to run when the modal is opened.
 * @param onClose - A callback to run when the modal is closed.
 * @param closeOnClickOutside - Whether the modal should close when the user clicks the overlay surrounding the contents.
 * @returns An object containing the Modal component and functions to open and close the modal.
 * @example
 * ```tsx
 * function MyComponent() {
 *    const { Modal, open, close } = useModal({
 *      onOpen: () => console.log('Modal opened'),
 *      onClose: () => console.log('Modal closed'),
 *    });
 *
 *   return (
 *     <>
 *       <button onClick={open}>Open modal</button>
 *       <Modal>
 *         <h1>Modal contents</h1>
 *         <button onClick={close}>Close modal</button>
 *       </Modal>
 *     </>
 *   );
 * });
 */
export default function useModal({
  onOpen,
  onClose,
  closeOnClickOutside = true,
}: {
  closeOnClickOutside?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}) {
  const overlayElement = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    onClose?.();
    overlayElement.current?.setAttribute('hidden', '');
  }, [onClose]);

  const open = useCallback(() => {
    onOpen?.();
    overlayElement.current?.removeAttribute('hidden');
  }, [onOpen]);

  const handleClickOutside = useCallback(() => {
    if (closeOnClickOutside) close();
  }, [closeOnClickOutside, close]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        // TODO: Figure out why eslint is not recognizing `document` as a global here
        // eslint-disable-next-line no-undef -- `document` is defined in the browser
        const { activeElement } = document;

        /** @see https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b */
        const focusable = overlayElement.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const lastTabStop = (focusable?.item(focusable.length - 1) ??
          overlayElement.current) as HTMLElement | HTMLButtonElement | null;

        if (event.shiftKey && activeElement === overlayElement.current) {
          // tabbing backwards from the overlay should focus the last tab stop
          event.preventDefault();
          lastTabStop?.focus();
        } else if (activeElement === lastTabStop) {
          // tabbing forwards from the last tab stop should focus the overlay
          event.preventDefault();
          overlayElement.current?.focus();
        }
      }
    },
    [close],
  );

  const Modal = useMemo(
    () =>
      // eslint-disable-next-line func-names
      function ({ children }: { children: ReactNode }) {
        return (
          <button
            hidden
            ref={overlayElement}
            onClick={handleClickOutside}
            onKeyDown={handleKeyDown}
            className={overlay}
            type="button"
            aria-label="Close modal"
          >
            <div className={flexContainer}>
              {/* eslint-disable-next-line
                jsx-a11y/click-events-have-key-events,
                jsx-a11y/no-noninteractive-element-interactions
                --
                We aren't adding interactivity, but in fact, removing it from
                the modal contents by preventing the click event from bubbling
                up to the overlay. This is to prevent the modal from closing
                when the user interacts with the modal contents.
            */}
              <div
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                {children}
              </div>
            </div>
          </button>
        );
      },
    [handleKeyDown, handleClickOutside],
  );

  return { Modal, close, open };
}
