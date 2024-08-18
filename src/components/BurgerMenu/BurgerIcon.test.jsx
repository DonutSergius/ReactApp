import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BurgerIcon from './BurgerIcon';

test('changes state and class when clicked', () => {
  const onClickMock = jest.fn();

  const { rerender } = render(<BurgerIcon onClick={onClickMock} isOpen={false} />);
  expect(screen.getByTestId('burger-icon')).not.toHaveClass('open');

  fireEvent.click(screen.getByTestId('burger-icon'));
  expect(onClickMock).toHaveBeenCalledTimes(1);
  rerender(<BurgerIcon onClick={onClickMock} isOpen={true} />);
  
  expect(screen.getByTestId('burger-icon')).toHaveClass('open');
});
