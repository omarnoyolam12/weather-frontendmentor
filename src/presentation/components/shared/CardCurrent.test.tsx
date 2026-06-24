import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { CardCurrent } from "./CardCurrent";

describe('CardCurrent', () => {

    const data = {
        title: '',
        value: '30°'
    }

    test('should render values', () => {
        const { container } = render(<CardCurrent title={data.title} value={data.value} />);

        const paragraphs = container.querySelectorAll('p');

        expect(paragraphs[0].textContent).toBe(data.title);
        expect(paragraphs[1].textContent).toBe(data.value);

    });

    test('should match snapshot', () => {
        const { container } = render(<CardCurrent title={data.title} value={data.value} />);
        expect(container).toMatchSnapshot();
    });
});