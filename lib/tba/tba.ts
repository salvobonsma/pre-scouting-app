import createClient from "openapi-fetch";
import type {paths} from "./schema";

export let tba = createClient<paths>({
    baseUrl: "https://www.thebluealliance.com/api/v3/",
    headers: {
        "X-TBA-Auth-Key": process.env.TBA_KEY
    }
});