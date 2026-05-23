import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Filter params
    const company = searchParams.get('company');
    const role = searchParams.get('role');
    const level = searchParams.get('level');
    const location = searchParams.get('location');
    
    // Sort params
    const sortBy = searchParams.get('sortBy') || 'totalCompensation';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (company) where.company = { contains: company.toLowerCase(), mode: 'insensitive' };
    if (role) where.role = { contains: role, mode: 'insensitive' };
    if (level) where.level = level;
    if (location) where.location = { contains: location, mode: 'insensitive' };

    // Validate sort field (prevent SQL injection)
    const allowedSortFields = ['company', 'role', 'level', 'experienceYears', 'totalCompensation', 'baseSalary'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'totalCompensation';
    const validSortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    // Execute queries in parallel
    const [salaries, total] = await Promise.all([
      prisma.salary.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [validSortBy]: validSortOrder,
        },
      }),
      prisma.salary.count({ where }),
    ]);

    return NextResponse.json({
      data: salaries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      sortBy: validSortBy,
      sortOrder: validSortOrder,
    });
  } catch (error) {
    console.error('Error fetching salaries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch salaries' },
      { status: 500 }
    );
  }
}
