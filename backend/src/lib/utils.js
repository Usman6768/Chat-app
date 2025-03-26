import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevent JavaScript from accessing the cookie
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // Only send the cookie over HTTPS
    })

    return token;
}