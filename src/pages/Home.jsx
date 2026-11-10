import FeaturedChallenges from "../components/FeaturedChallenges";
import FinalCTA from "../components/FinalCTA";
import HeroBanner from "../components/HeroBanner";
import Leaderboard from "../components/Leaderboard";
import PlatformOverview from "../components/PlatformOverview";
import PlatformStats from "../components/PlatformStats";
import ProgrammingContests from "../components/ProgrammingContests";
import TechnicalAssessments from "../components/TechnicalAssessments";
import WhyDACP from "../components/WhyDACP";

const Home = () => {
  return (
    <div>
      {/* HeroBanner */}
      <HeroBanner />
      {/* PlatformOverview */}
      <PlatformOverview />

      {/* Platform Statistics */}
      <PlatformStats />

      {/* Coding Challenges */}
      <FeaturedChallenges />

      {/* Programming Contests */}
      <ProgrammingContests />

      {/* TechnicalAssessments */}
      <TechnicalAssessments />

      {/* Leaderboard */}
      <Leaderboard />

      {/* Why DACP */}
      <WhyDACP />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default Home;
