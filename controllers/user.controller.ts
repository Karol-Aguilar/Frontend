import { Request, Response, NextFunction } from "express";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // your code here
  } catch (error) {
    next(error);
  }
};

export const getUserCtrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // your code here
  } catch (error) {
    next(error);
  }
};

// ...other controller functions...
