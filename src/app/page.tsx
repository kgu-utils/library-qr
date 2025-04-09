"use client";

import { StudentForm } from "@/components/StudentForm";
import { QRView } from "@/components/QRView";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 컴포넌트 마운트 시 URL 쿼리와 localStorage에서 학번 로드
  useEffect(() => {
    // URL 쿼리 파라미터에서 학번 확인
    const queryId = searchParams.get("id");

    if (queryId) {
      // URL 쿼리 파라미터에 학번이 있으면 저장하고 사용
      setStudentId(queryId);
      localStorage.setItem("studentId", queryId);
      setIsSubmitted(true);
    } else {
      // URL에 없으면 localStorage 확인
      const savedId = localStorage.getItem("studentId");
      if (savedId) {
        setStudentId(savedId);
        setIsSubmitted(true);
      }
    }

    setIsLoaded(true);
  }, [searchParams]);

  const handleSubmit = (id: string) => {
    setStudentId(id);
    setIsSubmitted(true);

    // URL 업데이트 (옵션)
    window.history.replaceState(null, "", `?id=${id}`);
  };

  const handleReset = () => {
    setStudentId("");
    setIsSubmitted(false);

    // URL에서 쿼리 파라미터 제거 (옵션)
    window.history.replaceState(null, "", window.location.pathname);
  };

  // localStorage 접근 이전에는 로딩 표시
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-700 dark:text-gray-300">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          도서관 QR 코드
        </h1>

        {!isSubmitted ? (
          <StudentForm onSubmit={handleSubmit} initialStudentId={studentId} />
        ) : (
          <QRView studentId={studentId} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
