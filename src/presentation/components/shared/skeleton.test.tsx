import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { SkeletonLayout } from "./SkeletonLayout";

describe('Skeleton', () => {
    test('should match snapshot', () => {
        const { container } = render(<SkeletonLayout />);
        expect(container).toMatchSnapshot();
    });
});