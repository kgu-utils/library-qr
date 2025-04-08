"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StudentForm } from "@/components/StudentForm";
import { QRView } from "@/components/QRView";

// 메인 컴포넌트
export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // URL에서 학번 파라미터 확인
  useEffect(() => {
    const idFromQuery = searchParams.get("id");
    if (idFromQuery) {
      setStudentId(idFromQuery);
      setSubmitted(true);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      // URL 쿼리 파라미터에 학번 저장
      router.push(`/?id=${studentId}`);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    // 쿼리 파라미터 제거
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          도서관 QR 코드
        </h1>

        {!submitted ? (
          <StudentForm
            studentId={studentId}
            setStudentId={setStudentId}
            onSubmit={handleSubmit}
          />
        ) : (
          <QRView studentId={studentId} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
