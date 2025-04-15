"use client";

import { useState } from "react";
import { StudentAccount, studentAccountUtils } from "@/types/student";

type AccountFormProps = {
  account?: StudentAccount; // 편집 모드일 경우 기존 계정 정보
  onSubmit: (account: StudentAccount) => void;
  onCancel: () => void;
};

export function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const [studentId, setStudentId] = useState(account?.id || "");
  const [name, setName] = useState(account?.name || "");
  const [error, setError] = useState("");
  const isEditMode = !!account;

  // 학번 입력 핸들러 - 숫자만 허용
  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용하는 정규식 적용
    if (value === "" || /^\d+$/.test(value)) {
      setStudentId(value);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!studentId.trim()) {
      setError("학번을 입력해주세요");
      return;
    }

    if (!name.trim()) {
      setError("이름을 입력해주세요");
      return;
    }

    // 새 계정 추가 모드일 때 중복 확인
    if (!isEditMode) {
      const existingAccount = studentAccountUtils.getById(studentId);
      if (existingAccount) {
        setError("이미 등록된 학번입니다");
        return;
      }
    }

    // 계정 생성 또는 업데이트
    const newAccount: StudentAccount = {
      id: studentId,
      name,
      createdAt: account?.createdAt || Date.now(),
    };

    if (isEditMode) {
      studentAccountUtils.update(newAccount);
    } else {
      studentAccountUtils.add({ id: studentId, name });
    }

    onSubmit(newAccount);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {isEditMode ? "계정 편집" : "새 계정 추가"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="studentId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            학번
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            id="studentId"
            value={studentId}
            onChange={handleStudentIdChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="학번을 입력하세요"
            readOnly={isEditMode} // 편집 모드에서는 학번 변경 불가
            required
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이름을 입력하세요"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditMode ? "저장" : "추가"}
          </button>
        </div>
      </form>
    </div>
  );
}
