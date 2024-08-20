'use server'

import prisma from "@/lib/prisma";
import archiver from "archiver";
import {Blob} from 'buffer';

export default async function ExportCSV(eventId: number) {
    const matches = await arrayToCsv(await prisma.match.findMany({
        where: {}
    }));

    const archive = archiver('zip', {zlib: {level: 9}});

    // Add CSV data to archive
    archive.append(matches, {name: 'matches.csv'});

    // Finalize the archive (this returns a promise)
    await archive.finalize();

    // Collect archive chunks into a buffer
    const bufferChunks: Uint8Array[] = [];
    archive.on('data', (chunk) => bufferChunks.push(chunk));

    await new Promise<void>((resolve, reject) => {
        archive.on('end', () => resolve());
        archive.on('error', (err) => reject(err));
    });

    return Buffer.from(await new Blob(bufferChunks, {type: 'application/zip'}).arrayBuffer());
}

async function arrayToCsv(data: any[]) {
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
