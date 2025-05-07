import React, { ReactNode } from 'react'
import HeaderWidget from './HeaderWidget';
import FooterWidget from './FooterWidget';

interface PageCoverProps {
    children: ReactNode;
    showHeader: boolean;
}

const PageCover: React.FC<PageCoverProps> = ({ children, showHeader = true }) => {
    return (
        <main className="bg-black h-screen overflow-x-hidden  font-(family-name:--Canva-Sans)">
            <div
                style={{
                    bottom: "calc(100% - min(var(--framer-viewport-height, 100%), 100%) - .5px)",
                    flex: "none",
                    left: 0,
                    order: 1008,
                    pointerEvents: "none",
                    position: "fixed",
                    right: 0,
                    top: 0,
                    zIndex: 10,
                }}
            >

                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundSize: "128px",
                        backgroundRepeat: "repeat",
                        backgroundImage: "url('/images/grainy-noise.png')",
                        opacity: 0.06,
                        borderRadius: 0,
                    }}
                ></div>
            </div>

            {
                showHeader ? <HeaderWidget /> : ''
            }
            <section className="h-auto text-white   bg-black bg-cover bg-no-repeat relative" >
                <div className="hidden lg:flex absolute top-4 left-30 overflow-hidden ">
                    <svg width="1400" height="900" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0V696" stroke="#4A5565" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M601 0V696" stroke="#4A5565" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M301 0V696" stroke="#4A5565" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M901 0V696" stroke="#4A5565" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M1201 0V696" stroke="#4A5565" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                    </svg>
                </div>

                <div className="flex justify-center ">
                    <div className="
         border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] 
         bg-[size:10px_10px] bg-fixed top-0 [--pattern-fg:var(--color-black)]/5  max-lg:border-t lg:border-l 
         dark:[--pattern-fg:var(--color-white)]/10 w-[30px] left-0 h-auto">
                    </div>

                    <div className="w-full mt-3">
                        {children}

                    </div>

                    <div className="
         border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] 
         bg-[size:10px_10px] bg-fixed top-0 [--pattern-fg:var(--color-black)]/5  max-lg:border-t lg:border-l 
         dark:[--pattern-fg:var(--color-white)]/10 w-[30px] left-0 h-auto">
                    </div>
                </div>

                <FooterWidget />

            </section>
        </main>
    )
}


export default PageCover;