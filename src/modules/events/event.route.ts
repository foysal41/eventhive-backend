import { Router } from "express";
import { event_controller } from "./event.controller";
import auth from "../../middlewares/auth.middleware";


const router = Router()

router.post("/" ,auth('organizer'), event_controller.create_event)
router.get("/" , event_controller.get_all_event)

export const event_route = router;
