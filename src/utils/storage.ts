import dayjs from "dayjs";

interface ValueType {
  data: any;
  expireDate: Date;
}

export function loadKey(key: string) {
  const tmp = localStorage.getItem(key);
  if (tmp) {
    const value: ValueType = JSON.parse(tmp);
    if (dayjs().isBefore(dayjs(value.expireDate))) {
      return value.data;
    }
    return null;
  }
  return null;
}

export function saveKey(key: string, data: any, seconds: number) {
  const expireDate = dayjs().add(seconds, "seconds").toDate();
  const value: ValueType = {
    data,
    expireDate,
  };
  localStorage.setItem(key, JSON.stringify(value));
}
