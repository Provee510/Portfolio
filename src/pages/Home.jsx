
import Hero from "../components/home/Hero";
import SelectedWork from "../components/home/SelectedWork";
import AboutPreview from "../components/home/AboutPreview";
import SkillsPreview from "../components/home/SkillsPreview";
import JourneyPreview from "../components/home/JourneyPreview";
import Contact from "../components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <SkillsPreview />
      <JourneyPreview />
      <Contact />
    </>
  );
}
