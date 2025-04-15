"use client";

import { useState, useEffect } from "react";
import { StudentAccount, studentAccountUtils } from "@/types/student";

type AccountListProps = {
  onSelectAccount: (account: StudentAccount) => void;
  onAddNewAccount: () => void;
};

export function AccountList({
  onSelectAccount,
  onAddNewAccount,
}: AccountListProps) {
  const [accounts, setAccounts] = useState<StudentAccount[]>([]);

  // 컴포넌트 마운트 시 저장된 계정 목록을 불러옴
  useEffect(() => {
    const storedAccounts = studentAccountUtils.getAll();
    setAccounts(storedAccounts);
  }, []);

  // 계정 삭제 처리
  const handleDeleteAccount = (event: React.MouseEvent, accountId: string) => {
    event.stopPropagation(); // 버블링 방지

    if (confirm("이 계정을 삭제하시겠습니까?")) {
      const success = studentAccountUtils.remove(accountId);
      if (success) {
        setAccounts((prevAccounts) =>
          prevAccounts.filter((a) => a.id !== accountId)
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        저장된 계정
      </h2>

      {accounts.length === 0 ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          저장된 계정이 없습니다
        </div>
      ) : (
        <ul className="space-y-2">
          {accounts.map((account) => (
            <li
              key={account.id}
              onClick={() => onSelectAccount(account)}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
            >
              <div>
                <div className="font-medium text-gray-800 dark:text-white">
                  {account.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {account.id}
                </div>
              </div>
              <button
                onClick={(e) => handleDeleteAccount(e, account.id)}
                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="삭제"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onAddNewAccount}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
      >
        새 계정 추가
      </button>
    </div>
  );
}
