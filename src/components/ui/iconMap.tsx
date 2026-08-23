import {
  IconSmartContract,
  IconExploit,
  IconBridge,
  IconDepeg,
  IconTreasury,
  IconCustom,
  IconUnderwriting,
  IconExpertise,
  IconData,
  IconPolicy,
} from "./Icons";

const map: Record<string, (p: { className?: string }) => JSX.Element> = {
  "smart-contract": IconSmartContract,
  exploit: IconExploit,
  bridge: IconBridge,
  depeg: IconDepeg,
  treasury: IconTreasury,
  custom: IconCustom,
  underwriting: IconUnderwriting,
  expertise: IconExpertise,
  data: IconData,
  policy: IconPolicy,
};

export function renderIcon(key: string, className?: string) {
  const Cmp = map[key];
  return Cmp ? <Cmp className={className} /> : null;
}
