// 학생 계정 타입 정의
export interface StudentAccount {
  id: string; // 학번
  name: string; // 이름
  createdAt: number; // 생성 시간 (timestamp)
}

// localStorage 키 상수 정의
export const STORAGE_KEY = "studentAccounts";

// 학생 계정 관리 유틸리티 함수들
export const studentAccountUtils = {
  // 모든 계정 가져오기
  getAll: (): StudentAccount[] => {
    if (typeof window === "undefined") return [];

    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("계정 정보 파싱 실패:", error);
      return [];
    }
  },

  // 계정 추가
  add: (account: Omit<StudentAccount, "createdAt">): StudentAccount => {
    const newAccount = {
      ...account,
      createdAt: Date.now(),
    };

    const accounts = studentAccountUtils.getAll();
    accounts.push(newAccount);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));

    return newAccount;
  },

  // 계정 업데이트
  update: (account: StudentAccount): boolean => {
    const accounts = studentAccountUtils.getAll();
    const index = accounts.findIndex((a) => a.id === account.id);

    if (index === -1) return false;

    accounts[index] = account;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    return true;
  },

  // 계정 삭제
  remove: (id: string): boolean => {
    const accounts = studentAccountUtils.getAll();
    const filtered = accounts.filter((a) => a.id !== id);

    if (filtered.length === accounts.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // 특정 계정 가져오기
  getById: (id: string): StudentAccount | undefined => {
    const accounts = studentAccountUtils.getAll();
    return accounts.find((a) => a.id === id);
  },
};
