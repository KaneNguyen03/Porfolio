import type { Certification } from "../types/portfolio";

// Credential metadata is locale-neutral (titles are what the certificate
// says, issuers are proper nouns). Only `summary` is translated, so both
// locale files build their list from this single source.
interface CertificationBase extends Omit<Certification, "summary"> {
	summary: { en: string; vi: string };
}

const CERTIFICATIONS: CertificationBase[] = [
	{
		name: "AWS Certified Solutions Architect – Associate (SAA-C03)",
		issuer: "Amazon Web Services",
		issuerShort: "AWS",
		platform: "Credly",
		type: "certification",
		date: "Nov 2026",
		url: "https://www.credly.com/badges/4169d8df-6e83-41ed-a9c4-9a5246bfc991/public_url",
		skills: ["Cloud Architecture", "EC2 · S3 · RDS", "IAM & Security", "High Availability"],
		featured: true,
		summary: {
			en: "Designing resilient, high-performing, secure and cost-optimised architectures on AWS — the industry-standard associate-level cloud certification.",
			vi: "Thiết kế kiến trúc bền vững, hiệu năng cao, bảo mật và tối ưu chi phí trên AWS — chứng chỉ cloud cấp Associate chuẩn ngành.",
		},
	},
	{
		name: "User Experience Research and Design",
		issuer: "University of Michigan",
		issuerShort: "UM",
		platform: "Coursera",
		type: "specialization",
		date: "Sep 2024",
		url: "https://coursera.org/share/6d0c6bd149e94707df0407a5efbb75d5",
		skills: ["UX Research", "Prototyping", "Usability Testing"],
		summary: {
			en: "User research, prototyping and usability evaluation across a six-course UX specialization.",
			vi: "Nghiên cứu người dùng, tạo prototype và đánh giá khả dụng qua chuỗi 6 khóa học UX.",
		},
	},
	{
		name: "Project Management Principles and Practices",
		issuer: "University of California, Irvine",
		issuerShort: "UCI",
		platform: "Coursera",
		type: "specialization",
		date: "May 2024",
		url: "https://coursera.org/share/0569f6dd8e5edcee9d4ee627e411866e",
		skills: ["Planning", "Scheduling", "Risk Management"],
		summary: {
			en: "Project initiation, planning, scheduling, budgeting and risk management end to end.",
			vi: "Khởi tạo, lập kế hoạch, lên lịch, ngân sách và quản lý rủi ro dự án từ đầu đến cuối.",
		},
	},
	{
		name: "CertNexus Certified Ethical Emerging Technologist",
		issuer: "CertNexus",
		issuerShort: "CN",
		platform: "Coursera",
		type: "professional",
		date: "Sep 2023",
		url: "https://coursera.org/share/be98f1d62eb107c4f865ad339d4757aa",
		skills: ["AI Ethics", "Data Privacy", "Governance"],
		summary: {
			en: "Ethical frameworks, data privacy and governance for AI and emerging technologies.",
			vi: "Khung đạo đức, quyền riêng tư dữ liệu và quản trị cho AI và các công nghệ mới nổi.",
		},
	},
	{
		name: "Software Development Lifecycle",
		issuer: "University of Minnesota",
		issuerShort: "UMN",
		platform: "Coursera",
		type: "specialization",
		date: "Jun 2023",
		url: "https://coursera.org/share/2bcebdac591eeb044059ce7e7334477d",
		skills: ["Agile", "Lean", "SDLC"],
		summary: {
			en: "Agile, Lean and traditional SDLC models, with the engineering practices behind each.",
			vi: "Các mô hình SDLC Agile, Lean và truyền thống cùng các thực hành kỹ thuật đi kèm.",
		},
	},
	{
		name: "Web Design for Everybody: Basics of Web Development & Coding",
		issuer: "University of Michigan",
		issuerShort: "UM",
		platform: "Coursera",
		type: "specialization",
		date: "Feb 2023",
		url: "https://coursera.org/share/5134b435a3c299a729ae377175ae38b8",
		skills: ["HTML5", "CSS3", "JavaScript"],
		summary: {
			en: "HTML5, CSS3 and JavaScript foundations plus responsive, accessible web design.",
			vi: "Nền tảng HTML5, CSS3, JavaScript và thiết kế web responsive, dễ tiếp cận.",
		},
	},
	{
		name: "Computer Communications",
		issuer: "University of Colorado System",
		issuerShort: "CU",
		platform: "Coursera",
		type: "specialization",
		date: "Sep 2022",
		url: "https://coursera.org/share/a5791332f1ba375c300b68485b0fbc49",
		skills: ["TCP/IP", "Networking", "Network Security"],
		summary: {
			en: "TCP/IP, packet switching, network protocols and network security fundamentals.",
			vi: "TCP/IP, chuyển mạch gói, giao thức mạng và các nguyên lý bảo mật mạng.",
		},
	},
];

const localize = (locale: "en" | "vi"): Certification[] =>
	CERTIFICATIONS.map(({ summary, ...cert }) => ({ ...cert, summary: summary[locale] }));

export const certificationsEn = localize("en");
export const certificationsVi = localize("vi");
