"use client";

import { useQRCode } from "@/hooks/useQRCode";
import QRCode from "react-qr-code";

// QR 코드 뷰 컴포넌트 props 타입
export type QRViewProps = {
  studentId: string;
  onReset: () => void;
};

// QR 코드 표시 컴포넌트
export function QRView({ studentId, onReset }: QRViewProps) {
  // QR 코드 생성 로직
  const qrValue = useQRCode(studentId);

  return (
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
        onClick={onReset}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        다시 입력하기
      </button>
    </div>
  );
}
