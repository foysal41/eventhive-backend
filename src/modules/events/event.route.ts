import { Router } from "express";
import { event_controller } from "./event.controller";
import auth from "../../middlewares/auth.middleware";


const router = Router()

router.post("/" ,auth('organizer'), event_controller.create_event)


export const event_route = router;
