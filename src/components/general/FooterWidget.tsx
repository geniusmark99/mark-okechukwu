import React from 'react'
import Link from 'next/link';

const FooterWidget = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "Navigation",
            links: [
                { name: "Projects", href: "/projects" },
                { name: "Blog", href: "/blog" },
                { name: "Research", href: "/research" },
                { name: "Contact", href: "/contact" },
            ]
        },
        {
            title: "Ventures",
            links: [
                { name: "Akauntme", href: "https://akauntme.com" },
                { name: "HausFinda", href: "#" },
                { name: "VersityLearn", href: "#" },
                { name: "LundryMan", href: "#" },
            ]
        },
        {
            title: "Social",
            links: [
                { name: "LinkedIn", href: "https://linkedin.com/in/markokechukwu" },
                { name: "Twitter", href: "https://twitter.com/markthadev" },
                { name: "GitHub", href: "https://github.com/geniusmark99" },
                { name: "WhatsApp", href: "https://wa.me/+2348141625004" },
            ]
        }
    ];

    return (
        <footer className="w-full bg-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
            {/* Background Light Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-block group">
                            <svg className="fill-white w-[100px] h-auto group-hover:opacity-80 transition-opacity" width="1654" height="332" viewBox="0 0 1654 332" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1256 76.6406L1009.24 330.75H1204.54L1123 249.052L1178.58 192L1317 331H1207V331.25H1009V0H1185.12L1256 76.6406ZM539.41 329H453.072L452.939 328.75H346.277L346.41 329H279.338L279.471 328.75H193.133L193 329H0L173.205 2L269.705 184.186L193.397 328.25H279.735L312.873 265.686L346.013 328.25H452.675L366.205 165L312.873 265.686L269.705 184.186L366.205 2L539.41 329ZM947.41 329H601L774.205 2L947.41 329ZM1456 149.113L1554 2.58984H1654L1518.21 195.244L1650 327.59H1537.79L1471.64 261.309L1456 283.495V328.34H1641V328.84H1456V329H1378V2H1456V149.113ZM682.406 328.25H866.004L774.205 155L682.406 328.25ZM831.157 298.5H716.843L774 195L831.157 298.5ZM1097 160.5L1171 87L1133.5 47H1097V160.5Z" />
                            </svg>
                        </Link>
                        <p className="mt-8 text-gray-400 text-sm md:text-base leading-relaxed max-w-xs font-light">
                            Sculpting elegant software solutions with precision and soul. Driven by the philosophy of elegance in engineering.
                        </p>
                    </div>

                    {/* Links sections */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-light hover:translate-x-1 inline-block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                        © {currentYear} MARK OKECHUKWU. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-x-8">
                        <Link href="/privacy" className="text-gray-500 hover:text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterWidget;
;