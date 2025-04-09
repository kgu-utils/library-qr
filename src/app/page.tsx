"use client";

import { StudentForm } from "@/components/StudentForm";
import { QRView } from "@/components/QRView";
import { useState, useEffect } from "react";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 학번 로드
  useEffect(() => {
    const savedId = localStorage.getItem("studentId");
    if (savedId) {
      setStudentId(savedId);
      setIsSubmitted(true);
    }
    setIsLoaded(true);
  }, []);

  const handleSubmit = (id: string) => {
    setStudentId(id);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStudentId("");
    setIsSubmitted(false);
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
