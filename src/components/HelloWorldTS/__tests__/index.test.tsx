import React from 'react'
import { render, screen } from '@testing-library/react'

import { HelloWorldTS } from '..'

describe('Hello World TS', () => {
	it('should print "Hello, world!', () => {
		render(<HelloWorldTS />)
		expect(screen.getByText(/hello, world!/i)).toBeInTheDocument()
	})
})
