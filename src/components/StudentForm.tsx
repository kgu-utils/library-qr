"use client";

// 학번 입력 폼 컴포넌트 props 타입
export type StudentFormProps = {
  studentId: string;
  setStudentId: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

// 학번 입력 폼 컴포넌트
export function StudentForm({
  studentId,
  setStudentId,
  onSubmit,
}: StudentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
