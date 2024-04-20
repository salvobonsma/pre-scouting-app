import OpenAPIClientAxios from "openapi-client-axios";
import {Client} from "@/lib/tba/tbaTypes";

export const tba = await new OpenAPIClientAxios({
    definition: "https://www.thebluealliance.com/swagger/api_v3.json",
    axiosConfigDefaults: {
        headers: {
            "X-TBA-Auth-Key" : process.env.TBA_KEY
        }
    }
}).init<Client>();