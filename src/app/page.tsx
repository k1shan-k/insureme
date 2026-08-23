import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyInsurance } from "@/components/sections/WhyInsurance";
import { Coverage } from "@/components/sections/Coverage";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RiskIntelligence } from "@/components/sections/RiskIntelligence";
import { Monitoring } from "@/components/sections/Monitoring";
import { ForProtocols } from "@/components/sections/ForProtocols";
import { WhyUs } from "@/components/sections/WhyUs";
import { Transparency } from "@/components/sections/Transparency";
import { Claims } from "@/components/sections/Claims";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyInsurance />
      <Coverage />
      <HowItWorks />
      <RiskIntelligence />
      <Monitoring />
      <ForProtocols />
      <WhyUs />
      <Transparency />
      <Claims />
      <FinalCTA />
    </>
  );
}
