'use client'
import Image from "next/image";
import { PageCover, MenuItemWidget } from "@/components/general";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';


gsap.registerPlugin(ScrollTrigger);

export default function Home() {


  const items = [
    { number: 1, title: 'UIUX' },
    { number: 2, title: 'WEB DESIGN' },
    { number: 3, title: 'LANDING PAGE DESIGN', isActive: true },
    { number: 4, title: 'UI DESIGN FIGMA' },
    { number: 5, title: 'MOBILE APP DESIGN' },
    { number: 6, title: 'DESKTOP APP DESIGN' },
  ]

  const slides = [
    {
      title: "UI/UX Design",
      subtitle: "Crafting intuitive, engaging interfaces",
      tools: ["Figma", "Adobe XD", "Sketch", " InVision"],
      // bg: "bg-gradient-to-r from-pink-400 to-purple-500",
    },
    {
      title: "Frontend Development",
      subtitle: "Interactive, fast, pixel-perfect",
      tools: ["TailwindCSS", "Next.js", " TypeScript",],
      // bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      title: "Backend Development",
      subtitle: "Reliable, scalable, and secure",
      tools: ["Node.js", "Laravel", "PostgreSQL"],
      bg: "bg-gradient-to-r from-gray-700 to-black",
    },
    // {
    //   title: "Machine Learning",
    //   subtitle: "Teaching systems to learn and predict",
    //   tools: ["Python", "TensorFlow", "scikit-learn"],
    //   // bg: "bg-gradient-to-r from-yellow-400 to-red-500",
    // },
  ];

  const getToolStyle = (index: number): React.CSSProperties => {
    const styles = [
      { top: '30%', left: '10%', transform: 'rotate(-15deg)', fontSize: "2.5rem" },
      { top: '50%', left: '40%', transform: 'rotate(10deg)', fontSize: "1.5rem" },
      { top: '70%', left: '75%', transform: 'rotate(-5deg)', fontSize: "1rem" },
      { top: '80%', left: '5%', transform: 'rotate(-5deg)', fontSize: "1.5rem" },
    ];
    return styles[index] || {};
  };


  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = containerRef.current.querySelectorAll(".char");

    gsap.fromTo(
      targets,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  // const text = "MARK OKECHUKWU";



  return <>
    <PageCover showHeader={true}>
      <div className="flex flex-col items-center justify-items-center min-h-screen">

        <div className="relative flex flex-col md:flex-row lg:h-screen border-b border-transparent md:border-black ">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className="size-8 absolute bottom-0 lg:bottom-30 lg:left-10"
            aria-hidden="true"
            animate={{
              rotate: [0, -180],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          >
            <path
              d="M25.66 17.636L40 20L25.66 22.364C23.968 22.644 22.64 23.968 22.364 25.66L20 40L17.636 25.66C17.356 23.968 16.032 22.64 14.34 22.364L0 20L14.34 17.636C16.032 17.356 17.36 16.032 17.636 14.34L20 0L22.364 14.34C22.644 16.032 23.968 17.36 25.66 17.636Z"
              fill="#E4DFFB"
            />
          </motion.svg>

          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className="size-8 left-10 absolute top-0"
            aria-hidden="true"
            animate={{
              rotate: [0, -180],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          >
            <path
              d="M25.66 17.636L40 20L25.66 22.364C23.968 22.644 22.64 23.968 22.364 25.66L20 40L17.636 25.66C17.356 23.968 16.032 22.64 14.34 22.364L0 20L14.34 17.636C16.032 17.356 17.36 16.032 17.636 14.34L20 0L22.364 14.34C22.644 16.032 23.968 17.36 25.66 17.636Z"
              fill="#E4DFFB"
            />
          </motion.svg>

          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className="size-20 absolute bottom-50 -left-50"
            aria-hidden="true"
            animate={{
              rotate: [0, -180],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          >
            <path
              d="M25.66 17.636L40 20L25.66 22.364C23.968 22.644 22.64 23.968 22.364 25.66L20 40L17.636 25.66C17.356 23.968 16.032 22.64 14.34 22.364L0 20L14.34 17.636C16.032 17.356 17.36 16.032 17.636 14.34L20 0L22.364 14.34C22.644 16.032 23.968 17.36 25.66 17.636Z"
              fill="#E4DFFB"
            />
          </motion.svg>

          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className="size-10 absolute top-10 right-10 md:right-0 fill-white md:fill-black"
            aria-hidden="true"
            animate={{
              rotate: [0, -180],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            }}
          >
            <path
              d="M25.66 17.636L40 20L25.66 22.364C23.968 22.644 22.64 23.968 22.364 25.66L20 40L17.636 25.66C17.356 23.968 16.032 22.64 14.34 22.364L0 20L14.34 17.636C16.032 17.356 17.36 16.032 17.636 14.34L20 0L22.364 14.34C22.644 16.032 23.968 17.36 25.66 17.636Z"
            />
          </motion.svg>
          <div className="w-full md:w-6/12 relative h-screen">

            <div className=" flex justify-center items-center ">
              <Image data-scroll data-scroll-speed="2" priority width={1500} height={1500} alt="Mark Okechukwu post" src="/images/picture.png" className="min-w-[500px] w-[900px] md:w-auto" draggable="false" />

              <button className="animate-bounce absolute bottom-[100px] md:bottom-20">
                <svg className="size-10 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" >
                  <path d="M23.970703 4.9726562 A 2.0002 2.0002 0 0 0 22 7L22 36.171875L11.414062 25.585938 A 2.0002 2.0002 0 1 0 8.5859375 28.414062L22.585938 42.414062 A 2.0002 2.0002 0 0 0 25.414062 42.414062L39.414062 28.414062 A 2.0002 2.0002 0 1 0 36.585938 25.585938L26 36.171875L26 7 A 2.0002 2.0002 0 0 0 23.970703 4.9726562 z" />
                </svg>
              </button>
            </div>

            {/* <div
              ref={containerRef}
              data-scroll
              data-scroll-speed="2"
              className="space-y-4 text-center">

              <h1 className="text-3xl md:text-5xl font-semibold text-white font-(family-name:--Canva-Sans-Display)">
                {text.split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block char"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-white font-(family-name:--Canva-Sans-Display)">
              Mark Okechukwu
            </h1>



          </div>
          <div className="w-full md:w-6/12 bg-red-700 relative">

            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect={'fade'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              autoplay={{
                delay: 5000, // 5 seconds
                disableOnInteraction: false,
              }}
              loop={true}

              className="h-[50vh] mx-10 md:h-screen"

            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className={`w-80 h-96 p-6  text-black grid place-items-center  bg-white`}>
                  {/* ${slide.bg} */}
                  <h2 className="text-3xl md:text-4xl lg:text-6xl max-w-md  text-center font-bold">{slide.title}</h2>
                  <p className="mt-2 text-xl md:text-2xl">{slide.subtitle}</p>

                  <ul className="mt-4 space-y-1 grid grid-cols-3">
                    {slide.tools.map((tool, idx) => (
                      <li key={idx} className="text-sm absolute" style={getToolStyle(idx)}>{tool}</li>
                    ))}
                  </ul>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>

        </div>


        <div className="h-auto lg:h-screen w-full  flex justify-center items-center bg-white">
          <div className="flex flex-col md:flex-row py-10 w-full mx-3 justify-center items-center gap-y-10">
            <div className="w-full md:w-6/12 ">

              <h1 data-scroll data-scroll-speed="2" className="text-3xl md:text-7xl lg:text-8xl text-center text-black font-semibold font-(family-name:--Canva-Sans-Display) uppercase">About</h1>


              <p data-scroll data-scroll-speed="2" className="mt-10 text-left mx-3 md:max-w-[500px] lg:max-w-[700px] leading-8 text-xl text-black">
                In the symphony of software, I am both the composer and conductor blending architecture with artistry to craft seamless digital experiences.
              </p>
              <p data-scroll data-scroll-speed="2" className="mt-10 text-left mx-3 md:max-w-[500px] lg:max-w-[700px] leading-8 text-xl text-black">
                Welcome to my digital atelier. I&apos;m Mark Okechukwu, a Software Architect & Developer driven by elegance in engineering. Here, code meets creativity, systems breathe with soul, and technology becomes a canvas.

                Explore my world—where I don&apos;t just build software, I sculpt solutions.
              </p>
            </div>

            <div data-scroll data-scroll-speed="2" className="w-full md:w-6/12 flex justify-center">
              <Image src="/images/picture-stand.png" alt="Standing image" width={600} height={600} className="w-[400px]" priority />
            </div>
          </div>

        </div>


        <div className="h-auto w-full mt-10 flex flex-col items-center my-10 bg-black">

          <h1 data-scroll data-scroll-speed="2" className="text-2xl md:text-7xl font-semibold lg:max-w-[700px] mt-10  text-center uppercase">the service i provide</h1>
          <p data-scroll data-scroll-speed="2" className="uppercase text-center md:leading-8 text-lg md:text-xl max-w-[700px] mt-4 ">Creating visual appealing and functional websites tailored to the client&apos;s need and goals,providing a consistent user experience across platforms</p>
          <div className="mt-10 w-full max-w-4xl px-2">
            {items.map((item, index) => (
              <MenuItemWidget
                key={index}
                number={item.number}
                title={item.title}
              />
            ))}

          </div>


        </div>

        <div className="h-[50vh] relative lg:h-screen w-full mt-10 flex flex-col items-center my-10 border-t border-white">
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden">
            <div className="w-full h-full ">
              <video
                crossOrigin="anonymous"
                autoPlay
                playsInline
                loop
                muted
                className="w-full h-auto object-cover"
              >
                <source
                  src="/videos/ropes.mp4"
                  media="(min-width:768px)"
                  type="video/mp4"
                />
                <source
                  src="/videos/ropes-sm.mp4?2"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

            </div>
          </div>

          <div className="flex flex-col justify-center h-full text-center relative">
            <div className="">
              <h2 className="text-6xl md:text-8xl">
                <div>Have</div>
                <div><em>an</em> idea?</div>
              </h2>

              <Link
                href="/contact"
                className="border border-white h-auto block rounded-full px-5 py-3 lg:py-4 mt-10 
                text-white hover:text-black tracking-wider bg-transparent hover:bg-white transition-all duration-300 ease-in-out"
                style={{ pointerEvents: "auto" }}
              >

                <span data-text="Tell me" className="text-4xl md:text-6xl uppercase">Tell me</span>
              </Link>


            </div>
          </div>
        </div>

        {/* mt-10 my-10 */}
        <div className="h-[50vh] relative lg:h-screen w-full  flex flex-col justify-center items-center  bg-white">

          <p className="absolute text-xl  md:text-2xl top-0 md:top-2 bg-clip-text text-transparent bg-linear-90 from-black/40 via-black to-black/40">FIGMA</p>
          <p className="absolute text-xl  md:text-2xl top-10 left-2 md:left-10 bg-clip-text text-transparent bg-linear-90 from-black/40 via-black to-black/40">LINKEDIN</p>
          <p className="absolute text-xl  md:text-2xl top-15 md:top-20 right-2 md:right-10 bg-clip-text text-transparent bg-linear-90 from-black/40 via-black to-black/40">FACEBOOK</p>
          <p className="absolute text-xl  md:text-2xl top-15 md:top-20 left-[40%] md:left-[30%] bg-clip-text text-transparent bg-linear-90 from-black/40 via-black to-black/40">GITHUB</p>
          <p className="absolute text-xl  md:text-2xl top-32 md:top-20 right-[40%] md:right-[30%] bg-clip-text text-transparent bg-linear-90 from-black/40 via-black to-black/40">COMMUNITY</p>

          <h1 data-scroll data-scroll-speed="2" className="text-5xl md:text-6xl lg:text-[9rem] bg-clip-text text-transparent bg-linear-90 from-black/50 via-black to-black/50 font-semibold">
            LET&apos;S TALK
          </h1>

          <div data-scroll data-scroll-direction="horizontal" className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4 lg:mt-10">
            <Link data-scroll-speed="3" href="/app" className="magnetic transition-all md:text-xl block px-5 py-3 lg:py-4 rounded-full text-white hover:text-black tracking-wider bg-black hover:bg-transparent border-2 border-transparent hover:border-black text-center uppercase">
              Instagram
            </Link>

            <Link data-scroll-speed="4" href="/app" className="magnetic transition-all md:text-xl block px-5 py-3 lg:py-4 rounded-full text-white hover:text-black tracking-wider bg-black hover:bg-transparent border-2 border-transparent hover:border-black text-center uppercase">
              LINKEDIN
            </Link>

            <Link data-scroll-speed="5" href="/app" className="magnetic transition-all md:text-xl block px-5 py-3 lg:py-4 rounded-full text-white hover:text-black tracking-wider bg-black hover:bg-transparent border-2 border-transparent hover:border-black text-center uppercase">
              WHATSAPP
            </Link>

            <Link data-scroll-speed="6" href="/contact" className="magnetic transition-all md:text-xl block px-5 py-3 lg:py-4 rounded-full text-white hover:text-black tracking-wider bg-black hover:bg-transparent border-2 border-transparent hover:border-black text-center uppercase">
              CONTACT ME
            </Link>
          </div>



          <motion.button
            className="group isolate z-0 grid place-items-center mt-10 leading-snug text-white will-change-transform cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Link href="/contact" className="z-10 grid place-items-center gap-1.5 self-center justify-self-center [grid-area:1/-1]">
              <div>Contact Me</div>

              <motion.div
                aria-hidden="true"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15 11"
                  fill="none"
                  className="mt-1 w-5 text-[#DBDAE8] transition duration-300 ease-out group-hover:text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M1 4.8C0.613401 4.8 0.3 5.1134 0.3 5.5C0.3 5.8866 0.613401 6.2 1 6.2L1 4.8ZM14.495 5.99498C14.7683 5.72161 14.7683 5.27839 14.495 5.00503L10.0402 0.550253C9.76684 0.276886 9.32362 0.276886 9.05025 0.550253C8.77689 0.823621 8.77689 1.26684 9.05025 1.5402L13.0101 5.5L9.05025 9.4598C8.77689 9.73317 8.77689 10.1764 9.05025 10.4497C9.32362 10.7231 9.76683 10.7231 10.0402 10.4497L14.495 5.99498ZM1 6.2L14 6.2L14 4.8L1 4.8L1 6.2Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            </Link>

            <motion.div
              aria-hidden="true"
              className="self-center justify-self-center [grid-area:1/-1]"
              animate={{ rotate: [0, 180] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-32 text-black transition duration-500 ease-out will-change-transform group-hover:scale-110 group-hover:text-zinc-900 dark:text-[#181a25] dark:group-hover:text-black"
                viewBox="0 0 133 133"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M133 66.5028C133 58.2246 128.093 50.5844 119.798 44.4237C121.305 34.2085 119.374 25.3317 113.518 19.4759C107.663 13.6202 98.7915 11.689 88.5707 13.1967C82.4213 4.9071 74.7811 0 66.5028 0C58.2246 0 50.5844 4.9071 44.4237 13.2023C34.2085 11.6946 25.3317 13.6258 19.4759 19.4816C13.6202 25.3374 11.689 34.2086 13.1967 44.4293C4.9071 50.5787 0 58.2246 0 66.5028C0 74.7811 4.9071 82.4213 13.2023 88.582C11.6946 98.7971 13.6258 107.674 19.4816 113.53C25.3374 119.385 34.2086 121.317 44.4293 119.809C50.5844 128.099 58.2302 133.011 66.5085 133.011C74.7867 133.011 82.4269 128.104 88.5876 119.809C98.8027 121.317 107.68 119.385 113.535 113.53C119.391 107.674 121.322 98.8027 119.815 88.582C128.104 82.4269 133.017 74.7811 133.017 66.5028H133Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            <div className="hidden size-20 self-center justify-self-center bg-black-400/70 blur-3xl [grid-area:1/-1] dark:block" aria-hidden="true"></div>
          </motion.button>

        </div>

      </div>

    </PageCover>
  </>
}

