import type { StorybookConfig } from "@storybook/react-vite";
import {resolve} from 'node:path'
import tsconfigPaths from "vite-tsconfig-paths";
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},

  },
  viteFinal:(config)=>{
    config.plugins?.push(tsconfigPaths({root:resolve(__dirname, '..')}))
    return config
}
};
export default config;
