import { http, createConfig } from "wagmi";
import { mainnet, holesky } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, holesky],
  connectors: [injected()],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [holesky.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
