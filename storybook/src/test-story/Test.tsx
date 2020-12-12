import React, { ButtonHTMLAttributes } from 'react';

export interface TextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * A label to show on the button
     */
    label: string;
}

export const Text = ({ label = 'Hello', ...props }: TextProps) => (
    <button type="button" {...props}>
        {label}
    </button>
);
