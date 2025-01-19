import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "bun:test"

import Header from "./Header"

describe("Header", () => {
  it("should render app name", () => {
    const title = "Budget"
    render(<Header title={title} />)

    const heading = screen.getByRole("heading")
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(title)
  })
})
