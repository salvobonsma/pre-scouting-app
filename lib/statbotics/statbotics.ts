import OpenAPIClientAxios from "openapi-client-axios";
import {Client} from "@/lib/statbotics/statboticsTypes";

export const statbotics = await new OpenAPIClientAxios({
    definition: "https://api.statbotics.io/openapi.json"
}).init<Client>();