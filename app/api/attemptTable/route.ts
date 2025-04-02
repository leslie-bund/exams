import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAttemptTable,
  deleteAttemptTable,
  updateAttemptTable,
} from "@/lib/api/attemptTable/mutations";
import { 
  attemptTableIdSchema,
  insertAttemptTableParams,
  updateAttemptTableParams 
} from "@/lib/db/schema/attemptTable";

export async function POST(req: Request) {
  try {
    const validatedData = insertAttemptTableParams.parse(await req.json());
    const { attemptTable } = await createAttemptTable(validatedData);

    revalidatePath("/attemptTable"); // optional - assumes you will have named route same as entity

    return NextResponse.json(attemptTable, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateAttemptTableParams.parse(await req.json());
    const validatedParams = attemptTableIdSchema.parse({ id });

    const { attemptTable } = await updateAttemptTable(validatedParams.id, validatedData);

    return NextResponse.json(attemptTable, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = attemptTableIdSchema.parse({ id });
    const { attemptTable } = await deleteAttemptTable(validatedParams.id);

    return NextResponse.json(attemptTable, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
