import connectDB from "@/libs/dbConnection";
import ArticleModel from "@/schemas/ArticleSchema";
import { NextRequest, NextResponse } from "next/server";

type ArticleBody = {
  uniqueId: string;
  title: string;
  content: string;
  author: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const { uniqueId, title, content, author } =
      (await req.json()) as ArticleBody;

    if (!uniqueId || !title || !content || !author) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const articleExists = await ArticleModel.exists({ uniqueId });

    if (articleExists) {
      return NextResponse.json(
        { message: "Article with this uniqueId already exists." },
        { status: 400 }
      );
    }

    const newArticle = ArticleModel.create({
      uniqueId,
      title,
      content,
      author,
    });

    if (!newArticle) {
      return NextResponse.json(
        { message: "Article creation failed!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Article created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};
