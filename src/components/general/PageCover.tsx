'use client'
import React, { ReactNode, useState, MouseEvent, useContext } from 'react';
import HeaderWidget from './HeaderWidget';
import FooterWidget from './FooterWidget';
import ContextMenuWidget from './ContextMenuWidget';
import { GradientContext } from './GradientContextWidget';
import { FaBeer, FaApple, FaReceipt, FaBell, FaBuyNLarge, FaStore } from 'react-icons/fa';


interface PageCoverProps {
    children: ReactNode;
    showHeader: boolean;
}



const PageCover: React.FC<PageCoverProps> = ({ children, showHeader = true }) => {


    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    const contextMenuItems = [
        {
            label: 'My Skills',
            icon: <FaApple />,
            children: [
                { label: 'Javascript', icon: <FaBuyNLarge />, onClick: () => alert('Track your business sales') },
                { label: 'Php', icon: <FaReceipt />, onClick: () => alert('Generate digital receipts') },
                { label: 'Laravel', icon: <FaStore />, onClick: () => alert('Track your Inventories') },
                { label: 'React(NextJs)', icon: <FaStore />, onClick: () => alert('Assign Staffs') },
                { label: 'Java', icon: <FaBell />, onClick: () => alert('Smart notification Reports') },
            ],
        },
        {
            label: 'My Hobbits',
            icon: <FaBeer />,
            children: [
                { label: 'Reading and Studying', icon: <FaReceipt />, onClick: () => alert('For Personal usage') },
                { label: 'Thinking and Creating', icon: <FaReceipt />, onClick: () => alert('For Personal usage') },
                { label: 'Coding and Building', icon: <FaReceipt />, onClick: () => alert('For Personal usage') },

            ],
        }

    ];


    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setContextMenuVisible(true);
    };

    const handleClick = () => {
        setContextMenuVisible(false);
    };


    const context = useContext(GradientContext);
    if (!context) {
        throw new Error("GradientContext must be used within a GradientProvider");
    }


    // useEffect(() => {
    //     const handleKeyPress = (event: KeyboardEvent) => {

    //         const isCtrlShiftI = event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i';
    //         const isF11 = event.key === 'F11';
    //         const isF12 = event.key === 'F12';
    //         const isCtrlS = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's';


    //         if (isCtrlShiftI || isF11 || isCtrlS || isF12) {
    //             event.preventDefault();
    //             setIsPopupVisible(true);


    //             const syntheticEvent = {
    //                 preventDefault: () => { },
    //                 pageX: "40%",
    //                 pageY: "25%"
    //             } as unknown as MouseEvent;

    //             handleContextMenu(syntheticEvent);
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyPress);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);




    return <>
        <main

            onContextMenu={handleContextMenu}
            onClick={handleClick}
            className="bg-black h-auto overflow-x-hidden  font-(family-name:--Canva-Sans)">
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
                <div className="hidden lg:flex absolute top-4 left-30 overflow-hidden pointer-events-none">
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

        <ContextMenuWidget
            items={contextMenuItems}
            visible={contextMenuVisible}
            position={contextMenuPosition}
        />
    </>
}


export default PageCover;