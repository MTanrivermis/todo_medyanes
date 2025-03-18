import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  createNewData,
  deleteDataByMany,
  getAllData,
  updateDataByAny,
} from "@/lib/services";

const prisma = new PrismaClient();

//  GET:
export async function GET() {
  try {
    const todos = await getAllData("todo");
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//  POST:
export async function POST(req) {
  try {
    const { todo } = await req.json();

    if (!todo) {
      return NextResponse.json(
        { error: "Todo text is required" },
        { status: 400 }
      );
    }

    const newTodo = await createNewData("todo", { todo });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//  PUT:
export async function PUT(req) {
  try {
    const { id, todo, completed } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const updatedTodo = await updateDataByAny(
      "todo",
      { id: id },
      { todo, completed }
    );
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//  DELETE:
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    await deleteDataByMany("todo", { id: id });
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
