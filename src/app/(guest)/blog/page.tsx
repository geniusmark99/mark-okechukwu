import { PageCover } from "@/components/general";

const Blog = () => {
    return <>
        <PageCover showHeader={true}>
            <main className="flex min-h-screen items-center justify-center bg-zinc-900 text-white">
                <div className="text-center px-4">
                    <h1 className="text-5xl font-bold mb-4">🚀 Coming Soon</h1>
                    <p className="text-lg mb-6">I&apos;m working hard to launch my amazing site. Stay tuned!</p>

                </div>
            </main>
        </PageCover>
    </>
}

export default Blog;