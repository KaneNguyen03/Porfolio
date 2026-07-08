import { useLanguage } from "../contexts/LanguageContext";
import { strings } from "./strings";

export const useTranslation = () => {
	const { language } = useLanguage();
	return { t: strings[language], language };
};
