import { useState } from 'react';

/**
 * Place here code logic for the view component.
 * E.g. click/press handlers
 *
 * Pass persistent actions to the view model
 */
const useParagraphController = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const buttonPressedHandler = () => {
    setClicked(true);
  };

  return {
    buttonPressedHandler,
    clicked
  };
};

export default useParagraphController;
