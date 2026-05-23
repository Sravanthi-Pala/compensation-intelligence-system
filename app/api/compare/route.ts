import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id1 = searchParams.get("id1");
    const id2 = searchParams.get("id2");

    if (!id1 || !id2) {
      return NextResponse.json(
        { error: "Both IDs are required" },
        { status: 400 }
      );
    }

    if (id1 === id2) {
      return NextResponse.json(
        { error: "Cannot compare same salary" },
        { status: 400 }
      );
    }

    const salary1 = await prisma.salary.findUnique({
      where: { id: id1 },
    });

    const salary2 = await prisma.salary.findUnique({
      where: { id: id2 },
    });

    if (!salary1 || !salary2) {
      return NextResponse.json(
        { error: "Salary not found" },
        { status: 404 }
      );
    }

    const totalDifference =
      salary1.totalCompensation -
      salary2.totalCompensation;

    const level1 = parseInt(
      salary1.level.replace(/\D/g, "")
    );

    const level2 = parseInt(
      salary2.level.replace(/\D/g, "")
    );

    const levelGap = Math.abs(level1 - level2);

    return NextResponse.json({
      salary1: {
        base: salary1.baseSalary,
        bonus: salary1.bonus,
        stock: salary1.stock,
        total: salary1.totalCompensation,
        level: salary1.level,
      },
      salary2: {
        base: salary2.baseSalary,
        bonus: salary2.bonus,
        stock: salary2.stock,
        total: salary2.totalCompensation,
        level: salary2.level,
      },
      differences: {
        total: totalDifference,
        levelDiff: `Seniority gap: ${levelGap} level`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Comparison failed" },
      { status: 500 }
    );
  }
}