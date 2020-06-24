import React from "react";
import { shallow } from "enzyme";

import Text from "./Text";

const defaultProps = {
  classes: {}
};

describe("The Text instance", () => {
  describe("When rendered with default props", () => {
    it("should render a <p /> tag", () => {
      const wrapper = shallow(<Text bold {...defaultProps} />);
      const p = wrapper.find("p");

      expect(p.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when rendered with h1 set to true", () => {
    it("should render a <h1 /> tag", () => {
      const newProps = {
        ...defaultProps,
        h1: true
      };
      const wrapper = shallow(<Text {...newProps} />);
      const h1 = wrapper.find("h1");

      expect(h1.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when rendered with h2 set to true", () => {
    it("should render a <h2 /> tag", () => {
      const newProps = {
        ...defaultProps,
        h2: true
      };
      const wrapper = shallow(<Text {...newProps} />);
      const h2 = wrapper.find("h2");

      expect(h2.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when rendered with h3 set to true", () => {
    it("should render a <h3 /> tag", () => {
      const newProps = {
        ...defaultProps,
        h3: true
      };
      const wrapper = shallow(<Text {...newProps} />);
      const h3 = wrapper.find("h3");

      expect(h3.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when rendered with h4 set to true", () => {
    it("should render a <h4 /> tag", () => {
      const newProps = {
        ...defaultProps,
        h4: true
      };
      const wrapper = shallow(<Text {...newProps} />);
      const h4 = wrapper.find("h4");

      expect(h4.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when rendered with h5 set to true", () => {
    it("should render a <h5 /> tag", () => {
      const newProps = {
        ...defaultProps,
        h5: true
      };
      const wrapper = shallow(<Text {...newProps} />);
      const h5 = wrapper.find("h5");

      expect(h5.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when rendered with caption set to true", () => {
    it("should render a <caption /> tag", () => {
      const newProps = {
        ...defaultProps,
        caption: true
      };
      const wrapper = shallow(<Text {...newProps} />);
      const caption = wrapper.find("span");

      expect(caption.exists()).toBe(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when style overrides are passed", () => {
    it("should add a style attribute to the element with the overrides", () => {
      const newProps = {
        ...defaultProps,
        style: {
          fontSize: 0
        }
      };
      const wrapper = shallow(<Text {...newProps} />);
      const p = wrapper.find("p");

      expect(p.props().style).toEqual(newProps.style);
    });
  });

  describe("when the link prop is passed", () => {
    it("should render an outbound link component", () => {
      const newProps = {
        ...defaultProps,
        link: "test",
        analyticsLabel: "Test"
      };
      const wrapper = shallow(<Text {...newProps} />);
      const link = wrapper.find("OutboundLink");

      expect(link.exists()).toBe(true);
    });
  });
});
