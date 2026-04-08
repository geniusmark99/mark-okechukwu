import { FooterWidget, BlogPostWidget, HeaderWidget } from "@/components/general";
import Image from "next/image";
import Link from "next/link";

type Params = {
    slug: string;
};

export async function generateStaticParams(): Promise<Params[]> {
    return BlogPostWidget.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogContent({
    params,
}: {
    params: Promise<Params>
}) {
    const { slug } = await params;
    const post = BlogPostWidget.find((p) => p.slug === slug);
    const otherPosts = BlogPostWidget.filter((p) => p.slug !== slug).slice(0, 3);

    if (!post) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                    <p className="text-gray-400 text-lg mb-8">This post doesn&apos;t exist.</p>
                    <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-black min-h-screen">
            <HeaderWidget />

            {/* ─── HERO ─── */}
            <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-12 md:pb-16 z-10">
                    <div className="max-w-4xl">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <span>/</span>
                            <span className="text-gray-500 truncate max-w-[200px]">{post.title}</span>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-xs font-medium text-purple-300 border border-purple-500/20">
                                {post.category}
                            </span>
                            <span className="text-xs text-gray-400">{post.date}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/mark-okechukwu-3d.png"
                                alt={post.author}
                                width={44}
                                height={44}
                                className="rounded-full object-cover border-2 border-white/10"
                            />
                            <div>
                                <p className="text-sm text-white font-medium">{post.author}</p>
                                <p className="text-xs text-gray-400">Author</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ARTICLE BODY ─── */}
            <section className="px-4 md:px-8 py-12 md:py-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Sidebar */}
                    <aside className="lg:col-span-3 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            {/* Share */}
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">Share this article</p>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/[0.12] transition-all">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/[0.12] transition-all">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13.3947 11.1983L19.2713 4H17.8787L12.7761 10.2502L8.70063 4H4.00006L10.163 13.4514L4.00006 21H5.3927L10.7812 14.3996L15.0852 21H19.7858L13.3944 11.1983H13.3947ZM11.4873 13.5347L10.8629 12.5936L5.89449 5.10473H8.03351L12.043 11.1485L12.6675 12.0896L17.8794 19.9455H15.7404L11.4873 13.5351V13.5347Z" /></svg>
                                    </button>
                                    <button className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/[0.12] transition-all">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M19.416 3C20.28 3 21 3.72 21 4.584V19.416C21 20.28 20.28 21 19.416 21H4.584C3.72 21 3 20.28 3 19.416V4.584C3 3.72 3.72 3 4.584 3H19.416ZM7.734 8.94C8.508 8.94 8.994 8.418 8.976 7.77C8.976 7.104 8.508 6.6 7.77 6.6C7.032 6.6 6.546 7.104 6.546 7.77C6.546 8.418 7.014 8.94 7.734 8.94ZM6.6 9.858V17.4H8.904V9.858H6.6ZM15.024 17.4V13.224C15.024 12.252 14.7 11.586 13.854 11.586C13.224 11.586 12.846 12.036 12.666 12.468C12.612 12.63 12.594 12.846 12.594 13.062V17.4H10.29V12.27C10.29 11.581 10.27 10.97 10.253 10.423C10.247 10.227 10.241 10.039 10.236 9.858H12.234L12.342 10.92H12.378C12.684 10.416 13.44 9.696 14.682 9.696C16.194 9.696 17.346 10.722 17.346 12.954V17.4H15.024Z" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/[0.06]" />

                            {/* Back link */}
                            <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                All articles
                            </Link>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="lg:col-span-9 order-1 lg:order-2">
                        <div className="prose prose-lg prose-invert max-w-none
                            [&>p]:text-gray-300/90 [&>p]:text-[1.05rem] [&>p]:leading-[1.8] [&>p]:mb-6
                            [&>h2]:text-white [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:tracking-tight
                            [&>h3]:text-white [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-4
                            [&>ul]:text-gray-300/90 [&>ol]:text-gray-300/90
                            [&_li]:mb-3 [&_li]:text-[1.05rem] [&_li]:leading-[1.8]
                            [&_strong]:text-white [&_strong]:font-semibold
                            [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-blue-300
                            [&_em]:text-gray-200/80
                            [&_blockquote]:border-l-2 [&_blockquote]:border-blue-500/40 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-300/80
                        ">
                            <p>
                                Developing a game or a full-fledged app used to take weeks, if not
                                months, of heads-down coding, troubleshooting, and testing. Now you
                                can literally prompt it into existence in an afternoon (with some
                                caveats that I&apos;ll explore in a bit).
                            </p>
                            <p>
                                The point is: we&apos;re watching very technical skills getting
                                &ldquo;democratized&rdquo; by AI. Large language models (LLMs) are enabling
                                anyone savvy enough with a computer and internet access to create
                                digital products from the ground up without touching a single line
                                of code. Just vibes.
                            </p>

                            <h2>What is vibe coding, exactly?</h2>
                            <p>
                                The term <em>vibe coding</em> was coined by Andrej Karpathy, cofounder
                                of OpenAI and former Director of AI at Tesla. He described it as
                                &ldquo;not really coding — I just see stuff, say stuff, run stuff, and
                                copy paste stuff, and it mostly works.&rdquo;
                            </p>
                            <p>
                                It&apos;s part command-line wizardry, part improv sketch. A mix of
                                intuition, experimentation, and human-AI collaboration. Less &ldquo;writing
                                code,&rdquo; more &ldquo;conjuring software.&rdquo;
                            </p>

                            <h2>The benefits of vibe coding</h2>
                            <ol>
                                <li><strong>A lot less heavy lifting.</strong> When you vibe code, you&apos;re skipping the boilerplate, scaffolding, and hours of syntax wrangling.</li>
                                <li><strong>Creativity leads, not complexity.</strong> It&apos;s about flow. You just follow your instincts, experiment, and prototype quickly.</li>
                                <li><strong>Speed to value.</strong> What used to take weeks can now be mocked up in hours. Especially valuable for non-technical founders.</li>
                                <li><strong>Absolute gold for technical coders.</strong> If you know what you&apos;re doing, coding with AI has immense potential.</li>
                            </ol>

                            <h2>The risks of vibe coding</h2>
                            <ol>
                                <li><strong>Newcomers won&apos;t be deeply technical developers.</strong> Over-reliance on LLMs can bypass foundational understanding.</li>
                                <li><strong>Code quality and security are debatable.</strong> The more you lean in, the easier it becomes to lose track of what was actually built.</li>
                                <li><strong>Technical debt builds up fast.</strong> When your app is stitched together by vibes alone, good luck scaling it.</li>
                            </ol>

                            <h2>Where we go from here</h2>
                            <p>
                                Vibe coding is accelerating the speed of innovation, lowering the
                                barrier to entry, and challenging how we think about product
                                development. But the real winners won&apos;t be those who build the most —
                                they&apos;ll be the ones who build <em>well.</em>
                            </p>
                            <p>
                                So if you&apos;re serious about scaling, shipping, or standing out, you&apos;ll
                                still need a strong foundation: design that resonates, engineering
                                that holds up, and strategy that makes sense.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* ─── MORE ARTICLES ─── */}
            {otherPosts.length > 0 && (
                <section className="px-4 md:px-8 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-px flex-1 bg-white/[0.06]" />
                            <span className="text-xs uppercase tracking-[0.25em] text-gray-500 font-medium">More to Read</span>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {otherPosts.map((p) => (
                                <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                                    <article className="rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden">
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                        <div className="p-5">
                                            <span className="text-xs text-gray-500 mb-2 block">{p.category} · {p.date}</span>
                                            <h3 className="text-[0.95rem] font-semibold text-white leading-snug group-hover:text-blue-100 transition-colors line-clamp-2">{p.title}</h3>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <FooterWidget />
        </main>
    );
}
