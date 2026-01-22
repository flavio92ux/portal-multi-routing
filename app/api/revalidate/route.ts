import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const path = req.nextUrl.searchParams.get('path');

        const secret = req.nextUrl.searchParams.get('secret');

        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json(
                { message: 'Invalid secret' },
                {
                    status: 401,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                }
            );
        }

        if (path) {
            revalidatePath(path);
            return NextResponse.json(
                { revalidated: true, path },
                {
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                }
            );
        }

    } catch (err) {
        return NextResponse.json(
            { message: 'Error revalidating' },
            {
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }
        );
    }
}