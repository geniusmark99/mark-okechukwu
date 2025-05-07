import Image from "next/image";
import { PageCover } from "@/components/general";

export default function Home() {
  return <>
    <PageCover showHeader={true}>
      <div className="flex flex-col items-center justify-items-center min-h-screen  gap-16">

        <div className="mt-10 ">
          <div className="my-4 flex justify-center items-center">
            <Image priority width={1500} height={1500} alt="Mark Okechukwu post" src="/images/picture.png" className="min-w-[500px] w-[900px] md:w-auto" draggable="false" />

          </div>
          <h1 className="text-3xl md:text-7xl text-center font-semibold font-(family-name:--Canva-Sans-Display)">MARK OKECHUKWU</h1>
        </div>


        <div className="h-auto lg:h-screen w-full mt-10 flex justify-center items-center bg-white">
          <div className="flex flex-col md:flex-row py-10 w-full mx-3 justify-center items-center gap-y-10">
            <div className="w-full md:w-6/12 ">
              <h1 className="text-3xl md:text-7xl lg:text-8xl text-center text-black font-semibold font-(family-name:--Canva-Sans-Display) uppercase">About</h1>
              <p className="mt-10 text-left mx-3 md:max-w-[500px] lg:max-w-[700px] leading-8 text-xl text-black">
                In the symphony of software, I am both the composer and conductor blending architecture with artistry to craft seamless digital experiences.
              </p>
              <p className="mt-10 text-left mx-3 md:max-w-[500px] lg:max-w-[700px] leading-8 text-xl text-black">
                Welcome to my digital atelier. I&apos;m Mark Okechukwu, a Software Architect & Developer driven by elegance in engineering. Here, code meets creativity, systems breathe with soul, and technology becomes a canvas.

                Explore my world—where I don&apos;t just build software, I sculpt solutions.
              </p>
            </div>

            <div className="w-full md:w-6/12 flex justify-center">
              <Image src="/images/picture-stand.png" alt="Standing image" width={600} height={600} className="w-[400px]" priority />
            </div>
          </div>

        </div>


        <div className="h-auto lg:h-screen w-full mt-10 flex justify-center items-center bg-black">


        </div>

      </div>

    </PageCover>
  </>
}

