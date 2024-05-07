// export const asynchandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code).json({
//       success: false,
//       message: error.message,
//     });
//     console.log("ERRR :", error);
//   }
// };

// writing same code using promises

export const asynchandler = (requesthandler) => {
  return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
