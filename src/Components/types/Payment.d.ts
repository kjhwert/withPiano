export interface IPayment {
  id: number;
  storeId: number;
  storeName: string;
  name: string;
  regDate: string;
  startDate: string;
  endDate: string;
  packageName: string;
  holdingStart: string;
  holdingEnd: string;
  payAmount: string;
  lessonCnt: number;
  palleteLessonCnt: number;
  state: string;
  isRefund: number;
  yogaLessonCnt: number;
  cnt: {
    use: number;
    book: number;
    unused: number;
  };
  palleteCnt: {
    use: number;
    book: number;
    unused: number;
  };
}
