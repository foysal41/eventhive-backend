import { Router } from "express";
import { event_controller } from "./event.controller";
import auth from "../../middlewares/auth.middleware";


const router = Router()

router.post("/" ,auth('organizer'), event_controller.create_event)
router.get("/" , event_controller.get_all_event)
router.get("/:id" , event_controller.get_single_event)
router.put("/:id" , auth("organizer") , event_controller.update_event)

export const event_route = router;
