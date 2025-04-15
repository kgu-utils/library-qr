"use client";

import { useQRCode } from "@/hooks/useQRCode";
import QRCode from "react-qr-code";
import { StudentAccount } from "@/types/student";

// QR 코드 뷰 컴포넌트 props 타입
export type QRViewProps = {
  account: StudentAccount;
  onBack: () => void;
};

// QR 코드 표시 컴포넌트
export function QRView({ account, onBack }: QRViewProps) {
  // QR 코드 생성 로직
  const qrValue = useQRCode(account.id);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          {account.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          학번: {account.id}
        </p>
      </div>

      <div className="my-4 p-4 bg-white rounded-lg">
        <QRCode value={qrValue} />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        QR 값: {qrValue}
      </p>

      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        계정 목록으로 돌아가기
      </button>
    </div>
  );
}
