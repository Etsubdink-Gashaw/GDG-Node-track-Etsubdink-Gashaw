
export const dashboard = async (req, res, next) => {
    try {
        res.status(200).json({message: `Welcome to the dashboard, ${req.user.name}`});
    } catch (error) {
        next(error);
    }}