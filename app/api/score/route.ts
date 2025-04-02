import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createScore,
  deleteScore,
  updateScore,
} from "@/lib/api/score/mutations";
import { 
  scoreIdSchema,
  insertScoreParams,
  updateScoreParams 
} from "@/lib/db/schema/score";

export async function POST(req: Request) {
  try {
    const validatedData = insertScoreParams.parse(await req.json());
    const { score } = await createScore(validatedData);

    revalidatePath("/score"); // optional - assumes you will have named route same as entity

    return NextResponse.json(score, { status: 201 });
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

    const validatedData = updateScoreParams.parse(await req.json());
    const validatedParams = scoreIdSchema.parse({ id });

    const { score } = await updateScore(validatedParams.id, validatedData);

    return NextResponse.json(score, { status: 200 });
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

    const validatedParams = scoreIdSchema.parse({ id });
    const { score } = await deleteScore(validatedParams.id);

    return NextResponse.json(score, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
