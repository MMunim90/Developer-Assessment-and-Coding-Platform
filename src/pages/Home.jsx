import FeaturedChallenges from "../components/FeaturedChallenges";
import FinalCTA from "../components/FinalCTA";
import HeroBanner from "../components/HeroBanner";
import Leaderboard from "../components/Leaderboard";
import PlatformStats from "../components/PlatformStats";
import ProgrammingContests from "../components/ProgrammingContests";
import WhyDACP from "../components/WhyDACP";

const Home = () => {
  return (
    <div>
      {/* 01. HeroBanner */}
      <HeroBanner />
      {/* 02. PlatformOverview */}

      {/* 03. Platform Statistics */}
      <PlatformStats />

      {/* 04. Coding Challenges */}
      <FeaturedChallenges />

      {/* 05. Programming Contests */}
      <ProgrammingContests />

      {/* 07. Leaderboard */}
      <Leaderboard />

      {/* 08. Why DACP */}
      <WhyDACP />

      {/* 09. Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default Home;
