import React from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ResumeSection from "./components/ResumeSection";
import ProfileSection from "./components/ProfileSection";
import FlyersSoftSection from "./components/FlyersSoftSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <HeroSection />
        <WorkSection />
        <ProfileSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <FlyersSoftSection />
        <ResumeSection />
        <ContactSection />
        <Footer />

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;