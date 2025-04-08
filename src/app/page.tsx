"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  // 100밀리초마다 시간 업데이트
  useEffect(() => {
    if (submitted) {
      // 초기 설정
      setQrValue(`${studentId}:${formatDateTime()}`);

      // 100밀리초마다 업데이트
      const interval = setInterval(() => {
        const newTime = formatDateTime();
        setQrValue(`${studentId}:${newTime}`);
      }, 100);

      // 클린업 함수
      return () => clearInterval(interval);
    }
  }, [submitted, studentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          도서관 QR 코드
        </h1>

        {!submitted ? (
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
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg font-medium text-gray-800 dark:text-white">
              학번: {studentId}
            </p>
            <div className="my-4 p-4 bg-white rounded-lg">
              <QRCode value={qrValue} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              QR 값: {qrValue}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              다시 입력하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
