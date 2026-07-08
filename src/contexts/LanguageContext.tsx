import {
	createContext,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";

export type Language = "en" | "vi";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

let localStorageAvailable: boolean | null = null;

const canUseLocalStorage = (): boolean => {
	if (typeof window === "undefined") return false;
	if (localStorageAvailable !== null) return localStorageAvailable;

	try {
		const testKey = "__portfolio_language_test__";
		window.localStorage.setItem(testKey, "1");
		window.localStorage.removeItem(testKey);
		localStorageAvailable = true;
	} catch {
		localStorageAvailable = false;
	}

	return localStorageAvailable;
};

const readStoredLanguage = (): Language | null => {
	if (!canUseLocalStorage()) return null;
	try {
		const savedLanguage = window.localStorage.getItem("language");
		if (savedLanguage === "en" || savedLanguage === "vi") return savedLanguage;
		return null;
	} catch {
		localStorageAvailable = false;
		return null;
	}
};

const writeStoredLanguage = (language: Language) => {
	if (!canUseLocalStorage()) return;
	try {
		window.localStorage.setItem("language", language);
	} catch {
		localStorageAvailable = false;
	}
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [language, setLanguageState] = useState<Language>(() => {
		if (typeof window !== "undefined") {
			const storedLanguage = readStoredLanguage();
			if (storedLanguage) return storedLanguage;
		}
		// Default to English for first-time visitors — no navigator.language
		// or matchMedia fallback, per explicit product decision.
		return "en";
	});

	useLayoutEffect(() => {
		document.documentElement.lang = language;
		writeStoredLanguage(language);
	}, [language]);

	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang);
	}, []);

	const toggleLanguage = useCallback(() => {
		setLanguageState((prev) => (prev === "en" ? "vi" : "en"));
	}, []);

	const value = useMemo(
		() => ({ language, setLanguage, toggleLanguage }),
		[language, setLanguage, toggleLanguage],
	);

	return (
		<LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
};
