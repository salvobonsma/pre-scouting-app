import archiver from "archiver";
import prisma from "@/lib/prisma";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +(request.nextUrl.searchParams.get("eventId") ?? -1)
              }
          }
    );
    if (!event) return new Response("Invalid eventId", {status: 400});

    const teamScouting = (await Promise.all(
          (await prisma.teamEntry.findMany(
                {
                    where: {
                        eventId: event.id
                    }
                }
          )).map(async value => ({
              ...(await prisma.team.findFirst({where: {number: value.teamNumber ?? -1}})),
              ...value
          }))
    )).map(({id, eventId, teamNumber, key, ...value}) => value);

    const matchScouting = (await Promise.all(
          (await Promise.all(
                (await prisma.matchEntry.findMany(
                      {
                          where: {
                              eventId: event.id
                          }
                      }
                )).map(async ({matchKey, id, ...value}) => ({
                    ...value,
                    ...(await prisma.match.findFirst(
                          {
                              where: {
                                  key: matchKey ?? ""
                              }
                          }
                    )),
                    pickupFrom: JSON.stringify(value.pickupFrom)
                }))
          )).map(async ({key, teamEntryId, ...value}) => ({
              team: (await prisma.teamEntry.findFirst({where: {id: teamEntryId ?? -1}}))?.teamNumber,
              matchKey: key,
              ...value
          }))
    )).map(({blueTeamKeys, redTeamKeys, ...value}) => ({
        ...value,
        blue1: (blueTeamKeys ?? [])[0],
        blue2: (blueTeamKeys ?? [])[1],
        blue3: (blueTeamKeys ?? [])[2],
        red1: (redTeamKeys ?? [])[0],
        red2: (redTeamKeys ?? [])[1],
        red3: (redTeamKeys ?? [])[2]
    }));

    const teamPreviousSeasons = (await prisma.teamPastSeason.findMany({
        where: {
            Team: {
                teamEntries: {
                    some: {
                        eventId: event.id,
                    },
                },
            },
        },
    })).map(value => ({
        ...value,
        percentile: value.percentile.toFixed(4)
    }));

    const archive = archiver("zip", {zlib: {level: 9}});
    archive.append(arrayToCsv(teamScouting), {name: "team-scouting.csv"});
    archive.append(arrayToCsv(matchScouting), {name: "match-scouting.csv"});
    archive.append(arrayToCsv(teamPreviousSeasons), {name: "team-previous-seasons.csv"});

    await archive.finalize();

    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="test.zip"');
    headers.append("Content-Type", "application/zip");

    const webStream = new ReadableStream({
        start(controller) {
            archive.on('data', (chunk) => controller.enqueue(chunk));
            archive.on('end', () => controller.close());
            archive.on('error', (err) => controller.error(err));
        }
    });

    return new Response(webStream, {
        headers,
    });
}

function arrayToCsv(data: any[]) {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvRows = data.map(row =>
          headers.map(header => {
              const value = row[header];
              return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
          }).join(',')
    );

    return [headers.join(','), ...csvRows].join('\n');
}