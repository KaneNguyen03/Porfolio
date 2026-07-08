import type { Language } from "../contexts/LanguageContext";

export interface Strings {
	nav: {
		home: string;
		about: string;
		projects: string;
		experience: string;
		education: string;
		contact: string;
	};
	common: {
		readMore: string;
		viewArchitecture: string;
		liveDemo: string;
		sourceCode: string;
		technologies: string;
		keyContributions: string;
		noDemo: string;
		all: string;
		featured: string;
	};
	home: {
		selectedWork: string;
		selectedWorkSubtitle: string;
		viewAllProjects: string;
		fullExperienceTimeline: string;
		techStackTitle: string;
		techStackSubtitle: string;
		techStackReset: string;
		techStackClusters: { frontend: string; backend: string; infrastructure: string; architecture: string };
		technicalLabTitle: string;
		technicalLabSubtitle: string;
		noPostsWithTag: (tag: string) => string;
	};
	about: {
		title: string;
		sectionSkills: string;
		sectionAwards: string;
		statExperience: string;
		statStack: string;
		statBasedIn: string;
		statRole: string;
		roleValue: string;
		skillCategories: {
			languages: string;
			frontend: string;
			backend: string;
			databases: string;
			environment: string;
			tools: string;
			architecture: string;
		};
	};
	experience: {
		title: string;
		subtitle: string;
		clientsLabel: string;
		yearsCompaniesClients: (years: number | null, companies: number, clients: number) => string;
	};
	projects: {
		title: string;
		subtitle: string;
	};
	education: {
		title: string;
		subtitle: string;
		academicHeading: string;
		certificationsHeading: string;
	};
	contact: {
		title: string;
		subtitle: string;
		formName: string;
		formNamePlaceholder: string;
		formEmail: string;
		formMessage: string;
		formMessagePlaceholder: string;
		sendMessage: string;
		sending: string;
		contactInfoHeading: string;
		referencesHeading: string;
		emailLabel: string;
		phoneLabel: string;
		locationLabel: string;
		successMailto: string;
		successSent: string;
		error: string;
	};
	blog: {
		overview: string;
		architectureOverview: string;
		implementation: string;
		results: string;
		backToLab: string;
		postNotFound: string;
		postNotFoundBody: string;
		backToHome: string;
		allPosts: string;
	};
	footer: {
		getInTouch: string;
		quickLinks: string;
		connect: string;
		madeWith: string;
		and: string;
		allRightsReserved: string;
	};
	seo: {
		defaultDescription: string;
	};
	architectureModal: {
		technologies: string;
		keyContributions: string;
		liveDemo: string;
		sourceCode: string;
	};
	heroSection: {
		openToWork: string;
		viewProjects: string;
		downloadCv: string;
		roles: string[];
	};
}

export const strings: Record<Language, Strings> = {
	en: {
		nav: {
			home: "Home",
			about: "About",
			projects: "Projects",
			experience: "Experience",
			education: "Education",
			contact: "Contact",
		},
		common: {
			readMore: "Read more",
			viewArchitecture: "View Architecture",
			liveDemo: "Live Demo",
			sourceCode: "Source Code",
			technologies: "Technologies",
			keyContributions: "Key Contributions",
			noDemo: "No Demo",
			all: "All",
			featured: "Featured",
		},
		home: {
			selectedWork: "Selected Work",
			selectedWorkSubtitle: "A snapshot across full-stack, frontend, and backend engineering",
			viewAllProjects: "View All Projects",
			fullExperienceTimeline: "Full Experience Timeline",
			techStackTitle: "Tech Stack",
			techStackSubtitle: "Click a cluster to focus — technologies I work with daily",
			techStackReset: "Click active cluster again to reset",
			techStackClusters: {
				frontend: "Frontend",
				backend: "Backend",
				infrastructure: "Infrastructure",
				architecture: "Architecture",
			},
			technicalLabTitle: "Technical Lab",
			technicalLabSubtitle: "Notes, deep dives, and architectural decisions",
			noPostsWithTag: (tag) => `No posts with tag #${tag}`,
		},
		about: {
			title: "About Me",
			sectionSkills: "Professional Skills",
			sectionAwards: "Awards & Recognition",
			statExperience: "Experience",
			statStack: "Stack",
			statBasedIn: "Based in",
			statRole: "Role",
			roleValue: "Fullstack @ Bizzi",
			skillCategories: {
				languages: "Languages",
				frontend: "Frontend",
				backend: "Backend",
				databases: "Databases",
				environment: "Environment",
				tools: "Tools",
				architecture: "Architecture",
			},
		},
		experience: {
			title: "Experience",
			subtitle: "Professional journey and technical impact.",
			clientsLabel: "Clients:",
			yearsCompaniesClients: (years, companies, clients) =>
				`${years}+ years · ${companies} companies · ${clients} enterprise clients`,
		},
		projects: {
			title: "Projects",
			subtitle: "A selection of my work across full-stack and backend development.",
		},
		education: {
			title: "Education",
			subtitle: "Continuous learning and professional growth.",
			academicHeading: "Academic",
			certificationsHeading: "Certifications",
		},
		contact: {
			title: "Get in Touch",
			subtitle: "Let's connect and build something great.",
			formName: "Name",
			formNamePlaceholder: "Your Name",
			formEmail: "Email",
			formMessage: "Message",
			formMessagePlaceholder: "How can I help you?",
			sendMessage: "Send Message",
			sending: "Sending...",
			contactInfoHeading: "Contact Information",
			referencesHeading: "References",
			emailLabel: "Email",
			phoneLabel: "Phone",
			locationLabel: "Location",
			successMailto: "Email client opened!",
			successSent: "Message sent!",
			error: "Failed to send.",
		},
		blog: {
			overview: "Overview",
			architectureOverview: "System Architecture Overview",
			implementation: "Implementation",
			results: "Results",
			backToLab: "Back to Technical Lab",
			postNotFound: "Post not found",
			postNotFoundBody: "The post you're looking for doesn't exist or has been removed.",
			backToHome: "Back to Home",
			allPosts: "All Posts",
		},
		footer: {
			getInTouch: "Get In Touch",
			quickLinks: "Quick Links",
			connect: "Connect",
			madeWith: "Made with",
			and: "and React",
			allRightsReserved: "All rights reserved.",
		},
		seo: {
			defaultDescription:
				"Software Engineer portfolio featuring projects, experience, education, and contact information.",
		},
		architectureModal: {
			technologies: "Technologies",
			keyContributions: "Key Contributions",
			liveDemo: "Live Demo",
			sourceCode: "Source Code",
		},
		heroSection: {
			openToWork: "Open to Work",
			viewProjects: "View Projects",
			downloadCv: "Download CV",
			roles: [
				"Fullstack Engineer",
				"Fintech Automation @ Bizzi",
				"GraphQL & Microservices",
				"IPA Platform Engineer",
			],
		},
	},
	vi: {
		nav: {
			home: "Trang chủ",
			about: "Giới thiệu",
			projects: "Dự án",
			experience: "Kinh nghiệm",
			education: "Học vấn",
			contact: "Liên hệ",
		},
		common: {
			readMore: "Đọc thêm",
			viewArchitecture: "Xem kiến trúc",
			liveDemo: "Bản demo",
			sourceCode: "Mã nguồn",
			technologies: "Công nghệ",
			keyContributions: "Đóng góp chính",
			noDemo: "Không có demo",
			all: "Tất cả",
			featured: "Nổi bật",
		},
		home: {
			selectedWork: "Công Việc Tiêu Biểu",
			selectedWorkSubtitle: "Góc nhìn tổng quan qua các dự án full-stack, frontend và backend",
			viewAllProjects: "Xem Tất Cả Dự Án",
			fullExperienceTimeline: "Xem Toàn Bộ Kinh Nghiệm",
			techStackTitle: "Công Nghệ Sử Dụng",
			techStackSubtitle: "Nhấn vào một nhóm để xem chi tiết — công nghệ tôi làm việc hằng ngày",
			techStackReset: "Nhấn lại nhóm đang chọn để đặt lại",
			techStackClusters: {
				frontend: "Frontend",
				backend: "Backend",
				infrastructure: "Hạ tầng",
				architecture: "Kiến trúc",
			},
			technicalLabTitle: "Technical Lab",
			technicalLabSubtitle: "Ghi chú, phân tích chuyên sâu và các quyết định kiến trúc",
			noPostsWithTag: (tag) => `Không có bài viết nào với thẻ #${tag}`,
		},
		about: {
			title: "Về Tôi",
			sectionSkills: "Kỹ Năng Chuyên Môn",
			sectionAwards: "Giải Thưởng & Ghi Nhận",
			statExperience: "Kinh nghiệm",
			statStack: "Công nghệ",
			statBasedIn: "Nơi làm việc",
			statRole: "Vai trò",
			roleValue: "Fullstack @ Bizzi",
			skillCategories: {
				languages: "Ngôn ngữ",
				frontend: "Frontend",
				backend: "Backend",
				databases: "Cơ sở dữ liệu",
				environment: "Môi trường",
				tools: "Công cụ",
				architecture: "Kiến trúc",
			},
		},
		experience: {
			title: "Kinh Nghiệm",
			subtitle: "Hành trình sự nghiệp và tác động kỹ thuật.",
			clientsLabel: "Khách hàng:",
			yearsCompaniesClients: (years, companies, clients) =>
				`${years}+ năm · ${companies} công ty · ${clients} khách hàng doanh nghiệp`,
		},
		projects: {
			title: "Dự Án",
			subtitle: "Tuyển chọn các dự án full-stack và backend tôi đã thực hiện.",
		},
		education: {
			title: "Học Vấn",
			subtitle: "Học tập liên tục và phát triển chuyên môn.",
			academicHeading: "Học thuật",
			certificationsHeading: "Chứng chỉ",
		},
		contact: {
			title: "Liên Hệ",
			subtitle: "Hãy kết nối và cùng xây dựng điều gì đó tuyệt vời.",
			formName: "Họ tên",
			formNamePlaceholder: "Họ và tên của bạn",
			formEmail: "Email",
			formMessage: "Lời nhắn",
			formMessagePlaceholder: "Tôi có thể giúp gì cho bạn?",
			sendMessage: "Gửi lời nhắn",
			sending: "Đang gửi...",
			contactInfoHeading: "Thông Tin Liên Hệ",
			referencesHeading: "Người Tham Chiếu",
			emailLabel: "Email",
			phoneLabel: "Điện thoại",
			locationLabel: "Địa điểm",
			successMailto: "Đã mở ứng dụng email!",
			successSent: "Đã gửi lời nhắn!",
			error: "Gửi thất bại.",
		},
		blog: {
			overview: "Tổng Quan",
			architectureOverview: "Tổng Quan Kiến Trúc Hệ Thống",
			implementation: "Triển Khai",
			results: "Kết Quả",
			backToLab: "Quay lại Technical Lab",
			postNotFound: "Không tìm thấy bài viết",
			postNotFoundBody: "Bài viết bạn tìm không tồn tại hoặc đã bị gỡ bỏ.",
			backToHome: "Về trang chủ",
			allPosts: "Tất Cả Bài Viết",
		},
		footer: {
			getInTouch: "Liên Hệ",
			quickLinks: "Liên Kết Nhanh",
			connect: "Kết Nối",
			madeWith: "Được tạo với",
			and: "và React",
			allRightsReserved: "Đã đăng ký bản quyền.",
		},
		seo: {
			defaultDescription:
				"Portfolio Kỹ sư Phần mềm giới thiệu dự án, kinh nghiệm, học vấn và thông tin liên hệ.",
		},
		architectureModal: {
			technologies: "Công nghệ",
			keyContributions: "Đóng góp chính",
			liveDemo: "Bản demo",
			sourceCode: "Mã nguồn",
		},
		heroSection: {
			openToWork: "Sẵn Sàng Nhận Việc",
			viewProjects: "Xem Dự Án",
			downloadCv: "Tải CV",
			roles: [
				"Kỹ Sư Fullstack",
				"Tự Động Hóa Fintech @ Bizzi",
				"GraphQL & Microservices",
				"Kỹ Sư Nền Tảng IPA",
			],
		},
	},
};
