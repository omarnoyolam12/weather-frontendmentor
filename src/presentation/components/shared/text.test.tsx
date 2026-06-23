import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Text } from './Text';

describe('Text Component', () => {

    test('should render a text', () => {

        const text = 'Mensaje renderizado'

        const { container } = render(
            <Text fontType='dm-sans' >
                {text}
            </Text>
        );

        const p = container.querySelector('p');
        expect(p?.textContent).toContain(text);
    });

    test('should contain a class', () => {

        const text = 'Mensaje renderizado'
        const font = 'dm-sans'
        const className = font === 'dm-sans' ? 'font-dmsans' : 'font-bricolage';

        const { container } = render(
            <Text fontType='dm-sans' >
                {text}
            </Text>
        );

        const p = container.querySelector('p');
        expect(p?.classList).toContain(className);
    });
});
