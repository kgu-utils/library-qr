"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// 학번 입력 폼 컴포넌트 props 타입
export type StudentFormProps = {
  onSubmit: (id: string) => void;
  initialStudentId?: string;
};

// 학번 입력 폼 컴포넌트
export function StudentForm({
  onSubmit,
  initialStudentId = "",
}: StudentFormProps) {
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState(initialStudentId);

  // 초기 로드 시 URL 쿼리와 localStorage에서 학번 가져오기
  useEffect(() => {
    // URL 쿼리 파라미터 확인
    const queryId = searchParams.get("id");
    if (queryId) {
      setStudentId(queryId);
    } else {
      // localStorage에서 학번 가져오기
      const savedId = localStorage.getItem("studentId");
      if (savedId && !initialStudentId) {
        setStudentId(savedId);
      }
    }
  }, [searchParams, initialStudentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      // localStorage에 학번 저장
      localStorage.setItem("studentId", studentId);

      // URL 쿼리 파라미터 업데이트 (선택적)
      const url = new URL(window.location.href);
      url.searchParams.set("id", studentId);
      window.history.replaceState({}, "", url);

      onSubmit(studentId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="studentId"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          학번을 입력하세요
        </label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="학번"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        확인
      </button>
    </form>
  );
}
