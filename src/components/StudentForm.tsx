"use client";

import { useState, useEffect } from "react";

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
  const [studentId, setStudentId] = useState(initialStudentId);

  // 초기 로드 시 localStorage에서 학번 가져오기
  useEffect(() => {
    // initialStudentId가 없는 경우에만 localStorage에서 가져옴
    if (!initialStudentId) {
      const savedId = localStorage.getItem("studentId");
      if (savedId) {
        setStudentId(savedId);
      }
    }
  }, [initialStudentId]);

  // 초기 학번이 변경되면 상태 업데이트
  useEffect(() => {
    if (initialStudentId) {
      setStudentId(initialStudentId);
    }
  }, [initialStudentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      // localStorage에 학번 저장
      localStorage.setItem("studentId", studentId);
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
