import { PrismaClient } from '@prisma/client'
import { problems } from './utils'
const prisma = new PrismaClient()

async function main() {
  // Delete related records first to avoid foreign key constraint violations
  console.log('🗑️  Clearing existing data...')
  
  await prisma.problemTag.deleteMany()
  await prisma.submission.deleteMany()
  await prisma.discussion.deleteMany()
  await prisma.solution.deleteMany()
  await prisma.testCase.deleteMany()
  await prisma.examples.deleteMany()
  await prisma.constraint.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.tag.deleteMany()

  console.log('✅ Cleared existing data')

  // Extract all unique tags from problems
  console.log('🔍 Extracting tags from problems...')
  const allTagNames = [...new Set(problems.flatMap(p => p.tags || []))]
  console.log('Tags needed:', allTagNames)

  // Create tags dynamically based on what problems actually need
  console.log('🏷️  Creating tags...')
  const createdTags = await Promise.all(
    allTagNames.map(tagName =>
      prisma.tag.create({
        data: {
          name: tagName,
          description: `Questions related to ${tagName}.`,
        }
      })
    )
  )

  console.log(`✅ Created ${createdTags.length} tags: ${allTagNames.join(', ')}`)

  // Create problems
  console.log('📝 Creating problems...')
  for (const problem of problems) {
    console.log(`Creating problem: ${problem.title}`)
    console.log(`Tags for this problem:`, problem.tags)
    
    const created = await prisma.problem.create({
      data: {
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty as any,
        acceptanceRate: problem.acceptanceRate,
        starterCode: problem.starterCode,
        examples: {
          create: problem.examples.map(e => ({
            input: e.input,
            output: e.output,
            explanation: e.explanation,
          })),
        },
        constraints: {
          create: problem.constraints.map(c => ({
            value: c,
          })),
        },
        testCases: {
          create: problem.testCases.map(tc => ({
            input: tc.input,
            output: tc.output,
            isHidden: tc.isHidden,
          })),
        },
        tags: {
          create: problem.tags ? problem.tags.map(tagName => ({
            tag: {
              connect: { name: tagName }
            }
          })) : []
        }
      },
    })

    console.log(`✔ Created problem: ${created.title}`)
  }
  
  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
