import { PageCover } from "@/components/general";

const Contact = () => {
    return <>
        <PageCover showHeader={true}>
            <div className="flex flex-col gap-y-10 md:flex-row my-10 h-auto md:h-[50vh]  mt-10 mx-4 md:mx-8 md:justify-center">
                <div className="w-full md:w-6/12">
                    <h1 className="text-4xl md:text-7xl  lg:text-8xl  text-center  md:max-w-[700px] md:text-left text-white">GET IN TOUCH</h1>
                    <p className="uppercase text-xl  md:mt-6 text-center md:max-w-[400px] md:text-left md:text-3xl text-white">I will reach out as soon as I get your message</p>
                </div>
                <div className="w-full md:w-6/12 flex justify-center">
                    <form action="#" className="w-full md:w-8/12 flex flex-col gap-y-10 z-[500]">
                        <div>
                            <input type="text" className="z-[3000] w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Full name" />
                        </div>

                        <div>
                            <input type="email" className="z-[3000] w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Email" />
                        </div>


                        <div>
                            <textarea className="z-[3000] w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Leave a message" />
                        </div>

                        <div>
                            <button type="submit" className="rounded-full px-3 py-2 bg-white text-black cursor-pointer hover:scale-105 transition-all">Send message</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-y-10 bg-white my-10 h-auto md:h-[50vh]  mt-10 mx-4 md:mx-8 md:justify-center text-black p-4 rounded-2xl">
                <div>
                    <h1 className="text-2xl md:text-4xl lg:text-7xl text-center uppercase">Read from me</h1>
                    <p className="text-lg md:text-xl text-center">Subscribe to my free Newsletters for actionable advice and mentorship in the tech space</p>
                </div>
                <div className="w-full flex justify-center items-center">

                    <form className="w-full md:max-w-[500px] lg:w-[400px] flex flex-col ">
                        <input type="email" className="z-[3000] w-full px-4 py-3 rounded-xl bg-black text-white" placeholder="Enter your Email" />
                        <button type="submit" className="rounded-xl mt-2 px-3 py-2 border-2 border-black bg-white text- cursor-pointer hover:scale-95 transition-all">Send message</button>

                    </form>
                </div>

            </div>
        </PageCover>
    </>
}

export default Contact;