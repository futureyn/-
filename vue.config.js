module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://auth.jiuhecard.com/",
                pathRewrite:{"^/api":""},
                ws: true
            }
        }
    }
}