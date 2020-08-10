import axios from 'axios';
import {IUser} from './types/User';

const api = axios.create({
  baseURL: 'https://server.withpianoapp.com',
});

interface IUserLogin {
  email: string;
  password: string;
}

const getJson = (res: any) => {
  if (typeof res.data === 'string') {
    if (res.data === 'OK') {
      return res;
    }

    res.data = res.data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
    res.data = JSON.parse(res.data);
    return res;
  }

  return res;
};

export const news = {
  index: async () => {
    try {
      return getJson(await api.get('/notices'));
    } catch (e) {
      return getJson(e.response);
    }
  },
  show: async (id: number) => {
    try {
      return getJson(await api.get(`/notices?id=${id}`));
    } catch (e) {
      return getJson(e.response);
    }
  },
};

export const userApi = {
  login: async (login: IUserLogin) => {
    try {
      return getJson(await api.post('/login', login));
    } catch (e) {
      return getJson(e.response);
    }
  },
  info: async (user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(await api.get('/user'));
    } catch (e) {
      return getJson(e.response);
    }
  },
  changePw: async (pw: string, user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return await api.put('/user', {password: pw});
    } catch (e) {
      return getJson(e.response);
    }
  },
  registerToken: async (uuid: string, token: string, user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
      await api.post('/alarm/device', {uuid: uuid, token: token});
      console.log('token Registered');
    } catch (e) {
      console.log(e.message);
    }
  },
};

interface IEval {
  id: number;
  stars: number;
  eval: string;
}

export const lesson = {
  reservable: async (user: IUser, academyType: string, payment: Object) => {
    const {storeId, paymentId} = payment;
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(
        await api.get(
          `/lesson/reservable?storeId=${storeId}&paymentId=${paymentId}&academyType=${academyType}`,
        ),
      );
    } catch (e) {
      return getJson(e.response);
    }
  },
  reserve: async (user: IUser, data) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(await api.post('/lesson', data));
    } catch (e) {
      return getJson(e.response);
    }
  },
  teacher: async (user: IUser, payment) => {
    try {
      const {storeId} = payment;
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(await api.get(`/teachers?storeId=${storeId}`));
    } catch (e) {
      return getJson(e.response);
    }
  },
  reserved: async (user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(await api.get('/lessons?type=reserved'));
    } catch (e) {
      return getJson(e.response);
    }
  },
  cancel: async (user: IUser, id: number) => {
    api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    return getJson(await api.delete(`/lesson?id=${id}`));
  },
  taken: async (user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(await api.get('/lessons?type=taken'));
    } catch (e) {
      return getJson(e.response);
    }
  },
  eval: async (data: IEval, user: IUser) => {
    api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    return getJson(await api.put('lesson/eval', data));
  },
};

export const payment = {
  payments: async (user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      const {
        data: {list},
      } = getJson(await api.get('/payments'));

      return list;
    } catch (e) {
      return getJson(e.response);
    }
  },
  payment: async (user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      const {
        data: {list},
      } = getJson(await api.get('/payments'));

      return list[0];
    } catch (e) {
      return getJson(e.response);
    }
  },
};

export const notice = {
  index: async (user: IUser) => {
    try {
      api.defaults.headers.common.Authorization = `Bearer ${user.token}`;

      return getJson(await api.get('/alarms'));
    } catch (e) {
      return getJson(e.response);
    }
  },
};
