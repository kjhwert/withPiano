export interface ILesson {
  lesson: {
    id: number;
    teacherId: number;
    paymentId: number;
    date: string;
    stars?: number;
    eval?: string;
  };
  teacherName: string;
  teacherMajor: string;
  storeName: string;
}
