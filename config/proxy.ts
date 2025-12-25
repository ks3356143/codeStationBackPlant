/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
    /**
     * @name 详细的代理配置
     * @doc https://github.com/chimurai/http-proxy-middleware
     */
    dev: {
        // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
        "/api/": {
            // 要代理的地址
            target: "http://localhost:8000",
            changeOrigin: true,
        },
    },
    test: {
        // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
        "/api/": {
            target: "http://localhost:8000/",
            changeOrigin: true,
            pathRewrite: { "^": "" },
        },
    },
    pre: {
        "/api/": {
            target: "your pre url",
            changeOrigin: true,
            pathRewrite: { "^": "" },
        },
    },
};
