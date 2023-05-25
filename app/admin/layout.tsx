"use client";

import "../globals.css";
import Link from "next/link";

export const metadata = {
    title: "Next.js",
    description: "Generated by Next.js",
};

const adminLayout = ({ children }: { children: React.ReactNode }) => {
    const role: string | null = localStorage.getItem("role");  //관리자 인증

    return (
        <html lang="en">
            <body>
                <div className="navbar">
                    <Link href="/">홈</Link>
                    <Link href="/main/dashboard">대시보드</Link>
                    <Link href="/main/dayoff">휴가 신청</Link>
                    <Link href="/main/mypage">개인 페이지</Link>
                    {role === "admin" ? (
                        <Link href="/admin">관리자 페이지</Link>
                    ) : null}
                </div>
                {children}
            </body>
        </html>
    );
};

export default adminLayout;
