export interface IReserved {
  lesson: {
    id: number;
    teacherId: number;
    paymentId: number;
    date: string;
    stars?: number;
    eval?: number;
  };
  teacherName: string;
  teacherMajor: string;
  storeName: string;
}
