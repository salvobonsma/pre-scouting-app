'use server'

import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import React from "react";
import ClientPage from "@/app/[eventId]/overview/compare/client-page";

export default async function Compare({params, searchParams}: {
    params: { eventId: string }
    searchParams: { a?: string, b?: string }
}) {
    const a = await prisma.team.findUnique(
          {
              where: {
                  number: +(searchParams.a ?? -1)
              }
          }
    );
    const b = await prisma.team.findUnique(
          {
              where: {
                  number: +(searchParams.b ?? -1)
              }
          }
    );
    if (!a || !b) return <NotFound/>;

    const aEntry = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: +params.eventId,
                  teamNumber: a.number
              }
          }
    );
    const bEntry = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: +params.eventId,
                  teamNumber: b.number
              }
          }
    );
    if (!aEntry || !bEntry) return <NotFound/>;

    const aMatchEntries = await prisma.matchEntry.count(
          {
              where: {
                  eventId: aEntry[0].eventId,
                  teamEntryId: aEntry[0].id
              }
          }
    );
    const bMatchEntries = await prisma.matchEntry.count(
          {
              where: {
                  eventId: bEntry[0].eventId,
                  teamEntryId: bEntry[0].id
              }
          }
    );

    return <ClientPage eventId={+params.eventId} a={{team: a, entry: aEntry[0], matches: {count: aMatchEntries}}}
                       b={{team: b, entry: bEntry[0], matches: {count: bMatchEntries}}}/>;
}