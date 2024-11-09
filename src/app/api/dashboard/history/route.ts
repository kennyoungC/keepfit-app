import connect from "@/lib/db"
import { createResponse } from "@/utils/req"
import { NextRequest } from "next/server"
import { ObjectId } from "mongodb"
import Appointment from "@/lib/models/appointment"

export const GET = async (req: NextRequest) => {
  try {
    await connect()

    const decodedTokenHeader = req.headers.get("x-decoded-token")
    if (!decodedTokenHeader) {
      return createResponse("Unauthorized", false, {}, 401)
    }

    let decodedToken
    try {
      decodedToken = JSON.parse(decodedTokenHeader)
    } catch (error) {
      console.log("Invalid token format:", error)
      return createResponse("Invalid token format", false, {}, 400)
    }

    const userId = decodedToken.userId

    // Validate if userId is a valid ObjectId string
    if (!ObjectId.isValid(userId)) {
      return createResponse("Invalid user ID", false, {}, 400)
    }

    try {
      const appointments = await Appointment.find({
        user_id: new ObjectId(userId),
      }).lean()

      const statusCounts = appointments.reverse().reduce(
        (counts, appointment) => {
          counts[appointment.status] = (counts[appointment.status] || 0) + 1
          return counts
        },
        { completed: 0, cancelled: 0, scheduled: 0, accepted: 0 }
      )

      return createResponse(
        "All appointments fetched.",
        true,
        { counts: statusCounts, appointments },
        200
      )
    } catch (error) {
      console.log("Error fetching appointments:", error)
      return createResponse("Error getting appointments", false, {}, 500)
    }
  } catch (error) {
    console.log("Connection error:", error)
    return createResponse("Error connecting to the database", false, {}, 500)
  }
}
