const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: ".env.local" });

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
};

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Blog Schema
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 200 },
    coverImage: { type: String },
    author: { type: String, required: true, default: "Admin" },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

const sampleBlogs = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-with-nextjs-14",
    content: `
      <h2>Introduction to Next.js 14</h2>
      <p>Next.js 14 introduces powerful new features that make building modern web applications easier than ever. In this guide, we'll explore the key features and improvements.</p>
      
      <h3>App Router</h3>
      <p>The App Router is a game-changer for building React applications. It provides better performance, improved developer experience, and built-in support for server components.</p>
      
      <h3>Server Components</h3>
      <p>Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client and improving initial page load times.</p>
      
      <h3>Getting Started</h3>
      <p>To create a new Next.js 14 project, simply run:</p>
      <pre><code>npx create-next-app@latest</code></pre>
      
      <p>Next.js 14 is production-ready and used by thousands of companies worldwide. Give it a try today!</p>
    `,
    excerpt:
      "Learn about the exciting new features in Next.js 14 and how they can improve your web development workflow.",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: "Admin",
    tags: ["nextjs", "react", "webdev", "tutorial"],
    published: true,
  },
  {
    title: "Mastering TypeScript for Modern Applications",
    slug: "mastering-typescript-for-modern-applications",
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript has become the de facto standard for building large-scale JavaScript applications. It provides type safety, better tooling, and improved developer experience.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Static type checking catches errors before runtime</li>
        <li>Enhanced IDE support with intelligent autocomplete</li>
        <li>Better code documentation and maintainability</li>
        <li>Seamless integration with modern frameworks</li>
      </ul>
      
      <h3>Best Practices</h3>
      <p>Always define proper types for your functions and components. Avoid using 'any' type unless absolutely necessary. Leverage TypeScript's utility types like Partial, Pick, and Omit.</p>
      
      <h3>Conclusion</h3>
      <p>TypeScript is an investment that pays dividends in code quality and developer productivity. Start using it in your next project!</p>
    `,
    excerpt:
      "Discover the power of TypeScript and learn best practices for building type-safe applications.",
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    author: "Admin",
    tags: ["typescript", "javascript", "programming", "best-practices"],
    published: true,
  },
  {
    title: "Building Scalable APIs with MongoDB",
    slug: "building-scalable-apis-with-mongodb",
    content: `
      <h2>MongoDB for Modern Applications</h2>
      <p>MongoDB is a powerful NoSQL database that excels at handling unstructured data and scaling horizontally. Learn how to build efficient APIs with MongoDB.</p>
      
      <h3>Schema Design</h3>
      <p>Unlike SQL databases, MongoDB offers flexible schema design. However, this doesn't mean you shouldn't plan your data structure carefully.</p>
      
      <h3>Performance Tips</h3>
      <ul>
        <li>Use indexes for frequently queried fields</li>
        <li>Implement proper pagination for large datasets</li>
        <li>Utilize aggregation pipelines for complex queries</li>
        <li>Consider embedding vs referencing based on data access patterns</li>
      </ul>
      
      <h3>Connection Management</h3>
      <p>Always use connection pooling and implement proper error handling. In serverless environments like Vercel, reuse existing connections when possible.</p>
      
      <p>MongoDB Atlas provides a great cloud hosting solution with automatic scaling and backups. Highly recommended for production applications!</p>
    `,
    excerpt:
      "Learn how to design efficient MongoDB schemas and build scalable APIs for your applications.",
    coverImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: "Admin",
    tags: ["mongodb", "database", "api", "backend"],
    published: true,
  },
  {
    title: "Introduction to Machine Learning with Python",
    slug: "introduction-to-machine-learning-with-python",
    content: `
      <h2>Getting Started with ML</h2>
      <p>Machine Learning is transforming industries worldwide. Python, with its rich ecosystem of libraries, has become the go-to language for ML development.</p>
      
      <h3>Essential Libraries</h3>
      <ul>
        <li><strong>NumPy</strong> - Numerical computing and array operations</li>
        <li><strong>Pandas</strong> - Data manipulation and analysis</li>
        <li><strong>Scikit-learn</strong> - Machine learning algorithms</li>
        <li><strong>TensorFlow/PyTorch</strong> - Deep learning frameworks</li>
      </ul>
      
      <h3>ML Workflow</h3>
      <p>A typical ML project involves data collection, preprocessing, model training, evaluation, and deployment. Each step is crucial for building robust models.</p>
      
      <h3>Real-World Applications</h3>
      <p>Machine learning powers recommendation systems, fraud detection, image recognition, natural language processing, and autonomous vehicles. The possibilities are endless!</p>
      
      <p>Start your ML journey today and unlock the potential of data-driven decision making.</p>
    `,
    excerpt:
      "Explore the fundamentals of machine learning and discover how Python makes ML accessible to everyone.",
    coverImage:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    author: "Admin",
    tags: ["machine-learning", "python", "ai", "data-science"],
    published: true,
  },
  {
    title: "Cybersecurity Best Practices for Developers",
    slug: "cybersecurity-best-practices-for-developers",
    content: `
      <h2>Security First Mindset</h2>
      <p>In today's digital landscape, security cannot be an afterthought. Developers must integrate security practices into every phase of the development lifecycle.</p>
      
      <h3>Common Vulnerabilities</h3>
      <ul>
        <li><strong>SQL Injection</strong> - Always use parameterized queries</li>
        <li><strong>XSS Attacks</strong> - Sanitize user inputs and escape outputs</li>
        <li><strong>CSRF</strong> - Implement proper token validation</li>
        <li><strong>Authentication Issues</strong> - Use industry-standard solutions</li>
      </ul>
      
      <h3>Security Tools</h3>
      <p>Incorporate tools like OWASP ZAP for penetration testing, Snyk for dependency scanning, and SonarQube for code quality analysis.</p>
      
      <h3>Defense in Depth</h3>
      <p>Implement multiple layers of security: network security, application security, data encryption, and regular security audits.</p>
      
      <p>Remember: Security is everyone's responsibility. Stay informed about the latest threats and vulnerabilities.</p>
    `,
    excerpt:
      "Essential security practices every developer should implement to protect applications from cyber threats.",
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    author: "Admin",
    tags: ["cybersecurity", "security", "best-practices", "development"],
    published: true,
  },
  {
    title: "Modern UI/UX Design Principles",
    slug: "modern-ui-ux-design-principles",
    content: `
      <h2>Designing for Users</h2>
      <p>Great design is invisible. It guides users effortlessly through their journey, making complex tasks feel simple and intuitive.</p>
      
      <h3>Core Principles</h3>
      <ul>
        <li><strong>Consistency</strong> - Maintain uniform patterns across your interface</li>
        <li><strong>Feedback</strong> - Always inform users about system status</li>
        <li><strong>Accessibility</strong> - Design for everyone, including users with disabilities</li>
        <li><strong>Simplicity</strong> - Remove unnecessary complexity</li>
      </ul>
      
      <h3>Design Systems</h3>
      <p>Build reusable component libraries with tools like Figma, Storybook, and design tokens. This ensures consistency and speeds up development.</p>
      
      <h3>User Research</h3>
      <p>Conduct usability testing, create user personas, and map user journeys. Data-driven design decisions lead to better products.</p>
      
      <h3>Mobile-First Approach</h3>
      <p>With mobile traffic dominating, design for smaller screens first, then progressively enhance for larger displays.</p>
    `,
    excerpt:
      "Learn the fundamental principles of UI/UX design that create delightful user experiences.",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    author: "Admin",
    tags: ["design", "ui-ux", "user-experience", "web-design"],
    published: true,
  },
  {
    title: "Cloud Computing with AWS and Azure",
    slug: "cloud-computing-with-aws-and-azure",
    content: `
      <h2>The Cloud Revolution</h2>
      <p>Cloud computing has transformed how we build and deploy applications. AWS and Azure are leading platforms offering comprehensive cloud solutions.</p>
      
      <h3>Core Services</h3>
      <p><strong>AWS:</strong> EC2 for computing, S3 for storage, RDS for databases, Lambda for serverless functions.</p>
      <p><strong>Azure:</strong> Virtual Machines, Blob Storage, SQL Database, Azure Functions.</p>
      
      <h3>Benefits of Cloud</h3>
      <ul>
        <li>Scalability on demand</li>
        <li>Pay-as-you-go pricing</li>
        <li>Global infrastructure</li>
        <li>High availability and disaster recovery</li>
      </ul>
      
      <h3>Cloud-Native Architecture</h3>
      <p>Design applications using microservices, containers (Docker/Kubernetes), and serverless patterns for maximum flexibility and scalability.</p>
      
      <h3>Cost Optimization</h3>
      <p>Monitor resource usage, implement auto-scaling, use reserved instances, and leverage spot instances for non-critical workloads.</p>
    `,
    excerpt:
      "Understand cloud computing fundamentals and learn how to leverage AWS and Azure for modern applications.",
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    author: "Admin",
    tags: ["cloud-computing", "aws", "azure", "devops"],
    published: true,
  },
  {
    title: "Mobile App Development with React Native",
    slug: "mobile-app-development-with-react-native",
    content: `
      <h2>Cross-Platform Mobile Development</h2>
      <p>React Native enables developers to build native mobile apps using JavaScript and React. Write once, deploy to both iOS and Android.</p>
      
      <h3>Why React Native?</h3>
      <ul>
        <li>Shared codebase for multiple platforms</li>
        <li>Fast development with hot reloading</li>
        <li>Native performance</li>
        <li>Large ecosystem and community support</li>
      </ul>
      
      <h3>Key Components</h3>
      <p>Learn essential components like View, Text, Image, ScrollView, and FlatList. Master navigation with React Navigation.</p>
      
      <h3>Native Modules</h3>
      <p>Access device features like camera, GPS, and sensors through native modules and third-party libraries.</p>
      
      <h3>Performance Optimization</h3>
      <p>Use memo, useMemo, and useCallback for optimizations. Implement virtualized lists for large datasets. Profile with React Native Performance Monitor.</p>
      
      <p>Popular apps built with React Native include Facebook, Instagram, Discord, and Shopify.</p>
    `,
    excerpt:
      "Build beautiful cross-platform mobile applications with React Native and JavaScript.",
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    author: "Admin",
    tags: ["mobile-development", "react-native", "ios", "android"],
    published: true,
  },
  {
    title: "DevOps and CI/CD Pipeline Automation",
    slug: "devops-and-cicd-pipeline-automation",
    content: `
      <h2>Streamlining Software Delivery</h2>
      <p>DevOps bridges the gap between development and operations, enabling faster, more reliable software releases through automation and collaboration.</p>
      
      <h3>CI/CD Pipeline</h3>
      <p><strong>Continuous Integration:</strong> Automatically build and test code with every commit using GitHub Actions, GitLab CI, or Jenkins.</p>
      <p><strong>Continuous Deployment:</strong> Automatically deploy to production after passing all tests and quality checks.</p>
      
      <h3>Infrastructure as Code</h3>
      <ul>
        <li><strong>Terraform</strong> - Provision cloud resources declaratively</li>
        <li><strong>Ansible</strong> - Configuration management and automation</li>
        <li><strong>Docker</strong> - Containerize applications for consistency</li>
        <li><strong>Kubernetes</strong> - Orchestrate containers at scale</li>
      </ul>
      
      <h3>Monitoring and Logging</h3>
      <p>Implement comprehensive monitoring with Prometheus, Grafana, ELK stack, or cloud-native solutions. Set up alerts for critical issues.</p>
      
      <h3>DevOps Culture</h3>
      <p>Foster collaboration, shared responsibility, and continuous improvement. Break down silos between teams.</p>
    `,
    excerpt:
      "Master DevOps practices and build automated CI/CD pipelines for efficient software delivery.",
    coverImage:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
    author: "Admin",
    tags: ["devops", "ci-cd", "automation", "infrastructure"],
    published: true,
  },
  {
    title: "Data Science and Analytics Fundamentals",
    slug: "data-science-and-analytics-fundamentals",
    content: `
      <h2>Turning Data into Insights</h2>
      <p>Data Science combines statistics, programming, and domain expertise to extract meaningful insights from data and drive business decisions.</p>
      
      <h3>Data Science Lifecycle</h3>
      <ol>
        <li><strong>Problem Definition</strong> - Define clear objectives</li>
        <li><strong>Data Collection</strong> - Gather relevant data sources</li>
        <li><strong>Data Cleaning</strong> - Handle missing values and outliers</li>
        <li><strong>Exploratory Analysis</strong> - Discover patterns and relationships</li>
        <li><strong>Modeling</strong> - Build predictive models</li>
        <li><strong>Evaluation</strong> - Assess model performance</li>
        <li><strong>Deployment</strong> - Put models into production</li>
      </ol>
      
      <h3>Essential Tools</h3>
      <p>Jupyter Notebooks for interactive analysis, Pandas for data manipulation, Matplotlib/Seaborn for visualization, and SQL for data querying.</p>
      
      <h3>Statistical Concepts</h3>
      <p>Understanding probability, hypothesis testing, regression analysis, and correlation is crucial for proper data interpretation.</p>
      
      <h3>Business Impact</h3>
      <p>Data science enables customer segmentation, churn prediction, recommendation systems, and forecasting to drive business growth.</p>
    `,
    excerpt:
      "Learn the fundamentals of data science and discover how to extract actionable insights from data.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    author: "Admin",
    tags: ["data-science", "analytics", "python", "statistics"],
    published: true,
  },
  {
    title: "Blockchain Technology and Smart Contracts",
    slug: "blockchain-technology-and-smart-contracts",
    content: `
      <h2>Decentralized Future</h2>
      <p>Blockchain technology is revolutionizing industries by providing transparent, secure, and decentralized solutions for digital transactions and data management.</p>
      
      <h3>Blockchain Basics</h3>
      <p>A blockchain is a distributed ledger of transactions, secured by cryptography and maintained by a network of nodes. Each block contains a hash of the previous block, creating an immutable chain.</p>
      
      <h3>Smart Contracts</h3>
      <p>Self-executing contracts with terms directly written in code. Ethereum's Solidity language enables developers to create complex decentralized applications (dApps).</p>
      
      <h3>Use Cases</h3>
      <ul>
        <li><strong>Cryptocurrency</strong> - Digital currencies like Bitcoin and Ethereum</li>
        <li><strong>Supply Chain</strong> - Track products from origin to consumer</li>
        <li><strong>DeFi</strong> - Decentralized financial services</li>
        <li><strong>NFTs</strong> - Digital ownership and collectibles</li>
      </ul>
      
      <h3>Development Tools</h3>
      <p>Remix IDE for smart contract development, Truffle for testing and deployment, MetaMask for wallet integration, and Web3.js for blockchain interaction.</p>
      
      <h3>Challenges</h3>
      <p>Scalability, energy consumption, and regulatory concerns remain key challenges for widespread blockchain adoption.</p>
    `,
    excerpt:
      "Explore blockchain technology and learn how smart contracts are building the decentralized web.",
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    author: "Admin",
    tags: ["blockchain", "cryptocurrency", "web3", "smart-contracts"],
    published: true,
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      email: "admin@inkpress.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    });

    console.log("✅ Admin user created:", adminUser.email);

    // Create sample blogs
    const blogs = await Blog.insertMany(sampleBlogs);
    console.log(`✅ ${blogs.length} sample blogs created`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\nAdmin Credentials:");
    console.log("Email: admin@inkpress.com");
    console.log("Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
