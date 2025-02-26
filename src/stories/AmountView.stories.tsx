import { Meta, StoryFn } from "@storybook/react";
import AmountView, { AmountViewProps } from "../components/amount_view";

export default {
  title: "Components/AmountView",
  component: AmountView,
  parameters: {
    docs: {
      description: {
        component:
          "The `currency` prop is the ISO currency code and can be either in lowercase or uppercase.",
      },
    },
  },
} as Meta<AmountViewProps>;

const Template: StoryFn<AmountViewProps> = (args: AmountViewProps) => <AmountView {...args} />;

export const Default = Template.bind({});
Default.args = {
  amount: 1000,
};

export const WithCurrency = Template.bind({});
WithCurrency.args = {
  amount: 1000,
  currency: "usd",
};