import type { BlogPost } from "../types/blog";

// First-draft Vietnamese translation — should be reviewed by a native
// speaker before being treated as final/production copy.
export const blogPostsVi: BlogPost[] = [
	{
		slug: "event-driven-aws-sqs-lambda",
		title: "Di chuyển từ EventEmitter2 sang AWS SQS + Lambda",
		date: "2025-10-15",
		tags: ["aws", "nodejs", "architecture"],
		excerpt:
			"Cách tôi di chuyển hệ thống sự kiện nội bộ từ EventEmitter2 trong process sang kiến trúc hướng sự kiện AWS SQS + Lambda có khả năng mở rộng, giảm độ trễ đột biến và cải thiện độ tin cậy.",
		overview:
			"Tại Cigro, các nền tảng EveryTalk và Uobong dựa vào EventEmitter2 để xử lý sự kiện nội bộ — webhook mua hàng IAP, thay đổi gói đăng ký, thông báo chat — một cách đồng bộ trong cùng một process Node.js. Dưới tải thực tế (hàng nghìn webhook IAP vào giờ cao điểm), event loop đơn process bắt đầu bị nghẽn, gây ra độ trễ đột biến và đôi khi mất sự kiện. Tôi dẫn dắt việc di chuyển hệ thống sự kiện nội bộ này sang AWS SQS + Lambda để tách rời việc phát sinh sự kiện khỏi việc xử lý và giúp pipeline có thể mở rộng theo chiều ngang.",
		architecture: {
			summary:
				"Pipeline mới tách việc phát sinh, đệm, và xử lý sự kiện thành các giai đoạn có thể mở rộng độc lập thay vì một chuỗi gọi đồng bộ trong cùng process.",
			components: [
				{
					name: "Event Producer (API Server)",
					description:
						"API server Node.js phát sự kiện nghiệp vụ (xác nhận mua IAP, gia hạn đăng ký, gửi tin nhắn chat) đến SQS thay vì gọi handler trực tiếp trong process.",
				},
				{
					name: "SQS Queue",
					description:
						"Đệm sự kiện một cách bền vững, hấp thụ các đợt tăng tải và giải phóng ngay API server khỏi việc chờ xử lý ở downstream.",
				},
				{
					name: "Lambda Consumer",
					description:
						"Tự động mở rộng theo độ sâu hàng đợi — không cần cấp phát thủ công — và xử lý sự kiện độc lập với chu kỳ request/response đã tạo ra chúng.",
				},
				{
					name: "Dead-Letter Queue",
					description:
						"Bắt giữ các sự kiện xử lý thất bại sau nhiều lần thử lại, giúp lỗi được nhìn thấy và có thể phát lại thay vì bị âm thầm loại bỏ.",
				},
			],
			diagram:
				"flowchart LR\n    A[Event Producer<br/>API Server] -->|SendMessage| B[SQS Queue]\n    B -->|poll| C[Lambda Consumer]\n    C -->|thất bại 3 lần| D[Dead-Letter Queue]",
		},
		implementation: [
			"Ánh xạ mọi listener EventEmitter2 sang một hợp đồng loại sự kiện/payload rõ ràng, vì hệ thống cũ dựa vào bộ nhớ chia sẻ ngầm định và payload định kiểu lỏng lẻo.",
			"Thay thế các lệnh gọi `emitter.emit()` đồng bộ ở tầng API bằng lệnh gọi `SendMessage` của SQS, giữ cho đường phản hồi API không bị ảnh hưởng bởi độ trễ xử lý sự kiện.",
			"Viết một Lambda handler cho mỗi loại sự kiện với logic xử lý idempotent (vì SQS đảm bảo giao ít nhất một lần, không phải chính xác một lần), và cấu hình chính sách redrive đến dead-letter queue sau 3 lần thử thất bại.",
			"Triển khai di chuyển từng bước sau một feature flag, chạy song song cả hai hệ thống trong một chu kỳ release để so sánh số lượng sự kiện và phát hiện sai lệch trước khi chuyển đổi hoàn toàn.",
		],
		results: [
			"Độ trễ P99 trên các API endpoint từng phát sự kiện đồng bộ giảm từ ~1200ms xuống ~200ms, vì API không còn phải chờ xử lý sự kiện.",
			"Không ghi nhận mất dữ liệu nào trong các đợt tăng tải, vì SQS đệm sự kiện bền vững thay vì dựa vào trạng thái trong bộ nhớ.",
			"Việc debug được cải thiện đáng kể — mỗi lần gọi Lambda ghi log độc lập vào CloudWatch, giúp dễ dàng truy vết lịch sử xử lý của một sự kiện thay vì phải đào bới log process dùng chung.",
		],
	},
	{
		slug: "typescript-utility-types",
		title: "Các Utility Type thiết yếu của TypeScript cho code sạch hơn",
		date: "2025-08-20",
		tags: ["typescript", "frontend"],
		excerpt:
			"Hướng dẫn thực tế về các utility type của TypeScript như Partial, Pick, Omit, Record, và conditional type giúp codebase dễ bảo trì hơn.",
		overview:
			"Đây là ghi chú về thực hành kỹ thuật chung hơn là bài viết về một dự án cụ thể — tập hợp các pattern utility type mà tôi thường xuyên sử dụng trong các codebase mình làm việc, từ tầng dữ liệu định kiểu của chính trang portfolio này đến các DTO tầng service tại Bizzi. Utility type loại bỏ boilerplate và mã hóa ràng buộc ở cấp độ kiểu dữ liệu thay vì để chúng trở thành kiến thức truyền miệng trong comment.",
		architecture: {
			summary:
				"Thay vì sơ đồ hạ tầng, \"kiến trúc\" của bài viết này nói về cách các utility type kết hợp qua các tầng của một service điển hình — từ domain model gốc đến các hình dạng hẹp hơn mà mỗi tầng thực sự cần.",
			components: [
				{
					name: "Domain Model",
					description:
						"Hình dạng đầy đủ, chuẩn xác của một entity (ví dụ một User với tất cả trường, kể cả các trường nhạy cảm như password hash).",
				},
				{
					name: "Partial<T> — Update DTO",
					description:
						"Biến tất cả thuộc tính thành tùy chọn, khớp với hình dạng của body request PATCH nơi chỉ các trường thay đổi được gửi đi.",
				},
				{
					name: "Pick<T, K> / Omit<T, K> — Hình dạng API Response",
					description:
						"Pick chọn ra chỉ các trường client cần; Omit loại trừ các trường không bao giờ nên rời khỏi server (mật khẩu, cờ nội bộ).",
				},
				{
					name: "Record<K, T> — Lookup & Config",
					description:
						"Ánh xạ một tập khóa cố định sang một hình dạng giá trị nhất quán — được dùng nhiều cho từ điển dịch strings.ts của chính trang này và các config feature-flag.",
				},
			],
		},
		implementation: [
			"`Partial<T>` cho update DTO: `interface User { name: string; email: string; age: number; } type UpdateUser = Partial<User>;` — mọi trường trở thành tùy chọn, khớp với payload PATCH thực tế.",
			"`Pick` và `Omit` để định hình response: `type PublicUser = Omit<User, 'email' | 'password'>; type UserPreview = Pick<User, 'name' | 'age'>;` — ép buộc tại thời điểm biên dịch rằng các trường nhạy cảm không bao giờ lọt vào kiểu response công khai.",
			"`Record<K, T>` cho lookup toàn diện: dùng cho từ điển `Record<Language, Strings>` của chính portfolio này, buộc cả hai object locale `en` và `vi` phải thỏa mãn chính xác cùng interface `Strings` — thiếu một khóa ở ngôn ngữ nào cũng khiến build lỗi thay vì âm thầm lỗi lúc runtime.",
			"Conditional type để thu hẹp kiểu: kết hợp `Extract`/`Exclude` với union type để ràng buộc tham số hàm về một tập con hợp lệ mà không cần lặp lại định nghĩa union.",
		],
		results: [
			"Giảm số lần kiểm tra validation lúc runtime, vì các hình dạng không hợp lệ bị bắt tại thời điểm biên dịch thay vì ở production.",
			"Kiểu response API và DTO luôn đồng bộ với domain model một cách tự động — cập nhật một interface gốc sẽ lan truyền đến mọi kiểu dẫn xuất thay vì phải sửa thủ công ở nhiều nơi.",
			"Pattern `Record<Language, Strings>` cụ thể đã bắt được vài khóa dịch bị thiếu trong quá trình triển khai EN/VI của chính trang này trước khi chúng kịp lọt ra trình duyệt.",
		],
	},
	{
		slug: "rag-pipelines-langchain",
		title: "Khám phá RAG Pipeline với LangChain — Hành trình tự học",
		date: "2025-07-10",
		tags: ["ai-agents", "nodejs", "architecture"],
		excerpt:
			"Một hành trình tự học đào sâu vào việc xây dựng pipeline Retrieval-Augmented Generation trong Node.js bằng LangChain, vector store, và OpenAI embeddings — học hỏi khám phá, không phải công việc production.",
		overview:
			"Bài viết này ghi lại quá trình tự học độc lập — không phải dự án của khách hàng hay công ty. Tôi muốn hiểu cách hệ thống Retrieval-Augmented Generation (RAG) hoạt động từ đầu đến cuối, nên đã xây dựng một proof-of-concept nhỏ bằng Node.js sử dụng LangChain, vector store, và OpenAI embeddings trên một bộ dữ liệu cá nhân. Đây không phải là một phần công việc production của tôi tại Bizzi, Cigro, hay các vai trò trước đó; đây là học hỏi khám phá để hiểu một pattern công nghệ tôi chưa từng dùng trong công việc chuyên nghiệp.",
		architecture: {
			summary:
				"Một pipeline RAG tối giản có ba giai đoạn: tiếp nhận và embed tài liệu nguồn, truy xuất các đoạn liên quan cho một truy vấn, rồi sinh câu trả lời dựa trên các đoạn đó.",
			components: [
				{
					name: "Tiếp nhận tài liệu",
					description:
						"Chia tài liệu nguồn thành các đoạn chồng lấn (tôi dùng khoảng 500-1000 token với ~50 token chồng lấn) đủ nhỏ để embed có ý nghĩa nhưng đủ lớn để giữ ngữ cảnh.",
				},
				{
					name: "Embedding + Vector Store",
					description:
						"Mỗi đoạn được embed qua API embeddings của OpenAI và lưu trong cơ sở dữ liệu vector để tìm kiếm lân cận gần nhất.",
				},
				{
					name: "Retriever",
					description:
						"Khi có truy vấn, embed văn bản truy vấn và thực hiện tìm kiếm tương đồng trong vector store để lấy về các đoạn liên quan nhất.",
				},
				{
					name: "Sinh câu trả lời bằng LLM",
					description:
						"Đưa các đoạn đã truy xuất cùng truy vấn gốc vào prompt LLM, giúp câu trả lời sinh ra dựa trên tài liệu nguồn đã truy xuất thay vì chỉ dựa vào dữ liệu huấn luyện của model.",
				},
			],
			diagram:
				"flowchart LR\n    A[Tiếp nhận tài liệu] --> B[Embedding + Vector Store]\n    B --> C[Retriever]\n    C --> D[Sinh câu trả lời bằng LLM]",
		},
		implementation: [
			"Thiết lập LangChain.js làm tầng điều phối kết nối document loader, bước embedding, và chuỗi truy xuất + sinh câu trả lời.",
			"Chia tài liệu nguồn thành đoạn ~500-1000 token với ~50 token chồng lấn — đoạn nhỏ mất ngữ cảnh, đoạn quá lớn làm loãng độ liên quan khi truy xuất.",
			"Lưu embedding trong vector store và thử nghiệm hybrid search (kết hợp độ tương đồng vector với khớp từ khóa) để bắt các trường hợp biên mà tìm kiếm vector thuần bỏ sót.",
			"Bổ sung bước reranking sau khi truy xuất ban đầu, cải thiện rõ rệt độ liên quan của câu trả lời so với chỉ dùng top-k vector search đơn thuần.",
		],
		results: [
			"Xác nhận hybrid search (vector + từ khóa) bắt được các truy vấn mà tìm kiếm ngữ nghĩa thuần bỏ sót — một bài học hữu ích ngay cả ngoài stack cụ thể này.",
			"Reranking sau truy xuất cải thiện chất lượng câu trả lời đo lường được, đáng để đánh đổi độ trễ tăng thêm cho các use case mà độ chính xác quan trọng hơn tốc độ thuần túy.",
			"Đây vẫn là công việc khám phá/tự học — tôi chưa từng triển khai hệ thống RAG trong vai trò production, và bài viết này nên được đọc như nhật ký học tập, không phải tuyên bố về kinh nghiệm RAG chuyên nghiệp.",
		],
	},
	{
		slug: "nestjs-grpc-microservices",
		title: "NestJS + gRPC: Xây dựng hệ thống xác thực Microservice",
		date: "2025-05-05",
		tags: ["typescript", "architecture"],
		excerpt:
			"Cách tôi xây dựng dịch vụ xác thực độc lập dựa trên gRPC cho BMCMS bằng NestJS, định nghĩa protobuf, và các pattern giao tiếp liên dịch vụ.",
		overview:
			"Với vai trò trưởng nhóm phát triển của Building Maintenance and Crack Monitoring System (BMCMS) — dự án capstone đại học tôi dẫn dắt với toàn quyền sở hữu SDLC — tôi cần một dịch vụ xác thực mà nhiều microservice nội bộ có thể gọi mà không tốn chi phí HTTP/JSON cho mỗi lệnh gọi nội bộ. Tôi xây dựng một dịch vụ xác thực độc lập dựa trên gRPC bằng NestJS và định nghĩa protobuf, cùng với kiến trúc microservices rộng hơn của hệ thống (frontend React, API NestJS, PostgreSQL, Redis, RabbitMQ, và dịch vụ AI dựa trên Ultralytics để tự động phát hiện vết nứt).",
		architecture: {
			summary:
				"BMCMS theo bố cục microservices với một dịch vụ xác thực gRPC riêng biệt nằm sau API gateway chính, phản ánh đúng kiến trúc cũng được hiển thị ở trang Dự án của trang này cho cùng hệ thống.",
			components: [
				{ name: "React Frontend", description: "Ứng dụng client được nhân viên bảo trì tòa nhà và quản trị viên sử dụng." },
				{ name: "NestJS API", description: "API gateway HTTP chính mà các request từ frontend chạm đến đầu tiên." },
				{ name: "Auth gRPC", description: "Một microservice NestJS độc lập cung cấp đăng nhập/xác thực token qua gRPC, được API gateway và các dịch vụ khác gọi nội bộ." },
				{ name: "PostgreSQL", description: "Kho lưu trữ quan hệ chính cho dữ liệu người dùng, tòa nhà, và phiếu bảo trì." },
				{ name: "Redis", description: "Hỗ trợ trạng thái phiên OTP cho luồng xác minh email với khóa hết hạn nhanh, tồn tại ngắn." },
				{ name: "RabbitMQ", description: "Xử lý nhắn tin liên dịch vụ bất đồng bộ ngoài đường xác thực gRPC đồng bộ." },
				{ name: "Ultralytics AI", description: "Chạy phát hiện vết nứt tự động trên ảnh tòa nhà đã tải lên, triển khai trên AWS Lambda." },
				{ name: "AWS EC2 / Docker", description: "Lưu trữ các dịch vụ đã đóng container để triển khai." },
			],
			diagram:
				"flowchart TD\n    A[React Frontend] --> B[NestJS API]\n    B --> C[Auth gRPC]\n    B --> D[PostgreSQL]\n    B --> E[Redis]\n    B --> F[RabbitMQ]\n    B --> G[Ultralytics AI]\n    G -->|ghi ngược lại| E\n    A -->|triển khai trên| H[AWS EC2 / Docker]",
		},
		implementation: [
			"Định nghĩa hợp đồng dịch vụ `.proto` với các RPC `Login`, `ValidateToken`, và `RefreshToken`, cho mỗi dịch vụ sử dụng một client định kiểu chặt được sinh từ cùng schema.",
			"Triển khai microservice NestJS bằng transport gRPC của `@nestjs/microservices`, giữ logic xác thực tách biệt khỏi các mối quan tâm HTTP của API chính.",
			"Xây dựng luồng xác minh email OTP trên nền Redis, lưu mã xác minh tồn tại ngắn với thời gian hết hạn TTL thay vì một bảng dữ liệu bền vững.",
			"Đóng container dịch vụ xác thực riêng biệt với API chính bằng Docker, triển khai cả hai lên AWS EC2 cùng với broker RabbitMQ và các hàm Lambda AI Ultralytics.",
		],
		results: [
			"Chọn gRPC thay vì REST cho các lệnh gọi xác thực liên dịch vụ chính vì kiểu dữ liệu được protobuf ép buộc và khả năng đa kênh HTTP/2 — đánh đổi sự đơn giản của REST thuần để lấy hợp đồng chặt chẽ hơn và độ trễ thấp hơn giữa các dịch vụ nội bộ.",
			"Tách xác thực thành microservice gRPC riêng giúp việc suy luận và kiểm thử độc lập với phần còn lại của bề mặt API trở nên đơn giản hơn.",
			"Đánh đổi chính: gRPC-web sẽ cần thêm một tầng proxy (envoy/grpc-gateway) nếu client trình duyệt cần gọi trực tiếp dịch vụ xác thực — không cần thiết ở đây vì mọi lệnh gọi gRPC đều ở dạng server-to-server, nhưng đáng lưu ý cho các mở rộng tương lai.",
		],
	},
	{
		slug: "react-performance-optimization",
		title: "Hiệu năng React: Từ 60fps đến 120fps mượt mà",
		date: "2025-06-01",
		tags: ["react", "frontend"],
		excerpt:
			"Các kỹ thuật tôi dùng để giữ ứng dụng React ở 60-120fps: memo, virtualization, will-change, GPU compositing, và chiến lược lazy loading.",
		overview:
			"Một ghi chú về kỹ năng frontend chung hơn là bài viết về một dự án đơn lẻ. Đây là các kỹ thuật tôi áp dụng bất cứ khi nào một UI React cần giữ mượt mà dưới điều kiện animation nặng hoặc cập nhật tần suất cao — bao gồm vài kỹ thuật được dùng trực tiếp trong hero background của chính trang portfolio này (đồ thị node canvas/SVG với chuyển động theo con trỏ) và các chuyển trang dựa trên framer-motion.",
		architecture: {
			summary:
				"Thay vì hạ tầng, \"kiến trúc\" liên quan ở đây chính là pipeline render — từ cây component của React đến những gì GPU thực sự tổng hợp mỗi khung hình.",
			components: [
				{ name: "Cây Component", description: "Nơi React quyết định điều gì cần render lại — nơi đầu tiên và rẻ nhất để cắt giảm công việc không cần thiết." },
				{ name: "Ranh giới Memoization", description: "React.memo/useMemo/useCallback đóng vai trò cổng chặn việc render lại lan truyền xuống cây sâu hơn mức cần thiết." },
				{ name: "Danh sách Virtualized", description: "Với danh sách dài, chỉ vùng hiển thị của các node DOM tồn tại, giữ cây nhỏ bất kể kích thước dữ liệu bên dưới." },
				{ name: "Tầng GPU Compositing", description: "Animation CSS transform/opacity dùng will-change hoặc transform chạy trên compositor thread, bỏ qua hoàn toàn layout/paint." },
			],
		},
		implementation: [
			"`React.memo` cho các component trình bày cùng `useMemo`/`useCallback` cho giá trị dẫn xuất tốn kém và tham chiếu callback ổn định — các component `TimelineItem` và `ProjectCard` ở trang Kinh nghiệm/Dự án của trang này được memo hóa theo cách này để tránh render lại toàn bộ danh sách mỗi khi state cha thay đổi.",
			"Virtualization (kiểu windowing react-window) cho bất kỳ danh sách nào đủ dài khiến render mọi hàng cùng lúc gây giật — hiện chưa cần thiết với khối lượng nội dung của portfolio này, nhưng là công cụ đầu tiên nghĩ đến khi danh sách vượt quá vài chục mục.",
			"`will-change: transform` và chỉ animate `transform`/`opacity` (không bao giờ `top`/`left`/`width`) để trình duyệt có thể giao animation cho compositor thread thay vì chạy lại layout mỗi khung hình — dùng xuyên suốt animation orb và đồ thị node của `HeroBackground` trên trang này.",
			"Code splitting qua `React.lazy` + `Suspense` cho các route dưới màn hình đầu, để bundle ban đầu chỉ chứa những gì cần cho lần vẽ đầu tiên.",
		],
		results: [
			"Giữ animation chỉ thay đổi transform/opacity là đòn bẩy lớn nhất cho độ mượt — các thuộc tính kích hoạt layout (width, top, left) là nguyên nhân phổ biến nhất gây giật trước khi áp dụng kỷ luật này.",
			"Memo hóa các component item trong danh sách loại bỏ hiện tượng nhấp nháy render lại có thể nhìn thấy khi state cha không liên quan (như chuyển theme hay ngôn ngữ) thay đổi ở nơi khác trên trang.",
			"Ngân sách khung hình mục tiêu: dưới 16ms mỗi khung cho 60fps, dưới 8ms cho 120fps — đo bằng React DevTools Profiler và tab Performance của Chrome, không phải phỏng đoán.",
		],
	},
];
