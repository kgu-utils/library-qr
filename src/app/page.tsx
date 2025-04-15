"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StudentAccount, studentAccountUtils } from "@/types/student";
import { AccountList } from "@/components/AccountList";
import { AccountForm } from "@/components/AccountForm";
import { QRView } from "@/components/QRView";

// 앱 상태 타입 정의
type AppState = "list" | "create" | "edit" | "view";

// SearchParams를 사용하는 컴포넌트를 별도로 분리
function StudentIdManager() {
  const searchParams = useSearchParams();
  const [appState, setAppState] = useState<AppState>("list");
  const [selectedAccount, setSelectedAccount] = useState<StudentAccount | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // 컴포넌트 마운트 시 URL 쿼리와 localStorage에서 학번 로드
  useEffect(() => {
    // URL 쿼리 파라미터에서 학번 확인
    const queryId = searchParams.get("id");

    if (queryId) {
      // 저장된 계정 중에서 해당 학번이 있는지 확인
      const account = studentAccountUtils.getById(queryId);

      if (account) {
        // 저장된 계정이 있으면 해당 계정으로 QR 코드 보기
        setSelectedAccount(account);
        setAppState("view");
      } else {
        // 저장된 계정이 없으면 새 계정 추가 모드로 전환하고 학번 미리 입력
        setSelectedAccount({
          id: queryId,
          name: "",
          createdAt: Date.now(),
        });
        setAppState("create");
      }
    }

    setIsLoaded(true);
  }, [searchParams]);

  // 계정 선택 처리
  const handleSelectAccount = (account: StudentAccount) => {
    setSelectedAccount(account);
    setAppState("view");

    // URL 업데이트 (옵션)
    window.history.replaceState(null, "", `?id=${account.id}`);
  };

  // 새 계정 추가 모드 진입
  const handleAddAccount = () => {
    setSelectedAccount(null);
    setAppState("create");
  };

  // 계정 폼 제출 처리
  const handleAccountFormSubmit = (account: StudentAccount) => {
    setSelectedAccount(account);
    setAppState("view");

    // URL 업데이트
    window.history.replaceState(null, "", `?id=${account.id}`);
  };

  // 계정 목록으로 돌아가기
  const handleBackToList = () => {
    setAppState("list");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // localStorage 접근 이전에는 로딩 표시
  if (!isLoaded) {
    return <div className="text-gray-700 dark:text-gray-300">로딩 중...</div>;
  }

  return (
    <>
      {appState === "list" && (
        <AccountList
          onSelectAccount={handleSelectAccount}
          onAddNewAccount={handleAddAccount}
        />
      )}

      {appState === "create" && (
        <AccountForm
          account={selectedAccount || undefined}
          onSubmit={handleAccountFormSubmit}
          onCancel={handleBackToList}
        />
      )}

      {appState === "edit" && selectedAccount && (
        <AccountForm
          account={selectedAccount}
          onSubmit={handleAccountFormSubmit}
          onCancel={handleBackToList}
        />
      )}

      {appState === "view" && selectedAccount && (
        <QRView account={selectedAccount} onBack={handleBackToList} />
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          도서관 QR 코드
        </h1>

        <Suspense
          fallback={
            <div className="text-gray-700 dark:text-gray-300">로딩 중...</div>
          }
        >
          <StudentIdManager />
        </Suspense>
      </div>
    </div>
  );
}
