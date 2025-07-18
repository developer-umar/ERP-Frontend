import React, { useLayoutEffect,useRef,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// Placeholder for local images (replace with actual asset paths)
import collegeBg from "../assets/college.webp"; // Background image
import collegeLogo from "../assets/collegeLogo.jpg"; // MIT logo

// Memoized LoginCard for performance
const LoginCard = React.memo(({ title, icon, route, description, index }) => {
  const cardRef = useRef();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (cardRef.current) {
      const animation = gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          delay: 0.3 + index * 0.15,
          duration: 1,
          ease: "power3.out",
        }
      );

      return () => animation.kill(); // Cleanup to prevent memory leaks
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={() => navigate(route)}
      className="cursor-pointer w-full max-w-xs bg-white/95 backdrop-blur-lg rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center border border-gray-200 opacity-0"
    >
      <div className="w-16 h-16 mb-4 text-mit-blue">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
      <p className="text-sm text-gray-500 text-center mt-1">{description}</p>
    </div>
  );
});

// Memoized QuickLink for performance
const QuickLink = React.memo(({ title, route, index }) => {
  const linkRef = useRef();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (linkRef.current) {
      const animation = gsap.fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay: 0.2 + index * 0.1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      return () => animation.kill(); // Cleanup
    }
  }, [index]);

  return (
    <div
      ref={linkRef}
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white/10 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-mit-blue hover:text-white transition duration-300 border border-white/20 opacity-0"
    >
      {title}
    </div>
  );
});

// SVG icons
const icons = {
  student: {
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01-12.32 0L12 14z" />
      </svg>
    ),
    description: "Access courses, grades, schedules, and campus resources.",
  },
  teacher: {
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: "Manage classes, submit grades, and access academic tools.",
  },
  admin: {
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    description: "Oversee operations, manage data, and ensure smooth workflows.",
  },
  counsellor: {
    icon: (
      <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4-8v12m-4-4H7a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
      </svg>
    ),
    description: "Provide academic and personal guidance to students.",
  },
};

// Feature data
const features = [
  {
    title: "Seamless Integration",
    description: "Connect academic and administrative functions in one intuitive platform.",
  },
  {
    title: "Real-Time Insights",
    description: "Access live data and analytics for informed decision-making.",
  },
  {
    title: "Secure & Accessible",
    description: "A secure, cloud-based system accessible anytime, anywhere.",
  },
];

const Home = () => {
  const quickLinks = [
    { title: "Academic Calendar", route: "/academic-calendar" },
    { title: "Campus Services", route: "/campus-services" },
    { title: "IT Helpdesk", route: "/helpdesk" },
    { title: "Library Resources", route: "/library" },
  ];

  const headingRef = useRef();
  const containerRef = useRef();

  useLayoutEffect(() => {
    if (headingRef.current && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power4.out",
          }
        );
      }, containerRef);

      return () => ctx.revert(); // Cleanup GSAP context
    }
  }, []);

  // Preload images to ensure they load before animations
  useEffect(() => {
    const preloadImages = [collegeBg, collegeLogo];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${collegeBg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50"></div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <img
          src={collegeLogo}
          alt="MIT Logo"
          className="w-24 sm:w-28 md:w-32 mb-6 drop-shadow-xl rounded-full"
        />

        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-center opacity-0"
        >
          MIT Enterprise Resource Portal
        </h1>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl text-center max-w-2xl mb-10">
          Empowering the MIT community with a unified platform for academic and administrative excellence.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-6xl mb-12 sm:mb-16">
          {Object.entries(icons).map(([key, { icon, description }], i) => (
            <LoginCard
              key={key}
              index={i}
              title={`${key.charAt(0).toUpperCase() + key.slice(1)} Portal`}
              icon={icon}
              route={`/${key}-login`}
              description={description}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="w-full max-w-5xl mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">Why Choose MIT ERP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {features.map(({ title, description }, i) => (
              <div
                key={title}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full max-w-5xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">
            Quick Links
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-6">
            Access key resources to enhance your MIT journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <QuickLink key={link.route} index={i} {...link} />
            ))}
          </div>
        </div>

        <footer className="text-center mt-6 text-sm text-gray-400">
          © 2025 Massachusetts Institute of Technology. All rights reserved.
        </footer>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        :root {
          --mit-blue: #005a9c;
          --transition: all 300ms ease;
        }
        .text-mit-blue {
          color: var(--mit-blue);
        }
        .hover\:bg-mit-blue:hover {
          background-color: var(--mit-blue);
        }
      `}</style>
    </div>
  );
};

export default Home;