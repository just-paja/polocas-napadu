import React from "react"

import { describe, it, expect } from '@jest/globals'
import { ArrayList } from "../text.tsx"
import { mount } from "enzyme"

describe("ArrayList component", () => {
	it("renders unordered list", () => {
		const comp = mount(<ArrayList text={["foo", "bar"]} />)
		expect(comp.children().first().name()).toBe("ul")
	})

	it("renders text nodes in list items", () => {
		const comp = mount(<ArrayList text={["foo", "bar"]} />)
		expect(comp.find("li").first()).toIncludeText("foo")
		expect(comp.find("li").last()).toIncludeText("bar")
	})
})
