import { describe, it, expect } from "bun:test"
import { render, screen } from "@testing-library/react"
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
