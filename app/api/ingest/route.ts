import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { salarySchema } from "@/lib/validators/salary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = salarySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const normalizedCompany =
      data.company.toLowerCase().trim();

    const bonus = data.bonus ?? 0;
    const stock = data.stock ?? 0;

    const totalCompensation =
      data.baseSalary + bonus + stock;

    const existing = await prisma.salary.findFirst({
      where: {
        company: normalizedCompany,
        role: data.role,
        level: data.level,
        location: data.location,
        experienceYears: data.experienceYears,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Duplicate salary entry" },
        { status: 409 }
      );
    }

    const salary = await prisma.salary.create({
      data: {
        company: normalizedCompany,
        role: data.role,
        level: data.level,
        location: data.location,
        experienceYears: data.experienceYears,
        baseSalary: data.baseSalary,
        bonus,
        stock,
        totalCompensation,
        confidenceScore: data.confidenceScore,
      },
    });

    return NextResponse.json(salary, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}