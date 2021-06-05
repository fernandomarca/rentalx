import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUSerController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordMailController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordMailController.handle);

export { passwordRoutes };
