export const projects = [
  {
    id: 'event-management',
    title: 'EventXpress - Event Management & Booking System',
    category: 'Full Stack',
    thumbnail: '/assets/Project1_img1.png',
    screenshots: [
      '/assets/Project1_img1.png',
      '/assets/Project1_img2.png',
      '/assets/Project1_img3.png'
    ],
    githubUrl: 'https://github.com/Jasbir001/event-management-system',
    liveUrl: 'https://event-management-system-mauve-eta.vercel.app/',
    shortDescription: 'A robust full-stack event registration and booking platform featuring role-based dashboards, admin approval workflows, and automated transactional emails.',
    fullDescription: 'EventSphere is a comprehensive event booking and management system built using the PERN stack (PostgreSQL, Express, React, Node). The platform allows community organizers to list events, track registrations, and manage logistics while enabling users to discover upcoming events and book tickets. It features a strict administrative moderation queue, where submissions are audited before appearing publicly. In addition, it connects with the Brevo API to send transactional confirmation receipts and trigger automatic payment reminder notifications.',
    features: [
      'Interactive User Event Discovery and Booking Pipeline.',
      'Role-based access control (RBAC) separating Admins, Organizers, and Attendees.',
      'Admin moderation dashboard featuring quick Event Approval & Rejection workflows.',
      'Automated transactional emails for booking confirmations via Brevo Email API.',
      'Triggerable payment reminder alerts sent directly from the admin panel.',
      'Normalized relational PostgreSQL database schema with strict constraints to prevent duplicate bookings.',
      'Responsive, modern administration panel designed with Tailwind CSS.'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Brevo API', 'JWT Authentication', 'Tailwind CSS', 'REST APIs'],
    challenges: 'Designing a normalized relational schema in PostgreSQL to handle many-to-many relationships (users, events, and bookings) while ensuring referential integrity and preventing duplicate registrations. We also had to build a robust status-tracking system for asynchronous transactional emails (confirmations and reminders) utilizing the external Brevo API.',
    learningOutcomes: 'Mastered SQL queries, schema normalization, and database migrations in PostgreSQL. Gained practical experience in implementing token-based authentication (JWT) and role-based route protection. Learned how to integrate third-party transactional mailers (Brevo API) with backend event triggers.',
    useCase: 'Colleges, organizers, and local communities that need a unified platform to host events, manage attendee registrations, and automate confirmation workflows.',
    architecture: 'A client-server architecture using React on the frontend and Node/Express on the backend. Business logic and security gates query a PostgreSQL database for state management, while emails are dispatched asynchronously via the Brevo API layer.'
  },
  {
    id: 'nexcart',
    title: 'NexCart - Modern E-Commerce Platform',
    category: 'Full Stack',
    thumbnail: '/assets/Project2_img1.png',
    screenshots: [
      '/assets/Project2_img1.png',
      '/assets/Project2_img2.png',
      '/assets/Project2_img3.png',
      '/assets/Project2_img4.png'
    ],
    githubUrl: 'https://github.com/Jasbir001/NexCart',
    liveUrl: 'https://nex-cart-ochre.vercel.app/',
    shortDescription: 'A high-performance full-stack e-commerce platform built with Next.js App Router, MongoDB, and Node.js, featuring active catalog filtering and cart management.',
    fullDescription: 'NexCart is a high-performance full-stack e-commerce application designed to deliver a modern, responsive shopping experience. Leveraging Next.js App Router and Server-Side Rendering (SSR), the application connects to a MongoDB database to support real-time product browsing, category-based filtering, and shopping cart management. The project is under active development, with upcoming enhancements including secure admin product management dashboards, order tracking, inventory audits, and transactional email workflows.',
    features: [
      'Fast and responsive product browsing using Next.js Server-Side Rendering (SSR).',
      'Interactive shopping cart management and local state synchronization.',
      'Dynamic product category filtering and catalog search.',
      'Secure user authentication and token management.',
      'Robust database schema designed with Mongoose for products, carts, and users.',
      'Fully responsive UI layout customized using Tailwind CSS.'
    ],
    techStack: ['Next.js', 'React.js', 'MongoDB', 'Mongoose', 'Node.js', 'Tailwind CSS', 'JWT Authentication', 'REST APIs'],
    challenges: 'Structuring a scalable architecture using the Next.js App Router and balancing Server-Side Rendering (SSR) with Client-side state hydration for the shopping cart. We also had to plan a secure relational schema in MongoDB for products, carts, and user sessions while designing the future role-based admin panel logic.',
    learningOutcomes: 'Deepened understanding of Next.js App Router architecture and server actions. Gained experience in designing complex schemas with Mongoose and managing server-client state hydration. Learned best practices for designing role-based admin dashboard workflows.',
    useCase: 'Online retailers and small businesses that require a scalable, modern e-commerce solution to manage catalogs, customer checkouts, inventory, and analytics.',
    architecture: 'A modern hybrid architecture using Next.js. The frontend utilizes React with server-side rendering for catalog visibility and client-side React hooks for active shopping cart interactions. The backend interacts with a MongoDB cluster via Mongoose for persistent data storage.'
  },
 
];
export const categories = ['All', 'MERN Stack', 'Full Stack', 'Backend Heavy'];
