import { UserSeedingOperatorConfig } from '../configs';
import { DefaultQuantity } from '../constants';
import { UserSeedingOperator } from '../operators/userSeeding.operator';
import { _AbcSyncWorkflow } from './_abc.workflow';

export class SeedUserWorkflow extends _AbcSyncWorkflow {
  private userSeedingOperator: UserSeedingOperator;
  private quantity: number;

  constructor(quantity: number) {
    super();
    const config = new UserSeedingOperatorConfig({
      allowOutput: true,
    });
    this.userSeedingOperator = new UserSeedingOperator(config);
    this.quantity = quantity;
  }

  public run(): boolean {
    try {
      this.userSeedingOperator.seedUsers(this.quantity);
      return true;
    } catch (error) {
      return false;
    }
  }
}

/* =============== Execute the SeedUserWorkflow =============== */
const args = process.argv.slice(2);
const quantityArg = args.find((arg) => arg.startsWith('--number='));
const quantity = quantityArg
  ? parseInt(quantityArg.split('=')[1], 10)
  : DefaultQuantity;

const workflow = new SeedUserWorkflow(quantity);
workflow.run();
/* =============== Execute the SeedUserWorkflow =============== */
