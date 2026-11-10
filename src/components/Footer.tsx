import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../data/portfolio";
import { useTranslation } from "../i18n/useTranslation";
import { fadeUpItem, staggerContainer } from "../lib/motion";
import { NAV_ITEMS } from "../lib/navigation";

const Footer = () => {
	const { personalInfo } = usePortfolioData();
	const { t } = useTranslation();
	const container = staggerContainer(0.06, 0.04);
	const item = fadeUpItem(10);

	// Quick links reuse the shared NAV_ITEMS (path decoupled from the translated
	// label) minus Home, which the footer logo already covers.
	const quickLinks = NAV_ITEMS.filter((navItem) => navItem.path !== "/");

	const contactRows = [
		{ icon: Mail, label: t.contact.emailLabel, value: personalInfo.email, href: `mailto:${personalInfo.email}` },
		{ icon: Phone, label: t.contact.phoneLabel, value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s+/g, "")}` },
		{ icon: MapPin, label: t.contact.locationLabel, value: personalInfo.location },
	];

	const socialLinks = [
		{ icon: Github, url: personalInfo.github, label: "GitHub" },
		{ icon: Linkedin, url: personalInfo.linkedin, label: "LinkedIn" },
	];

	return (
		<footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl text-slate-700 dark:text-slate-300">
			<div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
			<div className="container-width py-14 px-4">
				<motion.div
					variants={container}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
				>
					{/* Contact */}
					<motion.div variants={item} className="lg:col-span-2">
						<h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">{t.footer.getInTouch}</h2>
						<ul className="space-y-3">
							{contactRows.map((row) => (
								<li key={row.label} className="flex items-center gap-3">
									<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-md shadow-indigo-500/20">
										<row.icon size={16} />
									</span>
									{row.href ? (
										<a href={row.href} className="text-sm hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors break-all">
											{row.value}
										</a>
									) : (
										<span className="text-sm">{row.value}</span>
									)}
								</li>
							))}
						</ul>
					</motion.div>

					{/* Quick links */}
					<motion.nav variants={item} aria-label={t.footer.quickLinks}>
						<h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">{t.footer.quickLinks}</h2>
						<ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2.5">
							{quickLinks.map((navItem) => (
								<li key={navItem.path}>
									<Link
										to={navItem.path}
										className="inline-flex items-center text-sm hover:text-indigo-600 dark:hover:text-indigo-300 transition-all hover:translate-x-0.5"
									>
										{t.nav[navItem.key]}
									</Link>
								</li>
							))}
						</ul>
					</motion.nav>

					{/* Social */}
					<motion.div variants={item}>
						<h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">{t.footer.connect}</h2>
						<div className="flex gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${social.label} (${t.common.opensInNewTab})`}
									className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 text-slate-600 dark:text-slate-300 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:border-indigo-700 dark:hover:text-indigo-300"
								>
									<social.icon size={18} />
								</a>
							))}
							<Link
								to="/contact"
								aria-label={t.nav.contact}
								className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-lg"
							>
								<Mail size={18} />
							</Link>
						</div>
						<a
							href={personalInfo.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline"
						>
							LinkedIn <ArrowUpRight size={12} />
							<span className="sr-only"> ({t.common.opensInNewTab})</span>
						</a>
					</motion.div>
				</motion.div>

				<div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
					<p>
						&copy; {new Date().getFullYear()} {personalInfo.name}. {t.footer.allRightsReserved}
					</p>
					<p>
						{t.footer.madeWith} React · Tailwind · Framer Motion
					</p>
				</div>
			</div>
		</footer>
	);
};

export default React.memo(Footer);
