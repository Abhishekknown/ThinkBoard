import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return res.status(429).json({
        message: "Ruk ja bdskk , jayda hogaya , paisa laga jayda saale",
      });
    }
    next();
  } catch (error) {
    console.log("rate limit error");
    next(error);
  }
};

export default ratelimiter;
