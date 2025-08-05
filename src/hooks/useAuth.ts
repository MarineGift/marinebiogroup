// Firebase 인증 관련 커스텀 Hook
import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // 사용자 프로필 정보 가져오기
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            // 프로필이 없으면 기본 프로필 생성
            const defaultProfile: UserProfile = {
              uid: user.uid,
              email: user.email!,
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              role: 'user',
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            await setDoc(doc(db, 'users', user.uid), defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (error) {
          console.error('사용자 프로필 로드 실패:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('로그인 성공!');
      return result;
    } catch (error: any) {
      console.error('로그인 실패:', error);
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 회원가입
  const register = async (email: string, password: string, displayName?: string) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // 프로필 업데이트
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      // 이메일 인증 발송
      await sendEmailVerification(result.user);
      
      // Firestore에 사용자 정보 저장
      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email!,
        displayName: displayName || '',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', result.user.uid), userProfile);
      
      toast.success('회원가입 성공! 이메일 인증을 확인해주세요.');
      return result;
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('로그아웃 되었습니다.');
    } catch (error: any) {
      console.error('로그아웃 실패:', error);
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 비밀번호 재설정
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('비밀번호 재설정 이메일이 발송되었습니다.');
    } catch (error: any) {
      console.error('비밀번호 재설정 실패:', error);
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    }
  };

  // 프로필 업데이트
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      // Firebase Auth 프로필 업데이트
      if (updates.displayName !== undefined || updates.photoURL !== undefined) {
        await updateProfile(user, {
          displayName: updates.displayName,
          photoURL: updates.photoURL,
        });
      }

      // Firestore 프로필 업데이트
      const updatedProfile = {
        ...updates,
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
      
      // 로컬 상태 업데이트
      setUserProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
      
      toast.success('프로필이 업데이트되었습니다.');
    } catch (error: any) {
      console.error('프로필 업데이트 실패:', error);
      toast.error('프로필 업데이트 중 오류가 발생했습니다.');
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
  };
};

// 인증 에러 메시지 변환
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return '등록되지 않은 이메일입니다.';
    case 'auth/wrong-password':
      return '비밀번호가 올바르지 않습니다.';
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/weak-password':
      return '비밀번호는 6자 이상이어야 합니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.';
    case 'auth/too-many-requests':
      return '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return '인증 중 오류가 발생했습니다.';
  }
};