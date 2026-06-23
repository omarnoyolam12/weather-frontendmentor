import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { ScreenError } from "./ScreenError";

describe('ScreenError', () => {

    test('should match snapshot', () => {
        const { container } = render(<ScreenError />);
        expect(container).toMatchSnapshot();
    })
});