const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const workflowIndex = args.indexOf('--workflow');
const quantityIndex = args.indexOf('--quantity');

if (workflowIndex === -1 || workflowIndex + 1 >= args.length) {
  console.error('Error: Missing required argument --workflow');
  process.exit(1);
}

const seedWorkflowFileName = args[workflowIndex + 1];
const seedWorkflowQuantity =
  quantityIndex !== -1 ? Number(args[quantityIndex + 1]) || 10 : 10;

const seedWorkflowFilePath = path.resolve(
  __dirname,
  '../../test/seeds/workflows',
  `${seedWorkflowFileName}.workflow.ts`,
);

try {
  execSync(
    `npx ts-node ${seedWorkflowFilePath} --number=${seedWorkflowQuantity}`,
    { stdio: 'inherit' },
  );
  console.log(
    `✅ Seeding workflow executed successfully: "${seedWorkflowFilePath}"`,
  );
} catch (error) {
  console.error(`❌ Failed to execute workflow: "${seedWorkflowFilePath}"`);
  console.error(error.message);
  process.exit(1);
}
