import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ company: string }> }
) {
  try {
    const { company } = await params;

    const salaries = await prisma.salary.findMany({
      where: {
        company: {
          equals: company,
          mode: "insensitive",
        },
      },
    });

    const median = salaries.length
      ? salaries[Math.floor(salaries.length / 2)]?.totalCompensation || 0
      : 0;

    const levelDistribution: Record<string, number> = {};
    salaries.forEach((s) => {
      levelDistribution[s.level] = (levelDistribution[s.level] || 0) + 1;
    });

    return NextResponse.json({
      salaries,
      medianCompensation: median,
      levelDistribution,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch company data" },
      { status: 500 }
    );
  }
}