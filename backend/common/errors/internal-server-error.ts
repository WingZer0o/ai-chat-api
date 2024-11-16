export const intervalServerError = (ctx: any, error: any) => {
    // TODO: log error
    ctx.response.status = 500;
    ctx.response.body = {
        message: "There was an internal server error."
    };
};