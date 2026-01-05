import dayjs from "dayjs";

export default {
    delay: (duration: number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, duration * 1000);
        });
    },
    formatDateTimeWithDayjs(isoString: string) {
        // 直接格式化，day.js会自动忽略微秒
        return dayjs(isoString).format("YYYY-MM-DD HH:mm:ss");
    },
};
