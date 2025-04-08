"use client";

import { useState, useEffect } from "react";
import { useFormattedDateTime } from "./useFormattedDateTime";

// QR 코드 관련 로직을 위한 커스텀 훅
export function useQRCode(studentId: string) {
  const [qrValue, setQrValue] = useState("");
  const formatDateTime = useFormattedDateTime();

  useEffect(() => {
    // 초기 설정
    setQrValue(`${studentId}:${formatDateTime()}`);

    // 100밀리초마다 업데이트
    const interval = setInterval(() => {
      setQrValue(`${studentId}:${formatDateTime()}`);
    }, 100);

    // 클린업 함수
    return () => clearInterval(interval);
  }, [studentId, formatDateTime]);

  return qrValue;
}
