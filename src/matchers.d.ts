/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@testing-library/jest-dom"

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"

declare module "bun:test" {
  interface Matchers<R = void>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
