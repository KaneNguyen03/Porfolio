import type { Language } from "../contexts/LanguageContext";

export interface Strings {
	nav: {
		home: string;
		about: string;
		projects: string;
		experience: string;
		education: string;
		blog: string;
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
		opensInNewTab: string;
		openMenu: string;
		switchToDark: string;
		switchToLight: string;
		playVideo: (title: string) => string;
		close: string;
		subject: string;
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
		credentialsEyebrow: string;
		credentialsTitle: string;
		credentialsSubtitle: string;
		viewAllCredentials: string;
		ctaEyebrow: string;
		ctaTitle: string;
		ctaBody: string;
		ctaPrimary: string;
		ctaSecondary: string;
	};
	about: {
		eyebrow: string;
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
		eyebrow: string;
		title: string;
		subtitle: string;
		clientsLabel: string;
		yearsCompaniesClients: (years: number | null, companies: number, clients: number) => string;
	};
	projects: {
		eyebrow: string;
		title: string;
		subtitle: string;
	};
	education: {
		eyebrow: string;
		title: string;
		subtitle: string;
		academicHeading: string;
		academicSubtitle: string;
		certificationsHeading: string;
		certificationsSubtitle: string;
		honorsHeading: string;
		honorsSubtitle: string;
		statDegrees: string;
		statCertifications: string;
		statHonors: string;
		verify: string;
		issuedBy: string;
		inProgress: string;
		certTypes: { certification: string; specialization: string; professional: string; course: string };
		featured: string;
	};
	contact: {
		eyebrow: string;
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
		pages: Record<
			"home" | "about" | "projects" | "experience" | "education" | "blog" | "contact",
			{ title: string; description: string }
		>;
	};
	notFound: {
		title: string;
		body: string;
	};
	architectureModal: {
		technologies: string;
		keyContributions: string;
		liveDemo: string;
		sourceCode: string;
	};
	heroSection: {
		openToWork: string;
		awsBadge: string;
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
			blog: "Blog",
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
			opensInNewTab: "opens in a new tab",
			openMenu: "Open navigation menu",
			switchToDark: "Switch to dark theme",
			switchToLight: "Switch to light theme",
			playVideo: (title) => `Play video: ${title}`,
			close: "Close",
			subject: "Subject",
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
			credentialsEyebrow: "Credentials",
			credentialsTitle: "Certifications",
			credentialsSubtitle: "AWS Certified Solutions Architect plus verified specializations from Coursera partner universities",
			viewAllCredentials: "View All Credentials",
			ctaEyebrow: "Open to senior & fullstack roles",
			ctaTitle: "Let's build something that ships",
			ctaBody: "I'm available for fullstack and backend roles, remote or in Ho Chi Minh City. If you're hiring or want to talk architecture, my inbox is open.",
			ctaPrimary: "Get in touch",
			ctaSecondary: "Email me",
		},
		about: {
			eyebrow: "Profile",
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
			eyebrow: "Career",
			title: "Experience",
			subtitle: "Professional journey and technical impact.",
			clientsLabel: "Clients:",
			yearsCompaniesClients: (years, companies, clients) =>
				`${years}+ years · ${companies} companies · ${clients} enterprise clients`,
		},
		projects: {
			eyebrow: "Portfolio",
			title: "Projects",
			subtitle: "A selection of my work across full-stack and backend development.",
		},
		education: {
			eyebrow: "Learning",
			title: "Education & Credentials",
			subtitle: "Formal degrees, verified certifications and academic honors.",
			academicHeading: "Academic",
			academicSubtitle: "Degrees and ongoing postgraduate study",
			certificationsHeading: "Certifications",
			certificationsSubtitle: "Industry certification and Coursera specializations, each verifiable via its credential link",
			honorsHeading: "Honors & Awards",
			honorsSubtitle: "Academic recognition and competitions",
			statDegrees: "Degrees",
			statCertifications: "Certifications",
			statHonors: "Honors",
			verify: "Verify credential",
			issuedBy: "Issued by",
			inProgress: "In progress",
			certTypes: {
				certification: "Industry Certification",
				specialization: "Specialization",
				professional: "Professional Certificate",
				course: "Course",
			},
			featured: "Featured",
		},
		contact: {
			eyebrow: "Contact",
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
				"Kha (Kane) Nguyen — Fullstack Software Engineer and AWS Certified Solutions Architect in Ho Chi Minh City. Fintech automation at Bizzi, Node.js, GraphQL, React.",
			pages: {
				home: {
					title: "Home",
					description:
						"Kha (Kane) Nguyen — Fullstack Software Engineer and AWS Certified Solutions Architect in Ho Chi Minh City. Projects, tech stack, certifications, blog and experience.",
				},
				about: {
					title: "About",
					description:
						"About Kha (Kane) Nguyen: 3 years building fintech and SaaS products with Node.js, NestJS, GraphQL, React and AWS. Skills, awards and how I work.",
				},
				projects: {
					title: "Projects",
					description:
						"Fullstack and backend projects by Kha (Kane) Nguyen — enterprise e-invoicing at scale, real-time messaging, IAP payments, AI crack detection and more.",
				},
				experience: {
					title: "Experience",
					description:
						"Professional experience of Kha (Kane) Nguyen — Software Engineer at Bizzi, Cigro, FSoft and Axpara. Node.js, React, AWS and AP automation.",
				},
				education: {
					title: "Education & Certifications",
					description:
						"Academic background and verified credentials of Kha (Kane) Nguyen — B.S. Software Engineering (Honors) at FPT University, MSE at FSB, AWS Solutions Architect Associate and Coursera specializations.",
				},
				blog: {
					title: "Blog",
					description: "Notes, deep dives and architectural decisions from Kha (Kane) Nguyen.",
				},
				contact: {
					title: "Contact",
					description:
						"Contact Kha (Kane) Nguyen for software engineering opportunities, collaboration or freelance projects in Ho Chi Minh City and remote.",
				},
			},
		},
		notFound: {
			title: "Page not found",
			body: "The page you're looking for doesn't exist or has moved.",
		},
		architectureModal: {
			technologies: "Technologies",
			keyContributions: "Key Contributions",
			liveDemo: "Live Demo",
			sourceCode: "Source Code",
		},
		heroSection: {
			openToWork: "Open to Work",
			awsBadge: "AWS Certified Solutions Architect",
			viewProjects: "View Projects",
			downloadCv: "Download CV",
			roles: [
				"Fullstack Engineer · 3 yrs",
				"AWS Solutions Architect – Associate",
				"4M+ e-invoices/month at Bizzi",
				"NestJS · GraphQL · React",
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
			blog: "Blog",
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
			opensInNewTab: "mở trong tab mới",
			openMenu: "Mở menu điều hướng",
			switchToDark: "Chuyển sang giao diện tối",
			switchToLight: "Chuyển sang giao diện sáng",
			playVideo: (title) => `Phát video: ${title}`,
			close: "Đóng",
			subject: "Tiêu đề",
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
			credentialsEyebrow: "Chứng Nhận",
			credentialsTitle: "Chứng Chỉ",
			credentialsSubtitle: "AWS Certified Solutions Architect cùng các specialization đã xác thực từ các đại học đối tác Coursera",
			viewAllCredentials: "Xem Tất Cả Chứng Chỉ",
			ctaEyebrow: "Sẵn sàng cho vị trí senior & fullstack",
			ctaTitle: "Cùng xây dựng sản phẩm thực sự ra mắt",
			ctaBody: "Tôi đang mở cho các vị trí fullstack và backend, remote hoặc tại TP. Hồ Chí Minh. Nếu bạn đang tuyển dụng hoặc muốn trao đổi về kiến trúc, hãy liên hệ.",
			ctaPrimary: "Liên hệ ngay",
			ctaSecondary: "Gửi email",
		},
		about: {
			eyebrow: "Hồ Sơ",
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
			eyebrow: "Sự Nghiệp",
			title: "Kinh Nghiệm",
			subtitle: "Hành trình sự nghiệp và tác động kỹ thuật.",
			clientsLabel: "Khách hàng:",
			yearsCompaniesClients: (years, companies, clients) =>
				`${years}+ năm · ${companies} công ty · ${clients} khách hàng doanh nghiệp`,
		},
		projects: {
			eyebrow: "Portfolio",
			title: "Dự Án",
			subtitle: "Tuyển chọn các dự án full-stack và backend tôi đã thực hiện.",
		},
		education: {
			eyebrow: "Học Tập",
			title: "Học Vấn & Chứng Chỉ",
			subtitle: "Bằng cấp chính quy, chứng chỉ đã xác thực và thành tích học tập.",
			academicHeading: "Học Thuật",
			academicSubtitle: "Bằng cấp và chương trình sau đại học đang theo học",
			certificationsHeading: "Chứng Chỉ",
			certificationsSubtitle: "Chứng chỉ ngành và các specialization Coursera, mỗi chứng chỉ đều có link xác thực",
			honorsHeading: "Thành Tích & Giải Thưởng",
			honorsSubtitle: "Ghi nhận học tập và các cuộc thi",
			statDegrees: "Bằng cấp",
			statCertifications: "Chứng chỉ",
			statHonors: "Thành tích",
			verify: "Xác thực chứng chỉ",
			issuedBy: "Cấp bởi",
			inProgress: "Đang theo học",
			certTypes: {
				certification: "Chứng chỉ Ngành",
				specialization: "Specialization",
				professional: "Chứng chỉ Chuyên nghiệp",
				course: "Khóa học",
			},
			featured: "Nổi bật",
		},
		contact: {
			eyebrow: "Liên Hệ",
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
				"Kha (Kane) Nguyen — Kỹ sư Phần mềm Fullstack, AWS Certified Solutions Architect tại TP. Hồ Chí Minh. Tự động hóa fintech tại Bizzi, Node.js, GraphQL, React.",
			pages: {
				home: {
					title: "Trang chủ",
					description:
						"Kha (Kane) Nguyen — Kỹ sư Phần mềm Fullstack, AWS Certified Solutions Architect tại TP. Hồ Chí Minh. Dự án, công nghệ, chứng chỉ, blog và kinh nghiệm.",
				},
				about: {
					title: "Giới thiệu",
					description:
						"Về Kha (Kane) Nguyen: 3 năm xây dựng sản phẩm fintech và SaaS với Node.js, NestJS, GraphQL, React và AWS. Kỹ năng, giải thưởng và cách làm việc.",
				},
				projects: {
					title: "Dự án",
					description:
						"Các dự án fullstack và backend của Kha (Kane) Nguyen — hóa đơn điện tử doanh nghiệp quy mô lớn, nhắn tin thời gian thực, thanh toán IAP, nhận diện vết nứt bằng AI.",
				},
				experience: {
					title: "Kinh nghiệm",
					description:
						"Kinh nghiệm làm việc của Kha (Kane) Nguyen — Kỹ sư Phần mềm tại Bizzi, Cigro, FSoft và Axpara. Node.js, React, AWS và tự động hóa AP.",
				},
				education: {
					title: "Học vấn & Chứng chỉ",
					description:
						"Học vấn và chứng chỉ đã xác thực của Kha (Kane) Nguyen — Cử nhân Kỹ thuật Phần mềm (loại Giỏi) Đại học FPT, Thạc sĩ tại FSB, AWS Solutions Architect Associate và các specialization Coursera.",
				},
				blog: {
					title: "Blog",
					description: "Ghi chú, phân tích chuyên sâu và các quyết định kiến trúc của Kha (Kane) Nguyen.",
				},
				contact: {
					title: "Liên hệ",
					description:
						"Liên hệ Kha (Kane) Nguyen cho cơ hội kỹ sư phần mềm, hợp tác hoặc dự án freelance tại TP. Hồ Chí Minh và remote.",
				},
			},
		},
		notFound: {
			title: "Không tìm thấy trang",
			body: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi.",
		},
		architectureModal: {
			technologies: "Công nghệ",
			keyContributions: "Đóng góp chính",
			liveDemo: "Bản demo",
			sourceCode: "Mã nguồn",
		},
		heroSection: {
			openToWork: "Sẵn Sàng Nhận Việc",
			awsBadge: "AWS Certified Solutions Architect",
			viewProjects: "Xem Dự Án",
			downloadCv: "Tải CV",
			roles: [
				"Kỹ Sư Fullstack · 3 năm",
				"AWS Solutions Architect – Associate",
				"4M+ hóa đơn/tháng tại Bizzi",
				"NestJS · GraphQL · React",
			],
		},
	},
};
