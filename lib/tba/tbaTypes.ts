import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    export interface HeaderParameters {
        "If-None-Match"?: Parameters.IfNoneMatch;
    }
    namespace Parameters {
        export type DistrictKey = string;
        export type EventKey = string;
        export type IfNoneMatch = string;
        export type MatchKey = string;
        export type MediaTag = string;
        export type PageNum = number;
        export type TeamKey = string;
        export type Year = number;
    }
    export interface PathParameters {
        year: Parameters.Year;
        media_tag: Parameters.MediaTag;
        page_num: Parameters.PageNum;
        match_key: Parameters.MatchKey;
        district_key: Parameters.DistrictKey;
        team_key: Parameters.TeamKey;
        event_key: Parameters.EventKey;
    }
    namespace Responses {
        export interface NotModified {
        }
        export interface Unauthorized {
            /**
             * Authorization error description.
             */
            Error: string;
        }
    }
    namespace Schemas {
        export interface APIStatus {
            /**
             * Year of the current FRC season.
             */
            current_season: number;
            /**
             * Maximum FRC season year for valid queries.
             */
            max_season: number;
            /**
             * True if the entire FMS API provided by FIRST is down.
             */
            is_datafeed_down: boolean;
            /**
             * An array of strings containing event keys of any active events that are no longer updating.
             */
            down_events: string[];
            ios: APIStatusAppVersion;
            android: APIStatusAppVersion;
        }
        export interface APIStatusAppVersion {
            /**
             * Internal use - Minimum application version required to correctly connect and process data.
             */
            min_app_version: number;
            /**
             * Internal use - Latest application version available.
             */
            latest_app_version: number;
        }
        export interface Award {
            /**
             * The name of the award as provided by FIRST. May vary for the same award type.
             */
            name: string;
            /**
             * Type of award given. See https://github.com/the-blue-alliance/the-blue-alliance/blob/master/consts/award_type.py#L6
             */
            award_type: number;
            /**
             * The event_key of the event the award was won at.
             */
            event_key: string;
            /**
             * A list of recipients of the award at the event. May have either a team_key or an awardee, both, or neither (in the case the award wasn't awarded at the event).
             */
            recipient_list: /* An `Award_Recipient` object represents the team and/or person who received an award at an event. */ AwardRecipient[];
            /**
             * The year this award was won.
             */
            year: number;
        }
        /**
         * An `Award_Recipient` object represents the team and/or person who received an award at an event.
         */
        export interface AwardRecipient {
            /**
             * The TBA team key for the team that was given the award. May be null.
             */
            team_key?: string;
            /**
             * The name of the individual given the award. May be null.
             */
            awardee?: string;
        }
        export interface DistrictList {
            /**
             * The short identifier for the district.
             */
            abbreviation: string;
            /**
             * The long name for the district.
             */
            display_name: string;
            /**
             * Key for this district, e.g. `2016ne`.
             */
            key: string;
            /**
             * Year this district participated.
             */
            year: number;
        }
        /**
         * Rank of a team in a district.
         */
        export interface DistrictRanking {
            /**
             * TBA team key for the team.
             */
            team_key: string;
            /**
             * Numerical rank of the team, 1 being top rank.
             */
            rank: number;
            /**
             * Any points added to a team as a result of the rookie bonus.
             */
            rookie_bonus?: number;
            /**
             * Total district points for the team.
             */
            point_total: number;
            /**
             * List of events that contributed to the point total for the team.
             */
            event_points?: {
                /**
                 * `true` if this event is a District Championship event.
                 */
                district_cmp: boolean;
                /**
                 * Total points awarded at this event.
                 */
                total: number;
                /**
                 * Points awarded for alliance selection.
                 */
                alliance_points: number;
                /**
                 * Points awarded for elimination match performance.
                 */
                elim_points: number;
                /**
                 * Points awarded for event awards.
                 */
                award_points: number;
                /**
                 * TBA Event key for this event.
                 */
                event_key: string;
                /**
                 * Points awarded for qualification match performance.
                 */
                qual_points: number;
            }[];
        }
        export interface EliminationAlliance {
            /**
             * Alliance name, may be null.
             */
            name?: string;
            /**
             * Backup team called in, may be null.
             */
            backup?: {
                /**
                 * Team key that was called in as the backup.
                 */
                in?: string;
                /**
                 * Team key that was replaced by the backup team.
                 */
                out?: string;
            };
            /**
             * List of teams that declined the alliance.
             */
            declines?: string[];
            /**
             * List of team keys picked for the alliance. First pick is captain.
             */
            picks: string[];
            status?: {
                playoff_average?: number; // double
                level?: string;
                record?: /* A Win-Loss-Tie record for a team, or an alliance. */ WLTRecord;
                current_level_record?: /* A Win-Loss-Tie record for a team, or an alliance. */ WLTRecord;
                status?: string;
            };
        }
        export interface Event {
            /**
             * TBA event key with the format yyyy[EVENT_CODE], where yyyy is the year, and EVENT_CODE is the event code of the event.
             */
            key: string;
            /**
             * Official name of event on record either provided by FIRST or organizers of offseason event.
             */
            name: string;
            /**
             * Event short code, as provided by FIRST.
             */
            event_code: string;
            /**
             * Event Type, as defined here: https://github.com/the-blue-alliance/the-blue-alliance/blob/master/consts/event_type.py#L2
             */
            event_type: number;
            district?: DistrictList;
            /**
             * City, town, village, etc. the event is located in.
             */
            city?: string;
            /**
             * State or Province the event is located in.
             */
            state_prov?: string;
            /**
             * Country the event is located in.
             */
            country?: string;
            /**
             * Event start date in `yyyy-mm-dd` format.
             */
            start_date: string; // date
            /**
             * Event end date in `yyyy-mm-dd` format.
             */
            end_date: string; // date
            /**
             * Year the event data is for.
             */
            year: number;
            /**
             * Same as `name` but doesn't include event specifiers, such as 'Regional' or 'District'. May be null.
             */
            short_name?: string;
            /**
             * Event Type, eg Regional, District, or Offseason.
             */
            event_type_string: string;
            /**
             * Week of the event relative to the first official season event, zero-indexed. Only valid for Regionals, Districts, and District Championships. Null otherwise. (Eg. A season with a week 0 'preseason' event does not count, and week 1 events will show 0 here. Seasons with a week 0.5 regional event will show week 0 for those event(s) and week 1 for week 1 events and so on.)
             */
            week?: number;
            /**
             * Address of the event's venue, if available.
             */
            address?: string;
            /**
             * Postal code from the event address.
             */
            postal_code?: string;
            /**
             * Google Maps Place ID for the event address.
             */
            gmaps_place_id?: string;
            /**
             * Link to address location on Google Maps.
             */
            gmaps_url?: string; // url
            /**
             * Latitude for the event address.
             */
            lat?: number; // double
            /**
             * Longitude for the event address.
             */
            lng?: number; // double
            /**
             * Name of the location at the address for the event, eg. Blue Alliance High School.
             */
            location_name?: string;
            /**
             * Timezone name.
             */
            timezone?: string;
            /**
             * The event's website, if any.
             */
            website?: string;
            /**
             * The FIRST internal Event ID, used to link to the event on the FRC webpage.
             */
            first_event_id?: string;
            /**
             * Public facing event code used by FIRST (on frc-events.firstinspires.org, for example)
             */
            first_event_code?: string;
            webcasts?: Webcast[];
            /**
             * An array of event keys for the divisions at this event.
             */
            division_keys?: string[];
            /**
             * The TBA Event key that represents the event's parent. Used to link back to the event from a division event. It is also the inverse relation of `divison_keys`.
             */
            parent_event_key?: string;
            /**
             * Playoff Type, as defined here: https://github.com/the-blue-alliance/the-blue-alliance/blob/master/consts/playoff_type.py#L4, or null.
             */
            playoff_type?: number;
            /**
             * String representation of the `playoff_type`, or null.
             */
            playoff_type_string?: string;
        }
        export interface EventDistrictPoints {
            /**
             * Points gained for each team at the event. Stored as a key-value pair with the team key as the key, and an object describing the points as its value.
             */
            points: {
                [name: string]: {
                    /**
                     * Total points awarded at this event.
                     */
                    total: number;
                    /**
                     * Points awarded for alliance selection
                     */
                    alliance_points: number;
                    /**
                     * Points awarded for elimination match performance.
                     */
                    elim_points: number;
                    /**
                     * Points awarded for event awards.
                     */
                    award_points: number;
                    /**
                     * Points awarded for qualification match performance.
                     */
                    qual_points: number;
                };
            };
            /**
             * Tiebreaker values for each team at the event. Stored as a key-value pair with the team key as the key, and an object describing the tiebreaker elements as its value.
             */
            tiebreakers?: {
                [name: string]: {
                    highest_qual_scores?: number[];
                    qual_wins?: number;
                };
            };
        }
        /**
         * A year-specific event insight object expressed as a JSON string, separated in to `qual` and `playoff` fields. See also Event_Insights_2016, Event_Insights_2017, etc.
         */
        export interface EventInsights {
            /**
             * Inights for the qualification round of an event
             */
            qual?: {
                [key: string]: any;
            };
            /**
             * Insights for the playoff round of an event
             */
            playoff?: {
                [key: string]: any;
            };
        }
        /**
         * Insights for FIRST Stronghold qualification and elimination matches.
         */
        export interface EventInsights2016 {
            /**
             * For the Low Bar - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            LowBar: number /* float */[];
            /**
             * For the Cheval De Frise - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            A_ChevalDeFrise: number /* float */[];
            /**
             * For the Portcullis - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            A_Portcullis: number /* float */[];
            /**
             * For the Ramparts - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            B_Ramparts: number /* float */[];
            /**
             * For the Moat - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            B_Moat: number /* float */[];
            /**
             * For the Sally Port - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            C_SallyPort: number /* float */[];
            /**
             * For the Drawbridge - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            C_Drawbridge: number /* float */[];
            /**
             * For the Rough Terrain - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            D_RoughTerrain: number /* float */[];
            /**
             * For the Rock Wall - An array with three values, number of times damaged, number of opportunities to damage, and percentage.
             */
            D_RockWall: number /* float */[];
            /**
             * Average number of high goals scored.
             */
            average_high_goals: number; // float
            /**
             * Average number of low goals scored.
             */
            average_low_goals: number; // float
            /**
             * An array with three values, number of times breached, number of opportunities to breach, and percentage.
             */
            breaches: number /* float */[];
            /**
             * An array with three values, number of times scaled, number of opportunities to scale, and percentage.
             */
            scales: number /* float */[];
            /**
             * An array with three values, number of times challenged, number of opportunities to challenge, and percentage.
             */
            challenges: number /* float */[];
            /**
             * An array with three values, number of times captured, number of opportunities to capture, and percentage.
             */
            captures: number /* float */[];
            /**
             * Average winning score.
             */
            average_win_score: number; // float
            /**
             * Average margin of victory.
             */
            average_win_margin: number; // float
            /**
             * Average total score.
             */
            average_score: number; // float
            /**
             * Average autonomous score.
             */
            average_auto_score: number; // float
            /**
             * Average crossing score.
             */
            average_crossing_score: number; // float
            /**
             * Average boulder score.
             */
            average_boulder_score: number; // float
            /**
             * Average tower score.
             */
            average_tower_score: number; // float
            /**
             * Average foul score.
             */
            average_foul_score: number; // float
            /**
             * An array with three values, high score, match key from the match with the high score, and the name of the match.
             */
            high_score: string[];
        }
        /**
         * Insights for FIRST STEAMWORKS qualification and elimination matches.
         */
        export interface EventInsights2017 {
            /**
             * Average foul score.
             */
            average_foul_score: number; // float
            /**
             * Average fuel points scored.
             */
            average_fuel_points: number; // float
            /**
             * Average fuel points scored during auto.
             */
            average_fuel_points_auto: number; // float
            /**
             * Average fuel points scored during teleop.
             */
            average_fuel_points_teleop: number; // float
            /**
             * Average points scored in the high goal.
             */
            average_high_goals: number; // float
            /**
             * Average points scored in the high goal during auto.
             */
            average_high_goals_auto: number; // float
            /**
             * Average points scored in the high goal during teleop.
             */
            average_high_goals_teleop: number; // float
            /**
             * Average points scored in the low goal.
             */
            average_low_goals: number; // float
            /**
             * Average points scored in the low goal during auto.
             */
            average_low_goals_auto: number; // float
            /**
             * Average points scored in the low goal during teleop.
             */
            average_low_goals_teleop: number; // float
            /**
             * Average mobility points scored during auto.
             */
            average_mobility_points_auto: number; // float
            /**
             * Average points scored during auto.
             */
            average_points_auto: number; // float
            /**
             * Average points scored during teleop.
             */
            average_points_teleop: number; // float
            /**
             * Average rotor points scored.
             */
            average_rotor_points: number; // float
            /**
             * Average rotor points scored during auto.
             */
            average_rotor_points_auto: number; // float
            /**
             * Average rotor points scored during teleop.
             */
            average_rotor_points_teleop: number; // float
            /**
             * Average score.
             */
            average_score: number; // float
            /**
             * Average takeoff points scored during teleop.
             */
            average_takeoff_points_teleop: number; // float
            /**
             * Average margin of victory.
             */
            average_win_margin: number; // float
            /**
             * Average winning score.
             */
            average_win_score: number; // float
            /**
             * An array with three values, kPa scored, match key from the match with the high kPa, and the name of the match
             */
            high_kpa: string[];
            /**
             * An array with three values, high score, match key from the match with the high score, and the name of the match
             */
            high_score: string[];
            /**
             * An array with three values, number of times kPa bonus achieved, number of opportunities to bonus, and percentage.
             */
            kpa_achieved: number /* float */[];
            /**
             * An array with three values, number of times mobility bonus achieved, number of opportunities to bonus, and percentage.
             */
            mobility_counts: number /* float */[];
            /**
             * An array with three values, number of times rotor 1 engaged, number of opportunities to engage, and percentage.
             */
            rotor_1_engaged: number /* float */[];
            /**
             * An array with three values, number of times rotor 1 engaged in auto, number of opportunities to engage in auto, and percentage.
             */
            rotor_1_engaged_auto: number /* float */[];
            /**
             * An array with three values, number of times rotor 2 engaged, number of opportunities to engage, and percentage.
             */
            rotor_2_engaged: number /* float */[];
            /**
             * An array with three values, number of times rotor 2 engaged in auto, number of opportunities to engage in auto, and percentage.
             */
            rotor_2_engaged_auto: number /* float */[];
            /**
             * An array with three values, number of times rotor 3 engaged, number of opportunities to engage, and percentage.
             */
            rotor_3_engaged: number /* float */[];
            /**
             * An array with three values, number of times rotor 4 engaged, number of opportunities to engage, and percentage.
             */
            rotor_4_engaged: number /* float */[];
            /**
             * An array with three values, number of times takeoff was counted, number of opportunities to takeoff, and percentage.
             */
            takeoff_counts: number /* float */[];
            /**
             * An array with three values, number of times a unicorn match (Win + kPa & Rotor Bonuses) occured, number of opportunities to have a unicorn match, and percentage.
             */
            unicorn_matches: number /* float */[];
        }
        /**
         * Insights for FIRST Power Up qualification and elimination matches.
         */
        export interface EventInsights2018 {
            /**
             * An array with three values, number of times auto quest was completed, number of opportunities to complete the auto quest, and percentage.
             */
            auto_quest_achieved: number /* float */[];
            /**
             * Average number of boost power up scored (out of 3).
             */
            average_boost_played: number; // float
            /**
             * Average endgame points.
             */
            average_endgame_points: number; // float
            /**
             * Average number of force power up scored (out of 3).
             */
            average_force_played: number; // float
            /**
             * Average foul score.
             */
            average_foul_score: number; // float
            /**
             * Average points scored during auto.
             */
            average_points_auto: number; // float
            /**
             * Average points scored during teleop.
             */
            average_points_teleop: number; // float
            /**
             * Average mobility points scored during auto.
             */
            average_run_points_auto: number; // float
            /**
             * Average scale ownership points scored.
             */
            average_scale_ownership_points: number; // float
            /**
             * Average scale ownership points scored during auto.
             */
            average_scale_ownership_points_auto: number; // float
            /**
             * Average scale ownership points scored during teleop.
             */
            average_scale_ownership_points_teleop: number; // float
            /**
             * Average score.
             */
            average_score: number; // float
            /**
             * Average switch ownership points scored.
             */
            average_switch_ownership_points: number; // float
            /**
             * Average switch ownership points scored during auto.
             */
            average_switch_ownership_points_auto: number; // float
            /**
             * Average switch ownership points scored during teleop.
             */
            average_switch_ownership_points_teleop: number; // float
            /**
             * Average value points scored.
             */
            average_vault_points: number; // float
            /**
             * Average margin of victory.
             */
            average_win_margin: number; // float
            /**
             * Average winning score.
             */
            average_win_score: number; // float
            /**
             * An array with three values, number of times a boost power up was played, number of opportunities to play a boost power up, and percentage.
             */
            boost_played_counts: number /* float */[];
            /**
             * An array with three values, number of times a climb occurred, number of opportunities to climb, and percentage.
             */
            climb_counts: number /* float */[];
            /**
             * An array with three values, number of times an alliance faced the boss, number of opportunities to face the boss, and percentage.
             */
            face_the_boss_achieved: number /* float */[];
            /**
             * An array with three values, number of times a force power up was played, number of opportunities to play a force power up, and percentage.
             */
            force_played_counts: number /* float */[];
            /**
             * An array with three values, high score, match key from the match with the high score, and the name of the match
             */
            high_score: string[];
            /**
             * An array with three values, number of times a levitate power up was played, number of opportunities to play a levitate power up, and percentage.
             */
            levitate_played_counts: number /* float */[];
            /**
             * An array with three values, number of times a team scored mobility points in auto, number of opportunities to score mobility points in auto, and percentage.
             */
            run_counts_auto: number /* float */[];
            /**
             * Average scale neutral percentage.
             */
            scale_neutral_percentage: number; // float
            /**
             * Average scale neutral percentage during auto.
             */
            scale_neutral_percentage_auto: number; // float
            /**
             * Average scale neutral percentage during teleop.
             */
            scale_neutral_percentage_teleop: number; // float
            /**
             * An array with three values, number of times a switch was owned during auto, number of opportunities to own a switch during auto, and percentage.
             */
            switch_owned_counts_auto: number /* float */[];
            /**
             * An array with three values, number of times a unicorn match (Win + Auto Quest + Face the Boss) occurred, number of opportunities to have a unicorn match, and percentage.
             */
            unicorn_matches: number /* float */[];
            /**
             * Average opposing switch denail percentage for the winning alliance during teleop.
             */
            winning_opp_switch_denial_percentage_teleop: number; // float
            /**
             * Average own switch ownership percentage for the winning alliance.
             */
            winning_own_switch_ownership_percentage: number; // float
            /**
             * Average own switch ownership percentage for the winning alliance during auto.
             */
            winning_own_switch_ownership_percentage_auto: number; // float
            /**
             * Average own switch ownership percentage for the winning alliance during teleop.
             */
            winning_own_switch_ownership_percentage_teleop: number; // float
            /**
             * Average scale ownership percentage for the winning alliance.
             */
            winning_scale_ownership_percentage: number; // float
            /**
             * Average scale ownership percentage for the winning alliance during auto.
             */
            winning_scale_ownership_percentage_auto: number; // float
            /**
             * Average scale ownership percentage for the winning alliance during teleop.
             */
            winning_scale_ownership_percentage_teleop: number; // float
        }
        /**
         * OPR, DPR, and CCWM for teams at the event.
         */
        export interface EventOPRs {
            /**
             * A key-value pair with team key (eg `frc254`) as key and OPR as value.
             */
            oprs?: {
                [name: string]: number; // float
            };
            /**
             * A key-value pair with team key (eg `frc254`) as key and DPR as value.
             */
            dprs?: {
                [name: string]: number; // float
            };
            /**
             * A key-value pair with team key (eg `frc254`) as key and CCWM as value.
             */
            ccwms?: {
                [name: string]: number; // float
            };
        }
        /**
         * JSON Object containing prediction information for the event. Contains year-specific information and is subject to change.
         */
        export interface EventPredictions {
        }
        export interface EventRanking {
            /**
             * List of rankings at the event.
             */
            rankings: {
                /**
                 * Number of matches played by this team.
                 */
                matches_played: number;
                /**
                 * The average match score during qualifications. Year specific. May be null if not relevant for a given year.
                 */
                qual_average?: number;
                /**
                 * Additional special data on the team's performance calculated by TBA.
                 */
                extra_stats?: number[];
                /**
                 * Additional year-specific information, may be null. See parent `sort_order_info` for details.
                 */
                sort_orders?: number[];
                record: /* A Win-Loss-Tie record for a team, or an alliance. */ WLTRecord;
                /**
                 * The team's rank at the event as provided by FIRST.
                 */
                rank: number;
                /**
                 * Number of times disqualified.
                 */
                dq: number;
                /**
                 * The team with this rank.
                 */
                team_key: string;
            }[];
            /**
             * List of special TBA-generated values provided in the `extra_stats` array for each item.
             */
            extra_stats_info?: {
                /**
                 * Integer expressing the number of digits of precision in the number provided in `sort_orders`.
                 */
                precision: number;
                /**
                 * Name of the field used in the `extra_stats` array.
                 */
                name: string;
            }[];
            /**
             * List of year-specific values provided in the `sort_orders` array for each team.
             */
            sort_order_info: {
                /**
                 * Integer expressing the number of digits of precision in the number provided in `sort_orders`.
                 */
                precision: number;
                /**
                 * Name of the field used in the `sort_order` array.
                 */
                name: string;
            }[];
        }
        export interface EventSimple {
            /**
             * TBA event key with the format yyyy[EVENT_CODE], where yyyy is the year, and EVENT_CODE is the event code of the event.
             */
            key: string;
            /**
             * Official name of event on record either provided by FIRST or organizers of offseason event.
             */
            name: string;
            /**
             * Event short code, as provided by FIRST.
             */
            event_code: string;
            /**
             * Event Type, as defined here: https://github.com/the-blue-alliance/the-blue-alliance/blob/master/consts/event_type.py#L2
             */
            event_type: number;
            district?: DistrictList;
            /**
             * City, town, village, etc. the event is located in.
             */
            city?: string;
            /**
             * State or Province the event is located in.
             */
            state_prov?: string;
            /**
             * Country the event is located in.
             */
            country?: string;
            /**
             * Event start date in `yyyy-mm-dd` format.
             */
            start_date: string; // date
            /**
             * Event end date in `yyyy-mm-dd` format.
             */
            end_date: string; // date
            /**
             * Year the event data is for.
             */
            year: number;
        }
        export interface Match {
            /**
             * TBA match key with the format `yyyy[EVENT_CODE]_[COMP_LEVEL]m[MATCH_NUMBER]`, where `yyyy` is the year, and `EVENT_CODE` is the event code of the event, `COMP_LEVEL` is (qm, ef, qf, sf, f), and `MATCH_NUMBER` is the match number in the competition level. A set number may be appended to the competition level if more than one match in required per set.
             */
            key: string;
            /**
             * The competition level the match was played at.
             */
            comp_level: "qm" | "ef" | "qf" | "sf" | "f";
            /**
             * The set number in a series of matches where more than one match is required in the match series.
             */
            set_number: number;
            /**
             * The match number of the match in the competition level.
             */
            match_number: number;
            /**
             * A list of alliances, the teams on the alliances, and their score.
             */
            alliances?: {
                red?: MatchAlliance;
                blue?: MatchAlliance;
            };
            /**
             * The color (red/blue) of the winning alliance. Will contain an empty string in the event of no winner, or a tie.
             */
            winning_alliance?: "red" | "blue" | "";
            /**
             * Event key of the event the match was played at.
             */
            event_key: string;
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) of the scheduled match time, as taken from the published schedule.
             */
            time?: number; // int64
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) of actual match start time.
             */
            actual_time?: number; // int64
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) of the TBA predicted match start time.
             */
            predicted_time?: number; // int64
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) when the match result was posted.
             */
            post_result_time?: number; // int64
            /**
             * Score breakdown for auto, teleop, etc. points. Varies from year to year. May be null.
             */
            score_breakdown?: {
                [key: string]: any;
            };
            /**
             * Array of video objects associated with this match.
             */
            videos?: {
                /**
                 * Can be one of 'youtube' or 'tba'
                 */
                type?: string;
                /**
                 * Unique key representing this video
                 */
                key?: string;
            }[];
        }
        export interface MatchAlliance {
            /**
             * Score for this alliance. Will be null or -1 for an unplayed match.
             */
            score: number;
            team_keys: string[];
            /**
             * TBA team keys (eg `frc254`) of any teams playing as a surrogate.
             */
            surrogate_team_keys?: string[];
            /**
             * TBA team keys (eg `frc254`) of any disqualified teams.
             */
            dq_team_keys?: string[];
        }
        /**
         * See the 2015 FMS API documentation for a description of each value
         */
        export interface MatchScoreBreakdown2015 {
            blue?: MatchScoreBreakdown2015Alliance;
            red?: MatchScoreBreakdown2015Alliance;
            coopertition?: "None" | "Unknown" | "Stack";
            coopertition_points?: number;
        }
        export interface MatchScoreBreakdown2015Alliance {
            auto_points?: number;
            teleop_points?: number;
            container_points?: number;
            tote_points?: number;
            litter_points?: number;
            foul_points?: number;
            adjust_points?: number;
            total_points?: number;
            foul_count?: number;
            tote_count_far?: number;
            tote_count_near?: number;
            tote_set?: boolean;
            tote_stack?: boolean;
            container_count_level1?: number;
            container_count_level2?: number;
            container_count_level3?: number;
            container_count_level4?: number;
            container_count_level5?: number;
            container_count_level6?: number;
            container_set?: boolean;
            litter_count_container?: number;
            litter_count_landfill?: number;
            litter_count_unprocessed?: number;
            robot_set?: boolean;
        }
        /**
         * See the 2016 FMS API documentation for a description of each value.
         */
        export interface MatchScoreBreakdown2016 {
            blue?: MatchScoreBreakdown2016Alliance;
            red?: MatchScoreBreakdown2016Alliance;
        }
        export interface MatchScoreBreakdown2016Alliance {
            autoPoints?: number;
            teleopPoints?: number;
            breachPoints?: number;
            foulPoints?: number;
            capturePoints?: number;
            adjustPoints?: number;
            totalPoints?: number;
            robot1Auto?: "Crossed" | "Reached" | "None";
            robot2Auto?: "Crossed" | "Reached" | "None";
            robot3Auto?: "Crossed" | "Reached" | "None";
            autoReachPoints?: number;
            autoCrossingPoints?: number;
            autoBouldersLow?: number;
            autoBouldersHigh?: number;
            autoBoulderPoints?: number;
            teleopCrossingPoints?: number;
            teleopBouldersLow?: number;
            teleopBouldersHigh?: number;
            teleopBoulderPoints?: number;
            teleopDefensesBreached?: boolean;
            teleopChallengePoints?: number;
            teleopScalePoints?: number;
            teleopTowerCaptured?: number;
            towerFaceA?: string;
            towerFaceB?: string;
            towerFaceC?: string;
            towerEndStrength?: number;
            techFoulCount?: number;
            foulCount?: number;
            position2?: string;
            position3?: string;
            position4?: string;
            position5?: string;
            position1crossings?: number;
            position2crossings?: number;
            position3crossings?: number;
            position4crossings?: number;
            position5crossings?: number;
        }
        /**
         * See the 2017 FMS API documentation for a description of each value.
         */
        export interface MatchScoreBreakdown2017 {
            blue?: MatchScoreBreakdown2017Alliance;
            red?: MatchScoreBreakdown2017Alliance;
        }
        export interface MatchScoreBreakdown2017Alliance {
            autoPoints?: number;
            teleopPoints?: number;
            foulPoints?: number;
            adjustPoints?: number;
            totalPoints?: number;
            robot1Auto?: "Unknown" | "Mobility" | "None";
            robot2Auto?: "Unknown" | "Mobility" | "None";
            robot3Auto?: "Unknown" | "Mobility" | "None";
            rotor1Auto?: boolean;
            rotor2Auto?: boolean;
            autoFuelLow?: number;
            autoFuelHigh?: number;
            autoMobilityPoints?: number;
            autoRotorPoints?: number;
            autoFuelPoints?: number;
            teleopFuelPoints?: number;
            teleopFuelLow?: number;
            teleopFuelHigh?: number;
            teleopRotorPoints?: number;
            kPaRankingPointAchieved?: boolean;
            teleopTakeoffPoints?: number;
            kPaBonusPoints?: number;
            rotorBonusPoints?: number;
            rotor1Engaged?: boolean;
            rotor2Engaged?: boolean;
            rotor3Engaged?: boolean;
            rotor4Engaged?: boolean;
            rotorRankingPointAchieved?: boolean;
            techFoulCount?: number;
            foulCount?: number;
            touchpadNear?: string;
            touchpadMiddle?: string;
            touchpadFar?: string;
        }
        /**
         * See the 2018 FMS API documentation for a description of each value. https://frcevents2.docs.apiary.io/#/reference/match-results/score-details
         */
        export interface MatchScoreBreakdown2018 {
            blue?: MatchScoreBreakdown2018Alliance;
            red?: MatchScoreBreakdown2018Alliance;
        }
        export interface MatchScoreBreakdown2018Alliance {
            adjustPoints?: number;
            autoOwnershipPoints?: number;
            autoPoints?: number;
            autoQuestRankingPoint?: boolean;
            autoRobot1?: string;
            autoRobot2?: string;
            autoRobot3?: string;
            autoRunPoints?: number;
            autoScaleOwnershipSec?: number;
            autoSwitchAtZero?: boolean;
            autoSwitchOwnershipSec?: number;
            endgamePoints?: number;
            endgameRobot1?: string;
            endgameRobot2?: string;
            endgameRobot3?: string;
            faceTheBossRankingPoint?: boolean;
            foulCount?: number;
            foulPoints?: number;
            rp?: number;
            techFoulCount?: number;
            teleopOwnershipPoints?: number;
            teleopPoints?: number;
            teleopScaleBoostSec?: number;
            teleopScaleForceSec?: number;
            teleopScaleOwnershipSec?: number;
            teleopSwitchBoostSec?: number;
            teleopSwitchForceSec?: number;
            teleopSwitchOwnershipSec?: number;
            totalPoints?: number;
            vaultBoostPlayed?: number;
            vaultBoostTotal?: number;
            vaultForcePlayed?: number;
            vaultForceTotal?: number;
            vaultLevitatePlayed?: number;
            vaultLevitateTotal?: number;
            vaultPoints?: number;
            /**
             * Unofficial TBA-computed value of the FMS provided GameData given to the alliance teams at the start of the match. 3 Character String containing `L` and `R` only. The first character represents the near switch, the 2nd the scale, and the 3rd the far, opposing, switch from the alliance's perspective. An `L` in a position indicates the platform on the left will be lit for the alliance while an `R` will indicate the right platform will be lit for the alliance. See also [WPI Screen Steps](https://wpilib.screenstepslive.com/s/currentCS/m/getting_started/l/826278-2018-game-data-details).
             */
            tba_gameData?: string;
        }
        /**
         * See the 2019 FMS API documentation for a description of each value. https://frcevents2.docs.apiary.io/#/reference/match-results/score-details
         */
        export interface MatchScoreBreakdown2019 {
            blue?: MatchScoreBreakdown2019Alliance;
            red?: MatchScoreBreakdown2019Alliance;
        }
        export interface MatchScoreBreakdown2019Alliance {
            adjustPoints?: number;
            autoPoints?: number;
            bay1?: string;
            bay2?: string;
            bay3?: string;
            bay4?: string;
            bay5?: string;
            bay6?: string;
            bay7?: string;
            bay8?: string;
            cargoPoints?: number;
            completeRocketRankingPoint?: boolean;
            completedRocketFar?: boolean;
            completedRocketNear?: boolean;
            endgameRobot1?: string;
            endgameRobot2?: string;
            endgameRobot3?: string;
            foulCount?: number;
            foulPoints?: number;
            habClimbPoints?: number;
            habDockingRankingPoint?: boolean;
            habLineRobot1?: string;
            habLineRobot2?: string;
            habLineRobot3?: string;
            hatchPanelPoints?: number;
            lowLeftRocketFar?: string;
            lowLeftRocketNear?: string;
            lowRightRocketFar?: string;
            lowRightRocketNear?: string;
            midLeftRocketFar?: string;
            midLeftRocketNear?: string;
            midRightRocketFar?: string;
            midRightRocketNear?: string;
            preMatchBay1?: string;
            preMatchBay2?: string;
            preMatchBay3?: string;
            preMatchBay6?: string;
            preMatchBay7?: string;
            preMatchBay8?: string;
            preMatchLevelRobot1?: string;
            preMatchLevelRobot2?: string;
            preMatchLevelRobot3?: string;
            rp?: number;
            sandStormBonusPoints?: number;
            techFoulCount?: number;
            teleopPoints?: number;
            topLeftRocketFar?: string;
            topLeftRocketNear?: string;
            topRightRocketFar?: string;
            topRightRocketNear?: string;
            totalPoints?: number;
        }
        /**
         * See the 2020 FMS API documentation for a description of each value. https://frcevents2.docs.apiary.io/#/reference/match-results/score-details
         */
        export interface MatchScoreBreakdown2020 {
            blue?: MatchScoreBreakdown2020Alliance;
            red?: MatchScoreBreakdown2020Alliance;
        }
        export interface MatchScoreBreakdown2020Alliance {
            initLineRobot1?: string;
            endgameRobot1?: string;
            initLineRobot2?: string;
            endgameRobot2?: string;
            initLineRobot3?: string;
            endgameRobot3?: string;
            autoCellsBottom?: number;
            autoCellsOuter?: number;
            autoCellsInner?: number;
            teleopCellsBottom?: number;
            teleopCellsOuter?: number;
            teleopCellsInner?: number;
            stage1Activated?: boolean;
            stage2Activated?: boolean;
            stage3Activated?: boolean;
            stage3TargetColor?: string;
            endgameRungIsLevel?: string;
            autoInitLinePoints?: number;
            autoCellPoints?: number;
            autoPoints?: number;
            teleopCellPoints?: number;
            controlPanelPoints?: number;
            endgamePoints?: number;
            teleopPoints?: number;
            shieldOperationalRankingPoint?: boolean;
            shieldEnergizedRankingPoint?: boolean;
            /**
             * Unofficial TBA-computed value that indicates whether the shieldEnergizedRankingPoint was earned normally or awarded due to a foul.
             */
            tba_shieldEnergizedRankingPointFromFoul?: boolean;
            /**
             * Unofficial TBA-computed value that counts the number of robots who were hanging at the end of the match.
             */
            tba_numRobotsHanging?: number;
            foulCount?: number;
            techFoulCount?: number;
            adjustPoints?: number;
            foulPoints?: number;
            rp?: number;
            totalPoints?: number;
        }
        /**
         * See the 2022 FMS API documentation for a description of each value. https://frc-api-docs.firstinspires.org
         */
        export interface MatchScoreBreakdown2022 {
            blue?: MatchScoreBreakdown2022Alliance;
            red?: MatchScoreBreakdown2022Alliance;
        }
        export interface MatchScoreBreakdown2022Alliance {
            taxiRobot1?: "Yes" | "No";
            endgameRobot1?: "Traversal" | "High" | "Mid" | "Low" | "None";
            taxiRobot2?: "Yes" | "No";
            endgameRobot2?: "Traversal" | "High" | "Mid" | "Low" | "None";
            taxiRobot3?: "Yes" | "No";
            endgameRobot3?: "Traversal" | "High" | "Mid" | "Low" | "None";
            autoCargoLowerNear?: number;
            autoCargoLowerFar?: number;
            autoCargoLowerBlue?: number;
            autoCargoLowerRed?: number;
            autoCargoUpperNear?: number;
            autoCargoUpperFar?: number;
            autoCargoUpperBlue?: number;
            autoCargoUpperRed?: number;
            autoCargoTotal?: number;
            teleopCargoLowerNear?: number;
            teleopCargoLowerFar?: number;
            teleopCargoLowerBlue?: number;
            teleopCargoLowerRed?: number;
            teleopCargoUpperNear?: number;
            teleopCargoUpperFar?: number;
            teleopCargoUpperBlue?: number;
            teleopCargoUpperRed?: number;
            teleopCargoTotal?: number;
            matchCargoTotal?: number;
            autoTaxiPoints?: number;
            autoCargoPoints?: number;
            autoPoints?: number;
            quintetAchieved?: boolean;
            teleopCargoPoints?: number;
            endgamePoints?: number;
            teleopPoints?: number;
            cargoBonusRankingPoint?: boolean;
            hangarBonusRankingPoint?: boolean;
            foulCount?: number;
            techFoulCount?: number;
            adjustPoints?: number;
            foulPoints?: number;
            rp?: number;
            totalPoints?: number;
        }
        /**
         * See the 2023 FMS API documentation for a description of each value. https://frc-api-docs.firstinspires.org
         */
        export interface MatchScoreBreakdown2023 {
            blue?: MatchScoreBreakdown2023Alliance;
            red?: MatchScoreBreakdown2023Alliance;
        }
        export interface MatchScoreBreakdown2023Alliance {
            activationBonusAchieved?: boolean;
            adjustPoints?: number;
            autoBridgeState?: "NotLevel" | "Level";
            autoChargeStationPoints?: number;
            autoChargeStationRobot1?: "None" | "Docked";
            autoChargeStationRobot2?: "None" | "Docked";
            autoChargeStationRobot3?: "None" | "Docked";
            autoDocked?: boolean;
            autoCommunity?: {
                B?: ("None" | "Cone" | "Cube")[];
                M?: ("None" | "Cone" | "Cube")[];
                T?: ("None" | "Cone" | "Cube")[];
            };
            autoGamePieceCount?: number;
            autoGamePiecePoints?: number;
            autoMobilityPoints?: number;
            mobilityRobot1?: "Yes" | "No";
            mobilityRobot2?: "Yes" | "No";
            mobilityRobot3?: "Yes" | "No";
            autoPoints?: number;
            coopGamePieceCount?: number;
            coopertitionCriteriaMet?: boolean;
            endGameBridgeState?: "NotLevel" | "Level";
            endGameChargeStationPoints?: number;
            endGameChargeStationRobot1?: "None" | "Docked";
            endGameChargeStationRobot2?: "None" | "Docked";
            endGameChargeStationRobot3?: "None" | "Docked";
            endGameParkPoints?: number;
            extraGamePieceCount?: number;
            foulCount?: number;
            foulPoints?: number;
            techFoulCount?: number;
            linkPoints?: number;
            links?: {
                nodes?: ("None" | "Cone" | "Cube")[];
                row?: "Bottom" | "Mid" | "Top";
            }[];
            sustainabilityBonusAchieved?: boolean;
            teleopCommunity?: {
                B?: ("None" | "Cone" | "Cube")[];
                M?: ("None" | "Cone" | "Cube")[];
                T?: ("None" | "Cone" | "Cube")[];
            };
            teleopGamePieceCount?: number;
            teleopGamePiecePoints?: number;
            totalChargeStationPoints?: number;
            teleopPoints?: number;
            rp?: number;
            totalPoints?: number;
        }
        export interface MatchSimple {
            /**
             * TBA match key with the format `yyyy[EVENT_CODE]_[COMP_LEVEL]m[MATCH_NUMBER]`, where `yyyy` is the year, and `EVENT_CODE` is the event code of the event, `COMP_LEVEL` is (qm, ef, qf, sf, f), and `MATCH_NUMBER` is the match number in the competition level. A set number may append the competition level if more than one match in required per set.
             */
            key: string;
            /**
             * The competition level the match was played at.
             */
            comp_level: "qm" | "ef" | "qf" | "sf" | "f";
            /**
             * The set number in a series of matches where more than one match is required in the match series.
             */
            set_number: number;
            /**
             * The match number of the match in the competition level.
             */
            match_number: number;
            /**
             * A list of alliances, the teams on the alliances, and their score.
             */
            alliances?: {
                red?: MatchAlliance;
                blue?: MatchAlliance;
            };
            /**
             * The color (red/blue) of the winning alliance. Will contain an empty string in the event of no winner, or a tie.
             */
            winning_alliance?: "red" | "blue" | "";
            /**
             * Event key of the event the match was played at.
             */
            event_key: string;
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) of the scheduled match time, as taken from the published schedule.
             */
            time?: number; // int64
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) of the TBA predicted match start time.
             */
            predicted_time?: number; // int64
            /**
             * UNIX timestamp (seconds since 1-Jan-1970 00:00:00) of actual match start time.
             */
            actual_time?: number; // int64
        }
        /**
         * Timeseries data for the 2018 game *FIRST* POWER UP.
         * *WARNING:* This is *not* official data, and is subject to a significant possibility of error, or missing data. Do not rely on this data for any purpose. In fact, pretend we made it up.
         * *WARNING:* This model is currently under active development and may change at any time, including in breaking ways.
         */
        export interface MatchTimeseries2018 {
            /**
             * TBA event key with the format yyyy[EVENT_CODE], where yyyy is the year, and EVENT_CODE is the event code of the event.
             */
            event_key?: string;
            /**
             * Match ID consisting of the level, match number, and set number, eg `qm45` or `f1m1`.
             */
            match_id?: string;
            /**
             * Current mode of play, can be `pre_match`, `auto`, `telop`, or `post_match`.
             */
            mode?: string;
            play?: number;
            /**
             * Amount of time remaining in the match, only valid during `auto` and `teleop` modes.
             */
            time_remaining?: number;
            /**
             * 1 if the blue alliance is credited with the AUTO QUEST, 0 if not.
             */
            blue_auto_quest?: number;
            /**
             * Number of POWER CUBES in the BOOST section of the blue alliance VAULT.
             */
            blue_boost_count?: number;
            /**
             * Returns 1 if the blue alliance BOOST was played, or 0 if not played.
             */
            blue_boost_played?: number;
            /**
             * Name of the current blue alliance POWER UP being played, or `null`.
             */
            blue_current_powerup?: string;
            /**
             * 1 if the blue alliance is credited with FACING THE BOSS, 0 if not.
             */
            blue_face_the_boss?: number;
            /**
             * Number of POWER CUBES in the FORCE section of the blue alliance VAULT.
             */
            blue_force_count?: number;
            /**
             * Returns 1 if the blue alliance FORCE was played, or 0 if not played.
             */
            blue_force_played?: number;
            /**
             * Number of POWER CUBES in the LEVITATE section of the blue alliance VAULT.
             */
            blue_levitate_count?: number;
            /**
             * Returns 1 if the blue alliance LEVITATE was played, or 0 if not played.
             */
            blue_levitate_played?: number;
            /**
             * Number of seconds remaining in the blue alliance POWER UP time, or 0 if none is active.
             */
            blue_powerup_time_remaining?: string;
            /**
             * 1 if the blue alliance owns the SCALE, 0 if not.
             */
            blue_scale_owned?: number;
            /**
             * Current score for the blue alliance.
             */
            blue_score?: number;
            /**
             * 1 if the blue alliance owns their SWITCH, 0 if not.
             */
            blue_switch_owned?: number;
            /**
             * 1 if the red alliance is credited with the AUTO QUEST, 0 if not.
             */
            red_auto_quest?: number;
            /**
             * Number of POWER CUBES in the BOOST section of the red alliance VAULT.
             */
            red_boost_count?: number;
            /**
             * Returns 1 if the red alliance BOOST was played, or 0 if not played.
             */
            red_boost_played?: number;
            /**
             * Name of the current red alliance POWER UP being played, or `null`.
             */
            red_current_powerup?: string;
            /**
             * 1 if the red alliance is credited with FACING THE BOSS, 0 if not.
             */
            red_face_the_boss?: number;
            /**
             * Number of POWER CUBES in the FORCE section of the red alliance VAULT.
             */
            red_force_count?: number;
            /**
             * Returns 1 if the red alliance FORCE was played, or 0 if not played.
             */
            red_force_played?: number;
            /**
             * Number of POWER CUBES in the LEVITATE section of the red alliance VAULT.
             */
            red_levitate_count?: number;
            /**
             * Returns 1 if the red alliance LEVITATE was played, or 0 if not played.
             */
            red_levitate_played?: number;
            /**
             * Number of seconds remaining in the red alliance POWER UP time, or 0 if none is active.
             */
            red_powerup_time_remaining?: string;
            /**
             * 1 if the red alliance owns the SCALE, 0 if not.
             */
            red_scale_owned?: number;
            /**
             * Current score for the red alliance.
             */
            red_score?: number;
            /**
             * 1 if the red alliance owns their SWITCH, 0 if not.
             */
            red_switch_owned?: number;
        }
        /**
         * The `Media` object contains a reference for most any media associated with a team or event on TBA.
         */
        export interface Media {
            /**
             * String type of the media element.
             */
            type: "youtube" | "cdphotothread" | "imgur" | "facebook-profile" | "youtube-channel" | "twitter-profile" | "github-profile" | "instagram-profile" | "periscope-profile" | "gitlab-profile" | "grabcad" | "instagram-image" | "external-link" | "avatar";
            /**
             * The key used to identify this media on the media site.
             */
            foreign_key: string;
            /**
             * If required, a JSON dict of additional media information.
             */
            details?: {
                [key: string]: any;
            };
            /**
             * True if the media is of high quality.
             */
            preferred?: boolean;
            /**
             * Direct URL to the media.
             */
            direct_url?: string;
            /**
             * The URL that leads to the full web page for the media, if one exists.
             */
            view_url?: string;
        }
        export interface Team {
            /**
             * TBA team key with the format `frcXXXX` with `XXXX` representing the team number.
             */
            key: string;
            /**
             * Official team number issued by FIRST.
             */
            team_number: number;
            /**
             * Team nickname provided by FIRST.
             */
            nickname?: string;
            /**
             * Official long name registered with FIRST.
             */
            name: string;
            /**
             * Name of team school or affilited group registered with FIRST.
             */
            school_name?: string;
            /**
             * City of team derived from parsing the address registered with FIRST.
             */
            city?: string;
            /**
             * State of team derived from parsing the address registered with FIRST.
             */
            state_prov?: string;
            /**
             * Country of team derived from parsing the address registered with FIRST.
             */
            country?: string;
            /**
             * Will be NULL, for future development.
             */
            address?: string;
            /**
             * Postal code from the team address.
             */
            postal_code?: string;
            /**
             * Will be NULL, for future development.
             */
            gmaps_place_id?: string;
            /**
             * Will be NULL, for future development.
             */
            gmaps_url?: string; // url
            /**
             * Will be NULL, for future development.
             */
            lat?: number; // double
            /**
             * Will be NULL, for future development.
             */
            lng?: number; // double
            /**
             * Will be NULL, for future development.
             */
            location_name?: string;
            /**
             * Official website associated with the team.
             */
            website?: string; // url
            /**
             * First year the team officially competed.
             */
            rookie_year?: number;
            /**
             * Team's motto as provided by FIRST. This field is deprecated and will return null - will be removed at end-of-season in 2019.
             */
            motto?: string;
            /**
             * Location of the team's home championship each year as a key-value pair. The year (as a string) is the key, and the city is the value.
             */
            home_championship?: {
                [key: string]: any;
            };
        }
        export interface TeamEventStatus {
            qual?: TeamEventStatusRank;
            alliance?: TeamEventStatusAlliance;
            playoff?: /* Playoff status for this team, may be null if the team did not make playoffs, or playoffs have not begun. */ TeamEventStatusPlayoff;
            /**
             * An HTML formatted string suitable for display to the user containing the team's alliance pick status.
             */
            alliance_status_str?: string;
            /**
             * An HTML formatter string suitable for display to the user containing the team's playoff status.
             */
            playoff_status_str?: string;
            /**
             * An HTML formatted string suitable for display to the user containing the team's overall status summary of the event.
             */
            overall_status_str?: string;
            /**
             * TBA match key for the next match the team is scheduled to play in at this event, or null.
             */
            next_match_key?: string;
            /**
             * TBA match key for the last match the team played in at this event, or null.
             */
            last_match_key?: string;
        }
        export interface TeamEventStatusAlliance {
            /**
             * Alliance name, may be null.
             */
            name?: string;
            /**
             * Alliance number.
             */
            number: number;
            backup?: /* Backup status, may be null. */ TeamEventStatusAllianceBackup;
            /**
             * Order the team was picked in the alliance from 0-2, with 0 being alliance captain.
             */
            pick: number;
        }
        /**
         * Backup status, may be null.
         */
        export interface TeamEventStatusAllianceBackup {
            /**
             * TBA key for the team replaced by the backup.
             */
            out?: string;
            /**
             * TBA key for the backup team called in.
             */
            in?: string;
        }
        /**
         * Playoff status for this team, may be null if the team did not make playoffs, or playoffs have not begun.
         */
        export interface TeamEventStatusPlayoff {
            /**
             * The highest playoff level the team reached.
             */
            level?: "qm" | "ef" | "qf" | "sf" | "f";
            current_level_record?: /* A Win-Loss-Tie record for a team, or an alliance. */ WLTRecord;
            record?: /* A Win-Loss-Tie record for a team, or an alliance. */ WLTRecord;
            /**
             * Current competition status for the playoffs.
             */
            status?: "won" | "eliminated" | "playing";
            /**
             * The average match score during playoffs. Year specific. May be null if not relevant for a given year.
             */
            playoff_average?: number;
        }
        export interface TeamEventStatusRank {
            /**
             * Number of teams ranked.
             */
            num_teams?: number;
            ranking?: {
                /**
                 * Number of matches played.
                 */
                matches_played?: number;
                /**
                 * For some years, average qualification score. Can be null.
                 */
                qual_average?: number; // double
                /**
                 * Ordered list of values used to determine the rank. See the `sort_order_info` property for the name of each value.
                 */
                sort_orders?: number[];
                record?: /* A Win-Loss-Tie record for a team, or an alliance. */ WLTRecord;
                /**
                 * Relative rank of this team.
                 */
                rank?: number;
                /**
                 * Number of matches the team was disqualified for.
                 */
                dq?: number;
                /**
                 * TBA team key for this rank.
                 */
                team_key?: string;
            };
            /**
             * Ordered list of names corresponding to the elements of the `sort_orders` array.
             */
            sort_order_info?: {
                /**
                 * The number of digits of precision used for this value, eg `2` would correspond to a value of `101.11` while `0` would correspond to `101`.
                 */
                precision?: number;
                /**
                 * The descriptive name of the value used to sort the ranking.
                 */
                name?: string;
            }[];
            status?: string;
        }
        export interface TeamRobot {
            /**
             * Year this robot competed in.
             */
            year: number;
            /**
             * Name of the robot as provided by the team.
             */
            robot_name: string;
            /**
             * Internal TBA identifier for this robot.
             */
            key: string;
            /**
             * TBA team key for this robot.
             */
            team_key: string;
        }
        export interface TeamSimple {
            /**
             * TBA team key with the format `frcXXXX` with `XXXX` representing the team number.
             */
            key: string;
            /**
             * Official team number issued by FIRST.
             */
            team_number: number;
            /**
             * Team nickname provided by FIRST.
             */
            nickname?: string;
            /**
             * Official long name registered with FIRST.
             */
            name: string;
            /**
             * City of team derived from parsing the address registered with FIRST.
             */
            city?: string;
            /**
             * State of team derived from parsing the address registered with FIRST.
             */
            state_prov?: string;
            /**
             * Country of team derived from parsing the address registered with FIRST.
             */
            country?: string;
        }
        /**
         * A Win-Loss-Tie record for a team, or an alliance.
         */
        export interface WLTRecord {
            /**
             * Number of losses.
             */
            losses: number;
            /**
             * Number of wins.
             */
            wins: number;
            /**
             * Number of ties.
             */
            ties: number;
        }
        export interface Webcast {
            /**
             * Type of webcast, typically descriptive of the streaming provider.
             */
            type: "youtube" | "twitch" | "ustream" | "iframe" | "html5" | "rtmp" | "livestream" | "direct_link" | "mms" | "justin" | "stemtv" | "dacast";
            /**
             * Type specific channel information. May be the YouTube stream, or Twitch channel name. In the case of iframe types, contains HTML to embed the stream in an HTML iframe.
             */
            channel: string;
            /**
             * The date for the webcast in `yyyy-mm-dd` format. May be null.
             */
            date?: string;
            /**
             * File identification as may be required for some types. May be null.
             */
            file?: string;
        }
        export interface Zebra {
            /**
             * TBA match key with the format `yyyy[EVENT_CODE]_[COMP_LEVEL]m[MATCH_NUMBER]`, where `yyyy` is the year, and `EVENT_CODE` is the event code of the event, `COMP_LEVEL` is (qm, ef, qf, sf, f), and `MATCH_NUMBER` is the match number in the competition level. A set number may be appended to the competition level if more than one match in required per set.
             */
            key: string;
            /**
             * A list of relative timestamps for each data point. Each timestamp will correspond to the X and Y value at the same index in a team xs and ys arrays. `times`, all teams `xs` and all teams `ys` are guarenteed to be the same length.
             */
            times: number /* double */[];
            alliances: {
                /**
                 * Zebra MotionWorks data for teams on the red alliance
                 */
                red?: ZebraTeam[];
                /**
                 * Zebra data for teams on the blue alliance
                 */
                blue?: ZebraTeam[];
            };
        }
        export interface ZebraTeam {
            /**
             * The TBA team key for the Zebra MotionWorks data.
             * example:
             * frc7332
             */
            team_key: string;
            /**
             * A list containing doubles and nulls representing a teams X position in feet at the corresponding timestamp. A null value represents no tracking data for a given timestamp.
             */
            xs: number /* double */[];
            /**
             * A list containing doubles and nulls representing a teams Y position in feet at the corresponding timestamp. A null value represents no tracking data for a given timestamp.
             */
            ys: number /* double */[];
        }
    }
}
declare namespace Paths {
    namespace GetDistrictEvents {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Event[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictEventsKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            /**
             * Array of Event Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictEventsSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictRankings {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            export type $200 = /* Rank of a team in a district. */ Components.Schemas.DistrictRanking[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictTeams {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Team[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictTeamsKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            /**
             * Array of Team Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictTeamsSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type DistrictKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            district_key: Parameters.DistrictKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetDistrictsByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DistrictList[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEvent {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Event;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventAlliances {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EliminationAlliance[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventAwards {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Award[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventDistrictPoints {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventDistrictPoints;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventInsights {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = /* A year-specific event insight object expressed as a JSON string, separated in to `qual` and `playoff` fields. See also Event_Insights_2016, Event_Insights_2017, etc. */ Components.Schemas.EventInsights;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventMatchTimeseries {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventMatches {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Match[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventMatchesKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            /**
             * Array of Match Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventMatchesSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MatchSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventOPRs {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = /* OPR, DPR, and CCWM for teams at the event. */ Components.Schemas.EventOPRs;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventPredictions {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = /* JSON Object containing prediction information for the event. Contains year-specific information and is subject to change. */ Components.Schemas.EventPredictions;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventRankings {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventRanking;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventSimple;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventTeams {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Team[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventTeamsKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            /**
             * Array of Team Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventTeamsSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventTeamsStatuses {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
        }
        export interface PathParameters {
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            /**
             * A key-value pair of `Team_Event_Status` objects with the event key as the key.
             */
            export interface $200 {
                [name: string]: Components.Schemas.TeamEventStatus;
            }
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventsByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Event[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventsByYearKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
        }
        namespace Responses {
            /**
             * Array of Event Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetEventsByYearSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetMatch {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type MatchKey = string;
        }
        export interface PathParameters {
            match_key: Parameters.MatchKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Match;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetMatchSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type MatchKey = string;
        }
        export interface PathParameters {
            match_key: Parameters.MatchKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MatchSimple;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetMatchTimeseries {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type MatchKey = string;
        }
        export interface PathParameters {
            match_key: Parameters.MatchKey;
        }
        namespace Responses {
            export type $200 = {
                [key: string]: any;
            }[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetMatchZebra {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type MatchKey = string;
        }
        export interface PathParameters {
            match_key: Parameters.MatchKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Zebra;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetStatus {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.APIStatus;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeam {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Team;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamAwards {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Award[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamAwardsByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Award[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamDistricts {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.DistrictList[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventAwards {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Award[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventMatches {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Match[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventMatchesKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            /**
             * Array of Match Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventMatchesSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Match[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventStatus {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type EventKey = string;
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            event_key: Parameters.EventKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamEventStatus;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEvents {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Event[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventsByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Event[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventsByYearKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            /**
             * Array of Event Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventsByYearSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventsKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            /**
             * Array of Event Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventsSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EventSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamEventsStatusesByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            /**
             * A key-value pair of `Team_Event_Status` objects with the event key as the key.
             */
            export interface $200 {
                [name: string]: Components.Schemas.TeamEventStatus;
            }
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamMatchesByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Match[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamMatchesByYearKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            /**
             * Array of Match Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamMatchesByYearSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MatchSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamMediaByTag {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type MediaTag = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            media_tag: Parameters.MediaTag;
        }
        namespace Responses {
            export type $200 = /* The `Media` object contains a reference for most any media associated with a team or event on TBA. */ Components.Schemas.Media[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamMediaByTagYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type MediaTag = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            media_tag: Parameters.MediaTag;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = /* The `Media` object contains a reference for most any media associated with a team or event on TBA. */ Components.Schemas.Media[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamMediaByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
            export type Year = number;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
            year: Parameters.Year;
        }
        namespace Responses {
            export type $200 = /* The `Media` object contains a reference for most any media associated with a team or event on TBA. */ Components.Schemas.Media[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamRobots {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamRobot[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSimple;
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamSocialMedia {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = /* The `Media` object contains a reference for most any media associated with a team or event on TBA. */ Components.Schemas.Media[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamYearsParticipated {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type TeamKey = string;
        }
        export interface PathParameters {
            team_key: Parameters.TeamKey;
        }
        namespace Responses {
            export type $200 = number[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeams {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type PageNum = number;
        }
        export interface PathParameters {
            page_num: Parameters.PageNum;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Team[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamsByYear {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type PageNum = number;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
            page_num: Parameters.PageNum;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Team[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamsByYearKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type PageNum = number;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
            page_num: Parameters.PageNum;
        }
        namespace Responses {
            /**
             * Array of Team Keys
             */
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamsByYearSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type PageNum = number;
            export type Year = number;
        }
        export interface PathParameters {
            year: Parameters.Year;
            page_num: Parameters.PageNum;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamsKeys {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type PageNum = number;
        }
        export interface PathParameters {
            page_num: Parameters.PageNum;
        }
        namespace Responses {
            export type $200 = string[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace GetTeamsSimple {
        export interface HeaderParameters {
            "If-None-Match"?: Parameters.IfNoneMatch;
        }
        namespace Parameters {
            export type IfNoneMatch = string;
            export type PageNum = number;
        }
        export interface PathParameters {
            page_num: Parameters.PageNum;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TeamSimple[];
            export type $304 = Components.Responses.NotModified;
            export type $401 = Components.Responses.Unauthorized;
        }
    }
}

export interface OperationMethods {
  /**
   * getStatus - Returns API status, and TBA status information.
   */
  'getStatus'(
    parameters?: Parameters<Paths.GetStatus.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStatus.Responses.$200>
  /**
   * getTeams - Gets a list of `Team` objects, paginated in groups of 500.
   */
  'getTeams'(
    parameters: Parameters<Paths.GetTeams.HeaderParameters & Paths.GetTeams.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeams.Responses.$200>
  /**
   * getTeamsSimple - Gets a list of short form `Team_Simple` objects, paginated in groups of 500.
   */
  'getTeamsSimple'(
    parameters: Parameters<Paths.GetTeamsSimple.HeaderParameters & Paths.GetTeamsSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamsSimple.Responses.$200>
  /**
   * getTeamsKeys - Gets a list of Team keys, paginated in groups of 500. (Note, each page will not have 500 teams, but will include the teams within that range of 500.)
   */
  'getTeamsKeys'(
    parameters: Parameters<Paths.GetTeamsKeys.HeaderParameters & Paths.GetTeamsKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamsKeys.Responses.$200>
  /**
   * getTeamsByYear - Gets a list of `Team` objects that competed in the given year, paginated in groups of 500.
   */
  'getTeamsByYear'(
    parameters: Parameters<Paths.GetTeamsByYear.HeaderParameters & Paths.GetTeamsByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamsByYear.Responses.$200>
  /**
   * getTeamsByYearSimple - Gets a list of short form `Team_Simple` objects that competed in the given year, paginated in groups of 500.
   */
  'getTeamsByYearSimple'(
    parameters: Parameters<Paths.GetTeamsByYearSimple.HeaderParameters & Paths.GetTeamsByYearSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamsByYearSimple.Responses.$200>
  /**
   * getTeamsByYearKeys - Gets a list Team Keys that competed in the given year, paginated in groups of 500.
   */
  'getTeamsByYearKeys'(
    parameters: Parameters<Paths.GetTeamsByYearKeys.HeaderParameters & Paths.GetTeamsByYearKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamsByYearKeys.Responses.$200>
  /**
   * getTeam - Gets a `Team` object for the team referenced by the given key.
   */
  'getTeam'(
    parameters: Parameters<Paths.GetTeam.HeaderParameters & Paths.GetTeam.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeam.Responses.$200>
  /**
   * getTeamSimple - Gets a `Team_Simple` object for the team referenced by the given key.
   */
  'getTeamSimple'(
    parameters: Parameters<Paths.GetTeamSimple.HeaderParameters & Paths.GetTeamSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamSimple.Responses.$200>
  /**
   * getTeamYearsParticipated - Gets a list of years in which the team participated in at least one competition.
   */
  'getTeamYearsParticipated'(
    parameters: Parameters<Paths.GetTeamYearsParticipated.HeaderParameters & Paths.GetTeamYearsParticipated.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamYearsParticipated.Responses.$200>
  /**
   * getTeamDistricts - Gets an array of districts representing each year the team was in a district. Will return an empty array if the team was never in a district.
   */
  'getTeamDistricts'(
    parameters: Parameters<Paths.GetTeamDistricts.HeaderParameters & Paths.GetTeamDistricts.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamDistricts.Responses.$200>
  /**
   * getTeamRobots - Gets a list of year and robot name pairs for each year that a robot name was provided. Will return an empty array if the team has never named a robot.
   */
  'getTeamRobots'(
    parameters: Parameters<Paths.GetTeamRobots.HeaderParameters & Paths.GetTeamRobots.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamRobots.Responses.$200>
  /**
   * getTeamEvents - Gets a list of all events this team has competed at.
   */
  'getTeamEvents'(
    parameters: Parameters<Paths.GetTeamEvents.HeaderParameters & Paths.GetTeamEvents.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEvents.Responses.$200>
  /**
   * getTeamEventsSimple - Gets a short-form list of all events this team has competed at.
   */
  'getTeamEventsSimple'(
    parameters: Parameters<Paths.GetTeamEventsSimple.HeaderParameters & Paths.GetTeamEventsSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventsSimple.Responses.$200>
  /**
   * getTeamEventsKeys - Gets a list of the event keys for all events this team has competed at.
   */
  'getTeamEventsKeys'(
    parameters: Parameters<Paths.GetTeamEventsKeys.HeaderParameters & Paths.GetTeamEventsKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventsKeys.Responses.$200>
  /**
   * getTeamEventsByYear - Gets a list of events this team has competed at in the given year.
   */
  'getTeamEventsByYear'(
    parameters: Parameters<Paths.GetTeamEventsByYear.HeaderParameters & Paths.GetTeamEventsByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventsByYear.Responses.$200>
  /**
   * getTeamEventsByYearSimple - Gets a short-form list of events this team has competed at in the given year.
   */
  'getTeamEventsByYearSimple'(
    parameters: Parameters<Paths.GetTeamEventsByYearSimple.HeaderParameters & Paths.GetTeamEventsByYearSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventsByYearSimple.Responses.$200>
  /**
   * getTeamEventsByYearKeys - Gets a list of the event keys for events this team has competed at in the given year.
   */
  'getTeamEventsByYearKeys'(
    parameters: Parameters<Paths.GetTeamEventsByYearKeys.HeaderParameters & Paths.GetTeamEventsByYearKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventsByYearKeys.Responses.$200>
  /**
   * getTeamEventsStatusesByYear - Gets a key-value list of the event statuses for events this team has competed at in the given year.
   */
  'getTeamEventsStatusesByYear'(
    parameters: Parameters<Paths.GetTeamEventsStatusesByYear.HeaderParameters & Paths.GetTeamEventsStatusesByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventsStatusesByYear.Responses.$200>
  /**
   * getTeamEventMatches - Gets a list of matches for the given team and event.
   */
  'getTeamEventMatches'(
    parameters: Parameters<Paths.GetTeamEventMatches.HeaderParameters & Paths.GetTeamEventMatches.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventMatches.Responses.$200>
  /**
   * getTeamEventMatchesSimple - Gets a short-form list of matches for the given team and event.
   */
  'getTeamEventMatchesSimple'(
    parameters: Parameters<Paths.GetTeamEventMatchesSimple.HeaderParameters & Paths.GetTeamEventMatchesSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventMatchesSimple.Responses.$200>
  /**
   * getTeamEventMatchesKeys - Gets a list of match keys for matches for the given team and event.
   */
  'getTeamEventMatchesKeys'(
    parameters: Parameters<Paths.GetTeamEventMatchesKeys.HeaderParameters & Paths.GetTeamEventMatchesKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventMatchesKeys.Responses.$200>
  /**
   * getTeamEventAwards - Gets a list of awards the given team won at the given event.
   */
  'getTeamEventAwards'(
    parameters: Parameters<Paths.GetTeamEventAwards.HeaderParameters & Paths.GetTeamEventAwards.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventAwards.Responses.$200>
  /**
   * getTeamEventStatus - Gets the competition rank and status of the team at the given event.
   */
  'getTeamEventStatus'(
    parameters: Parameters<Paths.GetTeamEventStatus.HeaderParameters & Paths.GetTeamEventStatus.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamEventStatus.Responses.$200>
  /**
   * getTeamAwards - Gets a list of awards the given team has won.
   */
  'getTeamAwards'(
    parameters: Parameters<Paths.GetTeamAwards.HeaderParameters & Paths.GetTeamAwards.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamAwards.Responses.$200>
  /**
   * getTeamAwardsByYear - Gets a list of awards the given team has won in a given year.
   */
  'getTeamAwardsByYear'(
    parameters: Parameters<Paths.GetTeamAwardsByYear.HeaderParameters & Paths.GetTeamAwardsByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamAwardsByYear.Responses.$200>
  /**
   * getTeamMatchesByYear - Gets a list of matches for the given team and year.
   */
  'getTeamMatchesByYear'(
    parameters: Parameters<Paths.GetTeamMatchesByYear.HeaderParameters & Paths.GetTeamMatchesByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamMatchesByYear.Responses.$200>
  /**
   * getTeamMatchesByYearSimple - Gets a short-form list of matches for the given team and year.
   */
  'getTeamMatchesByYearSimple'(
    parameters: Parameters<Paths.GetTeamMatchesByYearSimple.HeaderParameters & Paths.GetTeamMatchesByYearSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamMatchesByYearSimple.Responses.$200>
  /**
   * getTeamMatchesByYearKeys - Gets a list of match keys for matches for the given team and year.
   */
  'getTeamMatchesByYearKeys'(
    parameters: Parameters<Paths.GetTeamMatchesByYearKeys.HeaderParameters & Paths.GetTeamMatchesByYearKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamMatchesByYearKeys.Responses.$200>
  /**
   * getTeamMediaByYear - Gets a list of Media (videos / pictures) for the given team and year.
   */
  'getTeamMediaByYear'(
    parameters: Parameters<Paths.GetTeamMediaByYear.HeaderParameters & Paths.GetTeamMediaByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamMediaByYear.Responses.$200>
  /**
   * getTeamMediaByTag - Gets a list of Media (videos / pictures) for the given team and tag.
   */
  'getTeamMediaByTag'(
    parameters: Parameters<Paths.GetTeamMediaByTag.HeaderParameters & Paths.GetTeamMediaByTag.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamMediaByTag.Responses.$200>
  /**
   * getTeamMediaByTagYear - Gets a list of Media (videos / pictures) for the given team, tag and year.
   */
  'getTeamMediaByTagYear'(
    parameters: Parameters<Paths.GetTeamMediaByTagYear.HeaderParameters & Paths.GetTeamMediaByTagYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamMediaByTagYear.Responses.$200>
  /**
   * getTeamSocialMedia - Gets a list of Media (social media) for the given team.
   */
  'getTeamSocialMedia'(
    parameters: Parameters<Paths.GetTeamSocialMedia.HeaderParameters & Paths.GetTeamSocialMedia.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetTeamSocialMedia.Responses.$200>
  /**
   * getEventsByYear - Gets a list of events in the given year.
   */
  'getEventsByYear'(
    parameters: Parameters<Paths.GetEventsByYear.HeaderParameters & Paths.GetEventsByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventsByYear.Responses.$200>
  /**
   * getEventsByYearSimple - Gets a short-form list of events in the given year.
   */
  'getEventsByYearSimple'(
    parameters: Parameters<Paths.GetEventsByYearSimple.HeaderParameters & Paths.GetEventsByYearSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventsByYearSimple.Responses.$200>
  /**
   * getEventsByYearKeys - Gets a list of event keys in the given year.
   */
  'getEventsByYearKeys'(
    parameters: Parameters<Paths.GetEventsByYearKeys.HeaderParameters & Paths.GetEventsByYearKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventsByYearKeys.Responses.$200>
  /**
   * getEvent - Gets an Event.
   */
  'getEvent'(
    parameters: Parameters<Paths.GetEvent.HeaderParameters & Paths.GetEvent.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEvent.Responses.$200>
  /**
   * getEventSimple - Gets a short-form Event.
   */
  'getEventSimple'(
    parameters: Parameters<Paths.GetEventSimple.HeaderParameters & Paths.GetEventSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventSimple.Responses.$200>
  /**
   * getEventAlliances - Gets a list of Elimination Alliances for the given Event.
   */
  'getEventAlliances'(
    parameters: Parameters<Paths.GetEventAlliances.HeaderParameters & Paths.GetEventAlliances.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventAlliances.Responses.$200>
  /**
   * getEventInsights - Gets a set of Event-specific insights for the given Event.
   */
  'getEventInsights'(
    parameters: Parameters<Paths.GetEventInsights.HeaderParameters & Paths.GetEventInsights.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventInsights.Responses.$200>
  /**
   * getEventOPRs - Gets a set of Event OPRs (including OPR, DPR, and CCWM) for the given Event.
   */
  'getEventOPRs'(
    parameters: Parameters<Paths.GetEventOPRs.HeaderParameters & Paths.GetEventOPRs.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventOPRs.Responses.$200>
  /**
   * getEventPredictions - Gets information on TBA-generated predictions for the given Event. Contains year-specific information. *WARNING* This endpoint is currently under development and may change at any time.
   */
  'getEventPredictions'(
    parameters: Parameters<Paths.GetEventPredictions.HeaderParameters & Paths.GetEventPredictions.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventPredictions.Responses.$200>
  /**
   * getEventRankings - Gets a list of team rankings for the Event.
   */
  'getEventRankings'(
    parameters: Parameters<Paths.GetEventRankings.HeaderParameters & Paths.GetEventRankings.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventRankings.Responses.$200>
  /**
   * getEventDistrictPoints - Gets a list of team rankings for the Event.
   */
  'getEventDistrictPoints'(
    parameters: Parameters<Paths.GetEventDistrictPoints.HeaderParameters & Paths.GetEventDistrictPoints.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventDistrictPoints.Responses.$200>
  /**
   * getEventTeams - Gets a list of `Team` objects that competed in the given event.
   */
  'getEventTeams'(
    parameters: Parameters<Paths.GetEventTeams.HeaderParameters & Paths.GetEventTeams.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventTeams.Responses.$200>
  /**
   * getEventTeamsSimple - Gets a short-form list of `Team` objects that competed in the given event.
   */
  'getEventTeamsSimple'(
    parameters: Parameters<Paths.GetEventTeamsSimple.HeaderParameters & Paths.GetEventTeamsSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventTeamsSimple.Responses.$200>
  /**
   * getEventTeamsKeys - Gets a list of `Team` keys that competed in the given event.
   */
  'getEventTeamsKeys'(
    parameters: Parameters<Paths.GetEventTeamsKeys.HeaderParameters & Paths.GetEventTeamsKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventTeamsKeys.Responses.$200>
  /**
   * getEventTeamsStatuses - Gets a key-value list of the event statuses for teams competing at the given event.
   */
  'getEventTeamsStatuses'(
    parameters: Parameters<Paths.GetEventTeamsStatuses.HeaderParameters & Paths.GetEventTeamsStatuses.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventTeamsStatuses.Responses.$200>
  /**
   * getEventMatches - Gets a list of matches for the given event.
   */
  'getEventMatches'(
    parameters: Parameters<Paths.GetEventMatches.HeaderParameters & Paths.GetEventMatches.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventMatches.Responses.$200>
  /**
   * getEventMatchesSimple - Gets a short-form list of matches for the given event.
   */
  'getEventMatchesSimple'(
    parameters: Parameters<Paths.GetEventMatchesSimple.HeaderParameters & Paths.GetEventMatchesSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventMatchesSimple.Responses.$200>
  /**
   * getEventMatchesKeys - Gets a list of match keys for the given event.
   */
  'getEventMatchesKeys'(
    parameters: Parameters<Paths.GetEventMatchesKeys.HeaderParameters & Paths.GetEventMatchesKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventMatchesKeys.Responses.$200>
  /**
   * getEventMatchTimeseries - Gets an array of Match Keys for the given event key that have timeseries data. Returns an empty array if no matches have timeseries data.
   * *WARNING:* This is *not* official data, and is subject to a significant possibility of error, or missing data. Do not rely on this data for any purpose. In fact, pretend we made it up.
   * *WARNING:* This endpoint and corresponding data models are under *active development* and may change at any time, including in breaking ways.
   */
  'getEventMatchTimeseries'(
    parameters: Parameters<Paths.GetEventMatchTimeseries.HeaderParameters & Paths.GetEventMatchTimeseries.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventMatchTimeseries.Responses.$200>
  /**
   * getEventAwards - Gets a list of awards from the given event.
   */
  'getEventAwards'(
    parameters: Parameters<Paths.GetEventAwards.HeaderParameters & Paths.GetEventAwards.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEventAwards.Responses.$200>
  /**
   * getMatch - Gets a `Match` object for the given match key.
   */
  'getMatch'(
    parameters: Parameters<Paths.GetMatch.HeaderParameters & Paths.GetMatch.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMatch.Responses.$200>
  /**
   * getMatchSimple - Gets a short-form `Match` object for the given match key.
   */
  'getMatchSimple'(
    parameters: Parameters<Paths.GetMatchSimple.HeaderParameters & Paths.GetMatchSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMatchSimple.Responses.$200>
  /**
   * getMatchTimeseries - Gets an array of game-specific Match Timeseries objects for the given match key or an empty array if not available.
   * *WARNING:* This is *not* official data, and is subject to a significant possibility of error, or missing data. Do not rely on this data for any purpose. In fact, pretend we made it up.
   * *WARNING:* This endpoint and corresponding data models are under *active development* and may change at any time, including in breaking ways.
   */
  'getMatchTimeseries'(
    parameters: Parameters<Paths.GetMatchTimeseries.HeaderParameters & Paths.GetMatchTimeseries.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMatchTimeseries.Responses.$200>
  /**
   * getMatchZebra - Gets Zebra MotionWorks data for a Match for the given match key.
   */
  'getMatchZebra'(
    parameters: Parameters<Paths.GetMatchZebra.HeaderParameters & Paths.GetMatchZebra.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMatchZebra.Responses.$200>
  /**
   * getDistrictsByYear - Gets a list of districts and their corresponding district key, for the given year.
   */
  'getDistrictsByYear'(
    parameters: Parameters<Paths.GetDistrictsByYear.HeaderParameters & Paths.GetDistrictsByYear.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictsByYear.Responses.$200>
  /**
   * getDistrictEvents - Gets a list of events in the given district.
   */
  'getDistrictEvents'(
    parameters: Parameters<Paths.GetDistrictEvents.HeaderParameters & Paths.GetDistrictEvents.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictEvents.Responses.$200>
  /**
   * getDistrictEventsSimple - Gets a short-form list of events in the given district.
   */
  'getDistrictEventsSimple'(
    parameters: Parameters<Paths.GetDistrictEventsSimple.HeaderParameters & Paths.GetDistrictEventsSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictEventsSimple.Responses.$200>
  /**
   * getDistrictEventsKeys - Gets a list of event keys for events in the given district.
   */
  'getDistrictEventsKeys'(
    parameters: Parameters<Paths.GetDistrictEventsKeys.HeaderParameters & Paths.GetDistrictEventsKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictEventsKeys.Responses.$200>
  /**
   * getDistrictTeams - Gets a list of `Team` objects that competed in events in the given district.
   */
  'getDistrictTeams'(
    parameters: Parameters<Paths.GetDistrictTeams.HeaderParameters & Paths.GetDistrictTeams.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictTeams.Responses.$200>
  /**
   * getDistrictTeamsSimple - Gets a short-form list of `Team` objects that competed in events in the given district.
   */
  'getDistrictTeamsSimple'(
    parameters: Parameters<Paths.GetDistrictTeamsSimple.HeaderParameters & Paths.GetDistrictTeamsSimple.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictTeamsSimple.Responses.$200>
  /**
   * getDistrictTeamsKeys - Gets a list of `Team` objects that competed in events in the given district.
   */
  'getDistrictTeamsKeys'(
    parameters: Parameters<Paths.GetDistrictTeamsKeys.HeaderParameters & Paths.GetDistrictTeamsKeys.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictTeamsKeys.Responses.$200>
  /**
   * getDistrictRankings - Gets a list of team district rankings for the given district.
   */
  'getDistrictRankings'(
    parameters: Parameters<Paths.GetDistrictRankings.HeaderParameters & Paths.GetDistrictRankings.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDistrictRankings.Responses.$200>
}

export interface PathsDictionary {
  ['/status']: {
    /**
     * getStatus - Returns API status, and TBA status information.
     */
    'get'(
      parameters?: Parameters<Paths.GetStatus.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStatus.Responses.$200>
  }
  ['/teams/{page_num}']: {
    /**
     * getTeams - Gets a list of `Team` objects, paginated in groups of 500.
     */
    'get'(
      parameters: Parameters<Paths.GetTeams.HeaderParameters & Paths.GetTeams.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeams.Responses.$200>
  }
  ['/teams/{page_num}/simple']: {
    /**
     * getTeamsSimple - Gets a list of short form `Team_Simple` objects, paginated in groups of 500.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamsSimple.HeaderParameters & Paths.GetTeamsSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamsSimple.Responses.$200>
  }
  ['/teams/{page_num}/keys']: {
    /**
     * getTeamsKeys - Gets a list of Team keys, paginated in groups of 500. (Note, each page will not have 500 teams, but will include the teams within that range of 500.)
     */
    'get'(
      parameters: Parameters<Paths.GetTeamsKeys.HeaderParameters & Paths.GetTeamsKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamsKeys.Responses.$200>
  }
  ['/teams/{year}/{page_num}']: {
    /**
     * getTeamsByYear - Gets a list of `Team` objects that competed in the given year, paginated in groups of 500.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamsByYear.HeaderParameters & Paths.GetTeamsByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamsByYear.Responses.$200>
  }
  ['/teams/{year}/{page_num}/simple']: {
    /**
     * getTeamsByYearSimple - Gets a list of short form `Team_Simple` objects that competed in the given year, paginated in groups of 500.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamsByYearSimple.HeaderParameters & Paths.GetTeamsByYearSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamsByYearSimple.Responses.$200>
  }
  ['/teams/{year}/{page_num}/keys']: {
    /**
     * getTeamsByYearKeys - Gets a list Team Keys that competed in the given year, paginated in groups of 500.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamsByYearKeys.HeaderParameters & Paths.GetTeamsByYearKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamsByYearKeys.Responses.$200>
  }
  ['/team/{team_key}']: {
    /**
     * getTeam - Gets a `Team` object for the team referenced by the given key.
     */
    'get'(
      parameters: Parameters<Paths.GetTeam.HeaderParameters & Paths.GetTeam.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeam.Responses.$200>
  }
  ['/team/{team_key}/simple']: {
    /**
     * getTeamSimple - Gets a `Team_Simple` object for the team referenced by the given key.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamSimple.HeaderParameters & Paths.GetTeamSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamSimple.Responses.$200>
  }
  ['/team/{team_key}/years_participated']: {
    /**
     * getTeamYearsParticipated - Gets a list of years in which the team participated in at least one competition.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamYearsParticipated.HeaderParameters & Paths.GetTeamYearsParticipated.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamYearsParticipated.Responses.$200>
  }
  ['/team/{team_key}/districts']: {
    /**
     * getTeamDistricts - Gets an array of districts representing each year the team was in a district. Will return an empty array if the team was never in a district.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamDistricts.HeaderParameters & Paths.GetTeamDistricts.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamDistricts.Responses.$200>
  }
  ['/team/{team_key}/robots']: {
    /**
     * getTeamRobots - Gets a list of year and robot name pairs for each year that a robot name was provided. Will return an empty array if the team has never named a robot.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamRobots.HeaderParameters & Paths.GetTeamRobots.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamRobots.Responses.$200>
  }
  ['/team/{team_key}/events']: {
    /**
     * getTeamEvents - Gets a list of all events this team has competed at.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEvents.HeaderParameters & Paths.GetTeamEvents.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEvents.Responses.$200>
  }
  ['/team/{team_key}/events/simple']: {
    /**
     * getTeamEventsSimple - Gets a short-form list of all events this team has competed at.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventsSimple.HeaderParameters & Paths.GetTeamEventsSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventsSimple.Responses.$200>
  }
  ['/team/{team_key}/events/keys']: {
    /**
     * getTeamEventsKeys - Gets a list of the event keys for all events this team has competed at.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventsKeys.HeaderParameters & Paths.GetTeamEventsKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventsKeys.Responses.$200>
  }
  ['/team/{team_key}/events/{year}']: {
    /**
     * getTeamEventsByYear - Gets a list of events this team has competed at in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventsByYear.HeaderParameters & Paths.GetTeamEventsByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventsByYear.Responses.$200>
  }
  ['/team/{team_key}/events/{year}/simple']: {
    /**
     * getTeamEventsByYearSimple - Gets a short-form list of events this team has competed at in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventsByYearSimple.HeaderParameters & Paths.GetTeamEventsByYearSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventsByYearSimple.Responses.$200>
  }
  ['/team/{team_key}/events/{year}/keys']: {
    /**
     * getTeamEventsByYearKeys - Gets a list of the event keys for events this team has competed at in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventsByYearKeys.HeaderParameters & Paths.GetTeamEventsByYearKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventsByYearKeys.Responses.$200>
  }
  ['/team/{team_key}/events/{year}/statuses']: {
    /**
     * getTeamEventsStatusesByYear - Gets a key-value list of the event statuses for events this team has competed at in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventsStatusesByYear.HeaderParameters & Paths.GetTeamEventsStatusesByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventsStatusesByYear.Responses.$200>
  }
  ['/team/{team_key}/event/{event_key}/matches']: {
    /**
     * getTeamEventMatches - Gets a list of matches for the given team and event.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventMatches.HeaderParameters & Paths.GetTeamEventMatches.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventMatches.Responses.$200>
  }
  ['/team/{team_key}/event/{event_key}/matches/simple']: {
    /**
     * getTeamEventMatchesSimple - Gets a short-form list of matches for the given team and event.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventMatchesSimple.HeaderParameters & Paths.GetTeamEventMatchesSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventMatchesSimple.Responses.$200>
  }
  ['/team/{team_key}/event/{event_key}/matches/keys']: {
    /**
     * getTeamEventMatchesKeys - Gets a list of match keys for matches for the given team and event.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventMatchesKeys.HeaderParameters & Paths.GetTeamEventMatchesKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventMatchesKeys.Responses.$200>
  }
  ['/team/{team_key}/event/{event_key}/awards']: {
    /**
     * getTeamEventAwards - Gets a list of awards the given team won at the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventAwards.HeaderParameters & Paths.GetTeamEventAwards.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventAwards.Responses.$200>
  }
  ['/team/{team_key}/event/{event_key}/status']: {
    /**
     * getTeamEventStatus - Gets the competition rank and status of the team at the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamEventStatus.HeaderParameters & Paths.GetTeamEventStatus.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamEventStatus.Responses.$200>
  }
  ['/team/{team_key}/awards']: {
    /**
     * getTeamAwards - Gets a list of awards the given team has won.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamAwards.HeaderParameters & Paths.GetTeamAwards.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamAwards.Responses.$200>
  }
  ['/team/{team_key}/awards/{year}']: {
    /**
     * getTeamAwardsByYear - Gets a list of awards the given team has won in a given year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamAwardsByYear.HeaderParameters & Paths.GetTeamAwardsByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamAwardsByYear.Responses.$200>
  }
  ['/team/{team_key}/matches/{year}']: {
    /**
     * getTeamMatchesByYear - Gets a list of matches for the given team and year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamMatchesByYear.HeaderParameters & Paths.GetTeamMatchesByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamMatchesByYear.Responses.$200>
  }
  ['/team/{team_key}/matches/{year}/simple']: {
    /**
     * getTeamMatchesByYearSimple - Gets a short-form list of matches for the given team and year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamMatchesByYearSimple.HeaderParameters & Paths.GetTeamMatchesByYearSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamMatchesByYearSimple.Responses.$200>
  }
  ['/team/{team_key}/matches/{year}/keys']: {
    /**
     * getTeamMatchesByYearKeys - Gets a list of match keys for matches for the given team and year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamMatchesByYearKeys.HeaderParameters & Paths.GetTeamMatchesByYearKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamMatchesByYearKeys.Responses.$200>
  }
  ['/team/{team_key}/media/{year}']: {
    /**
     * getTeamMediaByYear - Gets a list of Media (videos / pictures) for the given team and year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamMediaByYear.HeaderParameters & Paths.GetTeamMediaByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamMediaByYear.Responses.$200>
  }
  ['/team/{team_key}/media/tag/{media_tag}']: {
    /**
     * getTeamMediaByTag - Gets a list of Media (videos / pictures) for the given team and tag.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamMediaByTag.HeaderParameters & Paths.GetTeamMediaByTag.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamMediaByTag.Responses.$200>
  }
  ['/team/{team_key}/media/tag/{media_tag}/{year}']: {
    /**
     * getTeamMediaByTagYear - Gets a list of Media (videos / pictures) for the given team, tag and year.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamMediaByTagYear.HeaderParameters & Paths.GetTeamMediaByTagYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamMediaByTagYear.Responses.$200>
  }
  ['/team/{team_key}/social_media']: {
    /**
     * getTeamSocialMedia - Gets a list of Media (social media) for the given team.
     */
    'get'(
      parameters: Parameters<Paths.GetTeamSocialMedia.HeaderParameters & Paths.GetTeamSocialMedia.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetTeamSocialMedia.Responses.$200>
  }
  ['/events/{year}']: {
    /**
     * getEventsByYear - Gets a list of events in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetEventsByYear.HeaderParameters & Paths.GetEventsByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventsByYear.Responses.$200>
  }
  ['/events/{year}/simple']: {
    /**
     * getEventsByYearSimple - Gets a short-form list of events in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetEventsByYearSimple.HeaderParameters & Paths.GetEventsByYearSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventsByYearSimple.Responses.$200>
  }
  ['/events/{year}/keys']: {
    /**
     * getEventsByYearKeys - Gets a list of event keys in the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetEventsByYearKeys.HeaderParameters & Paths.GetEventsByYearKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventsByYearKeys.Responses.$200>
  }
  ['/event/{event_key}']: {
    /**
     * getEvent - Gets an Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEvent.HeaderParameters & Paths.GetEvent.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEvent.Responses.$200>
  }
  ['/event/{event_key}/simple']: {
    /**
     * getEventSimple - Gets a short-form Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventSimple.HeaderParameters & Paths.GetEventSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventSimple.Responses.$200>
  }
  ['/event/{event_key}/alliances']: {
    /**
     * getEventAlliances - Gets a list of Elimination Alliances for the given Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventAlliances.HeaderParameters & Paths.GetEventAlliances.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventAlliances.Responses.$200>
  }
  ['/event/{event_key}/insights']: {
    /**
     * getEventInsights - Gets a set of Event-specific insights for the given Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventInsights.HeaderParameters & Paths.GetEventInsights.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventInsights.Responses.$200>
  }
  ['/event/{event_key}/oprs']: {
    /**
     * getEventOPRs - Gets a set of Event OPRs (including OPR, DPR, and CCWM) for the given Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventOPRs.HeaderParameters & Paths.GetEventOPRs.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventOPRs.Responses.$200>
  }
  ['/event/{event_key}/predictions']: {
    /**
     * getEventPredictions - Gets information on TBA-generated predictions for the given Event. Contains year-specific information. *WARNING* This endpoint is currently under development and may change at any time.
     */
    'get'(
      parameters: Parameters<Paths.GetEventPredictions.HeaderParameters & Paths.GetEventPredictions.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventPredictions.Responses.$200>
  }
  ['/event/{event_key}/rankings']: {
    /**
     * getEventRankings - Gets a list of team rankings for the Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventRankings.HeaderParameters & Paths.GetEventRankings.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventRankings.Responses.$200>
  }
  ['/event/{event_key}/district_points']: {
    /**
     * getEventDistrictPoints - Gets a list of team rankings for the Event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventDistrictPoints.HeaderParameters & Paths.GetEventDistrictPoints.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventDistrictPoints.Responses.$200>
  }
  ['/event/{event_key}/teams']: {
    /**
     * getEventTeams - Gets a list of `Team` objects that competed in the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventTeams.HeaderParameters & Paths.GetEventTeams.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventTeams.Responses.$200>
  }
  ['/event/{event_key}/teams/simple']: {
    /**
     * getEventTeamsSimple - Gets a short-form list of `Team` objects that competed in the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventTeamsSimple.HeaderParameters & Paths.GetEventTeamsSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventTeamsSimple.Responses.$200>
  }
  ['/event/{event_key}/teams/keys']: {
    /**
     * getEventTeamsKeys - Gets a list of `Team` keys that competed in the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventTeamsKeys.HeaderParameters & Paths.GetEventTeamsKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventTeamsKeys.Responses.$200>
  }
  ['/event/{event_key}/teams/statuses']: {
    /**
     * getEventTeamsStatuses - Gets a key-value list of the event statuses for teams competing at the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventTeamsStatuses.HeaderParameters & Paths.GetEventTeamsStatuses.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventTeamsStatuses.Responses.$200>
  }
  ['/event/{event_key}/matches']: {
    /**
     * getEventMatches - Gets a list of matches for the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventMatches.HeaderParameters & Paths.GetEventMatches.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventMatches.Responses.$200>
  }
  ['/event/{event_key}/matches/simple']: {
    /**
     * getEventMatchesSimple - Gets a short-form list of matches for the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventMatchesSimple.HeaderParameters & Paths.GetEventMatchesSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventMatchesSimple.Responses.$200>
  }
  ['/event/{event_key}/matches/keys']: {
    /**
     * getEventMatchesKeys - Gets a list of match keys for the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventMatchesKeys.HeaderParameters & Paths.GetEventMatchesKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventMatchesKeys.Responses.$200>
  }
  ['/event/{event_key}/matches/timeseries']: {
    /**
     * getEventMatchTimeseries - Gets an array of Match Keys for the given event key that have timeseries data. Returns an empty array if no matches have timeseries data.
     * *WARNING:* This is *not* official data, and is subject to a significant possibility of error, or missing data. Do not rely on this data for any purpose. In fact, pretend we made it up.
     * *WARNING:* This endpoint and corresponding data models are under *active development* and may change at any time, including in breaking ways.
     */
    'get'(
      parameters: Parameters<Paths.GetEventMatchTimeseries.HeaderParameters & Paths.GetEventMatchTimeseries.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventMatchTimeseries.Responses.$200>
  }
  ['/event/{event_key}/awards']: {
    /**
     * getEventAwards - Gets a list of awards from the given event.
     */
    'get'(
      parameters: Parameters<Paths.GetEventAwards.HeaderParameters & Paths.GetEventAwards.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEventAwards.Responses.$200>
  }
  ['/match/{match_key}']: {
    /**
     * getMatch - Gets a `Match` object for the given match key.
     */
    'get'(
      parameters: Parameters<Paths.GetMatch.HeaderParameters & Paths.GetMatch.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMatch.Responses.$200>
  }
  ['/match/{match_key}/simple']: {
    /**
     * getMatchSimple - Gets a short-form `Match` object for the given match key.
     */
    'get'(
      parameters: Parameters<Paths.GetMatchSimple.HeaderParameters & Paths.GetMatchSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMatchSimple.Responses.$200>
  }
  ['/match/{match_key}/timeseries']: {
    /**
     * getMatchTimeseries - Gets an array of game-specific Match Timeseries objects for the given match key or an empty array if not available.
     * *WARNING:* This is *not* official data, and is subject to a significant possibility of error, or missing data. Do not rely on this data for any purpose. In fact, pretend we made it up.
     * *WARNING:* This endpoint and corresponding data models are under *active development* and may change at any time, including in breaking ways.
     */
    'get'(
      parameters: Parameters<Paths.GetMatchTimeseries.HeaderParameters & Paths.GetMatchTimeseries.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMatchTimeseries.Responses.$200>
  }
  ['/match/{match_key}/zebra_motionworks']: {
    /**
     * getMatchZebra - Gets Zebra MotionWorks data for a Match for the given match key.
     */
    'get'(
      parameters: Parameters<Paths.GetMatchZebra.HeaderParameters & Paths.GetMatchZebra.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMatchZebra.Responses.$200>
  }
  ['/districts/{year}']: {
    /**
     * getDistrictsByYear - Gets a list of districts and their corresponding district key, for the given year.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictsByYear.HeaderParameters & Paths.GetDistrictsByYear.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictsByYear.Responses.$200>
  }
  ['/district/{district_key}/events']: {
    /**
     * getDistrictEvents - Gets a list of events in the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictEvents.HeaderParameters & Paths.GetDistrictEvents.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictEvents.Responses.$200>
  }
  ['/district/{district_key}/events/simple']: {
    /**
     * getDistrictEventsSimple - Gets a short-form list of events in the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictEventsSimple.HeaderParameters & Paths.GetDistrictEventsSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictEventsSimple.Responses.$200>
  }
  ['/district/{district_key}/events/keys']: {
    /**
     * getDistrictEventsKeys - Gets a list of event keys for events in the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictEventsKeys.HeaderParameters & Paths.GetDistrictEventsKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictEventsKeys.Responses.$200>
  }
  ['/district/{district_key}/teams']: {
    /**
     * getDistrictTeams - Gets a list of `Team` objects that competed in events in the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictTeams.HeaderParameters & Paths.GetDistrictTeams.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictTeams.Responses.$200>
  }
  ['/district/{district_key}/teams/simple']: {
    /**
     * getDistrictTeamsSimple - Gets a short-form list of `Team` objects that competed in events in the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictTeamsSimple.HeaderParameters & Paths.GetDistrictTeamsSimple.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictTeamsSimple.Responses.$200>
  }
  ['/district/{district_key}/teams/keys']: {
    /**
     * getDistrictTeamsKeys - Gets a list of `Team` objects that competed in events in the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictTeamsKeys.HeaderParameters & Paths.GetDistrictTeamsKeys.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictTeamsKeys.Responses.$200>
  }
  ['/district/{district_key}/rankings']: {
    /**
     * getDistrictRankings - Gets a list of team district rankings for the given district.
     */
    'get'(
      parameters: Parameters<Paths.GetDistrictRankings.HeaderParameters & Paths.GetDistrictRankings.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDistrictRankings.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
