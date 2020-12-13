import React from 'react'
import { render, screen } from '@testing-library/react'

import { HelloWorld } from '..'

describe('Hello World', () => {
	it('should print "Hello, world!', () => {
		render(<HelloWorld />)
		expect(screen.getByText(/hello, world!/i)).toBeInTheDocument()
	})
})
