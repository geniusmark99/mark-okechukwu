'use client'
import Image from "next/image";
import { PageCover } from "@/components/general";
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import {
  Brush,
  Code2,
  Database,
  Network,
  X,
  Briefcase,
  BarChart3,
} from "lucide-react";


const SplitText = ({ text, className = "", delay = 0 }: { text: string; className?: string, delay?: number }) => {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} style={{ perspective: "1000px" }}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="char inline-block origin-bottom"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 100, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};


gsap.registerPlugin(ScrollTrigger);

export default function Home() {





  type SkillItem = {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    focus: string;
    bgText: string;
  };

  const skills: SkillItem[] = [
    {
      title: "UI / UX DESIGN",
      subtitle: "Designing Experiences that Speak Without Words",
      description:
        "I create digital interfaces that feel as natural as they look. From wireframes to polished prototypes, I blend user psychology with modern design principles to craft intuitive and accessible experiences. Every screen tells a story — one where the user is always the hero.",
      icon: <Brush className="w-12 h-12 text-pink-500" />,
      focus:
        "Tools & Focus: Figma • Adobe XD • User Flow Mapping • Interaction Design • Accessibility • Responsiveness",
      bgText: "UI",
    },
    {
      title: "Frontend Development",
      subtitle: "Turning Designs into Dynamic Reality",
      description:
        "I bring interfaces to life using powerful frontend technologies — ensuring performance, accessibility, and flawless responsiveness. I build visually consistent experiences that feel alive and intuitive.",
      icon: <Code2 className="w-12 h-12 text-blue-500" />,
      focus:
        "Tools & Focus: React • Next.js • Nuxt.js • Angular • TypeScript • TailwindCSS • GSAP • Framer Motion",
      bgText: "FE",
    },
    {
      title: "Backend Development",
      subtitle: "Powering the Engine Behind Every Interaction",
      description:
        "I develop secure, scalable, and efficient backend systems — from REST APIs to full-blown distributed architectures — ensuring data integrity, speed, and seamless communication between client and server.",
      icon: <Database className="w-12 h-12 text-green-500" />,
      focus:
        "Tools & Focus: Laravel • Node.js • Express.js • Django • Spring Boot • RESTful APIs • Authentication • Cloud Deployment",
      bgText: "BE",
    },
    {
      title: "Software Architecture",
      subtitle: "Designing Systems That Scale Beyond Boundaries",
      description:
        "Every robust software starts with a strong architecture. I design modular, maintainable, and future-proof systems using proven patterns and domain-driven design principles.",
      icon: <Network className="w-12 h-12 text-purple-500" />,
      focus:
        "Tools & Focus: System Design • Domain-Driven Design • Microservices • Clean Architecture • Cloud Infrastructure • Scalability",
      bgText: "SA",
    },
    {
      title: "Technical Management",
      subtitle: "Transforming Vision Into Execution",
      description:
        "I lead teams, define strategy, and ensure smooth coordination between design, development, and delivery — driving clarity, focus, and measurable results in every sprint.",
      icon: <Briefcase className="w-12 h-12 text-yellow-500" />,
      focus:
        "Tools & Focus: Agile • Scrum • Jira • Team Leadership • Product Planning • Communication • Decision Making",
      bgText: "PM",
    },
    {
      title: "Data Analysis",
      subtitle: "Transforming Raw Data Into Intelligent Action",
      description:
        "I interpret complex data sets to extract insights that fuel smarter business decisions, identify trends, and support predictive strategies — making numbers tell meaningful stories.",
      icon: <BarChart3 className="w-12 h-12 text-teal-400" />,
      focus:
        "Tools & Focus: Python • Pandas • Power BI • Tableau • SQL • NumPy • Data Visualization • Insights Reporting",
      bgText: "DA",
    },
  ];




  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;



    // Add magnetic effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const ev = e as MouseEvent;
        const position = btn.getBoundingClientRect();
        const x = ev.pageX - position.left - position.width / 2;
        const y = ev.pageY - position.top - position.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.5,
          duration: 0.5,
          ease: 'power3.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    });
  }, []);



  const SkillCard = ({
    skill,
    isOpen,
    onToggle,
  }: {
    skill: SkillItem;
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <div className="group rounded-[24px] h-full overflow-hidden relative flex flex-col gap-y-5 justify-center items-center p-8 bg-white/[0.03] border border-white/10 backdrop-blur-3xl text-white shadow-2xl transition-all duration-700 w-full hover:bg-white/[0.05]">
      {/* Floating Orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="absolute bottom-[-20px] text-[15rem] font-bold rotate-12 right-[-10px] bg-clip-text text-transparent bg-linear-90 from-white/10 via-white/10 to-white/10 opacity-10 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
        {skill.bgText}
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="group-hover:scale-110 transition-transform duration-500">
          {skill.icon}
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center mt-6 tracking-wide">
          {skill.title}
        </h1>
        <p className="text-center text-sm italic text-gray-400 mt-2 font-light">{skill.subtitle}</p>
      </div>

      <p className="p-2 leading-relaxed z-10 text-gray-300 text-center font-light">
        {skill.description}
      </p>

      <button
        onClick={onToggle}
        className="mt-auto bg-white/10 hover:bg-white border border-white/20 hover:border-white text-white hover:text-black px-6 py-2.5 rounded-full z-10 hover:cursor-pointer cursor-pointer transition-all duration-300 backdrop-blur-md uppercase tracking-widest text-xs font-bold"
      >
        {isOpen ? "Hide tools" : "View tools"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl border border-white/20 rounded-[24px] p-8 text-center text-gray-200 z-20 flex flex-col justify-center items-center"
          >
            <button
              className="absolute right-6 top-6 p-2 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors"
              onClick={onToggle}
            >
              <X size={20} className="stroke-[3]" />
            </button>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-inner w-full max-w-sm">
              <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-widest">Tech Stack</h3>
              <p className="text-sm md:text-base leading-loose text-gray-300">{skill.focus}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );



  const [openIndex, setOpenIndex] = useState<number | null>(null);




  return <>
    <PageCover showHeader={true}>
      <div ref={containerRef} className="flex flex-col items-center justify-items-center min-h-screen">

        {/* NEW EPIC CREATIVE HERO SECTION */}
        <div className="flex justify-center items-center h-[90vh] lg:h-screen w-full relative bg-black border-b border-white/5 overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)"
          }}
        >
          {/* Animated Background Orbs for WOW factor */}
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none mix-blend-screen" />
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none mix-blend-screen" />

          {/* Majestic Typography Behind the 3D Image */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none pb-20">
            <h1 className="text-[28vw] md:text-[20vw] leading-[0.8] text-center font-black text-white/90 font-(family-name:--Canva-Sans-Display) tracking-tighter drop-shadow-2xl mix-blend-plus-lighter">
              <SplitText text="MARK" delay={0.2} />
            </h1>
            <h1 className="text-[22vw] md:text-[16vw] leading-[0.8] text-center font-black text-white/80 font-(family-name:--Canva-Sans-Display) tracking-tighter drop-shadow-xl -mt-4 md:-mt-12 mix-blend-plus-lighter">
              <SplitText text="OKECHUKWU" delay={0.5} />
            </h1>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

          {/* Focal 3D Model */}
          <div className="w-full h-full flex flex-col justify-center items-center relative z-30 pt-32">
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Image
                data-scroll data-scroll-speed="3"
                priority width={1000} height={1000}
                alt="Mark Okechukwu 3D Avatar"
                src="/images/mark-okechukwu-3d.png"
                className="w-[280px] min-[320px]:w-[320px] md:w-[480px] lg:w-[620px] object-contain drop-shadow-2xl z-40 relative"
                draggable="false"
              />
            </motion.div>
          </div>

          {/* Subtle Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </div>


        {/* CINEMATIC ABOUT SECTION */}
        <div className="relative w-full min-h-[90vh] flex flex-col justify-center items-center bg-black border-t border-white/5 overflow-hidden py-20 lg:py-0">

          {/* Subtle noise and light beam */}
          <div className="absolute top-0 right-1/4 w-[1px] h-[30vh] bg-gradient-to-b from-blue-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.5)] hidden lg:block"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 w-full max-w-7xl mx-auto px-6 z-20 relative items-center">
            {/* Left Side: Header & Content */}
            <div className="lg:col-span-6 flex flex-col justify-center relative">
              <div className="mb-10">
                <span className="text-pink-500 tracking-[0.3em] text-sm font-bold uppercase mb-4 block">01 // The Architect</span>
                <h1 className="text-5xl min-[320px]:text-6xl md:text-8xl lg:text-[7rem] font-black leading-none text-white font-(family-name:--Canva-Sans-Display) uppercase drop-shadow-2xl mix-blend-plus-lighter">
                  <SplitText text="ABOUT" delay={0.1} />
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mt-6 rounded-full"></div>
              </div>

              <div className="relative p-8 md:p-10 bg-white/[0.02] border border-white/10 rounded-[32px] backdrop-blur-3xl shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <p className="text-2xl md:text-3xl text-white/90 font-light leading-snug tracking-wide mb-6">
                  In the symphony of software, I am both the <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">composer and conductor</span>.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed font-light">
                  Welcome to my digital atelier. I&apos;m Mark Okechukwu, a Software Architect & Developer driven by elegance in engineering. Here, code meets creativity, systems breathe with soul, and technology becomes a canvas. <br /><br />
                  Explore my world—where I don&apos;t just build software, <span className="text-white">I sculpt solutions.</span>
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="lg:col-span-6 flex flex-col justify-center items-center relative mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-30 flex justify-center w-full"
              >
                <div className="relative w-full flex justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full mix-blend-screen w-3/4 h-3/4 m-auto"></div>
                  <Image src="/images/mark-okechukwu-3d-2.png" alt="Standing image" width={1000} height={1000} className="w-[300px] md:w-[450px] lg:w-[500px] object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-700" priority />
                </div>
              </motion.div>
            </div>
          </div>
        </div>


        {/* CINEMATIC EXPERTISE SECTION */}
        <div className="relative w-full py-32 bg-black border-t border-white/5 overflow-hidden flex flex-col items-center">
          {/* Marquee Background Text */}
          <div className="absolute top-10 whitespace-nowrap overflow-hidden flex z-0 opacity-[0.03] pointer-events-none">
            <motion.h1
              initial={{ x: "0%" }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="text-[12rem] lg:text-[15rem] font-black text-white"
            >
              EXPERTISE EXPERTISE EXPERTISE EXPERTISE EXPERTISE EXPERTISE
            </motion.h1>
          </div>

          <div className="z-10 text-center mb-20 relative">
            <span className="text-blue-500 tracking-[0.3em] text-sm font-bold uppercase mb-4 block">02 // Services</span>
            <h1 className="text-4xl min-[320px]:text-5xl md:text-7xl font-black text-white uppercase drop-shadow-lg font-(family-name:--Canva-Sans-Display)">
              <SplitText text="Core Mastery" delay={0.1} />
            </h1>
          </div>

          <div className="w-full max-w-7xl px-4 md:px-6 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 auto-rows-fr gap-4 lg:gap-5 z-20 relative">
              {skills.map((skill, index) => {
                const bentoClasses = [
                  "lg:col-span-8 md:col-span-4", // 0: wide
                  "lg:col-span-4 md:col-span-2", // 1: tall/square
                  "lg:col-span-4 md:col-span-2", // 2: square
                  "lg:col-span-4 md:col-span-2", // 3: square
                  "lg:col-span-4 md:col-span-2", // 4: square
                  "lg:col-span-12 md:col-span-4", // 5: hero wide
                ];

                return (
                  <motion.div
                    key={index}
                    className={`${bentoClasses[index]} h-full`}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <SkillCard
                      skill={skill}
                      isOpen={openIndex === index}
                      onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                  </motion.div>
                );
              })}

            </div>



          </div>


        </div>

        {/* PARALLAX VIDEO CTA */}
        <div className="h-[70vh] lg:h-screen relative w-full flex flex-col justify-center items-center overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 w-full h-full">
            <video crossOrigin="anonymous" autoPlay playsInline loop muted className="w-full h-full object-cover scale-110 opacity-40">
              <source src="/videos/ropes.mp4" media="(min-width:768px)" type="video/mp4" />
              <source src="/videos/ropes-sm.mp4?2" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black"></div>
          </div>

          <div className="relative z-20 text-center flex flex-col items-center px-4">
            <span className="text-white/60 tracking-[0.5em] text-xs font-bold uppercase mb-6 block border border-white/20 rounded-full px-6 py-2 backdrop-blur-md">03 // Initialization</span>
            <h2 className="text-4xl min-[320px]:text-5xl md:text-[8rem] font-black text-white leading-none mix-blend-plus-lighter font-(family-name:--Canva-Sans-Display) drop-shadow-2xl">
              <SplitText text="READY TO" delay={0.1} /> <br />
              <span className="italic font-light opacity-80"><SplitText text="BUILD?" delay={0.4} /></span>
            </h2>

            <Link href="/contact" className="group magnetic-btn relative overflow-hidden rounded-full mt-12 md:mt-16 px-10 md:px-12 py-4 md:py-5 bg-white/5 border border-white/20 backdrop-blur-lg hover:border-transparent transition-all duration-500">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 text-lg md:text-xl font-bold tracking-widest text-white uppercase flex items-center gap-4">
                Initiate Link <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* CINEMATIC FOOTER */}
      <div className="relative min-h-[70vh] w-full flex flex-col justify-end items-center bg-black pt-32 pb-4 overflow-hidden">

        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

        <div className="text-center w-full z-20 px-4">
          <h1 className="text-[15vw] leading-[0.8] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase tracking-tighter mix-blend-plus-lighter drop-shadow-2xl font-(family-name:--Canva-Sans-Display)">
            <SplitText text="LET'S TALK" delay={0.1} />
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl gap-4 md:gap-6 mt-16 md:mt-24 px-6 z-20">
          {['Instagram', 'LinkedIn', 'WhatsApp', 'Contact Me'].map((label) => (
            <Link key={label} href={label === 'Contact Me' ? '/contact' : '/app'} className="group relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all duration-500 p-6 md:p-8 flex items-end h-[120px] md:h-[160px] shadow-2xl backdrop-blur-xl">
              <div className="absolute top-4 right-4 text-white/20 group-hover:text-white transition-colors duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-500"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <span className="relative z-10 text-white/80 group-hover:text-white font-semibold uppercase tracking-widest text-xs md:text-sm">{label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-32 w-full flex flex-col md:flex-row justify-between items-center px-10 py-6 text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] relative z-20">
          <span>© 2026 MARK OKECHUKWU</span>
          <span className="mt-4 md:mt-0">CRAFTED WITH PRECISION</span>
        </div>
      </div>


    </PageCover>
  </>
}

