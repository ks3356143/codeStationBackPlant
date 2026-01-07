/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser: any } | undefined) {
    const { currentUser } = initialState ?? {};
    if (initialState?.currentUser) {
        return {
            SuperAdmin: currentUser.permission === 1,
            NormalAdmin:
                currentUser.permission === 1 || currentUser.permission === 2,
        };
    } else {
        return {
            SuperAdmin: false,
            NormalAdmin: false,
        };
    }
}
