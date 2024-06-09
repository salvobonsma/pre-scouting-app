import createClient from "openapi-fetch";
import type {paths} from "./schema";

export let statbotics = createClient<paths>({baseUrl: "https://www.statbotics.io/api/"});