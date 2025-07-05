import { PrismaClient } from '@prisma/client'
import { problems } from './utils'
const prisma = new PrismaClient()

async function safeDeleteMany(model: any, modelName: string) {
  try {
    await model.deleteMany()
    console.log(`✅ Cleared ${modelName}`)
  } catch (error: any) {
    if (error.code === 'P2021') {
      console.log(`⚠️  ${modelName} table doesn't exist, skipping...`)
    } else {
      throw error
    }
  }
}

async function main() {
  // Delete related records first to avoid foreign key constraint violations
  console.log('🗑️  Clearing existing data...')
  
  // Clear data in proper order (child to parent relationships)
  await safeDeleteMany(prisma.starterCode, 'StarterCode')
  await safeDeleteMany(prisma.problemTag, 'ProblemTag')
  await safeDeleteMany(prisma.submission, 'Submission')
  // await safeDeleteMany(prisma.reply, 'Reply') // Comment out if Reply model doesn't exist
  await safeDeleteMany(prisma.discussion, 'Discussion')
  await safeDeleteMany(prisma.solution, 'Solution')
  await safeDeleteMany(prisma.testCase, 'TestCase')
  await safeDeleteMany(prisma.examples, 'Examples') // Use 'examples' not 'example'
  await safeDeleteMany(prisma.constraint, 'Constraint')
  await safeDeleteMany(prisma.problem, 'Problem')
  await safeDeleteMany(prisma.tag, 'Tag')

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

  // Create problems with starter codes
  console.log('📝 Creating problems...')
  for (const problem of problems) {
    console.log(`Creating problem: ${problem.title}`)
    console.log(`Slug: ${problem.slug}`)
    console.log(`Tags for this problem:`, problem.tags)
    
    const created = await prisma.problem.create({
      data: {
        title: problem.title,
        slug: problem.slug, // Add slug as it is required by the schema
        description: problem.description,
        difficulty: problem.difficulty as any,
        acceptanceRate: problem.acceptanceRate,
        examples: {
          create: problem.examples.map(e => ({
            input: e.input,
            output: e.output,
            explanation: e.explanation || null,
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
        starterCodes: {
          create: problem.starterCode.create.map(sc => ({
            language: sc.language as any,
            code: sc.code,
            wrapper: sc.wrapper, // Comment out if wrapper field doesn't exist yet
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

    console.log(`✔ Created problem: ${created.title} with ${problem.starterCode.create.length} starter codes`)
    console.log(`  - Starter codes created for each language`)
  }
  
  console.log('🎉 Seeding completed successfully!')
  
  // Show summary
  const problemCount = await prisma.problem.count()
  const starterCodeCount = await prisma.starterCode.count()
  const tagCount = await prisma.tag.count()
  const testCaseCount = await prisma.testCase.count()
  const exampleCount = await prisma.examples.count() // Use 'examples' not 'example'
  const constraintCount = await prisma.constraint.count()
  
  console.log('\n📊 Database Summary:')
  console.log(`- Problems: ${problemCount}`)
  console.log(`- Starter Codes: ${starterCodeCount}`)
  console.log(`- Tags: ${tagCount}`)
  console.log(`- Test Cases: ${testCaseCount}`)
  console.log(`- Examples: ${exampleCount}`)
  console.log(`- Constraints: ${constraintCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
