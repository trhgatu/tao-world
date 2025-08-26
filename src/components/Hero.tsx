'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const KnightScene = dynamic(() => import('@/components/scenes/KnightScene'), {
    ssr: false,
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const knightTextRef = useRef<HTMLSpanElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const navbarRef = useRef<HTMLElement | null>(null);
    const nextSectionRef = useRef<HTMLElement | null>(null);

    // các ref để fade riêng
    const contentRef = useRef<HTMLDivElement | null>(null);
    const forgottenRef = useRef<HTMLSpanElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const knight = knightTextRef.current!;
            const navbar = navbarRef.current!;
            const bg = backgroundRef.current!;
            const next = nextSectionRef.current!;
            const forgotten = forgottenRef.current!;
            const desc = descRef.current!;

            gsap.set(knight, {
                display: 'inline-block',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
                zIndex: 1000,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=250%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    snap: {
                        snapTo: [0, 1],
                        duration: 0.6,
                        ease: 'power2.inOut',
                    },
                },
            });

            // Lấy vị trí hiện tại của chữ (khi còn inline, cùng hàng với "The Forgotten")
            const rect = knight.getBoundingClientRect();
            const startTop = rect.top + rect.height / 2;
            const startLeft = rect.left + rect.width / 2;

            // P1: Khi timeline bắt đầu, MỚI set fixed tại đúng vị trí hiện tại để không "bật" lên navbar
            tl.add(() => {
                gsap.set(knight, {
                    position: 'fixed',
                    top: startTop,
                    left: startLeft,
                    xPercent: -50,
                    yPercent: -50,
                    opacity: 1,
                });
            }, 0)

                // P1b: di chuyển vào giữa màn hình
                .to(knight, {
                    top: '50%',
                    left: '50%',
                    duration: 0.25,
                    ease: 'power2.out',
                }, 0)

                // P2: mờ navbar + "The Forgotten" + mô tả (KHÔNG mờ Knight)
                .to([navbar, forgotten, desc], {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.out',
                }, 0.2)

                // P3: mờ/blur nền
                .to(bg, {
                    opacity: 0.1,
                    filter: 'blur(20px)',
                    duration: 0.2,
                    ease: 'power2.inOut',
                }, 0.3)

                // P4: phóng to chữ
                .to(knight, {
                    scale: 30,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    force3D: true,
                }, 0.4)

                // P5: zoom cực lớn rồi fade
                .to(knight, {
                    scale: 200,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power3.in',
                }, 0.65)

                // P6: reveal section tiếp theo
                .to(next, {
                    y: 0,
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power2.out',
                }, 0.8);
        }, heroRef);

        // refresh để GSAP tính toán lại nếu layout thay đổi
        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <>
            <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <div ref={backgroundRef}>
                    <KnightScene />
                    <div
                        className="absolute inset-0 z-[1] opacity-40"
                        style={{
                            backgroundImage:
                                'radial-gradient(2px 2px at 20% 30%, #fff 40%, transparent 45%), radial-gradient(1.5px 1.5px at 60% 70%, #fff 40%, transparent 45%), radial-gradient(1px 1px at 80% 20%, #fff 40%, transparent 45%), radial-gradient(1.2px 1.2px at 35% 80%, #fff 40%, transparent 45%)',
                            backgroundRepeat: 'repeat',
                            backgroundSize:
                                '600px 600px, 700px 700px, 500px 500px, 650px 650px',
                        }}
                    />
                </div>

                {/* Navbar - sẽ mờ dần */}
                <header ref={navbarRef} className="absolute left-0 right-0 top-0 z-20">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
                        <div className="select-none text-lg font-semibold tracking-widest text-white">
                            trhgatu
                        </div>
                        <div className="hidden items-center gap-7 md:flex">
                            <Link href="/" className="text-white/90 hover:text-white">Home</Link>
                            <Link href="/forge/craftings" className="text-white/90 hover:text-white">Forge</Link>
                            <Link href="/verse" className="text-white/90 hover:text-white">Verse</Link>
                            <Link href="/gateway" className="text-white/90 hover:text-white">Gateway</Link>
                        </div>
                        <Link
                            href="/forge/craftings"
                            className="rounded-xl border border-white/30 px-4 py-2 text-sm backdrop-blur hover:bg-white/10 md:hidden"
                        >
                            Enter
                        </Link>
                    </nav>
                </header>

                {/* Main content */}
                <section className="absolute inset-0 z-10">
                    <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
                        <div className="max-w-3xl md:max-w-5xl">
                            <div ref={contentRef}>
                                <h1 className="text-4xl md:text-7xl font-extrabold flex items-center leading-none text-neutral-300 whitespace-nowrap">
                                    <span ref={forgottenRef}>Hi I&apos;m</span>
                                    <span
                                        ref={knightTextRef}
                                        className="text-red-700 inline-block align-baseline"
                                        style={{ transformOrigin: 'center center', position: 'relative', zIndex: 30 }}
                                    >
                                        Anh Tu
                                    </span>
                                </h1>


                                <p ref={descRef} className="mt-5 text-neutral-300">
                                    Just a developer who loves to create beautiful web experiences with
                                    cutting-edge technologies.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Section tiếp theo */}
            <section
                ref={nextSectionRef}
                className="min-h-screen text-white flex items-center justify-center opacity-0 transform translate-y-full"

            >
                <div className="text-center max-w-4xl px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">About</h2>
                    <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-12">
                        Your journey through the mystical world of the Forgotten Knight begins now.
                        Discover ancient secrets, forge legendary weapons, and write your own epic tale.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/forge/craftings"
                            className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black hover:bg-neutral-100 transition-colors"
                        >
                            Start Your Quest
                        </a>
                        <a
                            href="/verse"
                            className="rounded-2xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                            Learn the Lore
                        </a>
                    </div>
                </div>
            </section>

            {/* Thêm section khác nếu cần */}
            <section className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-4xl font-bold mb-6">Continue Your Journey</h3>
                    <p className="text-xl text-neutral-300 max-w-2xl">
                        The adventure continues with more challenges and discoveries ahead.
                    </p>
                </div>
            </section>
        </>
    );
}
