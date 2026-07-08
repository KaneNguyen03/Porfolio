import { useLanguage } from "../contexts/LanguageContext";
import type { PortfolioData } from "../types/portfolio";
import { portfolioDataEn } from "./portfolio.en";
import { portfolioDataVi } from "./portfolio.vi";

export const usePortfolioData = (): PortfolioData => {
	const { language } = useLanguage();
	return language === "vi" ? portfolioDataVi : portfolioDataEn;
};
