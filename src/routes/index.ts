import { Router } from "express"
import {
  AddNewFunnelController,
  BrowseFunnelController,
  PublishPageController,
} from "../controllers"
import Validateuser from "../middleware/Validateuser"

const router = Router()

router.route("/").post(AddNewFunnelController)
router.route("/:page").get(BrowseFunnelController)
router.route("/publish").put(PublishPageController)

export default router
