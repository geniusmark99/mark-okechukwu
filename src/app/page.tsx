import Image from "next/image";
import { PageCover } from "@/components/general";

export default function Home() {
  return <>
    <PageCover showHeader={true}>
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

        <div className="mt-10">
          <div className="my-4 flex justify-center items-center">
            <Image priority width={1000} height={1000} alt="Mark Okechukwu post" src="/images/mark.webp" className="rounded-2xl" style={{ width: "auto", height: "auto" }} />

          </div>
          <h1 className="text-5xl md:text-7xl text-center font-semibold font-(family-name:--Canva-Sans-Display)">MARK OKECHUKWU</h1>
        </div>


        <div className="h-screen bg-red-700 w-full mt-10">
          <h1>My philosophy</h1>
        </div>

      </div>

    </PageCover>
  </>
}

