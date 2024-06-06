import type {
    AxiosRequestConfig,
    OpenAPIClient,
    OperationResponse,
    Parameters,
    UnknownParamsObject,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * HTTPValidationError
         */
        export interface HTTPValidationError {
            /**
             * Detail
             */
            detail?: /* ValidationError */ ValidationError[];
        }
        /**
         * ValidationError
         */
        export interface ValidationError {
            /**
             * Location
             */
            loc: (string | number)[];
            /**
             * Message
             */
            msg: string;
            /**
             * Error Type
             */
            type: string;
        }
    }
}
declare namespace Paths {
    namespace ReadEventV2EventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
        }
        export interface PathParameters {
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Event V2 Event  Event  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventV3EventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
        }
        export interface PathParameters {
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Event V3 Event  Event  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsDistrictV2EventsDistrictDistrictGet {
        namespace Parameters {
            /**
             * District
             */
            export type District = string;
        }
        export interface PathParameters {
            district: /* District */ Parameters.District;
        }
        namespace Responses {
            /**
             * Response Read Events District V2 Events District  District  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsStateV2EventsStateStateGet {
        namespace Parameters {
            /**
             * State
             */
            export type State = string;
        }
        export interface PathParameters {
            state: /* State */ Parameters.State;
        }
        namespace Responses {
            /**
             * Response Read Events State V2 Events State  State  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsV2EventsGet {
        namespace Parameters {
            /**
             * Ascending
             */
            export type Ascending = /* Ascending */ boolean | null;
            /**
             * Country
             */
            export type Country = /* Country */ string | null;
            /**
             * District
             */
            export type District = /* District */ string | null;
            /**
             * Limit
             */
            export type Limit = /* Limit */ number | null;
            /**
             * Metric
             */
            export type Metric = /* Metric */ string | null;
            /**
             * Offseason
             */
            export type Offseason = /* Offseason */ boolean | null;
            /**
             * Offset
             */
            export type Offset = /* Offset */ number | null;
            /**
             * State
             */
            export type State = /* State */ string | null;
            /**
             * Type
             */
            export type Type = /* Type */ number | null;
            /**
             * Week
             */
            export type Week = /* Week */ number | null;
            /**
             * Year
             */
            export type Year = /* Year */ number | null;
        }
        export interface QueryParameters {
            year?: /* Year */ Parameters.Year;
            country?: /* Country */ Parameters.Country;
            district?: /* District */ Parameters.District;
            state?: /* State */ Parameters.State;
            type?: /* Type */ Parameters.Type;
            week?: /* Week */ Parameters.Week;
            offseason?: /* Offseason */ Parameters.Offseason;
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Events V2 Events Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsV3EventsGet {
        namespace Parameters {
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            boolean | null;
            /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            export type Country = /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            string | null;
            /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            export type District = /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            string | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            number | null;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            string | null;
            /**
             * Offseason
             * Whether the event is an offseason event.
             */
            export type Offseason = /**
             * Offseason
             * Whether the event is an offseason event.
             */
            boolean | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = /**
             * Offset
             * Offset from the first result to return.
             */
            number | null;
            /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            export type State = /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            string | null;
            /**
             * Type
             * One of [`regional`, `district`, `district_cmp`, `cmp_division`, `cmp_finals`, `offseason`, or `preseason`].
             */
            export type Type = /**
             * Type
             * One of [`regional`, `district`, `district_cmp`, `cmp_division`, `cmp_finals`, `offseason`, or `preseason`].
             */
            string | null;
            /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            export type Week = /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            number | null;
            /**
             * Year
             * Four-digit year
             */
            export type Year = /**
             * Year
             * Four-digit year
             */
            number | null;
        }
        export interface QueryParameters {
            year?: /**
             * Year
             * Four-digit year
             */
            Parameters.Year;
            country?: /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            Parameters.Country;
            state?: /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            Parameters.State;
            district?: /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            Parameters.District;
            type?: /**
             * Type
             * One of [`regional`, `district`, `district_cmp`, `cmp_division`, `cmp_finals`, `offseason`, or `preseason`].
             */
            Parameters.Type;
            week?: /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            Parameters.Week;
            offseason?: /**
             * Offseason
             * Whether the event is an offseason event.
             */
            Parameters.Offseason;
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Events V3 Events Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsYearDistrictV2EventsYearYearDistrictDistrictGet {
        namespace Parameters {
            /**
             * District
             */
            export type District = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
            district: /* District */ Parameters.District;
        }
        namespace Responses {
            /**
             * Response Read Events Year District V2 Events Year  Year  District  District  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsYearStateV2EventsYearYearStateStateGet {
        namespace Parameters {
            /**
             * State
             */
            export type State = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
            state: /* State */ Parameters.State;
        }
        namespace Responses {
            /**
             * Response Read Events Year State V2 Events Year  Year  State  State  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadEventsYearV2EventsYearYearGet {
        namespace Parameters {
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Events Year V2 Events Year  Year  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchV2MatchMatchGet {
        namespace Parameters {
            /**
             * Match
             */
            export type Match = string;
        }
        export interface PathParameters {
            match: /* Match */ Parameters.Match;
        }
        namespace Responses {
            /**
             * Response Read Match V2 Match  Match  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchV3MatchMatchGet {
        namespace Parameters {
            /**
             * Match
             */
            export type Match = string;
        }
        export interface PathParameters {
            match: /* Match */ Parameters.Match;
        }
        namespace Responses {
            /**
             * Response Read Match V3 Match  Match  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchesEventV2MatchesEventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
        }
        export interface PathParameters {
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Matches Event V2 Matches Event  Event  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchesTeamEventV2MatchesTeamTeamEventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Matches Team Event V2 Matches Team  Team  Event  Event  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchesTeamYearV2MatchesTeamTeamYearYearGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Matches Team Year V2 Matches Team  Team  Year  Year  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchesV2MatchesGet {
        namespace Parameters {
            /**
             * Ascending
             */
            export type Ascending = /* Ascending */ boolean | null;
            /**
             * Elims
             */
            export type Elims = /* Elims */ boolean | null;
            /**
             * Event
             */
            export type Event = /* Event */ string | null;
            /**
             * Limit
             */
            export type Limit = /* Limit */ number | null;
            /**
             * Metric
             */
            export type Metric = /* Metric */ string | null;
            /**
             * Offseason
             */
            export type Offseason = /* Offseason */ boolean | null;
            /**
             * Offset
             */
            export type Offset = /* Offset */ number | null;
            /**
             * Team
             */
            export type Team = /* Team */ number | null;
            /**
             * Week
             */
            export type Week = /* Week */ number | null;
            /**
             * Year
             */
            export type Year = /* Year */ number | null;
        }
        export interface QueryParameters {
            team?: /* Team */ Parameters.Team;
            year?: /* Year */ Parameters.Year;
            event?: /* Event */ Parameters.Event;
            week?: /* Week */ Parameters.Week;
            elims?: /* Elims */ Parameters.Elims;
            offseason?: /* Offseason */ Parameters.Offseason;
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Matches V2 Matches Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadMatchesV3MatchesGet {
        namespace Parameters {
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            boolean | null;
            /**
             * Elim
             * Whether the match is an elimination match.
             */
            export type Elim = /**
             * Elim
             * Whether the match is an elimination match.
             */
            boolean | null;
            /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            export type Event = /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            string | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            number | null;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            string | null;
            /**
             * Offseason
             * Whether the event is an offseason event.
             */
            export type Offseason = /**
             * Offseason
             * Whether the event is an offseason event.
             */
            boolean | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = /**
             * Offset
             * Offset from the first result to return.
             */
            number | null;
            /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            export type Team = /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            string | null;
            /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            export type Week = /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            number | null;
            /**
             * Year
             * Four-digit year
             */
            export type Year = /**
             * Year
             * Four-digit year
             */
            number | null;
        }
        export interface QueryParameters {
            team?: /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            Parameters.Team;
            year?: /**
             * Year
             * Four-digit year
             */
            Parameters.Year;
            event?: /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            Parameters.Event;
            week?: /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            Parameters.Week;
            elim?: /**
             * Elim
             * Whether the match is an elimination match.
             */
            Parameters.Elim;
            offseason?: /**
             * Offseason
             * Whether the event is an offseason event.
             */
            Parameters.Offseason;
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Matches V3 Matches Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadRootV2Get {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace ReadRootV3Get {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace ReadTeamEventV2TeamEventTeamEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Team Event V2 Team Event  Team   Event  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventV3TeamEventTeamEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
            /**
             * Team
             */
            export type Team = string;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Team Event V3 Team Event  Team   Event  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsEventV2TeamEventsEventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
        }
        export interface PathParameters {
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Team Events Event V2 Team Events Event  Event  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsTeamV2TeamEventsTeamTeamGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
        }
        namespace Responses {
            /**
             * Response Read Team Events Team V2 Team Events Team  Team  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsTeamYearV2TeamEventsTeamTeamYearYearGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Team Events Team Year V2 Team Events Team  Team  Year  Year  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsV2TeamEventsGet {
        namespace Parameters {
            /**
             * Ascending
             */
            export type Ascending = /* Ascending */ boolean | null;
            /**
             * Country
             */
            export type Country = /* Country */ string | null;
            /**
             * District
             */
            export type District = /* District */ string | null;
            /**
             * Event
             */
            export type Event = /* Event */ string | null;
            /**
             * Limit
             */
            export type Limit = /* Limit */ number | null;
            /**
             * Metric
             */
            export type Metric = /* Metric */ string | null;
            /**
             * Offseason
             */
            export type Offseason = /* Offseason */ boolean | null;
            /**
             * Offset
             */
            export type Offset = /* Offset */ number | null;
            /**
             * State
             */
            export type State = /* State */ string | null;
            /**
             * Team
             */
            export type Team = /* Team */ number | null;
            /**
             * Type
             */
            export type Type = /* Type */ number | null;
            /**
             * Week
             */
            export type Week = /* Week */ number | null;
            /**
             * Year
             */
            export type Year = /* Year */ number | null;
        }
        export interface QueryParameters {
            team?: /* Team */ Parameters.Team;
            year?: /* Year */ Parameters.Year;
            event?: /* Event */ Parameters.Event;
            country?: /* Country */ Parameters.Country;
            district?: /* District */ Parameters.District;
            state?: /* State */ Parameters.State;
            type?: /* Type */ Parameters.Type;
            week?: /* Week */ Parameters.Week;
            offseason?: /* Offseason */ Parameters.Offseason;
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Team Events V2 Team Events Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsV3TeamEventsGet {
        namespace Parameters {
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            boolean | null;
            /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            export type Country = /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            string | null;
            /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            export type District = /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            string | null;
            /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            export type Event = /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            string | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            number | null;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            string | null;
            /**
             * Offseason
             * Whether the event is an offseason event.
             */
            export type Offseason = /**
             * Offseason
             * Whether the event is an offseason event.
             */
            boolean | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = /**
             * Offset
             * Offset from the first result to return.
             */
            number | null;
            /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            export type State = /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            string | null;
            /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            export type Team = /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            string | null;
            /**
             * Type
             * One of [`regional`, `district`, `district_cmp`, `cmp_division`, `cmp_finals`, `offseason`, or `preseason`].
             */
            export type Type = /**
             * Type
             * One of [`regional`, `district`, `district_cmp`, `cmp_division`, `cmp_finals`, `offseason`, or `preseason`].
             */
            string | null;
            /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            export type Week = /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            number | null;
            /**
             * Year
             * Four-digit year
             */
            export type Year = /**
             * Year
             * Four-digit year
             */
            number | null;
        }
        export interface QueryParameters {
            team?: /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            Parameters.Team;
            year?: /**
             * Year
             * Four-digit year
             */
            Parameters.Year;
            event?: /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            Parameters.Event;
            country?: /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            Parameters.Country;
            state?: /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            Parameters.State;
            district?: /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            Parameters.District;
            type?: /**
             * Type
             * One of [`regional`, `district`, `district_cmp`, `cmp_division`, `cmp_finals`, `offseason`, or `preseason`].
             */
            Parameters.Type;
            week?: /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            Parameters.Week;
            offseason?: /**
             * Offseason
             * Whether the event is an offseason event.
             */
            Parameters.Offseason;
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Team Events V3 Team Events Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsYearDistrictV2TeamEventsYearYearDistrictDistrictGet {
        namespace Parameters {
            /**
             * District
             */
            export type District = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
            district: /* District */ Parameters.District;
        }
        namespace Responses {
            /**
             * Response Read Team Events Year District V2 Team Events Year  Year  District  District  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamEventsYearStateV2TeamEventsYearYearStateStateGet {
        namespace Parameters {
            /**
             * State
             */
            export type State = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
            state: /* State */ Parameters.State;
        }
        namespace Responses {
            /**
             * Response Read Team Events Year State V2 Team Events Year  Year  State  State  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchV2TeamMatchTeamMatchGet {
        namespace Parameters {
            /**
             * Match
             */
            export type Match = string;
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            match: /* Match */ Parameters.Match;
        }
        namespace Responses {
            /**
             * Response Read Team Match V2 Team Match  Team   Match  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchV3TeamMatchTeamMatchGet {
        namespace Parameters {
            /**
             * Match
             */
            export type Match = string;
            /**
             * Team
             */
            export type Team = string;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            match: /* Match */ Parameters.Match;
        }
        namespace Responses {
            /**
             * Response Read Team Match V3 Team Match  Team   Match  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchesEventV2TeamMatchesEventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
        }
        export interface PathParameters {
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Team Matches Event V2 Team Matches Event  Event  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchesTeamEventV2TeamMatchesTeamTeamEventEventGet {
        namespace Parameters {
            /**
             * Event
             */
            export type Event = string;
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            event: /* Event */ Parameters.Event;
        }
        namespace Responses {
            /**
             * Response Read Team Matches Team Event V2 Team Matches Team  Team  Event  Event  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchesTeamYearV2TeamMatchesTeamTeamYearYearGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Team Matches Team Year V2 Team Matches Team  Team  Year  Year  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchesV2TeamMatchesGet {
        namespace Parameters {
            /**
             * Ascending
             */
            export type Ascending = /* Ascending */ boolean | null;
            /**
             * Elims
             */
            export type Elims = /* Elims */ boolean | null;
            /**
             * Event
             */
            export type Event = /* Event */ string | null;
            /**
             * Limit
             */
            export type Limit = /* Limit */ number | null;
            /**
             * Match
             */
            export type Match = /* Match */ string | null;
            /**
             * Metric
             */
            export type Metric = /* Metric */ string | null;
            /**
             * Offseason
             */
            export type Offseason = /* Offseason */ boolean | null;
            /**
             * Offset
             */
            export type Offset = /* Offset */ number | null;
            /**
             * Team
             */
            export type Team = /* Team */ number | null;
            /**
             * Week
             */
            export type Week = /* Week */ number | null;
            /**
             * Year
             */
            export type Year = /* Year */ number | null;
        }
        export interface QueryParameters {
            team?: /* Team */ Parameters.Team;
            year?: /* Year */ Parameters.Year;
            event?: /* Event */ Parameters.Event;
            week?: /* Week */ Parameters.Week;
            match?: /* Match */ Parameters.Match;
            elims?: /* Elims */ Parameters.Elims;
            offseason?: /* Offseason */ Parameters.Offseason;
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Team Matches V2 Team Matches Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamMatchesV3TeamMatchesGet {
        namespace Parameters {
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            boolean | null;
            /**
             * Elim
             * Whether the match is an elimination match.
             */
            export type Elim = /**
             * Elim
             * Whether the match is an elimination match.
             */
            boolean | null;
            /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            export type Event = /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            string | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            number | null;
            /**
             * Match
             * Match key, e.g. `2019ncwak_f1m1`.
             */
            export type Match = /**
             * Match
             * Match key, e.g. `2019ncwak_f1m1`.
             */
            string | null;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            string | null;
            /**
             * Offseason
             * Whether the event is an offseason event.
             */
            export type Offseason = /**
             * Offseason
             * Whether the event is an offseason event.
             */
            boolean | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = /**
             * Offset
             * Offset from the first result to return.
             */
            number | null;
            /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            export type Team = /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            string | null;
            /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            export type Week = /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            number | null;
            /**
             * Year
             * Four-digit year
             */
            export type Year = /**
             * Year
             * Four-digit year
             */
            number | null;
        }
        export interface QueryParameters {
            team?: /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            Parameters.Team;
            year?: /**
             * Year
             * Four-digit year
             */
            Parameters.Year;
            event?: /**
             * Event
             * Event key, e.g. `2019ncwak`.
             */
            Parameters.Event;
            week?: /**
             * Week
             * Week of the competition season. 0 is preseason, 8 is CMP, 9 is offseason.
             */
            Parameters.Week;
            match?: /**
             * Match
             * Match key, e.g. `2019ncwak_f1m1`.
             */
            Parameters.Match;
            elim?: /**
             * Elim
             * Whether the match is an elimination match.
             */
            Parameters.Elim;
            offseason?: /**
             * Offseason
             * Whether the event is an offseason event.
             */
            Parameters.Offseason;
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Team Matches V3 Team Matches Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamV2TeamTeamGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
        }
        namespace Responses {
            /**
             * Response Read Team V2 Team  Team  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamV3TeamTeamGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = string;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
        }
        namespace Responses {
            /**
             * Response Read Team V3 Team  Team  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearV2TeamYearTeamYearGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Team Year V2 Team Year  Team   Year  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearV3TeamYearTeamYearGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Team Year V3 Team Year  Team   Year  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearsDistrictV2TeamYearsYearYearDistrictDistrictGet {
        namespace Parameters {
            /**
             * District
             */
            export type District = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
            district: /* District */ Parameters.District;
        }
        namespace Responses {
            /**
             * Response Read Team Years District V2 Team Years Year  Year  District  District  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearsStateV2TeamYearsYearYearStateStateGet {
        namespace Parameters {
            /**
             * State
             */
            export type State = string;
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
            state: /* State */ Parameters.State;
        }
        namespace Responses {
            /**
             * Response Read Team Years State V2 Team Years Year  Year  State  State  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearsTeamV2TeamYearsTeamTeamGet {
        namespace Parameters {
            /**
             * Team
             */
            export type Team = number;
        }
        export interface PathParameters {
            team: /* Team */ Parameters.Team;
        }
        namespace Responses {
            /**
             * Response Read Team Years Team V2 Team Years Team  Team  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearsV2TeamYearsGet {
        namespace Parameters {
            /**
             * Ascending
             */
            export type Ascending = /* Ascending */ boolean | null;
            /**
             * Country
             */
            export type Country = /* Country */ string | null;
            /**
             * District
             */
            export type District = /* District */ string | null;
            /**
             * Limit
             */
            export type Limit = /* Limit */ number | null;
            /**
             * Metric
             */
            export type Metric = /* Metric */ string | null;
            /**
             * Offseason
             */
            export type Offseason = /* Offseason */ boolean | null;
            /**
             * Offset
             */
            export type Offset = /* Offset */ number | null;
            /**
             * State
             */
            export type State = /* State */ string | null;
            /**
             * Team
             */
            export type Team = /* Team */ number | null;
            /**
             * Year
             */
            export type Year = /* Year */ number | null;
        }
        export interface QueryParameters {
            team?: /* Team */ Parameters.Team;
            year?: /* Year */ Parameters.Year;
            country?: /* Country */ Parameters.Country;
            district?: /* District */ Parameters.District;
            state?: /* State */ Parameters.State;
            offseason?: /* Offseason */ Parameters.Offseason;
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Team Years V2 Team Years Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamYearsV3TeamYearsGet {
        namespace Parameters {
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            boolean | null;
            /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            export type Country = /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            string | null;
            /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            export type District = /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            string | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            number | null;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            string | null;
            /**
             * Offseason
             * Whether the event is an offseason event.
             */
            export type Offseason = /**
             * Offseason
             * Whether the event is an offseason event.
             */
            boolean | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = /**
             * Offset
             * Offset from the first result to return.
             */
            number | null;
            /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            export type State = /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            string | null;
            /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            export type Team = /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            string | null;
            /**
             * Year
             * Four-digit year
             */
            export type Year = /**
             * Year
             * Four-digit year
             */
            number | null;
        }
        export interface QueryParameters {
            team?: /**
             * Team
             * Team number (no prefix), e.g. `5511`.
             */
            Parameters.Team;
            year?: /**
             * Year
             * Four-digit year
             */
            Parameters.Year;
            country?: /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            Parameters.Country;
            state?: /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            Parameters.State;
            district?: /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            Parameters.District;
            offseason?: /**
             * Offseason
             * Whether the event is an offseason event.
             */
            Parameters.Offseason;
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Team Years V3 Team Years Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamsDistrictV2TeamsDistrictDistrictGet {
        namespace Parameters {
            /**
             * District
             */
            export type District = string;
        }
        export interface PathParameters {
            district: /* District */ Parameters.District;
        }
        namespace Responses {
            /**
             * Response Read Teams District V2 Teams District  District  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamsStateV2TeamsStateStateGet {
        namespace Parameters {
            /**
             * State
             */
            export type State = string;
        }
        export interface PathParameters {
            state: /* State */ Parameters.State;
        }
        namespace Responses {
            /**
             * Response Read Teams State V2 Teams State  State  Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamsV2TeamsGet {
        namespace Parameters {
            /**
             * Active
             */
            export type Active = /* Active */ boolean | null;
            /**
             * Ascending
             */
            export type Ascending = boolean;
            /**
             * Country
             */
            export type Country = /* Country */ string | null;
            /**
             * District
             */
            export type District = /* District */ string | null;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Metric
             */
            export type Metric = string;
            /**
             * Offseason
             */
            export type Offseason = /* Offseason */ boolean | null;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * State
             */
            export type State = /* State */ string | null;
        }
        export interface QueryParameters {
            country?: /* Country */ Parameters.Country;
            district?: /* District */ Parameters.District;
            state?: /* State */ Parameters.State;
            active?: /* Active */ Parameters.Active;
            offseason?: /* Offseason */ Parameters.Offseason;
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Teams V2 Teams Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadTeamsV3TeamsGet {
        namespace Parameters {
            /**
             * Active
             * Whether the team has played in the last year.
             */
            export type Active = /**
             * Active
             * Whether the team has played in the last year.
             */
            boolean | null;
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = boolean;
            /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            export type Country = /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            string | null;
            /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            export type District = /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            string | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = number;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = string;
            /**
             * Offseason
             * Whether the event is an offseason event.
             */
            export type Offseason = /**
             * Offseason
             * Whether the event is an offseason event.
             */
            boolean | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = number;
            /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            export type State = /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            string | null;
        }
        export interface QueryParameters {
            country?: /**
             * Country
             * Capitalized country name, e.g. `USA` or `Canada`.
             */
            Parameters.Country;
            state?: /**
             * State
             * Capitalized two-letter state code, e.g. `NC`.
             */
            Parameters.State;
            district?: /**
             * District
             * One of [`fma`, `fnc`, `fit`, `fin`, `fim`, `ne`, `chs`, `ont`, `pnw`, `pch`, `isr`]
             */
            Parameters.District;
            active?: /**
             * Active
             * Whether the team has played in the last year.
             */
            Parameters.Active;
            offseason?: /**
             * Offseason
             * Whether the event is an offseason event.
             */
            Parameters.Offseason;
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Teams V3 Teams Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadYearV2YearYearGet {
        namespace Parameters {
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Year V2 Year  Year  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadYearV3YearYearGet {
        namespace Parameters {
            /**
             * Year
             */
            export type Year = number;
        }
        export interface PathParameters {
            year: /* Year */ Parameters.Year;
        }
        namespace Responses {
            /**
             * Response Read Year V3 Year  Year  Get
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadYearsV2YearsGet {
        namespace Parameters {
            /**
             * Ascending
             */
            export type Ascending = /* Ascending */ boolean | null;
            /**
             * Limit
             */
            export type Limit = /* Limit */ number | null;
            /**
             * Metric
             */
            export type Metric = /* Metric */ string | null;
            /**
             * Offset
             */
            export type Offset = /* Offset */ number | null;
        }
        export interface QueryParameters {
            metric?: /* Metric */ Parameters.Metric;
            ascending?: /* Ascending */ Parameters.Ascending;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Years V2 Years Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ReadYearsV3YearsGet {
        namespace Parameters {
            /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            export type Ascending = /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            boolean | null;
            /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            export type Limit = /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            number | null;
            /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            export type Metric = /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            string | null;
            /**
             * Offset
             * Offset from the first result to return.
             */
            export type Offset = /**
             * Offset
             * Offset from the first result to return.
             */
            number | null;
        }
        export interface QueryParameters {
            metric?: /**
             * Metric
             * How to sort the returned values. Any column in the table is valid.
             */
            Parameters.Metric;
            ascending?: /**
             * Ascending
             * Whether to sort the returned values in ascending order. Default is ascending
             */
            Parameters.Ascending;
            limit?: /**
             * Limit
             * Maximum number of events to return. Default is 1000.
             */
            Parameters.Limit;
            offset?: /**
             * Offset
             * Offset from the first result to return.
             */
            Parameters.Offset;
        }
        namespace Responses {
            /**
             * Response Read Years V3 Years Get
             */
            export type $200 = {
                [key: string]: any;
            }[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
}

export interface OperationMethods {
  /**
   * read_root_v3__get - Read Root
   */
  'read_root_v3__get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadRootV3Get.Responses.$200>
  /**
   * read_year_v3_year__year__get - Query a single year
   * 
   * Returns a single Year object. Requires a four-digit year, e.g. `2019`.
   */
  'read_year_v3_year__year__get'(
    parameters: Parameters<Paths.ReadYearV3YearYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadYearV3YearYearGet.Responses.$200>
  /**
   * read_years_v3_years_get - Query multiple years
   */
  'read_years_v3_years_get'(
    parameters?: Parameters<Paths.ReadYearsV3YearsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadYearsV3YearsGet.Responses.$200>
  /**
   * read_team_v3_team__team__get - Query a single team
   * 
   * Returns a single Team object. Requires a team number (no prefix).
   */
  'read_team_v3_team__team__get'(
    parameters: Parameters<Paths.ReadTeamV3TeamTeamGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamV3TeamTeamGet.Responses.$200>
  /**
   * read_teams_v3_teams_get - Query multiple teams
   * 
   * Returns up to 1000 teams at a time. Specify limit and offset to page through results.
   */
  'read_teams_v3_teams_get'(
    parameters?: Parameters<Paths.ReadTeamsV3TeamsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamsV3TeamsGet.Responses.$200>
  /**
   * read_team_year_v3_team_year__team___year__get - Query a single team year
   * 
   * Returns a single Team Year object. Requires a team number and year.
   */
  'read_team_year_v3_team_year__team___year__get'(
    parameters: Parameters<Paths.ReadTeamYearV3TeamYearTeamYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearV3TeamYearTeamYearGet.Responses.$200>
  /**
   * read_team_years_v3_team_years_get - Query multiple team years
   * 
   * Returns up to 1000 team years at a time. Specify limit and offset to page through results.
   */
  'read_team_years_v3_team_years_get'(
    parameters?: Parameters<Paths.ReadTeamYearsV3TeamYearsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearsV3TeamYearsGet.Responses.$200>
  /**
   * read_event_v3_event__event__get - Query a single event
   * 
   * Returns a single Event object. Requires an event key, e.g. `2019ncwak`.
   */
  'read_event_v3_event__event__get'(
    parameters: Parameters<Paths.ReadEventV3EventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventV3EventEventGet.Responses.$200>
  /**
   * read_events_v3_events_get - Query multiple events
   * 
   * Returns up to 1000 events at a time. Specify limit and offset to page through results.
   */
  'read_events_v3_events_get'(
    parameters?: Parameters<Paths.ReadEventsV3EventsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsV3EventsGet.Responses.$200>
  /**
   * read_team_event_v3_team_event__team___event__get - Query a single team event
   * 
   * Returns a single Team Event object. Requires a team number and event key, e.g. `5511` and `2019ncwak`.
   */
  'read_team_event_v3_team_event__team___event__get'(
    parameters: Parameters<Paths.ReadTeamEventV3TeamEventTeamEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventV3TeamEventTeamEventGet.Responses.$200>
  /**
   * read_team_events_v3_team_events_get - Query multiple team events
   * 
   * Returns up to 1000 team events at a time. Specify limit and offset to page through results.
   */
  'read_team_events_v3_team_events_get'(
    parameters?: Parameters<Paths.ReadTeamEventsV3TeamEventsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsV3TeamEventsGet.Responses.$200>
  /**
   * read_match_v3_match__match__get - Query a single match
   * 
   * Returns a single Match object. Requires a match key, e.g. `2019ncwak_f1m1`.
   */
  'read_match_v3_match__match__get'(
    parameters: Parameters<Paths.ReadMatchV3MatchMatchGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchV3MatchMatchGet.Responses.$200>
  /**
   * read_matches_v3_matches_get - Query multiple matches
   * 
   * Returns up to 1000 matches at a time. Specify limit and offset to page through results.
   */
  'read_matches_v3_matches_get'(
    parameters?: Parameters<Paths.ReadMatchesV3MatchesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchesV3MatchesGet.Responses.$200>
  /**
   * read_team_match_v3_team_match__team___match__get - Query a single team match
   * 
   * Returns a single Team Match object. Requires a team number and match key, e.g. `5511` and `2019ncwak_f1m1`.
   */
  'read_team_match_v3_team_match__team___match__get'(
    parameters: Parameters<Paths.ReadTeamMatchV3TeamMatchTeamMatchGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchV3TeamMatchTeamMatchGet.Responses.$200>
  /**
   * read_team_matches_v3_team_matches_get - Query multiple team matches
   * 
   * Returns up to 1000 team matches at a time. Specify limit and offset to page through results.
   */
  'read_team_matches_v3_team_matches_get'(
    parameters?: Parameters<Paths.ReadTeamMatchesV3TeamMatchesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchesV3TeamMatchesGet.Responses.$200>
  /**
   * read_root_v2__get - Read Root
   */
  'read_root_v2__get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadRootV2Get.Responses.$200>
  /**
   * read_year_v2_year__year__get - Read Year
   * 
   * Get a single Year object containing EPA percentiles, Week 1 match score statistics, and prediction accuracy. After 2016, separated into components and ranking points included.
   */
  'read_year_v2_year__year__get'(
    parameters: Parameters<Paths.ReadYearV2YearYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadYearV2YearYearGet.Responses.$200>
  /**
   * read_years_v2_years_get - Read Years
   * 
   * Get a list of Year objects from 2002 to 2023. Specify a four-digit year, ex: 2019
   */
  'read_years_v2_years_get'(
    parameters?: Parameters<Paths.ReadYearsV2YearsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadYearsV2YearsGet.Responses.$200>
  /**
   * read_team_v2_team__team__get - Read Team
   * 
   * Get a single Team object containing team name, location, normalized EPA statistics, and winrate.
   */
  'read_team_v2_team__team__get'(
    parameters: Parameters<Paths.ReadTeamV2TeamTeamGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamV2TeamTeamGet.Responses.$200>
  /**
   * read_teams_district_v2_teams_district__district__get - Read Teams District
   * 
   * Get a list of Team objects from a single district. Specify lowercase district abbreviation, ex: fnc, fim
   */
  'read_teams_district_v2_teams_district__district__get'(
    parameters: Parameters<Paths.ReadTeamsDistrictV2TeamsDistrictDistrictGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamsDistrictV2TeamsDistrictDistrictGet.Responses.$200>
  /**
   * read_teams_state_v2_teams_state__state__get - Read Teams State
   * 
   * Get a list of Team objects from a single state. Specify uppercase state abbreviation, ex: NC, CA
   */
  'read_teams_state_v2_teams_state__state__get'(
    parameters: Parameters<Paths.ReadTeamsStateV2TeamsStateStateGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamsStateV2TeamsStateStateGet.Responses.$200>
  /**
   * read_teams_v2_teams_get - Read Teams
   * 
   * Get a list of Team objects with optional filters.
   */
  'read_teams_v2_teams_get'(
    parameters?: Parameters<Paths.ReadTeamsV2TeamsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamsV2TeamsGet.Responses.$200>
  /**
   * read_team_year_v2_team_year__team___year__get - Read Team Year
   * 
   * Get a single TeamYear object containing EPA summary, winrates, and location rankings
   */
  'read_team_year_v2_team_year__team___year__get'(
    parameters: Parameters<Paths.ReadTeamYearV2TeamYearTeamYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearV2TeamYearTeamYearGet.Responses.$200>
  /**
   * read_team_years_team_v2_team_years_team__team__get - Read Team Years Team
   * 
   * Get a list of TeamYear objects for a single team. Specify team number, ex: 254, 1114
   */
  'read_team_years_team_v2_team_years_team__team__get'(
    parameters: Parameters<Paths.ReadTeamYearsTeamV2TeamYearsTeamTeamGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearsTeamV2TeamYearsTeamTeamGet.Responses.$200>
  /**
   * read_team_years_district_v2_team_years_year__year__district__district__get - Read Team Years District
   * 
   * Get a list of TeamYear objects from a single district. Specify lowercase district abbreviation, ex: fnc, fim
   */
  'read_team_years_district_v2_team_years_year__year__district__district__get'(
    parameters: Parameters<Paths.ReadTeamYearsDistrictV2TeamYearsYearYearDistrictDistrictGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearsDistrictV2TeamYearsYearYearDistrictDistrictGet.Responses.$200>
  /**
   * read_team_years_state_v2_team_years_year__year__state__state__get - Read Team Years State
   * 
   * Get a list of TeamYear objects from a single state. Specify lowercase state abbreviation, ex: ca, tx
   */
  'read_team_years_state_v2_team_years_year__year__state__state__get'(
    parameters: Parameters<Paths.ReadTeamYearsStateV2TeamYearsYearYearStateStateGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearsStateV2TeamYearsYearYearStateStateGet.Responses.$200>
  /**
   * read_team_years_v2_team_years_get - Read Team Years
   * 
   * Get a list of TeamYear objects with optional filters.
   */
  'read_team_years_v2_team_years_get'(
    parameters?: Parameters<Paths.ReadTeamYearsV2TeamYearsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamYearsV2TeamYearsGet.Responses.$200>
  /**
   * read_event_v2_event__event__get - Read Event
   * 
   * Get a single Event object containing event location, dates, EPA stats, prediction stats. Specify event key ex: 2019ncwak, 2022cmptx
   */
  'read_event_v2_event__event__get'(
    parameters: Parameters<Paths.ReadEventV2EventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventV2EventEventGet.Responses.$200>
  /**
   * read_events_year_v2_events_year__year__get - Read Events Year
   * 
   * Get a list of Event objects for a single year. Specify year, ex: 2019, 2020
   */
  'read_events_year_v2_events_year__year__get'(
    parameters: Parameters<Paths.ReadEventsYearV2EventsYearYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsYearV2EventsYearYearGet.Responses.$200>
  /**
   * read_events_year_district_v2_events_year__year__district__district__get - Read Events Year District
   * 
   * Get a list of Event objects for a single (year, district) pair. Specify year as four-digit number, district as lowercase abbreviation.
   */
  'read_events_year_district_v2_events_year__year__district__district__get'(
    parameters: Parameters<Paths.ReadEventsYearDistrictV2EventsYearYearDistrictDistrictGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsYearDistrictV2EventsYearYearDistrictDistrictGet.Responses.$200>
  /**
   * read_events_year_state_v2_events_year__year__state__state__get - Read Events Year State
   * 
   * Get a list of Event objects for a single (year, state) pair. Specify year as four-digit number, state as uppercase two-letter abbreviation.
   */
  'read_events_year_state_v2_events_year__year__state__state__get'(
    parameters: Parameters<Paths.ReadEventsYearStateV2EventsYearYearStateStateGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsYearStateV2EventsYearYearStateStateGet.Responses.$200>
  /**
   * read_events_district_v2_events_district__district__get - Read Events District
   * 
   * Get a list of Event objects for a single district. Specify district as lowercase abbreviation, ex fnc, fim.
   */
  'read_events_district_v2_events_district__district__get'(
    parameters: Parameters<Paths.ReadEventsDistrictV2EventsDistrictDistrictGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsDistrictV2EventsDistrictDistrictGet.Responses.$200>
  /**
   * read_events_state_v2_events_state__state__get - Read Events State
   * 
   * Get a list of Event objects for a single state. Specify state as uppercase two-letter abbreviation, ex CA, TX.
   */
  'read_events_state_v2_events_state__state__get'(
    parameters: Parameters<Paths.ReadEventsStateV2EventsStateStateGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsStateV2EventsStateStateGet.Responses.$200>
  /**
   * read_events_v2_events_get - Read Events
   * 
   * Get a list of all Event objects with optional filters.
   */
  'read_events_v2_events_get'(
    parameters?: Parameters<Paths.ReadEventsV2EventsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadEventsV2EventsGet.Responses.$200>
  /**
   * read_team_event_v2_team_event__team___event__get - Read Team Event
   * 
   * Get a single Team Event object containing event metadata, EPA statistics, and winrate. Specify team number and event key ex: 5511, 2019ncwak
   */
  'read_team_event_v2_team_event__team___event__get'(
    parameters: Parameters<Paths.ReadTeamEventV2TeamEventTeamEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventV2TeamEventTeamEventGet.Responses.$200>
  /**
   * read_team_events_team_v2_team_events_team__team__get - Read Team Events Team
   * 
   * Get a list of Team Event objects for a single team. Specify team number, ex: 5511
   */
  'read_team_events_team_v2_team_events_team__team__get'(
    parameters: Parameters<Paths.ReadTeamEventsTeamV2TeamEventsTeamTeamGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsTeamV2TeamEventsTeamTeamGet.Responses.$200>
  /**
   * read_team_events_team_year_v2_team_events_team__team__year__year__get - Read Team Events Team Year
   * 
   * Get a list of Team Event objects for a single team and year. Specify team number and year, ex: 5511, 2019
   */
  'read_team_events_team_year_v2_team_events_team__team__year__year__get'(
    parameters: Parameters<Paths.ReadTeamEventsTeamYearV2TeamEventsTeamTeamYearYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsTeamYearV2TeamEventsTeamTeamYearYearGet.Responses.$200>
  /**
   * read_team_events_event_v2_team_events_event__event__get - Read Team Events Event
   * 
   * Get a list of Team Event objects for a single event. Specify event key, ex: 2019ncwak
   */
  'read_team_events_event_v2_team_events_event__event__get'(
    parameters: Parameters<Paths.ReadTeamEventsEventV2TeamEventsEventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsEventV2TeamEventsEventEventGet.Responses.$200>
  /**
   * read_team_events_year_district_v2_team_events_year__year__district__district__get - Read Team Events Year District
   * 
   * Get a list of Team Event objects for a single year and district. Specify year and district, ex: 2019, fnc
   */
  'read_team_events_year_district_v2_team_events_year__year__district__district__get'(
    parameters: Parameters<Paths.ReadTeamEventsYearDistrictV2TeamEventsYearYearDistrictDistrictGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsYearDistrictV2TeamEventsYearYearDistrictDistrictGet.Responses.$200>
  /**
   * read_team_events_year_state_v2_team_events_year__year__state__state__get - Read Team Events Year State
   * 
   * Get a list of Team Event objects for a single year and state. Specify year and state, ex: 2019, NC
   */
  'read_team_events_year_state_v2_team_events_year__year__state__state__get'(
    parameters: Parameters<Paths.ReadTeamEventsYearStateV2TeamEventsYearYearStateStateGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsYearStateV2TeamEventsYearYearStateStateGet.Responses.$200>
  /**
   * read_team_events_v2_team_events_get - Read Team Events
   * 
   * Get a list of all Team Event objects with optional filters.
   */
  'read_team_events_v2_team_events_get'(
    parameters?: Parameters<Paths.ReadTeamEventsV2TeamEventsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamEventsV2TeamEventsGet.Responses.$200>
  /**
   * read_match_v2_match__match__get - Read Match
   * 
   * Get a single Match object containing teams, score prediction, and actual results. Specify match key ex: 2019ncwak_f1m1
   */
  'read_match_v2_match__match__get'(
    parameters: Parameters<Paths.ReadMatchV2MatchMatchGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchV2MatchMatchGet.Responses.$200>
  /**
   * read_matches_event_v2_matches_event__event__get - Read Matches Event
   * 
   * Get a list of Match objects for a single event. Specify event key ex: 2019ncwak, 2022cmptx
   */
  'read_matches_event_v2_matches_event__event__get'(
    parameters: Parameters<Paths.ReadMatchesEventV2MatchesEventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchesEventV2MatchesEventEventGet.Responses.$200>
  /**
   * read_matches_team_year_v2_matches_team__team__year__year__get - Read Matches Team Year
   * 
   * Get a list of Match objects for a single team in a single year. Specify team number and year, ex: 254, 2019
   */
  'read_matches_team_year_v2_matches_team__team__year__year__get'(
    parameters: Parameters<Paths.ReadMatchesTeamYearV2MatchesTeamTeamYearYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchesTeamYearV2MatchesTeamTeamYearYearGet.Responses.$200>
  /**
   * read_matches_team_event_v2_matches_team__team__event__event__get - Read Matches Team Event
   * 
   * Get a list of Match objects for a single team in a single event. Specify team number and event key, ex: 5511, 2019ncwak
   */
  'read_matches_team_event_v2_matches_team__team__event__event__get'(
    parameters: Parameters<Paths.ReadMatchesTeamEventV2MatchesTeamTeamEventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchesTeamEventV2MatchesTeamTeamEventEventGet.Responses.$200>
  /**
   * read_matches_v2_matches_get - Read Matches
   * 
   * Get a list of Matches with optional filters
   */
  'read_matches_v2_matches_get'(
    parameters?: Parameters<Paths.ReadMatchesV2MatchesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadMatchesV2MatchesGet.Responses.$200>
  /**
   * read_team_match_v2_team_match__team___match__get - Read Team Match
   * 
   * Get a single Team Match object containing team and EPA predictions. Specify team number and match key ex: 5511, 2019ncwak_f1m1
   */
  'read_team_match_v2_team_match__team___match__get'(
    parameters: Parameters<Paths.ReadTeamMatchV2TeamMatchTeamMatchGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchV2TeamMatchTeamMatchGet.Responses.$200>
  /**
   * read_team_matches_team_year_v2_team_matches_team__team__year__year__get - Read Team Matches Team Year
   * 
   * Get a list of Team Match objects for a single team and year. Specify team number and year ex: 5511, 2019. Note, includes offseason events.
   */
  'read_team_matches_team_year_v2_team_matches_team__team__year__year__get'(
    parameters: Parameters<Paths.ReadTeamMatchesTeamYearV2TeamMatchesTeamTeamYearYearGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchesTeamYearV2TeamMatchesTeamTeamYearYearGet.Responses.$200>
  /**
   * read_team_matches_team_event_v2_team_matches_team__team__event__event__get - Read Team Matches Team Event
   * 
   * Get a list of Team Match objects for a single team and event. Specify team number and event key ex: 5511, 2019ncwak
   */
  'read_team_matches_team_event_v2_team_matches_team__team__event__event__get'(
    parameters: Parameters<Paths.ReadTeamMatchesTeamEventV2TeamMatchesTeamTeamEventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchesTeamEventV2TeamMatchesTeamTeamEventEventGet.Responses.$200>
  /**
   * read_team_matches_event_v2_team_matches_event__event__get - Read Team Matches Event
   * 
   * Get a list of Team Match objects for a single event. Specify event key ex: 2019ncwak
   */
  'read_team_matches_event_v2_team_matches_event__event__get'(
    parameters: Parameters<Paths.ReadTeamMatchesEventV2TeamMatchesEventEventGet.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchesEventV2TeamMatchesEventEventGet.Responses.$200>
  /**
   * read_team_matches_v2_team_matches_get - Read Team Matches
   * 
   * Get a list of Team Match objects with optional filters
   */
  'read_team_matches_v2_team_matches_get'(
    parameters?: Parameters<Paths.ReadTeamMatchesV2TeamMatchesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReadTeamMatchesV2TeamMatchesGet.Responses.$200>
}

export interface PathsDictionary {
  ['/v3/']: {
    /**
     * read_root_v3__get - Read Root
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadRootV3Get.Responses.$200>
  }
  ['/v3/year/{year}']: {
    /**
     * read_year_v3_year__year__get - Query a single year
     * 
     * Returns a single Year object. Requires a four-digit year, e.g. `2019`.
     */
    'get'(
      parameters: Parameters<Paths.ReadYearV3YearYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadYearV3YearYearGet.Responses.$200>
  }
  ['/v3/years']: {
    /**
     * read_years_v3_years_get - Query multiple years
     */
    'get'(
      parameters?: Parameters<Paths.ReadYearsV3YearsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadYearsV3YearsGet.Responses.$200>
  }
  ['/v3/team/{team}']: {
    /**
     * read_team_v3_team__team__get - Query a single team
     * 
     * Returns a single Team object. Requires a team number (no prefix).
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamV3TeamTeamGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamV3TeamTeamGet.Responses.$200>
  }
  ['/v3/teams']: {
    /**
     * read_teams_v3_teams_get - Query multiple teams
     * 
     * Returns up to 1000 teams at a time. Specify limit and offset to page through results.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamsV3TeamsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamsV3TeamsGet.Responses.$200>
  }
  ['/v3/team_year/{team}/{year}']: {
    /**
     * read_team_year_v3_team_year__team___year__get - Query a single team year
     * 
     * Returns a single Team Year object. Requires a team number and year.
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamYearV3TeamYearTeamYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearV3TeamYearTeamYearGet.Responses.$200>
  }
  ['/v3/team_years']: {
    /**
     * read_team_years_v3_team_years_get - Query multiple team years
     * 
     * Returns up to 1000 team years at a time. Specify limit and offset to page through results.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamYearsV3TeamYearsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearsV3TeamYearsGet.Responses.$200>
  }
  ['/v3/event/{event}']: {
    /**
     * read_event_v3_event__event__get - Query a single event
     * 
     * Returns a single Event object. Requires an event key, e.g. `2019ncwak`.
     */
    'get'(
      parameters: Parameters<Paths.ReadEventV3EventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventV3EventEventGet.Responses.$200>
  }
  ['/v3/events']: {
    /**
     * read_events_v3_events_get - Query multiple events
     * 
     * Returns up to 1000 events at a time. Specify limit and offset to page through results.
     */
    'get'(
      parameters?: Parameters<Paths.ReadEventsV3EventsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsV3EventsGet.Responses.$200>
  }
  ['/v3/team_event/{team}/{event}']: {
    /**
     * read_team_event_v3_team_event__team___event__get - Query a single team event
     * 
     * Returns a single Team Event object. Requires a team number and event key, e.g. `5511` and `2019ncwak`.
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventV3TeamEventTeamEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventV3TeamEventTeamEventGet.Responses.$200>
  }
  ['/v3/team_events']: {
    /**
     * read_team_events_v3_team_events_get - Query multiple team events
     * 
     * Returns up to 1000 team events at a time. Specify limit and offset to page through results.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamEventsV3TeamEventsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsV3TeamEventsGet.Responses.$200>
  }
  ['/v3/match/{match}']: {
    /**
     * read_match_v3_match__match__get - Query a single match
     * 
     * Returns a single Match object. Requires a match key, e.g. `2019ncwak_f1m1`.
     */
    'get'(
      parameters: Parameters<Paths.ReadMatchV3MatchMatchGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchV3MatchMatchGet.Responses.$200>
  }
  ['/v3/matches']: {
    /**
     * read_matches_v3_matches_get - Query multiple matches
     * 
     * Returns up to 1000 matches at a time. Specify limit and offset to page through results.
     */
    'get'(
      parameters?: Parameters<Paths.ReadMatchesV3MatchesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchesV3MatchesGet.Responses.$200>
  }
  ['/v3/team_match/{team}/{match}']: {
    /**
     * read_team_match_v3_team_match__team___match__get - Query a single team match
     * 
     * Returns a single Team Match object. Requires a team number and match key, e.g. `5511` and `2019ncwak_f1m1`.
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamMatchV3TeamMatchTeamMatchGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchV3TeamMatchTeamMatchGet.Responses.$200>
  }
  ['/v3/team_matches']: {
    /**
     * read_team_matches_v3_team_matches_get - Query multiple team matches
     * 
     * Returns up to 1000 team matches at a time. Specify limit and offset to page through results.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamMatchesV3TeamMatchesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchesV3TeamMatchesGet.Responses.$200>
  }
  ['/v2/']: {
    /**
     * read_root_v2__get - Read Root
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadRootV2Get.Responses.$200>
  }
  ['/v2/year/{year}']: {
    /**
     * read_year_v2_year__year__get - Read Year
     * 
     * Get a single Year object containing EPA percentiles, Week 1 match score statistics, and prediction accuracy. After 2016, separated into components and ranking points included.
     */
    'get'(
      parameters: Parameters<Paths.ReadYearV2YearYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadYearV2YearYearGet.Responses.$200>
  }
  ['/v2/years']: {
    /**
     * read_years_v2_years_get - Read Years
     * 
     * Get a list of Year objects from 2002 to 2023. Specify a four-digit year, ex: 2019
     */
    'get'(
      parameters?: Parameters<Paths.ReadYearsV2YearsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadYearsV2YearsGet.Responses.$200>
  }
  ['/v2/team/{team}']: {
    /**
     * read_team_v2_team__team__get - Read Team
     * 
     * Get a single Team object containing team name, location, normalized EPA statistics, and winrate.
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamV2TeamTeamGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamV2TeamTeamGet.Responses.$200>
  }
  ['/v2/teams/district/{district}']: {
    /**
     * read_teams_district_v2_teams_district__district__get - Read Teams District
     * 
     * Get a list of Team objects from a single district. Specify lowercase district abbreviation, ex: fnc, fim
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamsDistrictV2TeamsDistrictDistrictGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamsDistrictV2TeamsDistrictDistrictGet.Responses.$200>
  }
  ['/v2/teams/state/{state}']: {
    /**
     * read_teams_state_v2_teams_state__state__get - Read Teams State
     * 
     * Get a list of Team objects from a single state. Specify uppercase state abbreviation, ex: NC, CA
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamsStateV2TeamsStateStateGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamsStateV2TeamsStateStateGet.Responses.$200>
  }
  ['/v2/teams']: {
    /**
     * read_teams_v2_teams_get - Read Teams
     * 
     * Get a list of Team objects with optional filters.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamsV2TeamsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamsV2TeamsGet.Responses.$200>
  }
  ['/v2/team_year/{team}/{year}']: {
    /**
     * read_team_year_v2_team_year__team___year__get - Read Team Year
     * 
     * Get a single TeamYear object containing EPA summary, winrates, and location rankings
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamYearV2TeamYearTeamYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearV2TeamYearTeamYearGet.Responses.$200>
  }
  ['/v2/team_years/team/{team}']: {
    /**
     * read_team_years_team_v2_team_years_team__team__get - Read Team Years Team
     * 
     * Get a list of TeamYear objects for a single team. Specify team number, ex: 254, 1114
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamYearsTeamV2TeamYearsTeamTeamGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearsTeamV2TeamYearsTeamTeamGet.Responses.$200>
  }
  ['/v2/team_years/year/{year}/district/{district}']: {
    /**
     * read_team_years_district_v2_team_years_year__year__district__district__get - Read Team Years District
     * 
     * Get a list of TeamYear objects from a single district. Specify lowercase district abbreviation, ex: fnc, fim
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamYearsDistrictV2TeamYearsYearYearDistrictDistrictGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearsDistrictV2TeamYearsYearYearDistrictDistrictGet.Responses.$200>
  }
  ['/v2/team_years/year/{year}/state/{state}']: {
    /**
     * read_team_years_state_v2_team_years_year__year__state__state__get - Read Team Years State
     * 
     * Get a list of TeamYear objects from a single state. Specify lowercase state abbreviation, ex: ca, tx
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamYearsStateV2TeamYearsYearYearStateStateGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearsStateV2TeamYearsYearYearStateStateGet.Responses.$200>
  }
  ['/v2/team_years']: {
    /**
     * read_team_years_v2_team_years_get - Read Team Years
     * 
     * Get a list of TeamYear objects with optional filters.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamYearsV2TeamYearsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamYearsV2TeamYearsGet.Responses.$200>
  }
  ['/v2/event/{event}']: {
    /**
     * read_event_v2_event__event__get - Read Event
     * 
     * Get a single Event object containing event location, dates, EPA stats, prediction stats. Specify event key ex: 2019ncwak, 2022cmptx
     */
    'get'(
      parameters: Parameters<Paths.ReadEventV2EventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventV2EventEventGet.Responses.$200>
  }
  ['/v2/events/year/{year}']: {
    /**
     * read_events_year_v2_events_year__year__get - Read Events Year
     * 
     * Get a list of Event objects for a single year. Specify year, ex: 2019, 2020
     */
    'get'(
      parameters: Parameters<Paths.ReadEventsYearV2EventsYearYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsYearV2EventsYearYearGet.Responses.$200>
  }
  ['/v2/events/year/{year}/district/{district}']: {
    /**
     * read_events_year_district_v2_events_year__year__district__district__get - Read Events Year District
     * 
     * Get a list of Event objects for a single (year, district) pair. Specify year as four-digit number, district as lowercase abbreviation.
     */
    'get'(
      parameters: Parameters<Paths.ReadEventsYearDistrictV2EventsYearYearDistrictDistrictGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsYearDistrictV2EventsYearYearDistrictDistrictGet.Responses.$200>
  }
  ['/v2/events/year/{year}/state/{state}']: {
    /**
     * read_events_year_state_v2_events_year__year__state__state__get - Read Events Year State
     * 
     * Get a list of Event objects for a single (year, state) pair. Specify year as four-digit number, state as uppercase two-letter abbreviation.
     */
    'get'(
      parameters: Parameters<Paths.ReadEventsYearStateV2EventsYearYearStateStateGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsYearStateV2EventsYearYearStateStateGet.Responses.$200>
  }
  ['/v2/events/district/{district}']: {
    /**
     * read_events_district_v2_events_district__district__get - Read Events District
     * 
     * Get a list of Event objects for a single district. Specify district as lowercase abbreviation, ex fnc, fim.
     */
    'get'(
      parameters: Parameters<Paths.ReadEventsDistrictV2EventsDistrictDistrictGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsDistrictV2EventsDistrictDistrictGet.Responses.$200>
  }
  ['/v2/events/state/{state}']: {
    /**
     * read_events_state_v2_events_state__state__get - Read Events State
     * 
     * Get a list of Event objects for a single state. Specify state as uppercase two-letter abbreviation, ex CA, TX.
     */
    'get'(
      parameters: Parameters<Paths.ReadEventsStateV2EventsStateStateGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsStateV2EventsStateStateGet.Responses.$200>
  }
  ['/v2/events']: {
    /**
     * read_events_v2_events_get - Read Events
     * 
     * Get a list of all Event objects with optional filters.
     */
    'get'(
      parameters?: Parameters<Paths.ReadEventsV2EventsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadEventsV2EventsGet.Responses.$200>
  }
  ['/v2/team_event/{team}/{event}']: {
    /**
     * read_team_event_v2_team_event__team___event__get - Read Team Event
     * 
     * Get a single Team Event object containing event metadata, EPA statistics, and winrate. Specify team number and event key ex: 5511, 2019ncwak
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventV2TeamEventTeamEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventV2TeamEventTeamEventGet.Responses.$200>
  }
  ['/v2/team_events/team/{team}']: {
    /**
     * read_team_events_team_v2_team_events_team__team__get - Read Team Events Team
     * 
     * Get a list of Team Event objects for a single team. Specify team number, ex: 5511
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventsTeamV2TeamEventsTeamTeamGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsTeamV2TeamEventsTeamTeamGet.Responses.$200>
  }
  ['/v2/team_events/team/{team}/year/{year}']: {
    /**
     * read_team_events_team_year_v2_team_events_team__team__year__year__get - Read Team Events Team Year
     * 
     * Get a list of Team Event objects for a single team and year. Specify team number and year, ex: 5511, 2019
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventsTeamYearV2TeamEventsTeamTeamYearYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsTeamYearV2TeamEventsTeamTeamYearYearGet.Responses.$200>
  }
  ['/v2/team_events/event/{event}']: {
    /**
     * read_team_events_event_v2_team_events_event__event__get - Read Team Events Event
     * 
     * Get a list of Team Event objects for a single event. Specify event key, ex: 2019ncwak
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventsEventV2TeamEventsEventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsEventV2TeamEventsEventEventGet.Responses.$200>
  }
  ['/v2/team_events/year/{year}/district/{district}']: {
    /**
     * read_team_events_year_district_v2_team_events_year__year__district__district__get - Read Team Events Year District
     * 
     * Get a list of Team Event objects for a single year and district. Specify year and district, ex: 2019, fnc
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventsYearDistrictV2TeamEventsYearYearDistrictDistrictGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsYearDistrictV2TeamEventsYearYearDistrictDistrictGet.Responses.$200>
  }
  ['/v2/team_events/year/{year}/state/{state}']: {
    /**
     * read_team_events_year_state_v2_team_events_year__year__state__state__get - Read Team Events Year State
     * 
     * Get a list of Team Event objects for a single year and state. Specify year and state, ex: 2019, NC
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamEventsYearStateV2TeamEventsYearYearStateStateGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsYearStateV2TeamEventsYearYearStateStateGet.Responses.$200>
  }
  ['/v2/team_events']: {
    /**
     * read_team_events_v2_team_events_get - Read Team Events
     * 
     * Get a list of all Team Event objects with optional filters.
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamEventsV2TeamEventsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamEventsV2TeamEventsGet.Responses.$200>
  }
  ['/v2/match/{match}']: {
    /**
     * read_match_v2_match__match__get - Read Match
     * 
     * Get a single Match object containing teams, score prediction, and actual results. Specify match key ex: 2019ncwak_f1m1
     */
    'get'(
      parameters: Parameters<Paths.ReadMatchV2MatchMatchGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchV2MatchMatchGet.Responses.$200>
  }
  ['/v2/matches/event/{event}']: {
    /**
     * read_matches_event_v2_matches_event__event__get - Read Matches Event
     * 
     * Get a list of Match objects for a single event. Specify event key ex: 2019ncwak, 2022cmptx
     */
    'get'(
      parameters: Parameters<Paths.ReadMatchesEventV2MatchesEventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchesEventV2MatchesEventEventGet.Responses.$200>
  }
  ['/v2/matches/team/{team}/year/{year}']: {
    /**
     * read_matches_team_year_v2_matches_team__team__year__year__get - Read Matches Team Year
     * 
     * Get a list of Match objects for a single team in a single year. Specify team number and year, ex: 254, 2019
     */
    'get'(
      parameters: Parameters<Paths.ReadMatchesTeamYearV2MatchesTeamTeamYearYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchesTeamYearV2MatchesTeamTeamYearYearGet.Responses.$200>
  }
  ['/v2/matches/team/{team}/event/{event}']: {
    /**
     * read_matches_team_event_v2_matches_team__team__event__event__get - Read Matches Team Event
     * 
     * Get a list of Match objects for a single team in a single event. Specify team number and event key, ex: 5511, 2019ncwak
     */
    'get'(
      parameters: Parameters<Paths.ReadMatchesTeamEventV2MatchesTeamTeamEventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchesTeamEventV2MatchesTeamTeamEventEventGet.Responses.$200>
  }
  ['/v2/matches']: {
    /**
     * read_matches_v2_matches_get - Read Matches
     * 
     * Get a list of Matches with optional filters
     */
    'get'(
      parameters?: Parameters<Paths.ReadMatchesV2MatchesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadMatchesV2MatchesGet.Responses.$200>
  }
  ['/v2/team_match/{team}/{match}']: {
    /**
     * read_team_match_v2_team_match__team___match__get - Read Team Match
     * 
     * Get a single Team Match object containing team and EPA predictions. Specify team number and match key ex: 5511, 2019ncwak_f1m1
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamMatchV2TeamMatchTeamMatchGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchV2TeamMatchTeamMatchGet.Responses.$200>
  }
  ['/v2/team_matches/team/{team}/year/{year}']: {
    /**
     * read_team_matches_team_year_v2_team_matches_team__team__year__year__get - Read Team Matches Team Year
     * 
     * Get a list of Team Match objects for a single team and year. Specify team number and year ex: 5511, 2019. Note, includes offseason events.
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamMatchesTeamYearV2TeamMatchesTeamTeamYearYearGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchesTeamYearV2TeamMatchesTeamTeamYearYearGet.Responses.$200>
  }
  ['/v2/team_matches/team/{team}/event/{event}']: {
    /**
     * read_team_matches_team_event_v2_team_matches_team__team__event__event__get - Read Team Matches Team Event
     * 
     * Get a list of Team Match objects for a single team and event. Specify team number and event key ex: 5511, 2019ncwak
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamMatchesTeamEventV2TeamMatchesTeamTeamEventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchesTeamEventV2TeamMatchesTeamTeamEventEventGet.Responses.$200>
  }
  ['/v2/team_matches/event/{event}']: {
    /**
     * read_team_matches_event_v2_team_matches_event__event__get - Read Team Matches Event
     * 
     * Get a list of Team Match objects for a single event. Specify event key ex: 2019ncwak
     */
    'get'(
      parameters: Parameters<Paths.ReadTeamMatchesEventV2TeamMatchesEventEventGet.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchesEventV2TeamMatchesEventEventGet.Responses.$200>
  }
  ['/v2/team_matches']: {
    /**
     * read_team_matches_v2_team_matches_get - Read Team Matches
     * 
     * Get a list of Team Match objects with optional filters
     */
    'get'(
      parameters?: Parameters<Paths.ReadTeamMatchesV2TeamMatchesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReadTeamMatchesV2TeamMatchesGet.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
