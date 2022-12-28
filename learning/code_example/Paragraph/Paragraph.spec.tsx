import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react-native';
import React from 'react';
import ParagraphComponent, { ParagraphProps } from './Paragraph.component';
import '@testing-library/jest-native/extend-expect';
import useParagraphController from './Paragraph.controller';

/**
 * First of all write tests for the controller that represents the view logic
 * Secondly you can write tests for the view components
 */
describe('Paragraph controller', () => {
  it('should set click to true', async () => {
    /**
     * Functions that require react hooks have to be called inside the
     * renderHook() function
     */
    const { result } = renderHook(() => useParagraphController());

    expect(result.current.clicked).toBeFalsy();

    /**
     * Action that process through the test should be wrapped with an
     * await act() function. This will guarantee that the following expect statements
     * will be executed after the act function finished.
     */
    await act(() => {
      result.current.buttonPressedHandler();
    });

    expect(result.current.clicked).toBeTruthy();
  });
});

/**
 * Tests view component
 */
describe('Paragraph view', () => {
  const prop: ParagraphProps = {
    title: 'TestTitle',
    body: 'TestBody',
  };

  it('should pass the props properly', async () => {
    // act
    render(<ParagraphComponent title={prop.title} body={prop.body} />);

    // assert
    expect(await screen.findByText(prop.title)).toBeTruthy();
    expect(await screen.findByText(prop.body)).toBeTruthy();
  });

  it('should not render clicked text', async () => {
    render(<ParagraphComponent title={prop.title} body={prop.body} />);

    expect(screen.queryByText('Button clicked')).toBeFalsy();
  });

  it('should render clicked text', async () => {
    render(<ParagraphComponent title={prop.title} body={prop.body} />);

    const button = await screen.getByRole('button', { name: /Click me/ });
    fireEvent.press(button);

    expect(screen.queryByText('Button clicked')).toBeTruthy();
  });

  it('should format the styles', async () => {
    render(<ParagraphComponent title={prop.title} body={prop.body} />);

    expect(await screen.getByText(prop.title)).toHaveStyle({ padding: 10 });
    expect(await screen.getByText(prop.body)).toHaveStyle({ padding: 10 });
  });
});
