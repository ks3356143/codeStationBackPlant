export default {
    delay: (duration: number) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, duration * 1000);
        });
    },
};
