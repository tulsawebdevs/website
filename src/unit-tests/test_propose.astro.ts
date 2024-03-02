
import { render, screen, fireEvent } from '@testing-library/astro';
import { it, expect } from 'vitest';
import ProposePage from '../pages/propose.astro';

test('renders ProposePage', async () => {
  render(<ProposePage />);

  // Assert that the page title is rendered correctly
  const pageTitle = screen.getByText('Tulsa Web Devs');
  expect(pageTitle).toBeInTheDocument();

  // Assert that the form inputs are rendered correctly
  const nameInput = screen.getByLabelText('Name:');
  expect(nameInput).toBeInTheDocument();

  const emailInput = screen.getByLabelText('Email:');
  expect(emailInput).toBeInTheDocument();

  const topicInput = screen.getByLabelText('Topic:');
  expect(topicInput).toBeInTheDocument();

  const summaryInput = screen.getByLabelText('Summary:');
  expect(summaryInput).toBeInTheDocument();

  // Assert that the checkboxes are rendered correctly
  const projectCheckbox = screen.getByLabelText('Project!');
  expect(projectCheckbox).toBeInTheDocument();

  const talkCheckbox = screen.getByLabelText('Talk!');
  expect(talkCheckbox).toBeInTheDocument();

  const labCheckbox = screen.getByLabelText('Lab!');
  expect(labCheckbox).toBeInTheDocument();

  // Assert that the submit button is rendered correctly
  const submitButton = screen.getByRole('button', { name: 'Submit!' });
  expect(submitButton).toBeInTheDocument();
});

test('submits form', async () => {
  render(<ProposePage />);

  // Fill out the form inputs
  const nameInput = screen.getByLabelText('Name:');
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });

  const emailInput = screen.getByLabelText('Email:');
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

  const topicInput = screen.getByLabelText('Topic:');
  fireEvent.change(topicInput, { target: { value: 'My Topic' } });

  const summaryInput = screen.getByLabelText('Summary:');
  fireEvent.change(summaryInput, {
    target: { value: 'This is my topic summary' },
  });

  // Select checkboxes
  const projectCheckbox = screen.getByLabelText('Project!');
  fireEvent.click(projectCheckbox);

  const talkCheckbox = screen.getByLabelText('Talk!');
  fireEvent.click(talkCheckbox);

  // Submit the form
  const submitButton = screen.getByRole('button', { name: 'Submit!' });
  fireEvent.click(submitButton);

  // Assert that the form is submitted successfully
  // Add your assertions here
});
---
