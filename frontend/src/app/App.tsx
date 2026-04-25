import { useEffect, useState } from "react";
import { AcademicModulePage } from "./AcademicModulePage";
import { FeaturesSection } from "../features/landing/components/FeaturesSection";
import { FinalCtaSection } from "../features/landing/components/FinalCtaSection";
import { Footer } from "../features/landing/components/Footer";
import { HeroSection } from "../features/landing/components/HeroSection";
import { TopNavBar } from "../features/landing/components/TopNavBar";
import { TrustMetricsSection } from "../features/landing/components/TrustMetricsSection";
import { useLandingAnimations } from "../shared/hooks/useLandingAnimations";
import styles from "./App.module.css";

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const isAcademicModulePage = currentPath === "/modulo-academico";

  useLandingAnimations(!isAcademicModulePage);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToAcademicModule = () => {
    if (window.location.pathname !== "/modulo-academico") {
      window.history.pushState({}, "", "/modulo-academico");
      setCurrentPath("/modulo-academico");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToLanding = () => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      setCurrentPath("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.page}>
      <TopNavBar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((value) => !value)}
        onNavigateToAcademicModule={navigateToAcademicModule}
        onNavigateToHome={navigateToLanding}
      />
      {isAcademicModulePage ? (
        <main className={styles.modulesPageMain}>
          <div className={styles.backButtonWrap}>
            <button type="button" className={styles.backButton} onClick={navigateToLanding}>
              Volver a inicio
            </button>
          </div>
          <AcademicModulePage />
        </main>
      ) : (
        <main className="js-main-content">
          <HeroSection onNavigateToAcademicModule={navigateToAcademicModule} />
          <div className="js-section-animate">
            <TrustMetricsSection />
          </div>
          <div className="js-section-animate">
            <FeaturesSection />
          </div>
          <div className="js-section-animate">
            <FinalCtaSection onNavigateToAcademicModule={navigateToAcademicModule} />
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
